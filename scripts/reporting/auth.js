const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { OAuth2Client } = require('google-auth-library');

const CONFIG_DIR = path.join(os.homedir(), '.config', 'fishyology-reporting');
const CLIENT_PATH = process.env.GOOGLE_OAUTH_CLIENT_PATH || path.join(CONFIG_DIR, 'oauth_client.json');
const TOKEN_PATH = path.join(CONFIG_DIR, 'token.json');

// One token is authorized for every scope any script here needs, so switching
// between gsc-report.js and ga4-report.js never forces a re-auth.
const ALL_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
];

function loadClientCreds() {
  const raw = JSON.parse(fs.readFileSync(CLIENT_PATH, 'utf8'));
  return raw.installed || raw.web;
}

async function getAuthedClient() {
  const { client_id, client_secret } = loadClientCreds();

  if (fs.existsSync(TOKEN_PATH)) {
    const client = new OAuth2Client(client_id, client_secret);
    client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8')));
    return client;
  }

  return authorizeNew(client_id, client_secret, ALL_SCOPES);
}

function authorizeNew(client_id, client_secret, scopes) {
  return new Promise((resolve, reject) => {
    let redirectUri;

    const server = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url, 'http://127.0.0.1');
        if (url.pathname !== '/oauth2callback') return;

        const code = url.searchParams.get('code');
        res.end('Signed in. You can close this tab and return to the terminal.');
        server.close();

        const client = new OAuth2Client(client_id, client_secret, redirectUri);
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        fs.mkdirSync(CONFIG_DIR, { recursive: true });
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        console.log(`\nToken saved to ${TOKEN_PATH}`);
        resolve(client);
      } catch (err) {
        reject(err);
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      redirectUri = `http://127.0.0.1:${port}/oauth2callback`;
      const client = new OAuth2Client(client_id, client_secret, redirectUri);
      const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
      });
      console.log('\nOpen this URL and sign in with noru.razak@gmail.com:\n');
      console.log(authUrl);
      console.log('\nWaiting for authorization...');
    });
  });
}

module.exports = { getAuthedClient, TOKEN_PATH, CONFIG_DIR };
