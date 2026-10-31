import Image from "next/image";
import readerStats from "@/lib/readerStats.json";

type ReaderCountry = { name: string; code: string };

/**
 * Slim homepage strip of top reader countries. Data comes from
 * lib/readerStats.json, written by `node ga4-report.js audience <id>` in
 * scripts/reporting. Renders nothing without countries.
 */
export default function ReaderAnalytics() {
  const countries = readerStats.countries as ReaderCountry[];
  if (countries.length === 0) return null;

  return (
    <section
      aria-label="Where our readers are"
      className="pb-20 md:pb-24 px-6 md:px-12 max-w-[1600px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10 pt-8 border-t border-[#1D242B]/10">
        <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-[#1D242B]/50">
          Read Around The World
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {countries.map((country) => (
            <li key={country.code} className="flex items-center gap-2">
              {/* Real flag artwork rather than emoji, which Windows renders as bare letters. */}
              <Image
                src={`https://flagcdn.com/${country.code}.svg`}
                alt=""
                width={900}
                height={600}
                unoptimized
                className="block w-7 h-auto shrink-0 ring-1 ring-[#1D242B]/10"
              />
              <span className="text-sm font-medium text-[#1D242B]/70">{country.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
