// Data for the Baitcasting Reel Master Guide (/resources/baitcasting-reel-guide)
// Ported from a standalone HTML draft into typed, reusable data + helpers.
// Structurally distinct from lib/reelGuideData.ts and lib/overheadGuideData.ts:
// drag is a plain [min, max] tuple rather than an object, every lineup item
// carries a size-class range plus optional braking system / frame material
// fields (rendered as extra spec pills), and every brand ships a suffix
// decoder table like the overhead guide.

export type DragRange = [number, number];

export interface ReelSeries {
  s: string; // series name
  t: string; // tier label
  sz: string[]; // available sizes
  w: string; // weight range text
  b: string; // bearing count text
  dg: DragRange; // drag range [min, max] kg
  sc: [number, number]; // size-class range (1 = BFS/micro … 6 = extra heavy)
  br: string | null; // braking system
  fr: string | null; // frame material
  a: string; // advantage
  k: string; // weakness
  ap: string; // best applications
  p: string; // price text
}

export interface PhilosophyItem {
  t: string;
  d: string;
}

export interface SuffixItem {
  k: string; // the suffix / code
  v: string; // what it means
}

export interface CapacityRow {
  sz: string;
  br: string; // braid capacity
  mf: string; // mono/fluoro capacity
  st: string; // rigging strategy
}

export interface MaintenanceItem {
  sv: string; // service/repair
  c: string; // estimated cost (MYR)
  n: string; // notes
}

export interface ChecklistItem {
  h: string; // heading
  pts: string[];
}

export interface Brand {
  id: string;
  name: string;
  code: string;
  logo?: string;
  tagline: string;
  philosophy: PhilosophyItem[];
  suffix: SuffixItem[];
  lineup: ReelSeries[];
  capacity: CapacityRow[];
  maintenance: MaintenanceItem[];
  checklist: ChecklistItem[];
  env: string;
  logistics: string;
}

