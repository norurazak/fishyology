"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Star, Trophy } from "lucide-react";
import { useGameLanguage } from "@/components/game/GameLanguage";
import { archetypeLabel, type GameStringKey } from "@/lib/game-i18n";
import { fishInfo } from "@/lib/fish-info";
import { fishImageUrl } from "@/lib/fish-images";
import { rate, TIERS, TIER_COLORS } from "@/lib/catch-rating";
import type { CatchStats } from "@/lib/fish-log";

const MAX_DEPTH = 300;

export interface CardSpecies {
  name: string;
  archetype: string;
  minDepth: number;
  maxDepth: number;
  weightMin: number;
  weightMax: number;
  /** Position in the species table, shown as the card number. */
  no: number;
}

export type Ribbon = "record" | "pb" | "first" | null;

export interface CatchCardProps {
  species: CardSpecies;
  weightKg: number;
  depthM: number;
  angler: string;
  caughtAt: Date;
  /** The player's tally for this species and the community record. Omit to hide them. */
  stats?: CatchStats | null;
  ribbon?: Ribbon;
}

/** Which ribbon a freshly landed catch earns, if any. */
export function ribbonFor(weightKg: number, stats: CatchStats | null | undefined): Ribbon {
  if (!stats) return null;
  if (stats.recordKg !== null && weightKg >= stats.recordKg) return "record";
  if (stats.count <= 1) return "first";
  if (weightKg >= stats.best) return "pb";
  return null;
}

export const speciesSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// The tier colour comes from CSS variables (TIER_COLORS); only the base changes. Rarities
// 1-3 sit on a white card, Trophy and Legendary on a dark one with a shine and a halo.
const LIGHT = {
  root: "bg-white text-abyss shadow-[0_14px_30px_rgba(0,0,0,0.25)]",
  tile: "bg-[#f4f4f4]",
  muted: "text-[#5c5c5c]",
  track: "from-[#e9e9e9] to-[#bdbdbd]",
  rangeBorder: "border-abyss",
  badgeRing: "ring-[3px] ring-white",
  watermark: "opacity-[0.06]",
};
const DARK = {
  root: "bg-abyss text-white relative card-shine card-gloss shadow-[0_0_0_2px_#121212,0_0_28px_var(--tier-glow)]",
  tile: "bg-white/10",
  muted: "text-white/75",
  track: "from-white/15 to-white/35",
  rangeBorder: "border-white",
  badgeRing: "ring-[3px] ring-abyss",
  watermark: "opacity-[0.09] invert",
};

function Silhouette() {
  return (
    <svg viewBox="0 0 240 100" className="mx-auto h-full w-full text-abyss/25" aria-hidden="true">
      <path d="M10 50C50 8 140 6 190 44L232 14L222 50L232 86L190 56C140 94 50 92 10 50Z" fill="currentColor" />
      <circle cx="46" cy="44" r="4" fill="white" />
    </svg>
  );
}

