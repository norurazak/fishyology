const { google } = require('googleapis');
const { getAuthedClient } = require('./auth');

async function main() {
  const auth = await getAuthedClient();
  const [, , cmd] = process.argv;

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
