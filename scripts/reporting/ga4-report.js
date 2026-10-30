const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { getAuthedClient } = require('./auth');

const READER_STATS_PATH = path.join(__dirname, '..', '..', 'lib', 'readerStats.json');
const READER_STATS_DAYS = 90;

// Writes the top 7 countries and average time on site for the homepage
// analytics section. Run: node ga4-report.js audience <propertyId>
async function writeAudienceStats(auth, propertyId) {
  const data = google.analyticsdata({ version: 'v1beta', auth });
  const property = `properties/${propertyId}`;
  const dateRanges = [{ startDate: `${READER_STATS_DAYS}daysAgo`, endDate: 'today' }];

  const countryRes = await data.properties.runReport({
    property,
    requestBody: {
      dateRanges,
      dimensions: [{ name: 'country' }, { name: 'countryId' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 8,
    },
  });
  const countries = (countryRes.data.rows || [])
    .map((r) => ({
      name: r.dimensionValues[0].value,
      code: r.dimensionValues[1].value.toLowerCase(),
    }))
    .filter((country) => country.name !== '(not set)')
    .slice(0, 7);

  const durationRes = await data.properties.runReport({
    property,
    requestBody: { dateRanges, metrics: [{ name: 'averageSessionDuration' }] },
  });
  const duration = durationRes.data.rows?.[0]?.metricValues[0].value;

  const stats = {
    updated: new Date().toISOString().slice(0, 10),
    periodDays: READER_STATS_DAYS,
    countries,
    averageSessionSeconds: duration ? Math.round(Number(duration)) : null,
  };
  fs.writeFileSync(READER_STATS_PATH, `${JSON.stringify(stats, null, 2)}\n`);
  console.log(`Updated ${READER_STATS_PATH}\n`);
  console.log(stats);
}

async function main() {
  const auth = await getAuthedClient();
  const [, , cmd, arg] = process.argv;

  if (cmd === 'audience') {
    if (!arg) throw new Error('Usage: node ga4-report.js audience <propertyId>');
    await writeAudienceStats(auth, arg);
    return;
  }

  if (cmd === 'list' || !cmd) {
    const admin = google.analyticsadmin({ version: 'v1beta', auth });
    const res = await admin.accountSummaries.list();
    const summaries = res.data.accountSummaries || [];

    if (summaries.length === 0) {
      console.log('No GA4 accounts visible to this account.');
      return;
    }

    console.log('GA4 properties this account can access:\n');
    summaries.forEach((acct) => {
      (acct.propertySummaries || []).forEach((p) => {
        const id = p.property.replace('properties/', '');
        console.log(`  ${id}  ${p.displayName}`);
      });
    });
    console.log('\nRun: node ga4-report.js <propertyId>  -> pageview report for that property');
    return;
  }

  const propertyId = cmd;
  const data = google.analyticsdata({ version: 'v1beta', auth });

  const res = await data.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
      ],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 25,
    },
  });

  const rows = res.data.rows || [];
  if (rows.length === 0) {
    console.log('No GA4 data for this period.');
    return;
  }

  console.log('Views  Users  AvgDur(s)  Path\n');
  rows.forEach((r) => {
    const [path] = r.dimensionValues.map((v) => v.value);
    const [views, users, dur] = r.metricValues.map((v) => v.value);
    console.log(
      `${views.padStart(5)}  ${users.padStart(5)}  ${Number(dur).toFixed(0).padStart(8)}  ${path}`
    );
  });
}

main().catch((err) => {
  console.error(err.response ? JSON.stringify(err.response.data, null, 2) : err);
  process.exit(1);
});
