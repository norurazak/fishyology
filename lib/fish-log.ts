import type { SupabaseClient } from "@supabase/supabase-js";

/** One species in a player's log: how many they've landed and their best. */
export interface SpeciesRecord {
  count: number;
  best: number;
  bestDepth: number;
  bestAt: string;
}
export type FishLog = Record<string, SpeciesRecord>;

/** What the catch card shows about a species: the player's own tally and the community record. */
export interface CatchStats {
  count: number;
  best: number;
  recordKg: number | null;
  recordHolder: string | null;
}

const GUEST_KEY = "fishyology_fish_log";

export function readGuestLog(): FishLog {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as FishLog) : {};
  } catch {
    return {};
  }
}

/** Guests (and players without a profile) keep their log on this device only. */
export function addGuestCatch(species: string, weightKg: number, depthM: number): CatchStats {
  const log = readGuestLog();
  const prev = log[species];
  const isBest = !prev || weightKg > prev.best;
  log[species] = {
    count: (prev?.count ?? 0) + 1,
    best: isBest ? weightKg : prev.best,
    bestDepth: isBest ? depthM : prev.bestDepth,
    bestAt: isBest ? new Date().toISOString() : prev.bestAt,
  };
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify(log));
  } catch {
    /* storage unavailable: the card still shows, the log just isn't kept */
  }
  return { count: log[species].count, best: log[species].best, recordKg: null, recordHolder: null };
}

type Client = SupabaseClient<any, any, any>;

/**
 * Species that were renamed after catches were already saved under the old name.
 * Old rows count towards the new name, so nobody's log or records disappear.
 */
const OLD_NAMES: Record<string, string> = {
  Barracuda: "Great Barracuda",
  Tenggiri: "Narrow-barred Spanish Mackerel",
};
const currentName = (saved: string) => OLD_NAMES[saved] ?? saved;
const namesFor = (species: string) => [species, ...Object.keys(OLD_NAMES).filter((o) => OLD_NAMES[o] === species)];

/** The signed-in player's whole log, grouped by species. Pages through the table. */
export async function fetchMyLog(sb: Client, userId: string): Promise<FishLog> {
  const log: FishLog = {};
  const PAGE = 1000;
  for (let from = 0; from < PAGE * 10; from += PAGE) {
    const { data, error } = await sb
      .from("catches")
      .select("species, weight_kg, depth_m, caught_at")
      .eq("profile_id", userId)
      .order("caught_at", { ascending: false })
      .order("id", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    for (const row of data ?? []) {
      const w = Number(row.weight_kg);
      const name = currentName(row.species);
      const cur = log[name];
      if (!cur) {
        log[name] = { count: 1, best: w, bestDepth: Number(row.depth_m), bestAt: row.caught_at };
      } else {
        cur.count += 1;
        if (w > cur.best) {
          cur.best = w;
          cur.bestDepth = Number(row.depth_m);
          cur.bestAt = row.caught_at;
        }
      }
    }
    if (!data || data.length < PAGE) break;
  }
  return log;
}

/** Call after a catch is saved, so the count includes the fish just landed. */
export async function fetchCatchStats(sb: Client, userId: string, species: string): Promise<CatchStats> {
  const [mine, record] = await Promise.all([
    sb
      .from("catches")
      .select("weight_kg", { count: "exact" })
      .eq("profile_id", userId)
      .in("species", namesFor(species))
      .order("weight_kg", { ascending: false })
      .limit(1),
    sb
      .from("catches")
      .select("weight_kg, profiles(display_name)")
      .in("species", namesFor(species))
      .order("weight_kg", { ascending: false })
      .limit(1),
  ]);
  if (mine.error) throw mine.error;

  const top = record.data?.[0] as { weight_kg: number; profiles: any } | undefined;
  const p = top?.profiles;
  const holder = Array.isArray(p) ? p[0]?.display_name : p?.display_name;

  return {
    count: mine.count ?? 0,
    best: Number(mine.data?.[0]?.weight_kg ?? 0),
    recordKg: top ? Number(top.weight_kg) : null,
    recordHolder: holder ?? null,
  };
}