export const BRANDS: Brand[] = [
  {
    id: "shimano",
    name: "Shimano",
    code: "SHI",
    tagline:
      "Split between low-profile ergonomics and round-profile torque, and the only brand here putting a self-charging microcomputer in the sideplate.",
    philosophy: [
      { t: "Digital Control (DC)", d: "A self-energising microcomputer in the sideplate measuring spool speed up to 1000 times a second and applying magnetic braking to stop backlashes. Tiers: I-DC4, I-DC5, 4x8 DC." },
      { t: "SVS Infinity", d: "The traditional adjustable centrifugal system – physical brake shoes against a raceway. Preferred by purists for maximum distance." },
      { t: "MGL Spools", d: "Ultra-thin ported spools with very low start-up inertia, so light lures cast and pitch effortlessly." },
      { t: "BFS & FTB", d: "Built to cast down to 1 gram. FTB (Finesse Tune Brake) pulls the braking unit off the spool entirely and puts magnets in the sideplate instead." },
    ],
    suffix: [
      { k: "PG / Normal / HG / XG", v: "Power ~5.5:1, Normal ~6.2:1, High ~7.4:1, Extra High ~8.5:1." },
      { k: "MGL / MGL III", v: "Fitted with a lightweight MagnumLite spool." },
      { k: "DC", v: "Digital Control braking microcomputer." },
      { k: "MD (Monster Drive)", v: "Tuned for heavy lines, large lures and oversized fish." },
      { k: "BFS", v: "Ultra-shallow spool for 1g–7g micro-lures." },
      { k: "Trailing 1 vs 0", v: "Models ending in 1 (151, 201, 71) are left-hand retrieve; ending in 0 are right-hand." },
    ],
    lineup: [
      { s: "Antares / Antares DC MD", t: "Low-Profile Flagship", sz: ["70", "100", "200 (MD)"], w: "220g – 315g", b: "10+1 / 11+1", dg: [5.0, 6.0], sc: [2, 4], br: "4x8 DC / 4x8 DC MD", fr: "Magnesium", a: "The pinnacle of casting distance. 4x8 DC MD (Monster Drive) on the 200 size is unmatched for heavy setups.", k: "Magnesium frame requires extreme care in saltwater; high price point.", ap: "Trophy hunting. Heavy Toman (Snakehead) frogging, swimbaits, and long-distance casting.", p: "$550 – $650" },
      { s: "Calcutta Conquest / DC", t: "Round Flagship", sz: ["30 (BFS)", "100", "200", "300", "400"], w: "235g – 340g", b: "12+1 to 14+1", dg: [4.0, 7.0], sc: [1, 6], br: "SVS Infinity / DC", fr: "Cold-forged aluminium", a: "Cold-forged aluminium body, MicroModule gears. The smoothest, most powerful winching reel Shimano makes.", k: "Round profile is less ergonomic for anglers with smaller hands; heavy.", ap: "Deep cranking, heavy swimbaits, massive Toman extraction, and musky.", p: "$500 – $600" },
      { s: "Aldebaran MGL / BFS", t: "Ultra-Finesse", sz: ["30 (BFS)", "50 (MGL)"], w: "130g – 135g", b: "9+1 / 10+1", dg: [3.5, 4.5], sc: [1, 1], br: "FTB magnetic (BFS) / SVS Infinity", fr: "Magnesium", a: "Insanely lightweight magnesium frame. FTB magnetic braking allows casting of 1.5g lures with a baitcaster.", k: "Extremely fragile under heavy loads; strictly freshwater or light brackish.", ap: "Stream finesse fishing (Tengas, Trout), ultra-light Sebarau lures.", p: "$350 – $420" },
      { s: "Metanium / Metanium DC", t: "Core Low-Profile High-End", sz: ["70", "100"], w: "170g – 185g", b: "10+1", dg: [5.0, 5.0], sc: [2, 3], br: "SVS Infinity / I-DC5", fr: "CoreSolid magnesium", a: "CoreSolid Magnesium frame, MGL Spool III. The ultimate lightweight tournament bass/game reel.", k: "Lacks line capacity for heavy offshore or oversized swimbaits.", ap: "All-day precision casting, skipping jigs, fast-paced Haruan/Bass fishing.", p: "$350 – $400" },
      { s: "Exsence DC", t: "JDM Seabass SW", sz: ["70", "100"], w: "225g – 230g", b: "10+1", dg: [4.5, 5.0], sc: [2, 3], br: "4x8 DC (seabass-tuned)", fr: "Aluminium", a: "Specifically tuned 4x8 DC system designed for casting heavy PE (braid) into strong coastal headwinds.", k: "Limited size options; highly specialised for long rods.", ap: "Wading estuaries, shore casting for Seabass and Mangrove Jack.", p: "$350 – $380" },
      { s: "Bantam / Bantam MGL", t: "Heavy Duty Low-Profile", sz: ["150"], w: "215g – 225g", b: "8+1", dg: [5.0, 5.0], sc: [3, 3], br: null, fr: "CoreSolid aluminium (one-piece)", a: "CoreSolid aluminium body – frame and sideplate are one piece. Incredible rigidity in a low-profile package.", k: "Heavier than the Metanium; only available in 150 size.", ap: "Punching heavy cover, medium swimbaits, aggressive jungle casting.", p: "$280 – $320" },
      { s: "Tranx", t: "Heavy Saltwater / Musky", sz: ["150", "200", "300", "400"], w: "190g – 340g", b: "5+1", dg: [6.0, 10.0], sc: [3, 6], br: "SVS centrifugal", fr: "Aluminium", a: "Built for absolute abuse. Massive line capacity, CoreProtect sealing, immense drag power.", k: "SVS centrifugal brakes are less forgiving than DC in the wind.", ap: "Heavy offshore casting, massive swimbaits, heavy coastal pelagics.", p: "$210 – $300" },
      { s: "Scorpion / Scorpion DC", t: "JDM Mid-Range", sz: ["70", "150", "200", "300 (MD)"], w: "210g – 315g", b: "7+1", dg: [4.5, 8.0], sc: [2, 5], br: "SVS Infinity / DC", fr: null, a: "The JDM equivalent of the Curado, often with different gear ratios, MGL spools, and signature crimson styling.", k: "Mostly identical internally to the Curado; requires importing.", ap: "Versatile lure fishing across all weight classes, depending on size.", p: "$190 – $260" },
      { s: "Curado (K, MGL, DC, BFS)", t: "Global Workhorse", sz: ["70 (MGL/BFS)", "150", "200", "300"], w: "175g – 300g", b: "6+1", dg: [3.5, 8.0], sc: [2, 5], br: "SVS Infinity / I-DC4", fr: "Aluminium", a: "The undisputed benchmark of baitcasters. Available in every configuration – BFS, DC, standard, heavy 300.", k: "I-DC4 system on the DC model is slightly less refined than I-DC5 on Metanium.", ap: "The do-it-all reel. 150 for general use, 300 for big swimbaits/Toman.", p: "$170 – $250" },
      { s: "SLX (Standard, XT, MGL, DC)", t: "Global Entry/Mid", sz: ["70 (MGL)", "150"], w: "190g – 215g", b: "4+1 / 5+1", dg: [4.5, 5.5], sc: [2, 3], br: "SVS Infinity (XT) / DC", fr: "Compact HAGANE aluminium", a: "Brings high-end tech (DC, MGL, SVS Infinity on the XT) to a highly aggressive price point.", k: "Lower bearing count; brass gears feel slightly less buttery than MicroModule.", ap: "Budget-friendly weekend fishing, excellent gateway into DC braking.", p: "$100 – $170" },
      { s: "Bass One XT / Caius", t: "JDM/Global Budget", sz: ["150"], w: "210g", b: "4+1 / 3+1", dg: [5.0, 5.0], sc: [3, 3], br: "SVS / VBS (legacy)", fr: "Composite sideplates", a: "Rock-solid Shimano reliability. Very affordable entry points using older generation SVS/VBS braking.", k: "Heavy spools mean poor performance with light lures; basic plastic sideplates.", ap: "Beginners learning to cast, budget bait rigs.", p: "$50 – $80" },
    ],
    capacity: [
      { sz: "30 / 50 (BFS)", br: "PE 0.6-100m, PE 0.8-80m", mf: "6lb-45m, 8lb-45m", st: "1g to 7g. Mountain streams (Tengas), micro-jigs, unweighted soft plastics. Aldebaran BFS, Curado BFS." },
      { sz: "70 / 71 (MGL)", br: "PE 1.0-150m, PE 1.5-100m", mf: "10lb-100m, 12lb-80m", st: "5g to 15g. Pitching light jigs, skipping soft plastics under trees for Haruan." },
      { sz: "100 (JDM) / 150 (Global)", br: "PE 1.5-150m, PE 2.0-110m", mf: "12lb-130m, 14lb-110m", st: "7g to 25g. The universal standard. Spinnerbaits, crankbaits, topwater frogs for Sebarau and Haruan." },
      { sz: "200 (Standard)", br: "PE 2.0-150m, PE 3.0-100m", mf: "14lb-145m, 20lb-100m", st: "15g to 50g. Heavy cover frogging, medium swimbaits, aggressive Toman in heavy lily pads." },
      { sz: "300 / 400 (Heavy)", br: "PE 3.0-200m, PE 4.0-150m", mf: "20lb-160m, 25lb-135m", st: "30g to 150g+. Massive swimbaits, heavy offshore jigging, deep cranks for monster Toman. Tranx, Curado 300." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 35 – 50", n: "Strip-down, degrease and re-lube. Baitcasters take more labour than spinning reels due to the clutch mechanism." },
      { sv: "Spool Bearing Upgrade (Ceramic)", c: "RM 60 – 120", n: "Drastically increases casting distance and reduces start-up inertia. Highly recommended." },
      { sv: "Standard Bearing Replacement", c: "RM 15 – 25", n: "Stainless replacements for worm shaft and handle knobs." },
      { sv: "DC Unit Replacement", c: "RM 250 – 450+", n: "If a DC unit fails it is an expensive part, usually special-ordered from Shimano Japan." },
      { sv: "MicroModule Gear Set", c: "RM 120 – 220", n: "Brass gears (Curado) are cheaper; Duralumin/aluminium gears (Metanium) more expensive." },
      { sv: "Carbon Drag Washer Upgrade", c: "RM 25 – 40", n: "Swapping stock Dartanium for aftermarket Carbontex, for stronger lockdown against Toman." },
    ],
    checklist: [
      { h: "DC vs. Centrifugal (SVS)", pts: ["Buy DC if you cast into heavy winds, skip lures under mangroves, or want to eliminate backlashes entirely. Perfect for night fishing.", "Buy SVS Infinity if you want absolute maximum casting distance in clear conditions and don't mind thumbing the spool manually."] },
      { h: "Frame Material", pts: ["Buy aluminium (Bantam, Curado, Tranx, SLX) for rugged abuse, heavy dragging from structure, and frequent brackish or saltwater use.", "Buy magnesium (Aldebaran, Metanium) for ultra-light setups and tournament freshwater casting where wrist fatigue is the top priority."] },
      { h: "Size the Reel to the Fish", pts: ["Don't buy a Curado 300 or Tranx to cast light spinners for Sebarau – the spool is too heavy to start spinning. Use a 70 or 150.", "Don't use an Aldebaran or a 70 to drag heavy Toman out of sunken trees; the frame and gears will strip. Use a 200 or 300."] },
      { h: "Low-Profile vs. Round Profile", pts: ["Palming the reel continuously and working the rod tip for topwater frogs: choose low-profile (Metanium, Curado).", "Casting heavy-resistance lures and needing absolute winching torque: choose round profile (Calcutta Conquest)."] },
    ],
    env: "Baitcasters are open designs – water and dirt get straight onto the level wind and spool bearings. The DC braking unit is fully sealed: never oil or grease the copper coil or the module itself, as oil attracts dirt and disrupts the magnetic sensors. Only oil the bearing seated in its centre. Magnesium frames (Antares, Metanium, Aldebaran) are highly reactive to salt – any scratch through the paint in Port Klang or Jugra will pit and corrode rapidly.",
    logistics: "The level wind worm shaft sits at the very front of the reel and catches muddy water from rainforest rivers like Tasik Kenyir. Scrub it with a toothbrush and re-grease frequently or the carriage pawl will jam. JDM-only models (Scorpion, Bass One XT) need importing; global models are widely supported.",
  },
  {
    id: "daiwa",
    name: "Daiwa",
    code: "DAI",
    tagline:
      "Everything here is aimed at line friction and castability – the T-Wing line guide, SV anti-backlash spools, and a flagship that talks to your phone.",
    philosophy: [
      { t: "T-Wing System (TWS)", d: "A T-shaped line guide. On the cast, line flows through the wide top section with less friction; on the retrieve it drops into the narrow lower channel for even spooling." },
      { t: "SV Spools", d: "Stress-free Versatile – ultra-light spools with a dynamic magnetic rotor that pushes outward at speed and retracts as the spool slows. The best system for skipping lures." },
      { t: "Magforce-Z / Boost", d: "Traditional magnetic braking for maximum distance with heavier lures. Boost adds a two-stage inductor to give the lure extra glide at the end of the cast." },
      { t: "HyperDrive Design", d: "Introduced 2021 – reinforced Hyper Armed Housing, improved HyperDrive Digigear tooth profiles, and a fortified clutch." },
    ],
    suffix: [
      { k: "SV", v: "Stress-free Versatile – for skipping and casting light-to-medium lures without thumbing." },
      { k: "TW", v: "Equipped with the T-Wing level wind system." },
      { k: "Air", v: "Bait finesse micro-spool (28–30mm) for 1g–5g lures." },
      { k: "A / HD", v: "Aluminium frame construction (Steez A) or heavy-duty gear sets (Zillion HD)." },
      { k: "Boost", v: "Magforce-Z Boost or SV Boost two-stage braking rotor for extra distance." },
      { k: "CT", v: "Compact – a smaller, narrower frame, often without T-Wing." },
    ],
    lineup: [
      { s: "IM Z Limitbreaker", t: "Digital Flagship", sz: ["200"], w: "250g", b: "12+1", dg: [7.0, 7.0], sc: [4, 4], br: "Intelligent Magforce (digital, app-linked)", fr: null, a: "Intelligent Magforce – a digital braking system connected to a smartphone app. Unmatched casting distance and data tracking.", k: "Extremely expensive; requires USB-C charging, unlike Shimano's self-charging DC.", ap: "Enthusiast tech casting, extreme distance targeting, and heavy lure casting.", p: "$800 – $950" },
      { s: "Steez (SV TW, A II, Air)", t: "Low-Profile Flagship", sz: ["70 (Air)", "100", "1000"], w: "135g – 190g", b: "12+1 / 14+1", dg: [3.5, 5.5], sc: [1, 3], br: "SV / Magforce-Z", fr: "Magnesium (SV TW) / aluminium (A II)", a: "The absolute pinnacle of Daiwa engineering. Ultra-light, insanely smooth, zero-backlash casting.", k: "Magnesium frame on SV TW requires extreme care in saltwater; the A II is aluminium.", ap: "Tournament bass, precision finesse, and premium freshwater lure casting.", p: "$500 – $650" },
      { s: "Ryoga", t: "Round Profile Flagship", sz: ["1016", "1520"], w: "255g – 270g", b: "12+1", dg: [6.0, 6.0], sc: [3, 4], br: null, fr: "Machine-cut aluminium alloy", a: "Machine-cut aluminium alloy body. Unmatched brute cranking power and structural rigidity.", k: "Heavy; lacks the ergonomic palm-ability of low-profile reels.", ap: "Deep cranking, massive swimbaits, heavy winching for monster Toman.", p: "$500 – $550" },
      { s: "Zillion (SV TW, TW HD)", t: "Core High-End", sz: ["1000", "1522 (HD)"], w: "175g – 200g", b: "10+1", dg: [5.0, 6.0], sc: [3, 4], br: "SV / Magforce-Z", fr: "Full aluminium Hyper Armed housing", a: "Full aluminium Hyper Armed housing. The ultimate balance of Steez-like refinement and rugged durability.", k: "Slightly heavier than the Steez SV TW.", ap: "The ultimate JDM workhorse for aggressive Haruan, Sebarau, and medium Toman.", p: "$320 – $380" },
      { s: "Alphas (SV TW, Air TW)", t: "Ultra-Compact High-End", sz: ["800"], w: "160g – 175g", b: "6+1 / 7+1", dg: [3.5, 4.5], sc: [1, 2], br: "SV / Air brake", fr: "Aluminium", a: "Extremely compact aluminium frame. The Air version is one of the best out-of-the-box bait finesse reels ever made.", k: "Small spool capacity limits it to light lines and finesse techniques.", ap: "BFS and stream finesse (Tengas, Trout), pitching micro-jigs.", p: "$250 – $300" },
      { s: "Coastal SV TW / 150 / 200", t: "Inshore Saltwater", sz: ["150", "200"], w: "195g – 230g", b: "7+1", dg: [5.0, 7.0], sc: [3, 4], br: "SV", fr: "Aluminium", a: "Built specifically for saltwater with Corrosion Resistant Ball Bearings (CRBB) and high line capacity.", k: "Essentially a heavily upgraded Tatula; the distinct blue styling isn't for everyone.", ap: "Estuary casting, Mangrove Jack, light inshore pelagics.", p: "$200 – $250" },
      { s: "Tatula (SV TW, Elite, 100-400)", t: "Global Workhorse", sz: ["70 (SV)", "80", "100", "150", "200", "300", "400"], w: "185g – 335g", b: "7+1 / 8+1", dg: [4.5, 11.0], sc: [2, 6], br: "SV / Magforce-Z", fr: "Aluminium", a: "The Curado killer. Available in every size from finesse (70) to massive musky sizes (400). Features TWS.", k: "The T-Wing mechanism adds a little bulk to the front of the frame.", ap: "The do-it-all reel. 100/150 for general use, 300/400 for big swimbaits and Toman.", p: "$150 – $250" },
      { s: "Lexa (WN, TW, HD)", t: "Heavy Duty Saltwater", sz: ["300", "400"], w: "295g – 485g", b: "6+1 / 7+1", dg: [10.0, 12.0], sc: [5, 6], br: null, fr: null, a: "Massive line capacity, stainless steel gears, built for absolute abuse. HD versions are heavy-duty.", k: "Very heavy; geared purely for winching rather than casting finesse.", ap: "Heavy offshore casting, giant swimbaits, massive coastal pelagics.", p: "$170 – $250" },
      { s: "Salamandura", t: "Asian Market Mid-Tier", sz: ["70", "103", "150"], w: "190g – 195g", b: "7+1", dg: [4.5, 5.0], sc: [2, 3], br: null, fr: null, a: "Asian-exclusive tuned platform based on the Tatula/Fuego frame, with striking crimson styling.", k: "Strictly a regional model; parts can be harder to source globally.", ap: "Versatile lure fishing across Southeast Asia; direct competitor to the Shimano Scorpion.", p: "$160 – $190" },
      { s: "Fuego CT", t: "Global Mid/Entry", sz: ["100"], w: "215g – 225g", b: "5+1", dg: [6.0, 6.0], sc: [3, 3], br: "Magforce-Z", fr: "Aluminium", a: "Magforce-Z and an aluminium frame at a highly accessible price.", k: "Uses a standard compact line guide (CT) instead of the T-Wing system.", ap: "Budget-friendly weekend fishing, excellent durable entry point.", p: "$100 – $130" },
      { s: "Exceler / CC80 / CG80", t: "Global Entry", sz: ["80", "100"], w: "185g – 195g", b: "4+1 / 5+1", dg: [5.0, 7.0], sc: [2, 3], br: "Magnetic (basic)", fr: "Carbon / composite", a: "Carbon and composite frames. Extremely lightweight for the budget category.", k: "Composite frame flexes under heavy loads; basic magnetic braking.", ap: "Beginners learning to cast, casual freshwater lake fishing.", p: "$60 – $80" },
      { s: "PR100 / Bass X", t: "Budget / Beginner", sz: ["100"], w: "190g – 195g", b: "3+1", dg: [5.0, 5.0], sc: [3, 3], br: null, fr: "Plastic sideplates", a: "Rock-bottom price point for a branded reel. Reliable basic mechanics.", k: "No T-Wing, cheap plastic sideplates, basic bearings.", ap: "Absolute beginners, disposable bait setups, kids' rigs.", p: "$40 – $55" },
    ],
    capacity: [
      { sz: "70 / 800 (Air / BFS)", br: "PE 0.6-100m, PE 0.8-80m", mf: "6lb-45m, 8lb-45m", st: "1g to 7g. Mountain streams (Tengas), micro-jigs, unweighted soft plastics. Alphas Air, Steez Air." },
      { sz: "70 / 80 (SV)", br: "PE 1.0-150m, PE 1.5-100m", mf: "10lb-80m, 12lb-70m", st: "5g to 15g. Pitching light jigs, skipping soft plastics under overhanging mangroves. Tatula SV 70." },
      { sz: "100 / 1000 (Standard)", br: "PE 1.5-150m, PE 2.0-110m", mf: "12lb-130m, 14lb-110m", st: "7g to 25g. The universal standard. Spinnerbaits, crankbaits, topwater frogs. Zillion SV TW, Tatula 100." },
      { sz: "150 / 1520 (Medium Heavy)", br: "PE 2.0-150m, PE 3.0-100m", mf: "14lb-145m, 20lb-100m", st: "15g to 50g. Heavy cover frogging, medium swimbaits, aggressive Toman in lily pads. Tatula 150, Ryoga 1520." },
      { sz: "200 (Heavy)", br: "PE 3.0-150m, PE 4.0-110m", mf: "20lb-135m, 25lb-110m", st: "30g to 80g. Heavy saltwater casting, medium offshore, dragging massive snakeheads. Tatula 200." },
      { sz: "300 / 400 (Extra Heavy)", br: "PE 4.0-200m, PE 5.0-160m", mf: "20lb-220m, 25lb-180m", st: "50g to 150g+. Massive swimbaits, offshore jigging, deep cranks for monster Toman. Tatula 300/400, Lexa." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 35 – 50", n: "Strip-down, degrease and re-lube. Essential for clearing mud from the TWS worm shaft." },
      { sv: "Spool Bearing Upgrade (Ceramic)", c: "RM 60 – 120", n: "Upgrading Daiwa's Zero Adjuster spool bearings to ceramic hybrids drastically increases free-spool time." },
      { sv: "T-Wing (TWS) Carriage Replacement", c: "RM 50 – 90", n: "If the T-Wing groove gets deeply grooved by braid, usually from lack of cleaning, it must be replaced to prevent line damage." },
      { sv: "HyperDrive Gear Set Replacement", c: "RM 140 – 250", n: "Replacing blown Digigears in brass or Duralumin. Steez gears cost significantly more than Tatula gears." },
      { sv: "Carbon Drag Washer Upgrade", c: "RM 25 – 40", n: "Replacing stock UTD with aftermarket Carbontex for stronger lockdown against Toman." },
    ],
    checklist: [
      { h: "Braking System – SV vs. Magforce-Z", pts: ["Buy SV if you skip lures under mangroves, fish into heavy winds, or want a completely stress-free, backlash-proof experience.", "Buy Magforce-Z or Boost if you're casting heavy lures in open water and want maximum distance, sacrificing some anti-backlash safety."] },
      { h: "Frame Material", pts: ["Buy aluminium (Zillion, Tatula, Coastal) for rugged abuse, heavy dragging from structure, and brackish or saltwater use.", "Buy magnesium (Steez SV TW) for tournament freshwater casting where reducing wrist fatigue over 10,000 casts is the priority."] },
      { h: "Size the Reel to the Fish", pts: ["Don't buy a Tatula 300 to cast light spinners for Sebarau – the spool is too heavy to start spinning easily. Use a 100 or 150.", "Don't use an Alphas to drag heavy Toman out of sunken trees; the finesse gears and frame will strip. Use a 200 or 300."] },
      { h: "T-Wing vs. Traditional Level Wind", pts: ["For an extra 10–15% casting distance and smoother line flow, stick to TWS models (Tatula, Zillion).", "If you fish extremely muddy water and rarely clean your gear, a traditional compact line guide (Fuego CT) jams less often than a dirty TWS."] },
    ],
    env: "The T-Wing mechanism is wide open at the top. Retrieving braid through muddy or algae-filled water scrapes debris off the line straight into the T-Wing carriage and worm gear – scrub with a toothbrush and rinse after muddy trips, or the level wind jams and gears strip. The magnesium Steez SV TW should not go into saltwater; buy the Steez A II (aluminium) or Zillion SV TW for estuaries.",
    logistics: "If you buy the IM Z Limitbreaker, treat it like a smartphone. The internal battery needs regular USB-C charging – don't leave it depleted in a hot car boot or the cell degrades. Global models (Tatula, Fuego) are well supported locally; Salamandura is a regional model whose parts can be harder to source.",
  },
  {
    id: "abugarcia",
    name: "Abu Garcia",
    code: "ABU",
    tagline:
      "Two philosophies in one catalogue – indestructible Swedish round reels on one side, asymmetrical low-profile speed machines on the other.",
    philosophy: [
      { t: "A-SYM (Asymmetrical) Body", d: "Introduced on the Zenon and rolled out to Generation 5 Revo. Offset-aligning the spool and shrinking the palm-side plate makes the reel sit lower and tighter in the hand." },
      { t: "IVCB-4 / IVCB-6", d: "Infinitely Variable Centrifugal Brake. Adjust centrifugal brake pressure externally via a dial – centrifugal distance with magnetic convenience." },
      { t: "Infini Brake System", d: "A dual system on mid-to-high tier models combining an adjustable centrifugal brake for the start of the cast and a magnetic brake for the end." },
      { t: "EXD / Super Free Spool", d: "Ultra-light spools with shaft designs that fully decouple the spool from the pinion gear during the cast, for massive distance." },
    ],
    suffix: [
      { k: "Round sizing (4600, 5500, 6500)", v: "First digit is width and capacity (4 narrow, 5 standard, 6 wide). Second digit is clutch type (5 = push-button, 6 = thumb-bar)." },
      { k: "LP", v: "Low Profile – standard ergonomic baitcaster." },
      { k: "Winch", v: "Low gear ratio, typically 5.4:1, for torque." },
      { k: "Rocket", v: "Ultra-high gear ratio, typically 9.0:1 or 10.1:1, for speed." },
      { k: "BF / LTX", v: "Bait Finesse – ultra-shallow spools for 1g–5g micro-lures." },
      { k: "Beast / Toro", v: "Oversized frames for heavy swimbaits and big line capacity." },
    ],
    lineup: [
      { s: "Zenon (MG-LTX, MG-X, X)", t: "Low-Profile Flagship", sz: ["Standard", "LTX (Finesse)"], w: "130g – 155g", b: "9+1 to 10+1", dg: [5.0, 5.0], sc: [1, 3], br: "IVCB-4", fr: "Magnesium (MG models)", a: "Insanely lightweight asymmetrical magnesium frame. IVCB-4 braking. The LTX is an elite bait finesse reel.", k: "Magnesium frames are fragile under high torque; not meant for heavy saltwater.", ap: "Tournament bass, precision finesse (Tengas), and ultra-light Sebarau casting.", p: "$350 – $450" },
      { s: "Revo Toro Beast / Beast X", t: "Heavy Low-Profile", sz: ["40", "50", "60"], w: "265g – 392g", b: "5+1 / 7+1", dg: [11.3, 11.3], sc: [4, 6], br: null, fr: null, a: "Massive line capacity, Power Stack Carbon Matrix drag up to 25lbs. Absolute brute force in a low-profile shell.", k: "Very heavy for a low-profile reel; palmability suffers on the 60 size.", ap: "Massive swimbaits, heavy Musky, offshore pelagics, dragging monster Toman.", p: "$250 – $400" },
      { s: "Ambassadeur Morrum / CS", t: "Premium JDM Round", sz: ["1500C", "2500C", "3600"], w: "200g – 260g", b: "4+1 to 6+1", dg: [5.0, 6.8], sc: [2, 3], br: null, fr: "Machined aluminium round", a: "Classic machined aluminium round frames with modernised JDM finesse internals. Collector's items.", k: "Hard to source; older ergonomic concepts; highly expensive.", ap: "Stream finesse, classic lure casting, enthusiast JDM setups.", p: "$350 – $500+" },
      { s: "Revo5 Rocket", t: "Speed Flagship", sz: ["LP Standard"], w: "215g", b: "10+1", dg: [8.1, 8.1], sc: [3, 3], br: null, fr: null, a: "Blistering 10.1:1 gear ratio picking up 41 inches of line per turn. Asymmetrical body.", k: "Pulling high-resistance lures like deep cranks feels incredibly heavy on the wrist at this ratio.", ap: "Burning topwater frogs for Haruan; instantly picking up slack before a fish buries into cover.", p: "$290 – $320" },
      { s: "Revo5 STX / Premier", t: "Core High-End", sz: ["LP Standard"], w: "212g – 220g", b: "10+1", dg: [11.3, 11.3], sc: [3, 3], br: "IVCB-6", fr: "High-end alloy", a: "The workhorse of the pro circuit. IVCB-6 braking, asymmetrical body, high-end alloy frame.", k: "Sits at a highly competitive price point against the Shimano Curado and Daiwa Tatula SV.", ap: "Universal lure fishing, skipping jigs, heavy cover pitching.", p: "$200 – $230" },
      { s: "Revo5 SX", t: "Mid-Range LP", sz: ["LP Standard", "RKT (Rocket)"], w: "212g – 215g", b: "9+1", dg: [11.3, 11.3], sc: [3, 3], br: "Infini dual-brake", fr: "Alloy", a: "Infini dual-braking system and an alloy frame. Incredible balance of durability and price.", k: "Slightly heavier than the STX; lacks the IVCB-6 external centrifugal dial.", ap: "Excellent all-rounder for Sebarau, Snakehead, and general freshwater lure casting.", p: "$160 – $180" },
      { s: "Revo5 Winch", t: "Cranking LP", sz: ["LP Standard"], w: "212g", b: "8+1", dg: [11.3, 11.3], sc: [3, 3], br: null, fr: null, a: "Ultra-low 5.4:1 gear ratio designed specifically for high-torque cranking.", k: "Extremely slow line pickup makes it poor for topwater frogs or fast river currents.", ap: "Deep-diving crankbaits, heavy spinnerbaits, high-resistance lures.", p: "$160 – $180" },
      { s: "Ambassadeur C3 / C4 / Pro Rocket", t: "Heavy Round", sz: ["4600", "5500", "6500"], w: "260g – 330g", b: "3+1 / 4+1", dg: [6.8, 6.8], sc: [4, 6], br: "6-pin centrifugal (internal)", fr: null, a: "Bulletproof Swedish-engineered round reels. Simple, indestructible mechanics. C4 is faster (6.3:1) than C3 (5.3:1).", k: "Ergonomically outdated; heavy; the 6-pin brake requires opening the sideplate to adjust.", ap: "The undisputed kings of Malaysian heavy Toman bait fishing and heavy offshore bait dropping.", p: "$150 – $200" },
      { s: "Roxani / ALC (JDM Series)", t: "JDM Mid-Tier", sz: ["BF8", "7", "8"], w: "185g – 190g", b: "4+1 / 7+1", dg: [5.5, 5.5], sc: [1, 3], br: "MagTrax", fr: null, a: "JDM tuned with shallow spools (BF8 for finesse) and carbon handles out of the box.", k: "Relies on standard MagTrax braking rather than Infini or IVCB.", ap: "Lightweight JDM finesse setups, Eging (Squid), light saltwater estuary casting.", p: "$130 – $160" },
      { s: "Revo5 X", t: "Entry-Mid LP", sz: ["LP Standard"], w: "204g", b: "7+1", dg: [9.1, 9.1], sc: [3, 3], br: "MagTrax", fr: "C6 carbon composite sideplates", a: "Brings the asymmetrical body design and Carbon Matrix drag to an aggressive price point.", k: "Composite (C6 carbon) sideplates and basic magnetic braking.", ap: "Budget-friendly weekend lure casting and beginner tournament fishing.", p: "$110 – $130" },
      { s: "Max Pro / Max STX / Max X", t: "Global Base", sz: ["Standard"], w: "209g – 210g", b: "7+1 / 5+1 / 4+1", dg: [6.8, 8.0], sc: [3, 3], br: "MagTrax", fr: "Graphite", a: "The successors to the legendary Black/Silver/Pro Max lines. Excellent entry ergonomics and reliable MagTrax brakes.", k: "Graphite frames flex under heavy torque – don't use for monster Toman; heavy brass gears.", ap: "The perfect beginner baitcaster. Pond fishing, casual weekend casting.", p: "$50 – $90" },
      { s: "Black Max / Blue Max", t: "Ultra-Budget", sz: ["Standard"], w: "202g – 225g", b: "4+1 / 3+1", dg: [6.8, 8.1], sc: [3, 3], br: null, fr: "Plastic composite", a: "Legacy reels still widely available in Asia. The cheapest entry into branded baitcasters.", k: "Cheap plastic feel; unrefined handle spin; basic bearings.", ap: "Disposable saltwater setups, youth setups, absolute beginners.", p: "$35 – $50" },
    ],
    capacity: [
      { sz: "BF / LTX (Finesse LP)", br: "PE 0.6-100m, PE 0.8-80m", mf: "6lb-50m, 8lb-40m", st: "1g to 7g. Ultra-light mountain streams, micro-jigs. Zenon LTX, Roxani BF8." },
      { sz: "Standard LP (Revo5 / Max)", br: "PE 1.5-150m, PE 2.0-120m", mf: "10lb-130m, 12lb-110m", st: "7g to 25g. The universal standard. Topwater frogs, spinnerbaits, crankbaits for Sebarau and Haruan." },
      { sz: "Revo Beast 40 / 4600 (Round)", br: "PE 2.0-200m, PE 3.0-150m", mf: "14lb-165m, 17lb-125m", st: "15g to 60g. Medium heavy casting. Heavy cover frogging, medium swimbaits, Toman from light cover." },
      { sz: "Toro Beast 50 / 5500 (Round)", br: "PE 3.0-220m, PE 4.0-160m", mf: "17lb-200m, 20lb-150m", st: "30g to 100g. Heavy casting. Large swimbaits, offshore coastal casting, heavy Toman extraction." },
      { sz: "Toro Beast 60 / 6500 (Round)", br: "PE 4.0-250m, PE 5.0-180m", mf: "20lb-250m, 25lb-180m", st: "50g to 150g+. Massive offshore lures, deep water bait dropping, surf casting." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 30 – 45", n: "Strip-down, degrease and re-lube. Generally cheaper and faster than Shimano or Daiwa thanks to simple mechanics." },
      { sv: "Spool Bearing Upgrade (Ceramic)", c: "RM 50 – 90", n: "Upgrading Revo/Max spool bearings to ceramics is the number one way to increase casting distance." },
      { sv: "Worm Shaft / Pawl Replacement", c: "RM 25 – 45", n: "The level wind pawl wears down fishing muddy water frequently. Extremely cheap and easy to swap." },
      { sv: "Gear Set Replacement (Brass)", c: "RM 80 – 150", n: "Replacing brass main and pinion gears (Revo SX/STX, Ambassadeur) is highly affordable." },
      { sv: "Gear Set Replacement (Alloy/Zenon)", c: "RM 180 – 250+", n: "Lightweight Duralumin gears on flagship models are more expensive to replace if stripped." },
      { sv: "Carbon Matrix Drag Washers", c: "RM 25 – 40", n: "Replacing stock drags; aftermarket Carbontex is widely available and cheap." },
    ],
    checklist: [
      { h: "Round Profile vs. Low Profile", pts: ["Buy round (Ambassadeur C3/C4) if you're strictly bait fishing for monster Toman, dropping baits offshore, or want a reel that lasts three generations with zero pampering.", "Buy low-profile (Revo5, Zenon) if you're casting lures all day – the asymmetrical body prevents severe wrist fatigue."] },
      { h: "Braking – Magnetic vs. Centrifugal", pts: ["Buy MagTrax or Infini (Revo X/SX, Max) if you're a beginner or cast varying lure weights. Forgiving and easy to set.", "Buy IVCB-6 or IVCB-4 (Revo STX, Zenon) if you're experienced and want maximum centrifugal distance with an external dial."] },
      { h: "Gear Ratio Targeting", pts: ["The Rocket (10.1:1): don't buy it to crank heavy spinnerbaits or deep divers, your wrist will burn. Buy it for topwater where you drag fish out of lily pads the millisecond they strike.", "The Winch (5.4:1): buy this for deep-water cranking in dams to maintain a slow, steady wobble."] },
      { h: "Frame Materials", pts: ["Don't use a Zenon (magnesium) in heavy brackish estuaries (Jugra, Port Klang) unless you wash it meticulously.", "For heavy pulling in saltwater or snags, rely on the Revo Beast, Revo5 STX (alloy), or the heavy brass gears of an Ambassadeur."] },
    ],
    env: "Abu reigns supreme for the DIY angler here. The round Ambassadeur reels (C3, C4) are legendary in Malaysia precisely because they can be stripped, cleaned of Tasik Kenyir mud, and rebuilt with a single wrench and a flathead screwdriver on the side of a boat. The new Revo5 and Zenon gearboxes are compact – packing them with thick tropical grease binds the gears against tight frame tolerances, so use grease sparingly.",
    logistics: "Abu's stock Carbon Matrix drags run best dry or with a very light coating of Cal's drag grease. Over-greasing them to fight massive Toman makes them slip under lockdown pressure. Parts are generally easy to source locally via Pure Fishing Malaysia.",
  },
  {
    id: "okuma",
    name: "Okuma",
    code: "OKU",
    tagline:
      "Unpretentious and split at the extremes – a 167g magnesium finesse reel at one end, a solid stainless-steel drivetrain winch at the other.",
    philosophy: [
      { t: "Flite Spool & Flite Shaft", d: "Developed with Dream Tackle. A patented hollow stainless main shaft removes centre mass, cutting friction so the ultra-light spool starts instantly. Okuma's answer to Daiwa SV and Shimano MGL." },
      { t: "LiteCast Frame", d: "Proprietary magnesium alloy treatment on the flagship low-profiles, creating a frame under 170g with a three-layer coating to resist saltwater corrosion." },
      { t: "Stainless Steel Drivetrain (SS)", d: "Where competitors use brass or aluminium, the heavy-duty Komodo SS runs a solid stainless main gear, pinion and drive shaft – unmatched torque under locked drag." },
      { t: "Velocity Control System (VCS)", d: "An adjustable multi-pin centrifugal brake beneath the sideplate, working with external magnetic dials for customisable cast control." },
    ],
    suffix: [
      { k: "a / b / c", v: "Generation markers (Citrix 354a is the first or standard generation, b would be second)." },
      { k: "L / LX", v: "Left-hand retrieve (e.g. Hakai HDT100X-LX)." },
      { k: "H / HA", v: "High speed gear ratio, typically 7.1:1 to 7.3:1." },
      { k: "X / XA", v: "Extra high speed, 8.1:1 and above, for burning lures." },
      { k: "SS", v: "Stainless steel main gear and pinion (Komodo SS)." },
      { k: "DT", v: "Dream Tackle – fitted with the ultra-light Flite Spool and Flite Shaft." },
    ],
    lineup: [
      { s: "Komodo SS", t: "Heavy SW / Musky Flagship", sz: ["200", "300", "400"], w: "295g – 455g", b: "6+1", dg: [10.0, 13.6], sc: [4, 6], br: null, fr: null, a: "Full stainless steel main gear and pinion; up to 30lbs of Carbonite drag. An absolute indestructible winch.", k: "Very heavy; high spool inertia makes it terrible for casting light lures.", ap: "Massive swimbaits, heavy Musky, offshore pelagics, dragging monster Toman from timber.", p: "$220 – $280" },
      { s: "Hakai DT", t: "Lightweight Flagship", sz: ["100"], w: "167g", b: "6+1", dg: [9.0, 9.0], sc: [2, 3], br: null, fr: "LiteCast magnesium", a: "LiteCast magnesium frame, Flite Spool, Flite Shaft. Incredibly light and casts lightweight lures effortlessly.", k: "Magnesium frames are fragile under high torque; not meant for heavy saltwater submersion.", ap: "Tournament bass, precision finesse (Tengas), and Sebarau casting.", p: "$170 – $190" },
      { s: "X-Series", t: "Premium Low-Profile", sz: ["100"], w: "175g", b: "7+1", dg: [11.0, 11.0], sc: [3, 3], br: "Refined magnetic", fr: "ALC aluminium", a: "Okuma's newest high-end release. Upgraded ALC aluminium rigidity with highly refined magnetic braking.", k: "The aluminium frame makes it slightly heavier than the Hakai.", ap: "Universal tournament lure fishing; skipping jigs, fast-paced casting.", p: "$160 – $180" },
      { s: "Citrix 300", t: "Heavy Duty Mid-Tier", sz: ["300"], w: "312g", b: "7+1", dg: [11.0, 11.0], sc: [5, 5], br: null, fr: "ALC rigid diecast aluminium", a: "ALC rigid diecast aluminium frame and sideplates; massive line capacity; built for big baits on a budget.", k: "Brass gears rather than the stainless steel found in the Komodo.", ap: "Excellent budget alternative for heavy swimbaits, light offshore, and big snakeheads.", p: "$140 – $160" },
      { s: "Cerros", t: "Core Mid-Range", sz: ["100"], w: "225g", b: "9+1", dg: [5.0, 5.0], sc: [3, 3], br: null, fr: "ALC aluminium", a: "ALC aluminium frame provides excellent rigidity; high bearing count for a very smooth retrieve.", k: "Slightly heavier than carbon and composite competitors in this price bracket.", ap: "The dependable workhorse for standard freshwater lure casting and medium bait fishing.", p: "$100 – $120" },
      { s: "Serrano", t: "Entry / Mid", sz: ["100"], w: "199g", b: "6+1", dg: [5.0, 5.0], sc: [3, 3], br: null, fr: "C-40X carbon", a: "Highly rigid C-40X carbon frame. Balances extreme lightweight design with an aggressive price point.", k: "The carbon frame will flex if you try to winch heavy fish from heavy cover.", ap: "Budget-friendly weekend lure casting, topwater frogs, and spinnerbaits.", p: "$90 – $100" },
      { s: "Ceymar / Ceymar HD", t: "Budget Workhorse", sz: ["100"], w: "215g", b: "5+1 / 6+1", dg: [5.0, 5.0], sc: [3, 3], br: "Basic magnetic", fr: "Graphite", a: "Corrosion-resistant graphite frame, multi-disc composite drag. The HD version features upgraded gearing.", k: "Graphite frame flexes under heavy torque; basic magnetic braking system.", ap: "The perfect beginner baitcaster. Pond fishing, casual weekend casting.", p: "$50 – $70" },
      { s: "Scorpio / Fuel Spin", t: "Ultra-Budget", sz: ["100"], w: "215g", b: "5+1", dg: [5.0, 5.0], sc: [3, 3], br: null, fr: "Graphite (Ceymar base)", a: "Striking cosmetics – the Scorpio is red and black; uses the foundational Ceymar graphite frame.", k: "Cheap composite feel; unrefined handle spin; basic bearings.", ap: "Absolute beginners, disposable setups, kids' rigs.", p: "$40 – $55" },
    ],
    capacity: [
      { sz: "100 (Flite Spool / Hakai)", br: "PE 1.0-150m, PE 1.5-100m", mf: "10lb-110m, 12lb-90m", st: "3g to 15g. Pitching light jigs, skipping soft plastics, ultra-light topwaters for Sebarau." },
      { sz: "100 (Standard)", br: "PE 1.5-150m, PE 2.0-110m", mf: "12lb-130m, 14lb-110m", st: "7g to 25g. The universal standard. Topwater frogs, spinnerbaits, crankbaits for Snakehead/Haruan." },
      { sz: "200 (Medium Heavy)", br: "PE 2.0-200m, PE 3.0-150m", mf: "14lb-165m, 17lb-125m", st: "15g to 60g. Heavy cover frogging, medium swimbaits, dragging Toman from light cover." },
      { sz: "300 (Heavy)", br: "PE 3.0-220m, PE 4.0-160m", mf: "17lb-200m, 20lb-150m", st: "30g to 100g. Large swimbaits, offshore coastal casting, heavy Toman extraction from sunken timber." },
      { sz: "400 (Extra Heavy)", br: "PE 4.0-250m, PE 5.0-180m", mf: "20lb-250m, 25lb-180m", st: "50g to 150g+. Massive offshore lures, deep water bait dropping, surf casting, big Musky lures." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 30 – 45", n: "Strip-down, degrease and re-lube. Highly DIY friendly with standard screws and sideplates." },
      { sv: "Spool Bearing Upgrade (Ceramic)", c: "RM 50 – 90", n: "Ceramic hybrids drastically increase casting distance on a Ceymar or Cerros." },
      { sv: "Komodo SS Gear Cleaning", c: "RM 45 – 60", n: "Stainless gears need a high-viscosity marine grease (like Cal's) or they feel grindy." },
      { sv: "Gear Set Replacement (Brass/Alu)", c: "RM 80 – 130", n: "Replacing standard gears on a Cerros or Ceymar is highly affordable." },
      { sv: "Carbonite Drag Washer Upgrade", c: "RM 25 – 40", n: "Replacing stock drags with aftermarket Carbontex for stronger lockdown power." },
    ],
    checklist: [
      { h: "Finesse or Brute Force?", pts: ["Buy the Hakai DT if you're casting all day in Royal Belum for Sebarau and need an ultra-light reel with zero start-up inertia.", "Buy the Komodo SS if you're locking the drag to drag 10kg Toman out of sunken trees, or casting large swimbaits in saltwater estuaries."] },
      { h: "Frame Material", pts: ["Buy aluminium (Cerros, Citrix, Komodo) for rugged abuse, heavy dragging from structure, and frequent brackish or saltwater use.", "Buy carbon or graphite (Serrano, Ceymar) if you're on a strict budget fishing open water where winching torque isn't required."] },
      { h: "Size the Reel to the Fish", pts: ["Don't buy a Citrix 300 to cast light spinners for Haruan – the spool is too heavy to start spinning easily. Use a 100.", "Don't use a Serrano 100 to drag heavy Toman out of cover; the carbon frame flexes and the gears misalign under torque. Use a 300."] },
      { h: "Gear Ratio Targeting", pts: ["X / XA (8.1:1+): buy only for topwater frogs and pencils where you pick up slack and drag fish out of lily pads the millisecond they strike.", "Standard (6.2:1): buy for deep-water cranking in dams to maintain a slow, steady wobble."] },
    ],
    env: "Two Malaysian niches: the Hakai for finesse anglers on clear rainforest streams chasing Sebarau, and the Komodo SS as a secret weapon for hardcore Toman hunters at Tasik Kenyir who've grown tired of stripping brass gears on Shimano and Daiwa reels. Locking the drag entirely to stop a fish diving into roots strips standard brass main gears; the Komodo's solid stainless gears practically never strip under human-generated pressure.",
    logistics: "The Hakai's LiteCast magnesium has a three-layer anti-corrosion coating, but scratch through the paint and expose raw magnesium to brackish water in Jugra or Port Klang and it pits rapidly. Okuma parts are widely supported and easily sourced via TCE Tackles and Rapala VMC, with much shorter waits than JDM Shimano or Daiwa components.",
  },
  {
    id: "quantum",
    name: "Quantum",
    code: "QTM",
    tagline:
      "American-market pragmatism. No micro-finesse chase – CNC-machined gears, external centrifugal dials, and a mechanical Flippin' Switch nobody else bothers with.",
    philosophy: [
      { t: "PT (Performance Tuned) Gears", d: "Main and pinion gears CNC-machined from hardened brass or aircraft-grade aluminium to exact tolerances rather than die-cast. Robust, if slightly heavier." },
      { t: "ACS Braking", d: "Adjustable Centrifugal System – brake shoe engagement set from an external sideplate dial, giving centrifugal distance without opening the reel to click pins." },
      { t: "The Flippin' Switch", d: "Toggle it on and the thumb bar releases line, but the gears re-engage the millisecond you lift your thumb, with no handle turn. The ultimate one-handed pitching tool." },
      { t: "SaltGuard & SCR Alloy", d: "A proprietary aluminium alloy with a multi-layer coating that renders the frame highly immune to brackish and saltwater corrosion." },
    ],
    suffix: [
      { k: "PT", v: "Performance Tuned – hardened gears, high-end bearings, advanced drag systems." },
      { k: "S3", v: "Series 3, the third and most refined generation of the modern PT lineup." },
      { k: "HPT / XPT", v: "High Performance Tuned (~7.0:1 to 7.3:1) and Extra High (8.1:1+)." },
      { k: "SPT", v: "Standard Performance Tuned (~6.1:1) for cranking torque." },
      { k: "Inshore", v: "Treated with SaltGuard, usually in distinct white or silver styling, for marine and brackish use." },
    ],
    lineup: [
      { s: "Tour S3 PT", t: "Flagship Low-Profile", sz: ["100"], w: "173g", b: "10+1", dg: [5.0, 5.0], sc: [3, 3], br: null, fr: "Magnesium / aluminium hybrid", a: "Extremely lightweight magnesium/aluminium hybrid frame; refined PT gears and an oversized 95mm carbon handle.", k: "Magnesium frame requires care in saltwater; limited size availability.", ap: "Tournament bass, precision casting, all-day lure throwing with zero fatigue.", p: "$200 – $220" },
      { s: "Monster PT", t: "Heavy Duty SW", sz: ["300"], w: "280g", b: "5+1", dg: [12.0, 12.0], sc: [5, 5], br: null, fr: "Solid aluminium SCR", a: "Built for absolute monsters. Massive line capacity, 26lb+ ceramic-carbon drag, solid aluminium SCR frame.", k: "Very heavy and bulky; lacks the finesse braking of standard low-profile reels.", ap: "Giant swimbaits, Musky, dragging massive Toman from heavy timber, inshore pelagics.", p: "$180 – $200" },
      { s: "Smoke S3 PT", t: "Core High-End", sz: ["100"], w: "195g", b: "10+1", dg: [11.3, 11.3], sc: [3, 3], br: "Micro-Adjust 3.0 ACS", fr: "Full SCR aluminium", a: "Full SCR aluminium frame, Micro-Adjust 3.0 ACS, and Zero Friction spool design. Incredible casting distance.", k: "Slightly heavier than the Shimano Metanium or Daiwa Zillion it competes against.", ap: "Universal tournament lure fishing; skipping jigs, aggressive topwater casting.", p: "$170 – $180" },
      { s: "Energy S3 PT", t: "Mid-Tier Workhorse", sz: ["100"], w: "201g", b: "10+1", dg: [8.1, 8.1], sc: [3, 3], br: "External ACS dial", fr: null, a: "Features the mechanical Flippin' Switch. High bearing count for an incredibly smooth crank under heavy loads.", k: "The external ACS dial can be sensitive to dial in perfectly for beginners.", ap: "Pitching and flipping into heavy cover, versatile freshwater lure fishing.", p: "$120 – $130" },
      { s: "Accurist S3 PT / Inshore", t: "Global Standard", sz: ["100"], w: "221g", b: "8+1", dg: [8.1, 8.1], sc: [3, 3], br: null, fr: "SaltGuard-treated", a: "The undisputed budget workhorse. Flippin' Switch and SaltGuard protection on the white Inshore models.", k: "Heavier brass gears and a slightly unrefined feel compared to the Smoke S3.", ap: "Brackish water estuaries, aggressive snakehead fishing, dependable weekend rig.", p: "$100 – $110" },
      { s: "Icon PT", t: "Entry Mid-Tier", sz: ["100"], w: "215g", b: "6+1", dg: [8.1, 8.1], sc: [3, 3], br: "Basic magnetic", fr: "Composite sideplates", a: "Brings PT components and aggressive styling to a lower price point.", k: "Uses basic magnetic braking and composite sideplates.", ap: "Weekend warriors, casual lure casters, budget backup rigs.", p: "$80 – $90" },
      { s: "Pulse / Drive", t: "Ultra-Budget", sz: ["100"], w: "225g", b: "4+1", dg: [6.8, 6.8], sc: [3, 3], br: null, fr: "Composite", a: "Extremely affordable entry point into the Quantum brand. Reliable basic mechanics.", k: "Cheap composite feel; heavy; basic drag washers that stutter under high pressure.", ap: "Absolute beginners, kids' setups, disposable bait rigs.", p: "$40 – $55" },
    ],
    capacity: [
      { sz: "100 (Tour S3 / Smoke S3)", br: "PE 1.5-150m, PE 2.0-120m", mf: "10lb-130m, 12lb-110m", st: "7g to 25g. The universal standard. Pitching jigs, spinnerbaits, topwater frogs for Sebarau and Haruan." },
      { sz: "100 (Accurist Inshore)", br: "PE 2.0-140m, PE 2.5-110m", mf: "12lb-120m, 14lb-100m", st: "10g to 30g. Brackish water casting. Mangrove Jack, medium swimbaits, aggressive cover fishing." },
      { sz: "300 (Monster PT)", br: "PE 3.0-275m, PE 4.0-200m", mf: "17lb-220m, 20lb-190m", st: "30g to 150g+. Heavy casting. Massive offshore lures, deep water bait dropping, heavy Toman extraction." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 35 – 50", n: "Strip-down, degrease and re-lube. Mechanics are straightforward, similar to Abu Garcia." },
      { sv: "Flippin' Switch Overhaul", c: "RM 45 – 65", n: "Higher labour if the mechanical clutch and secondary springs need stripping, cleaning and reseating after mud packing." },
      { sv: "Ceramic-Carbon Drag Upgrade", c: "RM 30 – 45", n: "Quantum's native ceramic-carbon washers are excellent; Carbontex is a cheap, widely available alternative." },
      { sv: "High-Performance Bearing Upgrade", c: "RM 60 – 110", n: "Ceramic hybrid spool bearings on an Accurist or Energy drastically increase free-spool time and distance." },
      { sv: "Gear Set Replacement (Accurist)", c: "RM 80 – 140", n: "Brass gear replacements are affordable if the local tuner stocks them; otherwise international shipping pushes the cost up." },
    ],
    checklist: [
      { h: "Do you need the Flippin' Switch?", pts: ["Buy the Accurist or Energy if you're constantly pitching soft plastics into tight mangrove roots or lily pads. Engaging the gear instantly with one hand before a fish wraps you around a root is a massive tactical advantage.", "Buy the Smoke S3 or Tour S3 if you're making long two-handed casts in open water for Sebarau – the switch adds mechanical weight you won't use."] },
      { h: "Freshwater vs. Brackish", pts: ["Buy the Inshore models if you fish Port Klang, Jugra, or any coastal estuary. SaltGuard SCR aluminium resists pitting and galvanic corrosion.", "Avoid the magnesium Tour S3 in saltwater unless you'll meticulously wash and oil it after every trip."] },
      { h: "Size the Reel to the Fish", pts: ["Buy the Monster PT (300) for 10kg+ Toman in heavy timber, six-inch swimbaits, or dropping live baits for grouper.", "Buy the 100 size for all standard Haruan, Bass and Sebarau fishing – a Monster PT is far too heavy to cast 10g lures effectively."] },
      { h: "Gear Ratio Targeting", pts: ["XPT / HPT (7.0:1 to 8.1:1): essential for topwater frogs where you pick up slack instantly and drag fish out of cover the second they blow up.", "SPT (6.1:1): for deep-water cranking, keeping a slow steady wobble on hardbodies without exhausting your wrist."] },
    ],
    env: "The Flippin' Switch is a physical lever engaging a secondary clutch spring. Fishing muddy rainforest rivers like Tasik Kenyir or Royal Belum, dirt gets into the thumb-bar gap and jams the mechanism – and a jammed switch means the reel will not re-engage. Flush with freshwater and brush it out carefully. Quantum's proprietary red Hot Sauce grease resists breakdown remarkably well in 30°C+ tropical heat, unlike some JDM greases that thin out entirely.",
    logistics: "Quantum is not as widely distributed in Malaysia as Shimano, Daiwa or Abu Garcia. Standard bearings swap locally, but proprietary parts – ACS brake shoes, Flippin' Switch springs, SaltGuard sideplates – usually mean ordering from the US via TackleWarehouse or eBay, with a three to five week wait.",
  },
  {
    id: "pflueger",
    name: "Pflueger",
    code: "PFL",
    tagline:
      "A deliberately tiny catalogue – one universal low-profile size, Abu Garcia internals underneath, and the parts-compatibility that comes with sharing a parent company.",
    philosophy: [
      { t: "Pure Fishing DNA", d: "An Abu Garcia sister brand. Brass gear cuts, magnetic brake layouts and drag washers share direct architecture with the Abu Max and Revo series." },
      { t: "C30 / Graphite Construction", d: "High-end C30 carbon sideplates and graphite frames in the modern mid-tier reels, making them some of the lightest at their price points." },
      { t: "The Flippin' Switch", d: "Like Quantum, Pflueger still offers a mechanical Flippin' Switch on specific models (President LP-F), engaging the gears the instant you release the thumb bar." },
      { t: "Ultimate Brake System", d: "On the legacy flagships (Patriarch), a 6-pin centrifugal brake combined with an external magnetic dial – both distance and wind-resistance control." },
    ],
    suffix: [
      { k: "LP", v: "Low Profile – the standard baitcaster design and Pflueger's only size." },
      { k: "XT", v: "A premium upgrade over the base model – higher bearing count, faster ratio, or C30 carbon sideplates." },
      { k: "F / LP-F", v: "Fitted with the mechanical Flippin' Switch." },
      { k: "L", v: "Left-hand retrieve." },
      { k: "Gear ratios", v: "Standard speed (6.1:1, 6.5:1) and high speed (7.3:1)." },
    ],
    lineup: [
      { s: "Patriarch / Patriarch XT", t: "Legacy Flagship", sz: ["LP Standard"], w: "165g – 180g", b: "10+1 / 11+1", dg: [9.0, 9.0], sc: [3, 3], br: "Dual centrifugal + magnetic", fr: "Aluminium", a: "Titanium-coated line guide, dual braking, incredibly lightweight aluminium frame.", k: "Often out of production or released in limited batches; hard to find at retail.", ap: "Premium tournament bass fishing, precision pitching, high-end freshwater lure casting.", p: "$200 – $250" },
      { s: "Supreme / Supreme XT", t: "Premium Mid-Tier", sz: ["LP Standard"], w: "190g – 195g", b: "8+1 / 9+1", dg: [6.8, 6.8], sc: [3, 3], br: null, fr: "Aluminium", a: "Aluminium frame provides excellent rigidity; swept carbon/aluminium handles; very smooth retrieve.", k: "Sits at a highly competitive price point dominated by the Shimano Curado and Daiwa Tatula.", ap: "Versatile lure fishing; dragging Haruan from medium cover, aggressive topwater.", p: "$130 – $150" },
      { s: "President XT", t: "Modern Core High-End", sz: ["LP Standard"], w: "200g", b: "8+1 / 9+1", dg: [5.4, 5.4], sc: [3, 3], br: "Refined magnetic", fr: "C30 carbon sideplates", a: "C30 Carbon sideplates for weight reduction, highly refined magnetic braking, and rubber cork knobs.", k: "The graphite/carbon composite frame flexes slightly under absolute lockdown drag against massive fish.", ap: "The daily workhorse. Skipping jigs, throwing spinnerbaits, general freshwater and estuary casting.", p: "$110 – $130" },
      { s: "President / President LP-F", t: "Mid-Range", sz: ["LP Standard"], w: "215g", b: "6+1", dg: [5.4, 5.4], sc: [3, 3], br: null, fr: "Graphite", a: "Extremely reliable graphite frame. The LP-F model includes the sought-after mechanical Flippin' Switch.", k: "Heavy brass gears; the standard graphite frame feels less rigid than the aluminium Supreme.", ap: "Pitching soft plastics into heavy lily pads (LP-F), casual weekend casting, budget tournament rig.", p: "$80 – $90" },
      { s: "Monarch", t: "Budget / Entry", sz: ["LP Standard"], w: "215g – 225g", b: "4+1 / 5+1", dg: [5.4, 5.4], sc: [3, 3], br: "Standard magnetic", fr: "Composite", a: "Exceptional entry-level price; standard magnetic braking; often sold as an affordable rod and reel combo.", k: "Basic drag system; cheap composite feel; lower bearing count means less refinement under load.", ap: "Absolute beginners, disposable brackish water setups, youth rigs.", p: "$50 – $65" },
    ],
    capacity: [
      { sz: "LP (Standard / Universal)", br: "PE 1.5-160m, PE 2.0-125m", mf: "12lb-130m, 14lb-110m", st: "7g to 30g. The universal standard. Pitching jigs, spinnerbaits, topwater frogs for Sebarau, Haruan, and medium Toman." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 30 – 45", n: "Strip-down, degrease and re-lube. Highly DIY-friendly, exactly like an Abu Garcia reel." },
      { sv: "Spool Bearing Upgrade (Ceramic)", c: "RM 50 – 90", n: "Ceramic hybrids drastically increase casting distance for the President or Monarch." },
      { sv: "Flippin' Switch Spring Repair", c: "RM 25 – 40", n: "A cheap, easy fix if the mechanical clutch spring snaps or rusts out from estuary use." },
      { sv: "Gear Set Replacement (Brass)", c: "RM 80 – 130", n: "Affordable and often cross-compatible with Abu Max series components." },
      { sv: "Drag Washer Replacement", c: "RM 25 – 40", n: "Standard Carbontex washers fit perfectly in Pflueger gearboxes." },
    ],
    checklist: [
      { h: "Do you need the Flippin' Switch?", pts: ["Buy the President LP-F if you're constantly pitching soft plastics into tight mangrove roots or lily pads.", "Avoid the LP-F for long open-water casts for Sebarau – it's an unnecessary mechanical complication. Buy the standard President XT."] },
      { h: "Frame Material", pts: ["Buy aluminium (Supreme, Patriarch) if you're aggressively locking the drag to pull medium-to-large fish away from heavy timber or structure.", "Buy graphite or C30 (President XT, Monarch) if you're a casual weekend angler fishing open-water dams or on a strict budget."] },
      { h: "Gear Ratio Targeting", pts: ["High speed (7.3:1), available on the President XT: essential for topwater frogs where you pick up slack the second a Haruan blows up on the lure.", "Standard (6.1:1 to 6.5:1): for deep-water cranking, keeping a slow steady wobble without exhausting your wrist."] },
    ],
    env: "Reels like the base President and Monarch use graphite frames. Fishing Tasik Kenyir and locking the drag entirely to pull a 10kg Toman out of a sunken tree will flex the frame, misaligning and stripping the gears. For monster fish use an aluminium-framed reel (Supreme, Patriarch) or let the rod do the pulling. The President LP-F's Flippin' Switch traps sediment under the thumb bar in muddy flooded rivers – wash it aggressively after those trips.",
    logistics: "The Abu Garcia parts hack: because Pflueger is owned by Pure Fishing, you don't wait weeks for a Pflueger-specific part from the US. Most authorised Pure Fishing dealers (TCE Tackles) can swap equivalent Abu Revo or Max series parts – brake dials, handle knobs, carbon drag washers – directly into the Pflueger chassis.",
  },
];

export interface RulerRow {
  b: string;
  vals: string[];
}

export const RULER_COLS: string[] = ["BFS / micro", "Compact", "Standard", "Medium-heavy", "Heavy", "Extra heavy"];

export const RULER_ROWS: RulerRow[] = [
  { b: "Shimano", vals: ["30 / 50 (BFS)", "70 / 71 (MGL)", "100 JDM = 150 global", "200", "300", "400"] },
  { b: "Daiwa", vals: ["70 Air / 800", "70 / 80 (SV)", "100 / 1000", "150 / 1520", "200 / 300", "400"] },
  { b: "Abu Garcia", vals: ["BF8 / Zenon LTX", "–", "LP Standard (Revo5 / Max)", "Beast 40 / 4600", "Beast 50 / 5500", "Beast 60 / 6500"] },
  { b: "Okuma", vals: ["–", "100 Flite (Hakai)", "100 standard", "200 (Komodo)", "300 (Citrix / Komodo)", "400 (Komodo SS)"] },
  { b: "Quantum", vals: ["–", "–", "100", "–", "300 (Monster PT)", "–"] },
  { b: "Pflueger", vals: ["–", "–", "LP universal", "–", "–", "–"] },
];

export interface TierRow {
  tier: string;
  shi: string;
  dai: string;
  abu: string;
  oku: string;
  qtm: string;
  pfl: string;
}

export const TIER_ROWS: TierRow[] = [
  { tier: "BFS / finesse", shi: "Aldebaran MGL/BFS", dai: "Alphas Air, Steez Air", abu: "Zenon LTX, Roxani BF8", oku: "–", qtm: "–", pfl: "–" },
  { tier: "Low-profile flagship", shi: "Antares, Metanium", dai: "Steez", abu: "Zenon", oku: "Hakai DT", qtm: "Tour S3 PT", pfl: "Patriarch" },
  { tier: "Round profile", shi: "Calcutta Conquest", dai: "Ryoga", abu: "Ambassadeur C3/C4, Morrum", oku: "–", qtm: "–", pfl: "–" },
  { tier: "All-round workhorse", shi: "Curado, Bantam", dai: "Tatula, Zillion", abu: "Revo5 SX / STX", oku: "Cerros, X-Series", qtm: "Accurist S3 PT", pfl: "President XT" },
  { tier: "Heavy / big bait", shi: "Tranx", dai: "Lexa, Tatula 300/400", abu: "Revo Toro Beast", oku: "Komodo SS, Citrix 300", qtm: "Monster PT", pfl: "–" },
  { tier: "Budget entry", shi: "Bass One XT / Caius", dai: "PR100 / Bass X", abu: "Black Max / Blue Max", oku: "Ceymar, Scorpio", qtm: "Pulse / Drive", pfl: "Monarch" },
];

// ---------------- Tagging / classification for the lineup filter chips ----------------

export type TierTag = "all" | "flagship" | "bfs" | "round" | "workhorse" | "heavy" | "jdm" | "budget";

export const TAG_LABELS: Record<TierTag, string> = {
  all: "All",
  flagship: "Flagship",
  bfs: "BFS / Finesse",
  round: "Round Profile",
  workhorse: "Workhorse",
  heavy: "Heavy",
  jdm: "JDM",
  budget: "Budget",
};

export function classify(item: ReelSeries): TierTag[] {
  const tags: TierTag[] = [];
  const s = `${item.s} ${item.t}`.toLowerCase();
  if (s.includes("flagship")) tags.push("flagship");
  if (s.includes("finesse") || s.includes("bfs") || s.includes("ultra-compact") || s.includes("aldebaran") || s.includes("alphas")) tags.push("bfs");
  if (s.includes("round") || s.includes("ambassadeur") || s.includes("calcutta") || s.includes("ryoga")) tags.push("round");
  if (s.includes("heavy") || s.includes("musky") || s.includes("monster") || s.includes("beast") || s.includes("komodo") || s.includes("tranx") || s.includes("lexa")) tags.push("heavy");
  if (s.includes("budget") || s.includes("entry") || s.includes("base") || s.includes("beginner")) tags.push("budget");
  if (s.includes("jdm") || s.includes("asian market")) tags.push("jdm");
  if (s.includes("workhorse") || s.includes("core") || s.includes("mid") || tags.length === 0) tags.push("workhorse");
  return tags;
}

export function priceLow(p: string): number {
  const m = p.match(/\$?([\d,]+)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}

export function weightLow(w: string): number {
  const m = w.match(/([\d.]+)g/);
  return m ? parseFloat(m[1]) : 0;
}

export function dragRange(d: DragRange): string {
  if (d[0] === d[1]) return `${d[1].toFixed(1)} kg`;
  return `${d[0].toFixed(1)}–${d[1].toFixed(1)} kg`;
}

// ---------------- Quadrant plot support ----------------

export type AxisKey = "price" | "wMin" | "wMax" | "dragMax" | "scMax" | "bearings";

export interface AxisConfig {
  label: string;
  get: (p: BaitcastPoint) => number;
  log: boolean;
  fmt: (v: number) => string;
  low: string;
  high: string;
}

export interface BaitcastPoint {
  brand: string;
  brandName: string;
  color: string;
  name: string;
  tier: string;
  adv: string;
  weak: string;
  app: string;
  sizes: string[];
  priceTxt: string;
  wTxt: string;
  bTxt: string;
  dg: DragRange;
  br: string | null;
  fr: string | null;
  dragMax: number;
  price: number;
  wMin: number;
  wMax: number;
  bearings: number;
  scMax: number;
}

// Distinct, accessible dot colors for the quadrant plot (6 brands, chosen to
// stay legible against white and clearly separable from one another):
// shimano — blue, the site accent and consistent with the spinning/overhead/
// electric guides' Shimano pick; daiwa — green, ditto; abugarcia — rust,
// ditto; okuma — mid-teal-blue, reused from the overhead guide's Okuma pick,
// kept clearly apart from Shimano's blue; quantum — violet; pflueger — warm
// tan/gold, reused from the overhead guide's Accurate pick since both read
// as a muted brass tone that doesn't clash with the rest of the palette.
export const BRAND_COLORS: Record<string, string> = {
  shimano: "#0077C0",
  daiwa: "#408A71",
  abugarcia: "#C1633C",
  okuma: "#1F9AAE",
  quantum: "#8B5FBF",
  pflueger: "#B8935A",
};

export const CLASS_NAMES: string[] = ["", "BFS / micro", "Compact", "Standard", "Medium-heavy", "Heavy", "Extra heavy"];

function clampClass(v: number): number {
  return Math.min(6, Math.max(1, Math.round(v)));
}

function parseNums(str: string): number[] {
  return (str.match(/[\d.]+/g) || []).map(Number).filter((n) => !isNaN(n));
}

function priceMid(p: string): number {
  const n = parseNums(p.replace(/,/g, ""));
  return n.length ? (Math.min(...n) + Math.max(...n)) / 2 : 0;
}

function weightRange(w: string): { min: number; max: number } {
  const n = (w.match(/([\d.]+)\s*g/g) || []).map((s) => parseFloat(s));
  return n.length ? { min: Math.min(...n), max: Math.max(...n) } : { min: 0, max: 0 };
}

function bearingCount(b: string): number {
  const n = (b.match(/(\d+)\s*\+/g) || []).map((s) => parseInt(s));
  return n.length ? Math.max(...n) : 0;
}

export const POINTS: BaitcastPoint[] = (() => {
  const pts: BaitcastPoint[] = [];
  BRANDS.forEach((b) => {
    b.lineup.forEach((i) => {
      const wr = weightRange(i.w);
      pts.push({
        brand: b.id,
        brandName: b.name,
        color: BRAND_COLORS[b.id],
        name: i.s,
        tier: i.t,
        adv: i.a,
        weak: i.k,
        app: i.ap,
        sizes: i.sz,
        priceTxt: i.p,
        wTxt: i.w,
        bTxt: i.b,
        dg: i.dg,
        br: i.br,
        fr: i.fr,
        dragMax: i.dg[1],
        price: priceMid(i.p),
        wMin: wr.min,
        wMax: wr.max,
        bearings: bearingCount(i.b),
        scMax: i.sc[1],
      });
    });
  });
  return pts;
})();

export const AXES: Record<AxisKey, AxisConfig> = {
  price: { label: "Price (USD, midpoint)", get: (p) => p.price, log: true, fmt: (v) => "$" + Math.round(v), low: "Budget", high: "Premium" },
  wMin: { label: "Weight – lightest size (g)", get: (p) => p.wMin, log: false, fmt: (v) => Math.round(v) + "g", low: "Featherweight", high: "Heavy" },
  wMax: { label: "Weight – heaviest size (g)", get: (p) => p.wMax, log: true, fmt: (v) => Math.round(v) + "g", low: "Compact range", high: "Big-fish range" },
  dragMax: { label: "Max drag (kg, largest size)", get: (p) => p.dragMax, log: false, fmt: (v) => v.toFixed(1) + " kg", low: "Light drag", high: "Heavy drag" },
  scMax: { label: "Size class (largest in series)", get: (p) => p.scMax, log: false, fmt: (v) => CLASS_NAMES[clampClass(v)], low: "BFS / micro class", high: "Extra heavy class" },
  bearings: { label: "Bearing count (BB)", get: (p) => p.bearings, log: false, fmt: (v) => Math.round(v) + " BB", low: "Simple", high: "Refined" },
};

export const DRAG_AXES: Set<AxisKey> = new Set(["dragMax"]);

export const QUAD_LABELS: Record<string, [string, string, string, string]> = {
  "price|wMin": ["Budget brutes", "Premium heavyweights", "Value featherweights", "Premium featherweights"],
  "price|dragMax": ["Cheap muscle", "Expensive muscle", "Light-duty budget", "Paying for refinement"],
  "price|scMax": ["Budget big-game", "Premium big-game", "Cheap finesse", "Premium finesse"],
  "price|bearings": ["Overbuilt for the money", "Flagship refinement", "Bare-bones budget", "Priced on toughness"],
  "wMin|dragMax": ["Punching above its weight", "Built to winch", "Pure finesse builds", "Heavy but soft-drag"],
  "scMax|dragMax": ["Small class, strong drag", "Big class, strong drag", "Small class, light-duty", "Big class, modest drag"],
};

export function median(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
