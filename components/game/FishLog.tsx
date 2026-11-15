"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Star } from "lucide-react";
import { useGameLanguage } from "@/components/game/GameLanguage";
import CatchCardDialog from "@/components/game/CatchCardDialog";
import type { CardSpecies } from "@/components/game/CatchCard";
import { rate, TIERS, TIER_COLORS } from "@/lib/catch-rating";
import { fetchMyLog, readGuestLog, type FishLog as Log } from "@/lib/fish-log";
import type { GameStringKey } from "@/lib/game-i18n";

type SpeciesRow = Omit<CardSpecies, "no">;

interface Props {
  supabase: SupabaseClient<any, any, any> | null;
  user: { id: string } | null;
  hasProfile: boolean;
  playerName: string;
  species: SpeciesRow[];
}

const FOCUS = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DD0E1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D141B]";

/** A button that opens the player's Fish Log: every species, how many caught, and their best. */
export default function FishLog({ supabase, user, hasProfile, playerName, species }: Props) {
  const { t } = useGameLanguage();
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<Log>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [cardFor, setCardFor] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const synced = !!(supabase && user && hasProfile);

  // Load the log each time it's opened, so it includes what was just caught.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    if (!synced) {
      setLog(readGuestLog());
      setStatus("idle");
      return;
    }
    setStatus("loading");
    fetchMyLog(supabase!, user!.id)
      .then((l) => { if (!cancelled) { setLog(l); setStatus("idle"); } })
      .catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, [open, synced, supabase, user]);

  // Escape closes the log (the card dialog on top handles its own Escape first).
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); opener?.focus?.(); };
  }, [open]);

  const rows = species.map((s, i) => ({ ...s, no: i + 1 }));
  const known = rows.filter((s) => log[s.name]);
  const catches = known.reduce((n, s) => n + log[s.name].count, 0);
  const legendary = known.filter((s) => rate(log[s.name].best, s).id === "legendary").length;
  const openRow = rows.find((s) => s.name === cardFor);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded border border-[#1C2733] bg-[#111A22] px-5 text-xs font-bold uppercase tracking-widest text-[#E6EDF3] transition-colors hover:bg-[#1C2733] ${FOCUS}`}
      >
        {t("log.open")}
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fishlog-title"
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#05070A]/95 px-4 py-6"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 id="fishlog-title" className="text-sm font-bold uppercase tracking-widest text-[#4DD0E1]">
                    {t("log.title")}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[#9AA9B8]" aria-live="polite">
                    {status === "loading"
                      ? t("log.loading")
                      : t("log.summary", { caught: known.length, total: rows.length, catches })}
                    {legendary > 0 && status === "idle" ? ` · ${legendary} ${t("tier.legendary")}` : ""}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`min-h-[44px] shrink-0 rounded border border-[#1C2733] bg-[#111A22] px-4 text-xs font-bold uppercase tracking-widest text-[#E6EDF3] hover:bg-[#1C2733] ${FOCUS}`}
                >
                  {t("card.close")}
                </button>
              </div>

              {!synced && <p className="mb-4 text-xs leading-relaxed text-[#9AA9B8]">{t("log.guestNote")}</p>}
              {status === "error" && <p role="alert" className="mb-4 text-xs font-bold text-[#FF3B47]">{t("log.error")}</p>}

              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                {rows.map((s) => {
                  const rec = log[s.name];
                  if (!rec) {
                    return (
                      <li key={s.name} className="border border-dashed border-[#1C2733] bg-[#0A1017] p-3 opacity-80">
                        <p className="text-sm font-bold text-[#7C8B9C]">???</p>
                        <p className="mt-1 text-xs text-[#9AA9B8]">{t("log.notCaught")}</p>
                        <p className="mt-2 text-xs text-[#7C8B9C]">{s.minDepth}–{s.maxDepth} m</p>
                      </li>
                    );
                  }
                  const tier = rate(rec.best, s);
                  const tierLabel = t(`tier.${tier.id}` as GameStringKey);
                  const col = TIER_COLORS[tier.id].light;
                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        onClick={() => setCardFor(s.name)}
                        aria-label={`${s.name}. ${t("log.viewCard")}. ${tierLabel}, ${rec.best.toFixed(1)} kg, ${t("card.times", { n: rec.count })}`}
                        style={{ borderColor: col }}
                        className={`h-full w-full border-2 bg-[#0D141B] p-3 text-left transition-transform motion-safe:hover:-translate-y-1 ${FOCUS}`}
                      >
                        <p className="text-sm font-bold text-[#E6EDF3]">{s.name}</p>
                        <span role="img" aria-hidden="true" className="mt-1 flex gap-0.5">
                          {TIERS.map((x) => (
                            <Star key={x.id} className="h-3.5 w-3.5 fill-current" style={{ color: x.stars <= tier.stars ? col : "#3a4a5a" }} />
                          ))}
                        </span>
                        <p className="mt-2 text-xs font-bold uppercase tracking-widest" style={{ color: col }}>{tierLabel}</p>
                        <p className="mt-1 text-sm text-[#E6EDF3]">
                          {rec.best.toFixed(1)} kg <span className="text-[#9AA9B8]">· {t("card.times", { n: rec.count })}</span>
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>,
          document.body
        )}

      {openRow && log[openRow.name] && (
        <CatchCardDialog
          onClose={() => setCardFor(null)}
          card={{
            species: openRow,
            weightKg: log[openRow.name].best,
            depthM: log[openRow.name].bestDepth,
            angler: playerName || t("card.guest"),
            caughtAt: new Date(log[openRow.name].bestAt),
            stats: { count: log[openRow.name].count, best: log[openRow.name].best, recordKg: null, recordHolder: null },
            ribbon: null,
          }}
        />
      )}
    </>
  );
}
