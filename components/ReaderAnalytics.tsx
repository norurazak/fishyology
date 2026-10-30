import Image from "next/image";
import readerStats from "@/lib/readerStats.json";

type ReaderCountry = { name: string; code: string };

function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return minutes > 0 ? `${minutes}m ${String(remainder).padStart(2, "0")}s` : `${remainder}s`;
}

function rankLabel(rank: number): string {
  return String(rank).padStart(2, "0");
}

function listNames(countries: ReaderCountry[]): string {
  return new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
    countries.map(({ name }) => (/^(United |Netherlands|Philippines)/.test(name) ? `the ${name}` : name)),
  );
}

/**
 * Real flag artwork rather than emoji, which Windows renders as bare letters.
 * Flags fix the width and let height follow, since their true proportions vary
 * (Malaysia is 2:1, Japan 3:2) and a fixed box would crop them.
 */
function Flag({ code, size }: { code: string; size: "lg" | "sm" }) {
  return (
    <Image
      src={`https://flagcdn.com/${code}.svg`}
      alt=""
      width={900}
      height={600}
      unoptimized
      className={`block h-auto shrink-0 ring-1 ring-white/15 ${
        size === "lg" ? "w-20 md:w-24" : "w-12"
      }`}
    />
  );
}

/**
 * Homepage audience section. Ranked countries and average time on site come
 * from lib/readerStats.json, written by `node ga4-report.js audience <id>` in
 * scripts/reporting. Renders nothing without countries, and the time-on-site
 * stat only appears once that figure exists.
 */
export default function ReaderAnalytics() {
  const { countries, averageSessionSeconds, periodDays } = readerStats as {
    countries: ReaderCountry[];
    averageSessionSeconds: number | null;
    periodDays: number | null;
  };
  if (countries.length === 0) return null;

  const [topCountry, ...otherCountries] = countries;
  const nextCountries = otherCountries.slice(0, 3);
  const furtherCountries = otherCountries.slice(3);

  return (
    <section className="pb-24 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto relative">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 p-8 md:p-12 xl:p-16 rounded-[2rem] bg-[#1D242B] shadow-2xl overflow-hidden">
        <div className="xl:col-span-5 flex flex-col justify-between gap-12">
          <div>
            <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-3 block text-sm">
              Analytics
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#FAFAFA] mb-4">
              Who Reads Fishyology
            </h2>
            <div className="space-y-4 text-[#FAFAFA]/60 max-w-md text-sm md:text-base font-medium leading-relaxed">
              <p>
                Fishyology is written from Malaysian waters, but the stories travel. What starts
                as a day on the boat or a closer look at a local species ends up being read a long
                way from where it happened.
              </p>
              <p>
                {topCountry.name} is home to our largest readership
                {nextCountries.length > 0 && `, followed by ${listNames(nextCountries)}`}
                {furtherCountries.length > 0 &&
                  `, with more readers joining from ${listNames(furtherCountries)}`}
                {periodDays ? ` over the last ${periodDays} days` : ""}.
              </p>
            </div>
          </div>

          {averageSessionSeconds !== null && (
            <div className="border-t border-white/10 pt-8">
              <p className="text-6xl md:text-7xl font-black tracking-tighter text-[#C7EEFF] mb-2">
                {formatDuration(averageSessionSeconds)}
              </p>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#FAFAFA]/50">
                Average Time On Site
              </h3>
            </div>
          )}
        </div>

        <ol className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <li className="sm:col-span-2 flex items-center gap-5 md:gap-6 p-6 md:p-8 rounded-[1.25rem] bg-white/[0.07] border border-white/10">
            <Flag code={topCountry.code} size="lg" />
            <div className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#C7EEFF] mb-1">
                {rankLabel(1)} · Top Readers
              </span>
              <span className="block font-serif italic text-3xl md:text-4xl text-[#FAFAFA]">
                {topCountry.name}
              </span>
            </div>
          </li>

          {otherCountries.map((country, index) => (
            <li
              key={country.code}
              className="flex items-center gap-4 p-4 md:p-5 rounded-[1.25rem] border border-white/10"
            >
              <span className="text-xs font-bold tracking-widest text-[#FAFAFA]/40">
                {rankLabel(index + 2)}
              </span>
              <Flag code={country.code} size="sm" />
              <span className="font-serif italic text-xl text-[#FAFAFA] truncate">
                {country.name}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
