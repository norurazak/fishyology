const { google } = require('googleapis');
const { getAuthedClient } = require('./auth');

async function main() {
  const auth = await getAuthedClient();
  const webmasters = google.webmasters({ version: 'v3', auth });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const sitesRes = await webmasters.sites.list();
  const sites = sitesRes.data.siteEntry || [];

  if (sites.length === 0) {
    console.log('No Search Console properties visible to this account.');
    return;
  }

  console.log('Properties this account can access:');
  sites.forEach((s) => console.log(`  - ${s.siteUrl} (${s.permissionLevel})`));

  const [, cmd, arg] = process.argv;

  if (cmd === 'inspect' && arg) {
    const site = sites[0].siteUrl;
    const res = await searchconsole.urlInspection.index.inspect({
      requestBody: { inspectionUrl: arg, siteUrl: site },
    });
    console.log(`\nInspection for ${arg}:`);
    console.log(JSON.stringify(res.data.inspectionResult, null, 2));
    return;
  }

  const site = sites[0].siteUrl;
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - 28);
  const fmt = (d) => d.toISOString().slice(0, 10);

  console.log(`\nTop pages on ${site}, ${fmt(start)} to ${fmt(end)}:\n`);

  const res = await webmasters.searchanalytics.query({
    siteUrl: site,
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ['page'],
      rowLimit: 25,
    },
  });

  const rows = res.data.rows || [];
  if (rows.length === 0) {
    console.log('No search analytics data for this period.');
    return;
  }

  rows.forEach((r) => {
    const [page] = r.keys;
    console.log(
      `${r.clicks.toString().padStart(5)} clicks  ${r.impressions.toString().padStart(6)} impr  ` +
        `${(r.ctr * 100).toFixed(1).padStart(5)}% ctr  pos ${r.position.toFixed(1).padStart(5)}  ${page}`
    );
  });

  console.log('\nTip: node gsc-report.js inspect <full-url>  -> live index status for one URL');
}

main().catch((err) => {
  console.error(err.response ? JSON.stringify(err.response.data, null, 2) : err);
  process.exit(1);
});
