This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

All are optional — the site builds and runs without them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID. |
| `WORLDTIDES_API_KEY` | Upgrades the tide panel on `/trips` from a free model estimate to official station predictions. |

### Tide data

The conditions panel on each saltwater trip shows tide state, timing and curve.
It picks a provider at request time:

- **Without `WORLDTIDES_API_KEY`** it uses Open-Meteo's MeteoFrance SMOC model.
  Free and key-less, but referenced to **mean sea level** rather than Chart
  Datum, so heights will not match printed Malaysian tide tables. The panel says
  so on screen.
- **With `WORLDTIDES_API_KEY`** it uses [WorldTides](https://www.worldtides.info)
  station-based harmonic predictions requested in Chart Datum, and names the
  tide gauge when one backs the prediction.

WorldTides bills 1 credit per 7 days of data per endpoint. Because predictions
are astronomical and don't change, responses are cached for 6 days — roughly
4 credits per week for the two saltwater trips. New accounts start with 100
free credits.

If a WorldTides request fails the panel falls back to the free source rather
than disappearing.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