const CatchCard = forwardRef<HTMLElement, CatchCardProps>(function CatchCard(
  { species: s, weightKg, depthM, angler, caughtAt, stats, ribbon = null },
  ref
) {
  const { lang, t } = useGameLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = fishImageUrl(s.name);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setImageFailed(true);
  }, []);
  const tier = rate(weightKg, s);
  const th = tier.stars >= 4 ? DARK : LIGHT;
  const colors = TIER_COLORS[tier.id];
  const effects = tier.id === "legendary" ? "card-shine-fast card-pulse" : "";
  const tierLabel = t(`tier.${tier.id}` as GameStringKey);
  const pct = (n: number) => `${(Math.max(0, Math.min(n, MAX_DEPTH)) / MAX_DEPTH) * 100}%`;
  // Sizes are in cqw (1% of the card's width), so the whole card scales as one piece
  // and keeps its proportions on any screen. At the full 380 px width, 1cqw = 3.8 px,
  // so 3.15cqw is 12 px, the smallest text on the card.
  const label = `text-[3.15cqw] font-bold uppercase leading-tight tracking-[0.1em] ${th.muted}`;
  const heroLabel = "text-[3.15cqw] font-bold uppercase leading-tight tracking-[0.12em] opacity-85";
  const info = fishInfo(s.name, lang);

  const ribbonText =
    ribbon === "record" ? t("card.newRecord") : ribbon === "pb" ? t("card.pb") : ribbon === "first" ? t("card.first") : "";

  return (
    <article
      ref={ref}
      aria-labelledby="catch-species"
      style={
        {
          "--tier": colors.solid,
          "--tier-on": colors.on,
          "--tier-strong": colors.strong,
          "--tier-glow": colors.glow,
          borderRadius: "1% / 0.543%",
        } as React.CSSProperties
      }
      className={`relative flex aspect-[19/35] w-full max-w-[380px] flex-col overflow-hidden border-[3px] border-[var(--tier)] [container-type:inline-size] motion-safe:animate-[card-in_0.5s_ease-out] ${th.root} ${effects}`}
    >
      <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-[var(--tier)] px-[4.2cqw] py-[2.2cqw] text-[var(--tier-on)]">
        {/* The seal is black on white, so it sits in a white badge to read on every tier. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Fishyology" width={35} height={35} className="h-[9.26cqw] w-[9.26cqw] justify-self-start rounded-full bg-white ring-2 ring-white/60" />
        <span className="text-[4.6cqw] font-black uppercase leading-[0.86] tracking-[-0.02em]">Jigging Master</span>
        <span className="justify-self-end bg-abyss/85 px-[2.2cqw] py-[1cqw] text-[3.15cqw] font-bold uppercase tracking-[0.1em] text-white">
          No. {String(s.no).padStart(2, "0")}
        </span>
      </header>

      {/* The picture: 30% of the card's height, on a spotlit plate tinted with the rarity colour. */}
      <figure
        className="relative m-0 shrink-0 grow-0 basis-[30%] border-b-[3px] border-[var(--tier)] px-[3cqw] pb-[8cqw] pt-[3cqw]"
        style={{
          background:
            "radial-gradient(ellipse 72% 78% at 50% 46%, #ffffff 0%, rgba(255,255,255,0.88) 42%, rgba(255,255,255,0) 100%)," +
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.045) 0 1px, transparent 1px 9px)," +
            "color-mix(in srgb, var(--tier) 30%, #ffffff)",
        }}
      >
        {ribbonText && (
          <span className="absolute left-0 top-[3cqw] z-[2] bg-abyss py-[1cqw] pl-[3cqw] pr-[3.2cqw] text-[3.15cqw] font-bold uppercase tracking-[0.12em] text-white">
            {ribbonText}
          </span>
        )}
        {imageFailed || !imageSrc ? (
          <Silhouette />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={s.name}
            width={720}
            height={402}
            crossOrigin="anonymous"
            ref={imgRef}
            onError={() => setImageFailed(true)}
            className="block h-full w-full object-contain mix-blend-multiply drop-shadow-[0_6px_6px_rgba(0,0,0,0.18)]"
          />
        )}

        {/* Depth and weight badges straddle the picture's bottom edge, trading-card style. */}
        <div className={`absolute bottom-0 left-[4.6cqw] z-[2] flex h-[15.5cqw] w-[38cqw] translate-y-1/2 flex-col justify-center bg-abyss px-[3cqw] text-white shadow-[0_6px_14px_rgba(0,0,0,0.3)] ${th.badgeRing}`}>
          <p className="truncate text-[3.15cqw] font-bold uppercase leading-tight tracking-[0.1em] opacity-80">{t("card.caughtAt")}</p>
          <p className="mt-[0.6cqw] text-[6.6cqw] font-black leading-none tracking-tight">
            {Math.round(depthM)}<small className="ml-[0.6cqw] text-[3.4cqw] font-bold">m</small>
          </p>
        </div>
        <div className={`absolute bottom-0 right-[4.6cqw] z-[2] flex h-[15.5cqw] w-[38cqw] translate-y-1/2 flex-col justify-center bg-[var(--tier)] px-[3cqw] text-right text-[var(--tier-on)] shadow-[0_6px_14px_rgba(0,0,0,0.3)] ${th.badgeRing}`}>
          <p className={heroLabel}>{t("card.yourWeight")}</p>
          <p className="mt-[0.6cqw] text-[9cqw] font-black leading-none tracking-tight">
            {weightKg.toFixed(1)}<small className="ml-[1cqw] text-[3.7cqw] font-bold">kg</small>
          </p>
        </div>
      </figure>

      <div className="relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden px-[4.6cqw] pb-[3cqw] pt-[11cqw]">
        {/* The seal, faint, behind the text. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 w-[94cqw] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full ${th.watermark}`}
        />

        {/* Who and what */}
        <div className="relative text-center">
          <h1 id="catch-species" className="text-[8.4cqw] font-black leading-[0.95] tracking-[-0.02em]">
            {s.name}
          </h1>
          <p className={`mt-[1.4cqw] truncate text-[3.4cqw] ${th.muted}`}>
            {archetypeLabel(lang, s.archetype)}
            {info ? <> · <i>{info.sci}</i></> : null}
          </p>
          <div className="mt-[2.4cqw] flex justify-center">
            <span
              role="img"
              aria-label={`${tierLabel}, ${tier.stars}/${TIERS.length}`}
              className="inline-flex items-center gap-[2cqw] bg-[var(--tier)] px-[3.2cqw] py-[1.1cqw] text-[var(--tier-on)]"
            >
              <span className="flex gap-[0.6cqw]" aria-hidden="true">
                {TIERS.map((x) => (
                  <Star key={x.id} className={`h-[4.2cqw] w-[4.2cqw] fill-current ${x.stars <= tier.stars ? "" : "opacity-30"}`} />
                ))}
              </span>
              <span className="text-[3.4cqw] font-black uppercase tracking-[0.16em]">{tierLabel}</span>
            </span>
          </div>
          <p className={`mt-[2cqw] truncate text-[3.4cqw] ${th.muted}`}>
            {t("card.landedBy", { name: angler })} ·{" "}
            {caughtAt.toLocaleDateString(lang === "ms" ? "ms-MY" : "en-MY", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>

        {/* The tally: times caught, personal best, and the record to beat. The tiles share
            rows (subgrid) so labels, values and the holder line up across all of them. */}
        {stats && (() => {
          const hasRecord = stats.recordKg !== null;
          const rows = hasRecord && stats.recordHolder ? "row-span-3" : "row-span-2";
          const tile = `${rows} grid grid-rows-subgrid items-center gap-y-[1cqw] px-[1.5cqw] py-[2.2cqw] text-center ${th.tile}`;
          const dt = `flex items-center justify-center gap-[1cqw] ${label}`;
          const unit = `ml-[0.6cqw] text-[3.15cqw] font-bold ${th.muted}`;
          return (
            <dl className={`relative grid gap-x-[1.8cqw] ${hasRecord ? "grid-cols-3" : "grid-cols-2"}`}>
              <div className={tile}>
                <dt className={dt}>{t("card.caught")}</dt>
                <dd className="text-[5.8cqw] font-black leading-none">{t("card.times", { n: stats.count })}</dd>
              </div>
              <div className={tile}>
                <dt className={dt}>{t("card.yourBest")}</dt>
                <dd className="text-[5.8cqw] font-black leading-none">
                  {Math.max(stats.best, weightKg).toFixed(1)}<small className={unit}>kg</small>
                </dd>
              </div>
              {hasRecord && (
                <div className={tile}>
                  <dt className={dt}>
                    <Trophy aria-hidden="true" className="h-[3.4cqw] w-[3.4cqw] shrink-0 text-[var(--tier-strong)]" />
                    {t("card.record")}
                  </dt>
                  <dd className="text-[5.8cqw] font-black leading-none">
                    {stats.recordKg!.toFixed(1)}<small className={unit}>kg</small>
                  </dd>
                  {stats.recordHolder ? (
                    <dd className={`truncate text-[3.15cqw] leading-tight ${th.muted}`}>{stats.recordHolder}</dd>
                  ) : null}
                </div>
              )}
            </dl>
          );
        })()}

        {/* Field notes */}
        {info && (
          <p className="relative line-clamp-3 border-l-[1cqw] border-[var(--tier-strong)] pl-[3cqw] text-left text-[3.4cqw] leading-[1.4]">
            {info.text}
          </p>
        )}

        <section className="relative" aria-label={t("card.depthBand")}>
          <div className={`mb-[1.2cqw] flex justify-between ${label}`}>
            <span>{t("card.depthBand")}</span>
            <span>
              {s.minDepth}–{s.maxDepth} m
            </span>
          </div>
          <div
            className={`relative h-[3.7cqw] bg-gradient-to-r ${th.track}`}
            role="img"
            aria-label={`${s.minDepth}–${s.maxDepth} m · ${Math.round(depthM)} m`}
          >
            <div
              className={`absolute -top-[0.8cqw] h-[5.3cqw] border-2 bg-[var(--tier-strong)] ${th.rangeBorder}`}
              style={{ left: pct(s.minDepth), width: pct(s.maxDepth - s.minDepth) }}
            />
            <div
              className="absolute -top-[1.5cqw] h-[6.7cqw] w-[1.1cqw] -translate-x-1/2 bg-white shadow-[0_0_0_2px_#121212]"
              style={{ left: pct(depthM) }}
            />
          </div>
          <div className={`mt-[1.2cqw] flex justify-between text-[3.15cqw] leading-tight ${th.muted}`} aria-hidden="true">
            <span>0 m</span>
            <span>150 m</span>
            <span>300 m</span>
          </div>
        </section>
      </div>

      {/* The site footer's faded brand line, in miniature. Decorative, so hidden from screen readers. */}
      <footer
        aria-hidden="true"
        className="shrink-0 overflow-hidden border-t-4 border-[var(--tier)] bg-abyss px-[3cqw] pb-[1.4cqw] pt-[2cqw] text-center"
      >
        <p className="whitespace-nowrap text-[7.8cqw] font-black uppercase leading-[0.85] tracking-[-0.04em]">
          <span className="text-[#2a2a2a]">Relive Our </span>
          <span className="bg-gradient-to-r from-[#333333] via-[#555555] to-[#333333] bg-clip-text text-transparent">Journey</span>
        </p>
      </footer>
    </article>
  );
});

export default CatchCard;
