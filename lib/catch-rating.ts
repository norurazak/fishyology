/**
 * Catch ratings. Kilograms can't be compared across species (5 kg is a monster
 * Queenfish and a tiny Giant Grouper), so a catch is rated by where its weight falls
 * inside its own species' range. Nothing is stored: the rating is always worked out
 * from the weight, so changing a threshold re-rates every old catch.
 *
 * Weights are rolled as min + range * random^2, so the share of catches landing in
 * each tier works out to roughly: Common 32%, Good 18%, Big 21%, Trophy 24%,
 * Legendary 5%.
 */
export const TIERS = [
  { id: "common", stars: 1, min: 0 },
  { id: "good", stars: 2, min: 0.1 },
  { id: "big", stars: 3, min: 0.25 },
  { id: "trophy", stars: 4, min: 0.5 },
  { id: "legendary", stars: 5, min: 0.9 },
] as const;

export type TierId = (typeof TIERS)[number]["id"];
export type Tier = (typeof TIERS)[number];

/**
 * One colour per rarity, the classic game ladder: white, yellow, blue, purple, red.
 * solid  - the card's header, weight tile and rating chip
 * on     - text that sits on solid (checked for contrast)
 * strong - a mid-tone for thin marks on a white card (the depth range)
 * light  - a lighter shade for text and stars on the dark Fish Log
 * glow   - the halo around Trophy and Legendary cards
 */
export const TIER_COLORS: Record<TierId, { solid: string; on: string; strong: string; light: string; glow: string }> = {
  common: { solid: "#E5E5E5", on: "#121212", strong: "#6b6b6b", light: "#FFFFFF", glow: "rgba(255,255,255,0.25)" },
  good: { solid: "#FFC21A", on: "#121212", strong: "#E0A400", light: "#FFC21A", glow: "rgba(255,194,26,0.4)" },
  big: { solid: "#2563EB", on: "#FFFFFF", strong: "#2563EB", light: "#5B9BFF", glow: "rgba(37,99,235,0.45)" },
  trophy: { solid: "#7C3AED", on: "#FFFFFF", strong: "#7C3AED", light: "#A78BFA", glow: "rgba(124,58,237,0.6)" },
  legendary: { solid: "#D7263D", on: "#FFFFFF", strong: "#D7263D", light: "#F0566A", glow: "rgba(215,38,61,0.65)" },
};

export function rate(weightKg: number, range: { weightMin: number; weightMax: number }): Tier {
  const span = range.weightMax - range.weightMin;
  const f = span > 0 ? (weightKg - range.weightMin) / span : 0;
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (f >= TIERS[i].min) return TIERS[i];
  }
  return TIERS[0];
}
