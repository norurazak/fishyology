// Data for the Spinning Reel Master Guide (/resources/spinning-reel-guide)
// Ported from a standalone HTML draft into typed, reusable data + helpers.

export interface DragInfo {
  min: number | null;
  max: number | null;
  note: string;
  src: string;
}

export interface ReelSeries {
  s: string; // series name
  t: string; // tier label
  sz: string[]; // available sizes
  w: string; // weight range text
  b: string; // bearing count text
  a: string; // advantage
  k: string; // weakness
  ap: string; // best applications
  p: string; // price text
  d: DragInfo | null;
}

export interface PhilosophyItem {
  t: string;
  d: string;
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
  lineup: ReelSeries[];
  capacity: CapacityRow[];
  maintenance: MaintenanceItem[];
  checklist: ChecklistItem[];
  env: string;
  jdm: string;
}

export const BRANDS: Brand[] = [
  {
    id: "shimano",
    name: "Shimano",
    code: "SHI",
    tagline:
      "Three design philosophies – CoreSolid for torque, MagnumLite (MGL) for low-inertia finesse, and dedicated Heavy SW for pelagics.",
    philosophy: [
      { t: "CoreSolid", d: "Continuous, smooth, powerful cranking with slightly heavier rotors that hold momentum. Stella, Twin Power, Stradic." },
      { t: "MagnumLite (MGL)", d: "Low-inertia, lightweight, rapid start/stop retrieval – excellent for twitching and finesse. Vanquish, Vanford, Miravel." },
      { t: "Heavy Saltwater (SW)", d: "Oversized, heavily sealed reels built for extreme drag pressure and marine pelagics." },
    ],
    lineup: [
      { s: "Stella SW", t: "Heavy SW Flagship", sz: ["4000", "5000", "6000", "8000", "10000", "14000", "18000", "20000", "30000"], w: "355g – 975g", b: "13+1 / 14+1", a: "Absolute max drag, extreme heat dissipation (Heatsink Drag), top-tier X-Shield waterproofing.", k: "Very heavy and extremely expensive.", ap: "Giant Trevally (GT), Tuna, offshore popping, and heavy big-game jigging.", p: "$1000 – $1400+", d: { min: 11, max: 28, note: "Cross Carbon & Heatsink (large). 4000XG 11kg · 18000HG+ 28kg", src: "fish.shimano.com" } },
      { s: "Stella", t: "CoreSolid Flagship", sz: ["1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "165g – 260g", b: "12+1", a: "Pinnacle of Shimano tech; InfinityLoop oscillation, InfinityXross, unmatched smoothness.", k: "Highest price point for freshwater/inshore; slightly heavier than MGL.", ap: "Ultimate all-rounder for perfect line lay and highly technical lure presentations.", p: "$750 – $850", d: { min: 3, max: 11, note: "Rigid Support & Cross Carbon. 1000 3kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Vanquish", t: "MGL Flagship", sz: ["1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "140g – 220g", b: "11+1", a: "Lightest reel in the lineup; zero start-up inertia; ultra-sensitive magnesium/CI4+ frame.", k: "Frame yields slightly less rigid cranking torque under immense pressure than Stella.", ap: "Fast-paced finesse fishing, rapid twitching, and high-sensitivity lure work.", p: "$600 – $650", d: { min: 3, max: 11, note: "Felt (small) & Cross Carbon. 1000 3kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Exsence", t: "JDM Seabass Flagship", sz: ["C3000M", "3000MHG", "4000MXG", "C5000XG"], w: "180g – 220g", b: "11+1", a: "Stealth matte black finish, Rapid Fire Drag, extreme IPX8 saltwater sealing, magnesium body.", k: "Highly specialized; limited size range tailored to medium-heavy setups.", ap: "Wading estuaries for Sea Bass/Siakap; throwing medium hardbodies.", p: "$500 – $550", d: { min: 9, max: 11, note: "Rigid Support & Cross Carbon. 3000M 9kg · C5000XG 11kg", src: "fish.shimano.com" } },
      { s: "Twin Power SW", t: "Heavy SW", sz: ["4000", "5000", "6000", "8000", "10000", "14000"], w: "350g – 660g", b: "10+1", a: "Borrows heavy-duty tech from Stella SW at half the price; immense winching power.", k: "Slightly less refined sealing and drag heat management than Stella SW.", ap: "Offshore game, heavy shore jigging, and targeting large pelagics.", p: "$500 – $650", d: { min: 11, max: 25, note: "Cross Carbon / Heatsink. 4000XG 11kg · 14000XG 25kg", src: "fish.shimano.com" } },
      { s: "Twin Power / TP XD", t: "CoreSolid High-End", sz: ["1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "175g – 260g", b: "9+1 / 10+1", a: "Metal rotor and HAGANE body for unparalleled durability and winching rigidity.", k: "Heavier overall weight compared to resin or carbon-bodied counterparts.", ap: "Hauling hard-hitting predators like Toman out of snag-heavy timber.", p: "$450 – $550", d: { min: 3, max: 11, note: "Felt (small) & Cross Carbon. 1000 3kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Sustain", t: "MGL Mid/High", sz: ["2500", "C3000", "4000", "C5000"], w: "210g – 285g", b: "8+1", a: "MGL Rotor combined with an aluminum HAGANE body; balances lightness with metal rigidity.", k: "Sits in an awkward middle ground between the lighter Vanford and tougher Twin Power.", ap: "Versatile mid-weight game fishing across freshwater lakes and marine estuaries.", p: "$300 – $320", d: { min: 9, max: 11, note: "Cross Carbon. 2500 9kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Saragosa SW", t: "Mid SW", sz: ["5000", "6000", "8000", "10000", "14000", "18000", "20000", "25000"], w: "430g – 975g", b: "5+1 / 6+1", a: "IPX8 body waterproofing, highly durable HAGANE body. The charter boat standard.", k: "Strictly a heavy-duty winching tool; high start-up inertia.", ap: "Surf casting, heavy bait fishing, and tough marine environments.", p: "$270 – $320", d: { min: 10, max: 20, note: "Cross Carbon. 5000 10kg · 20000+ 20kg", src: "fish.shimano.com" } },
      { s: "JDM XR Series", t: "MGL Specialists (JDM)", sz: ["Complex C2000F4/2500F6", "Sephia C3000S/SDH", "Soare 500/C2000SS", "Cardiff 1000S/C2000S"], w: "135g – 185g", b: "9+1", a: "CI4+ frames with highly specialized drags (High Response, Rigid Support, Area Drag).", k: "CI4+ carbon flexes slightly more than aluminum under heavy loads.", ap: "Technique-specific tuning (Trout, Squid, Bass, Ajing).", p: "$270 – $280", d: { min: 3, max: 9, note: "High Response/Area Drag (Felt). Soare 500 3kg · Sephia 9kg", src: "fish.shimano.com" } },
      { s: "Stradic SW", t: "Mid SW", sz: ["4000", "5000", "6000", "8000", "10000"], w: "300g – 660g", b: "6+1", a: "InfinityDrive for lighter winding under heavy loads; X-Protect sealing.", k: "Stops at size 10000; heavier rotor than Twin Power SW.", ap: "Light to medium offshore jigging, heavy surf casting, budget pelagic setups.", p: "$250 – $280", d: { min: 11, max: 15, note: "Cross Carbon. 4000 11kg · 10000 15kg", src: "fish.shimano.com" } },
      { s: "Vanford", t: "MGL High-End", sz: ["500", "1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "140g – 220g", b: "7+1", a: "Ultra-lightweight full CI4+ body; phenomenal rapid start/stop rotor response.", k: "CI4+ body can flex slightly when hauling heavy fish away from structure.", ap: "Active, sustainable lure fishing for reactive species (Sebarau) requiring precise control.", p: "$230 – $280", d: { min: 2.5, max: 11, note: "Felt (small) & Cross Carbon. 500 2.5kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Stradic", t: "CoreSolid Mid-Range", sz: ["1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "185g – 290g", b: "6+1", a: "InfinityXross gears and Duracross drag. The undisputed price-to-performance workhorse.", k: "Lacks the ultra-refined lightness and high bearing count of premium tiers.", ap: "Ideal for daily, aggressive lure fishing in rugged rainforest reservoirs.", p: "$220 – $240", d: { min: 3, max: 11, note: "Duracross Matrix. 1000 3kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Spheros SW", t: "Budget SW", sz: ["3000", "4000", "5000", "6000", "8000", "10000", "14000", "20000"], w: "255g – 845g", b: "4+1", a: "True SW sealing and cold-forged gears at a beginner price point.", k: "Low bearing count; heavy handle, basic drag system.", ap: "Budget offshore fishing, heavy surf, and general saltwater bait rigs.", p: "$140 – $200", d: { min: 9, max: 18, note: "Cross Carbon. 3000 9kg · 20000 18kg", src: "fish.shimano.com" } },
      { s: "Ultegra", t: "CoreSolid Mid-Entry", sz: ["1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "180g – 285g", b: "5+1", a: "MicroModule II, X-Ship, and SilentDrive for faultless smoothness.", k: "CI4+ composite body rather than metal; heavier than Miravel.", ap: "Smooth, affordable all-purpose reel for general freshwater and light inshore.", p: "$150 – $170", d: { min: 3, max: 11, note: "Felt / Carbon. 1000 3kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "JDM BB Series", t: "Budget Specialists (JDM)", sz: ["Exsence C3000M–4000MXG", "Sephia 2500S–C3000SDH", "Soare 500–C2000SS"], w: "165g – 285g", b: "5+1", a: "Brings specialist features (shallow spools, EVA knobs, Rapid Fire Drag) to budget frames.", k: "Based on heavier Ultegra/Nasci platforms, negating the ultra-light finesse feel.", ap: "Entry-level specialist anglers wanting technique-specific spools without the XR price.", p: "$120 – $160", d: { min: 3, max: 11, note: "Felt / Rapid Fire. Soare 500 3kg · Exsence 4000 11kg", src: "fish.shimano.com" } },
      { s: "Miravel", t: "MGL Budget", sz: ["1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "175g – 270g", b: "5+1", a: "CI4+ body and MGL rotor on a budget; includes HAGANE Gear.", k: "Lacks MicroModule gearing; less “buttery” feel under load compared to Stradic.", ap: "Excellent budget-friendly option for light-tackle ecotourism setups.", p: "$130 – $140", d: { min: 3, max: 11, note: "Felt. 1000 3kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Nasci", t: "Top Entry-Level", sz: ["500", "1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "170g – 305g", b: "5+1", a: "CoreProtect water resistance, screw-in handle, SilentDrive. Best budget durability.", k: "Noticeably heavy internal components compared to mid-tier.", ap: "Reliable saltwater/freshwater backup rig or guest setups on guided trips.", p: "$100 – $110", d: { min: 2.5, max: 11, note: "Felt. 500 2.5kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Sahara", t: "Mid Entry-Level", sz: ["500", "1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "170g – 305g", b: "4+1", a: "Adds SilentDrive over the Sedona for a quieter crank. Screw-in handle.", k: "No internal weather sealing (CoreProtect).", ap: "General freshwater lure casting where extreme rain or saltwater is avoided.", p: "$80 – $90", d: { min: 2.5, max: 11, note: "Felt. 500 2.5kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "Sedona", t: "Base Level", sz: ["500", "1000", "C2000", "2500", "C3000", "4000", "C5000"], w: "170g – 310g", b: "3+1", a: "Dependable HAGANE cold-forged gear at a rock-bottom price.", k: "Basic drag washers; lowest bearing count; pin-through handle (less rigid).", ap: "Beginners, youth setups, or ultra-budget bait fishing.", p: "$70", d: { min: 2.5, max: 11, note: "Felt. 500 2.5kg · C5000 11kg", src: "fish.shimano.com" } },
      { s: "FX / IX", t: "Budget / Beginner", sz: ["1000", "2000", "2500", "3000", "4000"], w: "205g – 320g", b: "2+1 / 1+0", a: "Extremely cheap. IX features a Quick Fire II trigger for one-handed casting.", k: "Very heavy; unrefined gears; very low drag pressure ratings.", ap: "Casual weekend bait fishing and absolute beginners.", p: "$20 – $40", d: { min: 2, max: 8.5, note: "Basic Felt. 1000 2kg · 4000 8.5kg", src: "fish.shimano.com" } },
    ],
    capacity: [
      { sz: "500 (Std)", br: "PE 0.6-150m, PE 0.8-100m", mf: "2lb-115m, 3lb-100m", st: "Ultralight setups for tiny mountain creeks or Soare Ajing setups." },
      { sz: "1000 (Std)", br: "PE 0.8-240m, PE 1.0-190m", mf: "4lb-100m, 6lb-65m", st: "Standard ultralight setups." },
      { sz: "1000S (Shallow)", br: "PE 0.6-140m, PE 0.8-100m", mf: "2.5lb-100m, 3lb-80m", st: "Micro-finesse; popular in Cardiff Area Trout setups." },
      { sz: "C2000SS (Super Shallow)", br: "PE 0.3-140m, PE 0.4-100m", mf: "2.5lb-140m, 3lb-100m", st: "Extreme micro-finesse (Ajing/Trout); limits backing weight." },
      { sz: "C2000S / 2000S (Shallow)", br: "PE 0.6-150m, PE 0.8-110m", mf: "3lb-125m, 4lb-100m", st: "Precision finesse casting; skipping soft plastics." },
      { sz: "C2000F4 / 2500F6 (Fluoro)", br: "PE 0.6-150m (F4) / PE 0.8-150m (F6)", mf: "4lb-100m (F4) / 6lb-100m (F6)", st: "Designed specifically for JDM Complex Bass setups using straight fluorocarbon." },
      { sz: "2500S (Shallow)", br: "PE 0.6-200m, PE 0.8-150m", mf: "5lb-110m, 6lb-95m", st: "Distance casting with light lures (Squid/Bass); saves backing." },
      { sz: "2500 / C3000 (Standard)", br: "PE 1.2-270m, PE 1.5-270m", mf: "8lb-130m, 10lb-110m", st: "Universal standard. Ideal balance for aggressive rainforest lure fishing (Sebarau)." },
      { sz: "C3000S / C3000SDH (Shallow)", br: "PE 0.6-200m, PE 0.8-150m", mf: "5lb-110m, 6lb-95m", st: "Standard Eging (Squid) setup found on Sephia ranges; excellent for light braided lines." },
      { sz: "C3000M / 3000M (Medium)", br: "PE 1.0-220m, PE 1.2-150m", mf: "8lb-130m, 10lb-110m", st: "Perfect for modern, ultra-thin 8-strand braids without mono backing (Exsence)." },
      { sz: "4000 / C5000 (Standard)", br: "PE 1.5-320m, PE 2.0-240m", mf: "10lb-160m, 12lb-120m", st: "Brute-force extractions. High torque for dragging large Snakehead from timber." },
      { sz: "SW 3000 / 4000", br: "PE 1.5-320m, PE 2.0-240m", mf: "10lb-160m, 12lb-120m", st: "Light offshore spinning, heavy estuary plug casting." },
      { sz: "SW 5000 / 6000", br: "PE 2.0-440m, PE 3.0-300m", mf: "16lb-210m, 20lb-150m", st: "Medium offshore casting, light shore jigging." },
      { sz: "SW 8000 / 10000", br: "PE 3.0-410m, PE 4.0-300m", mf: "20lb-280m, 25lb-230m", st: "Deepwater jigging, medium poppers, heavy bottom rigs." },
      { sz: "SW 14000 / 18000", br: "PE 6.0-300m, PE 8.0-200m", mf: "30lb-250m, 40lb-190m", st: "Dedicated GT popping and offshore Tuna casting setups." },
      { sz: "SW 20000 / 30000", br: "PE 8.0-400m (20K) / PE 10.0-475m (30K)", mf: "40lb-300m, 50lb-250m", st: "The largest class available. Reserved for 100lb+ setups targeting monster pelagics." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 30 – 50", n: "Complete strip-down, ultrasonic clean, and re-greasing. Excludes parts." },
      { sv: "Single Bearing (Budget)", c: "RM 15 – 25", n: "Standard stainless steel bearing replacement (line roller or handle knob)." },
      { sv: "Single Bearing (Premium)", c: "RM 35 – 60+", n: "Premium S A-RB (Anti-Rust) or high-end ceramic bearing replacement." },
      { sv: "Full Bearing Upgrade (Entry/Mid)", c: "RM 80 – 130", n: "Upgrading a Nasci or Stradic with aftermarket bearings to mimic higher-end smoothness." },
      { sv: "Full Bearing Overhaul (Flagship/SW)", c: "RM 150 – 300+", n: "Complete replacement of 10+ bearings after heavy saltwater submersion." },
      { sv: "Gear Set Replacement", c: "RM 100 – 250+", n: "Cheaper for Stradic; expensive and hard to source for JDM (Exsence, Vanquish)." },
    ],
    checklist: [
      { h: "Rotor Type – MGL vs. CoreSolid", pts: ["Buy MGL (Vanford/Vanquish) if constantly casting and twitching lures all day for Haruan/Sebarau – the light rotor saves wrist fatigue.", "Buy CoreSolid (Stradic/Twin Power) if cranking deep-diving lures or needing sheer torque to stop a Toman diving into timber."] },
      { h: "Environment – Sealing", pts: ["Brackish estuaries (Jugra) or offshore demand CoreProtect or X-Protect (Nasci and above).", "Avoid the Sahara and Sedona in these environments – no internal weather sealing."] },
      { h: "Gear Ratio", pts: ["HG / XG (High/Extra High): best for picking up slack line quickly on topwater or fast-flowing rivers.", "PG / Normal: best for slow-rolling crankbaits, deep jigging, or maximum winching torque."] },
      { h: "Parts Availability", pts: ["If this is your only reel, buy a globally supported model (Stradic, Twin Power).", "If you have backups and want technique-specific perfection, explore the JDM XR and BB lines."] },
    ],
    env: "Tropical heat (30°C+), high humidity, monsoon downpours, and transitions between freshwater dams (Royal Belum) and brackish estuaries (Port Klang) all demand specific maintenance protocols. Heat thins low-viscosity grease – many anglers upgrade to tropical-rated aftermarket grease (Shimano DG06/DG13, IOS Factory/Bored). Brackish water for Mangrove Jack will seize even premium S A-RB bearings if salt crystals form. Unsealed reels (Sahara, Sedona, Miravel) need faster servicing if soaked in a downpour.",
    jdm: "Parts for Global Models (Stradic, Twin Power, Stella) are widely supported by authorised distributors like TCE Tackles. Specialised JDM parts (Complex, Sephia, Soare) usually require ordering directly from Japan via Plat or Digitaka – a blown gear or seized bearing on an Exsence can mean 2–4 weeks of downtime.",
  },
  {
    id: "daiwa",
    name: "Daiwa",
    code: "DAI",
    tagline: "LT sizing, MQ monocoque bodies, Airdrive low-inertia fronts, and MagSealed ferrofluid waterproofing.",
    philosophy: [
      { t: "LT Concept (Light & Tough)", d: "Introduced 2018 – unified sizing made reels smaller and lighter while keeping gear strength. An LT3000 ≈ a Shimano C3000." },
      { t: "MQ (Monocoque) Body", d: "Single-piece body eliminating the side plate, allowing a drive gear up to 20% larger for more torque, winching power and water resistance." },
      { t: "Airdrive Design", d: "Reduces weight in the front unit (rotor, bail, spool, shaft) for very low start-up inertia and balance – Daiwa's answer to MGL." },
      { t: "MagSealed", d: "Proprietary magnetic oil (ferrofluid) held by a magnetic field to create a frictionless, waterproof seal around the main shaft and line roller." },
    ],
    lineup: [
      { s: "Saltiga", t: "Heavy SW Flagship", sz: ["8000", "10000", "14000", "18000", "20000"], w: "655g – 890g", b: "12+1", a: "The absolute pinnacle of heavy offshore winching. MQ aluminum body, G1 Duralumin gear, advanced MagSealed.", k: "Extremely heavy and the most expensive reel in Daiwa's lineup.", ap: "Giant Trevally (GT), monster Tuna, offshore popping, and heavy big-game jigging.", p: "$1000 – $1300+", d: { min: 15, max: 30, note: "ATD Carbon. 8000 15kg · 20000 30kg", src: "daiwafishing.com.au" } },
      { s: "Exist", t: "LT Flagship", sz: ["2000", "2500", "3000", "4000", "5000"], w: "155g – 220g", b: "12+1", a: "Total integration of Airdrive and Magnesium MQ body. Unmatched lightness, rigidity, and silence.", k: "Magnesium body requires extreme care if scratched in saltwater.", ap: "The ultimate all-rounder for finesse, precision lure control, and tournament fishing.", p: "$850 – $950", d: { min: 5, max: 10, note: "ATD Type-L. 2000 5kg · 5000 10kg", src: "daiwafishing.com.au" } },
      { s: "Certate SW", t: "Heavy SW", sz: ["5000", "6000", "8000", "10000", "14000", "18000"], w: "625g – 850g", b: "10+1", a: "Cast aluminum MQ body with massive G1 Duralumin gear. Near-Saltiga power at a lower price.", k: "Slightly heavier rotor and less refined drag heat management than the Saltiga.", ap: "Offshore pelagics, heavy shore jigging, Sailfish, and Amberjack.", p: "$600 – $750", d: { min: 15, max: 30, note: "ATD Carbon. 5000 15kg · 18000 30kg", src: "daiwafishing.com.au" } },
      { s: "Airity", t: "LT Ultra-Light", sz: ["2000", "2500", "3000", "4000", "5000"], w: "130g – 205g", b: "11+1", a: "Daiwa's lightest reel ever. Magnesium MQ body. Directly competes with Shimano Vanquish.", k: "Extremely lightweight frame sacrifices a tiny amount of brute winching rigidity.", ap: "Micro-finesse, rapid twitching, and high-sensitivity lure work where weight is critical.", p: "$600 – $650", d: { min: 5, max: 10, note: "ATD Type-L. 2000 5kg · 5000 10kg", src: "daiwafishing.com.au" } },
      { s: "Certate", t: "LT Core High-End", sz: ["2000", "2500", "3000", "4000", "5000"], w: "200g – 295g", b: "10+1", a: "Aluminum MQ body. The undisputed king of durability. Direct competitor to Twin Power.", k: "Heavier than Airity/Luvias due to the full metal body construction.", ap: "Brute force lure fishing, dragging Toman from timber, and heavy estuary usage.", p: "$500 – $550", d: { min: 5, max: 12, note: "ATD Type-L. 2000 5kg · 5000 12kg", src: "daiwafishing.com.au" } },
      { s: "JDM EX Series", t: "Flagship Specialists (JDM)", sz: ["Gekkabijin EX 1000/2000", "Emeraldas Stoist/EX 2500/3000", "Presso LTD 1000/2000"], w: "145g – 175g", b: "11+1 / 12+1", a: "Tuned strictly for niche JDM styles (Squid, Ajing, Trout) using Exist/Airity level magnesium frames.", k: "Niche applications mean capacities and drag max are heavily restricted by design.", ap: "Highly technical, single-purpose setups (extreme ultralight or Eging).", p: "$450 – $550", d: { min: 2, max: 5, note: "ATD Type-L / Finesse. Presso 1000 2kg · Emeraldas 3000 5kg", src: "daiwafishing.com.au" } },
      { s: "Luvias", t: "LT Mid/High", sz: ["2000", "2500", "3000", "4000"], w: "150g – 215g", b: "9+1", a: "ZAION (carbon) MQ body. Offers near-flagship lightness at a mid-tier price.", k: "ZAION composite will flex slightly more than aluminum (Certate) under extreme drag.", ap: "Versatile mid-weight game fishing across freshwater lakes and marine estuaries.", p: "$350 – $400", d: { min: 5, max: 10, note: "ATD. 2000 5kg · 4000 10kg", src: "daiwafishing.com.au" } },
      { s: "Saltist MQ", t: "Mid SW", sz: ["2500", "3000", "4000", "5000", "6000", "8000", "10000", "14000", "20000"], w: "230g – 850g", b: "6+1", a: "Brings the aluminum MQ body to the mid-tier SW market. Excellent waterproofing.", k: "Heavier than LT series reels; rotor inertia is higher.", ap: "Light to heavy offshore jigging, surf casting, budget pelagic setups.", p: "$280 – $320", d: { min: 10, max: 20, note: "ATD Carbon. 2500 10kg · 20000 20kg", src: "daiwafishing.com.au" } },
      { s: "Caldia / Caldia SW", t: "LT Mid", sz: ["1000", "2000", "2500", "3000", "4000", "5000", "6000", "SW to 18000"], w: "170g – 315g (SW to 850g)", b: "6+1", a: "ZAION V MQ body. The primary workhorse balancing weight, price, and MQ tech.", k: "ZAION V is a slightly heavier/less rigid grade of carbon than standard ZAION.", ap: "Ideal for daily, aggressive lure fishing and general purpose applications.", p: "$200 – $250", d: { min: 5, max: 20, note: "ATD. LT1000 5kg · SW 18000 20kg", src: "daiwafishing.com.au" } },
      { s: "BG MQ", t: "Heavy SW Workhorse", sz: ["2500", "3000", "4000", "5000", "6000", "8000", "10000", "14000", "20000"], w: "265g – 850g", b: "6+1", a: "Aluminum MQ body at a stunning price point. Massive gear, incredibly durable.", k: "NOT MagSealed – uses rubber gaskets instead. Heavier overall.", ap: "Heavy bait fishing, boat charters, offshore bottom fishing, and heavy surf.", p: "$200 – $230", d: { min: 10, max: 20, note: "ATD Carbon. 2500 10kg · 20000 20kg", src: "daiwafishing.com.au" } },
      { s: "Lexa", t: "LT Mid-Metal", sz: ["2500", "3000", "4000", "5000", "6000"], w: "240g – 380g", b: "5+1", a: "Traditional split-body design but made of solid aluminum. Built for absolute abuse.", k: "Uses traditional sideplate instead of MQ body; noticeably heavier.", ap: "A budget alternative to the Certate for heavy snakehead/estuary fishing.", p: "$180 – $200", d: { min: 10, max: 12, note: "ATD. 2500 10kg · 6000 12kg", src: "daiwafishing.com.au" } },
      { s: "JDM MX Series", t: "Mid Specialists (JDM)", sz: ["Gekkabijin MX 1000/2000", "Emeraldas MX 2500/3000"], w: "175g – 210g", b: "7+1", a: "Brings specialist features (shallow spools, custom knobs, specialized drags) to ZAION V frames.", k: "Based on mid-tier platforms, missing the absolute refinement of the EX lines.", ap: "Entry-level specialist anglers wanting technique-specific spools without the premium price.", p: "$160 – $200", d: { min: 5, max: 10, note: "ATD. Gekkabijin 5kg · Emeraldas 3000 10kg", src: "daiwafishing.com.au" } },
      { s: "Fuego LT", t: "Mid Entry-Level", sz: ["1000", "2000", "2500", "3000", "4000", "5000", "6000"], w: "180g – 335g", b: "6+1", a: "The cheapest reel in Daiwa's lineup to feature MagSealed. ZAION V body.", k: "Traditional body (not MQ). The MagSealed oil requires professional servicing.", ap: "Smooth, affordable, weather-resistant reel for general freshwater and light inshore.", p: "$110 – $130", d: { min: 5, max: 12, note: "ATD. 1000 5kg · 6000 12kg", src: "daiwafishing.com.au" } },
      { s: "BG (Standard)", t: "Budget SW", sz: ["1500", "2000", "2500", "3000", "4000", "4500", "5000", "6500", "8000"], w: "240g – 850g", b: "6+1", a: "The ultimate budget brute. All-metal HardBodyz. Legendary reliability.", k: "Uses older, massive sizing (a BG 4000 is huge). Heavy, no MagSealed.", ap: "Budget offshore fishing, heavy surf, and guest bait-rigs on boats.", p: "$110 – $130", d: { min: 2, max: 15, note: "ATD / Basic Carbon. 1500 2kg · 8000 15kg", src: "daiwafishing.com.au" } },
      { s: "Exceler LT", t: "Top Entry-Level", sz: ["1000", "2000", "2500", "3000", "4000", "5000", "6000"], w: "180g – 320g", b: "5+1", a: "Features a ZAION V body and a direct screw-in handle (minimizes play).", k: "No MagSealed waterproofing; traditional split body design.", ap: "Reliable freshwater backup rig or budget lure casting setup.", p: "$90 – $100", d: { min: 5, max: 12, note: "ATD. 1000 5kg · 6000 12kg", src: "daiwafishing.com.au" } },
      { s: "Legalis LT", t: "Base Level", sz: ["1000", "2000", "2500", "3000", "4000", "5000", "6000"], w: "180g – 320g", b: "5+1", a: "ZAION V body material. Very lightweight for its extreme budget price point.", k: "Most generations use a pin-through handle instead of a screw-in handle (wobble).", ap: "Beginners, youth setups, or budget freshwater bait fishing.", p: "$70 – $80", d: { min: 5, max: 12, note: "ATD. 1000 5kg · 6000 12kg", src: "daiwafishing.com.au" } },
      { s: "Revros / Ninja", t: "Budget", sz: ["1000", "2000", "2500", "3000", "4000", "5000", "6000"], w: "210g – 370g", b: "4+1", a: "Extremely cheap.", k: "Heavy; unrefined gears; pin-through handles; basic drag systems.", ap: "Casual weekend bait fishing and absolute beginners.", p: "$40 – $60", d: { min: 5, max: 12, note: "ATD. 1000 5kg · 6000 12kg", src: "daiwafishing.com.au" } },
      { s: "Crossfire / Sweepfire", t: "Ultra-Budget", sz: ["1000", "2000", "2500", "3000", "4000", "5000"], w: "225g – 380g", b: "1+1 / 3+1", a: "Absolute lowest entry point.", k: "Extremely heavy; very low bearing count; rough reeling under pressure.", ap: "Kids' first rod or backup bait setups.", p: "$20 – $30", d: { min: 5, max: 12, note: "Basic Felt. 1000 5kg · 5000 12kg", src: "daiwafishing.com.au" } },
    ],
    capacity: [
      { sz: "LT 1000S / 2000S (Shallow)", br: "PE 0.4-200m, PE 0.6-150m", mf: "2.5lb-200m, 3lb-150m", st: "Micro-finesse, Ajing (Gekkabijin), and Area Trout (Presso)." },
      { sz: "LT 2000 (Standard)", br: "PE 0.6-200m, PE 0.8-190m", mf: "4lb-150m, 5lb-120m", st: "Standard ultralight stream fishing and light finesse setups." },
      { sz: "LT 2500S (Shallow)", br: "PE 0.6-290m, PE 0.8-200m", mf: "4lb-150m, 5lb-120m", st: "Distance casting with light lures (Eging via Emeraldas); eliminates need for heavy backing." },
      { sz: "LT 2500 / 3000-C (Standard)", br: "PE 1.0-200m, PE 1.2-190m", mf: "6lb-150m, 8lb-100m", st: "Universal standard. Ideal balance for aggressive rainforest lure fishing (Sebarau)." },
      { sz: "LT 3000 / 4000-C (Standard)", br: "PE 1.2-430m, PE 1.5-300m", mf: "10lb-120m, 12lb-100m", st: "Excellent for medium-heavy snakehead fishing or light inshore work." },
      { sz: "LT 4000-C (Deep / D)", br: "PE 2.0-300m, PE 2.5-260m", mf: "14lb-130m, 16lb-100m", st: "Heavy estuary extraction; allows thicker mono or extra heavy braid capacity." },
      { sz: "LT 5000-C / 6000 (Standard)", br: "PE 2.5-300m, PE 3.0-210m", mf: "14lb-260m, 20lb-150m", st: "Brute-force extractions. High torque for dragging large Toman from timber." },
      { sz: "SW 8000 / 10000", br: "PE 3.0-400m, PE 4.0-300m", mf: "20lb-250m, 25lb-200m", st: "Deepwater jigging, medium poppers, heavy bottom rigs." },
      { sz: "SW 14000 / 18000", br: "PE 5.0-400m, PE 6.0-300m", mf: "30lb-250m, 40lb-190m", st: "Dedicated GT popping and offshore Tuna setups." },
      { sz: "SW 20000", br: "PE 8.0-400m, PE 10.0-300m", mf: "50lb-250m", st: "The largest class available. Reserved for 100lb+ setups targeting monster pelagics." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 30 – 50", n: "Strip-down, clean, and re-greasing of non-MagSealed reels (Legalis, Exceler, BG MQ)." },
      { sv: "MagSealed Servicing", c: "RM 60 – 100+", n: "Requires specialised labor and aftermarket ferrofluid re-application if not sent directly to Daiwa." },
      { sv: "Single Bearing (Standard)", c: "RM 15 – 25", n: "Standard stainless steel bearing replacement (handle knob or line roller)." },
      { sv: "Single Bearing (CRBB)", c: "RM 40 – 70+", n: "Corrosion Resistant Black Bearings – highly recommended for brackish water/estuaries." },
      { sv: "Full Bearing Upgrade", c: "RM 90 – 150", n: "Upgrading entry reels (Fuego) with aftermarket bearings to mimic Luvias smoothness." },
      { sv: "Gear Set Replacement", c: "RM 150 – 350+", n: "Massive MQ gears are expensive; subject to parts availability via Daiwa Malaysia or SLP Works (JDM)." },
    ],
    checklist: [
      { h: "MagSealed vs. Non-MagSealed", pts: ["Buy MagSealed (Fuego, Caldia, Luvias) if fishing brackish estuaries (Port Klang) or offshore often, and you're okay paying a professional to service it yearly.", "Avoid MagSealed (Exceler, Legalis, BG MQ) if you're a DIY angler who loves stripping and re-greasing at home."] },
      { h: "Body Material – ZAION vs. Aluminum", pts: ["Buy ZAION/Magnesium (Airity, Luvias, Caldia) for all-day casting of lures for Haruan or Sebarau – extreme lightness prevents wrist fatigue.", "Buy Aluminum (Certate, Lexa, BG MQ) if cranking deep-diving lures or need sheer torque to stop Toman diving into structure."] },
      { h: "Handle Design (Budget Tiers)", pts: ["If you hate handle wobble, avoid the Legalis/Revros.", "Spend the extra RM 50 for the Exceler LT – the cheapest Daiwa reel to reliably feature a rigid, direct screw-in handle."] },
      { h: "Gear Ratio", pts: ["H / XH: best for picking up slack line quickly on topwater frogs or fast-flowing jungle rivers.", "P / Normal: best for slow-rolling crankbaits, deep jigging, or maximising winching torque."] },
    ],
    env: "Intense tropical heat (30°C+), high humidity, and corrosive brackish water (like Mangrove Jack fishing in Jugra) make MagSealed and MQ Bodies highly beneficial for weather resistance – but notoriously harder to service at home. Official Daiwa Mag-Oil isn't sold over the counter; opening a MagSealed reel yourself permanently breaks the seal. MQ monocoque bodies also need a specialised Daiwa MQ wrench to open, further limiting DIY servicing.",
    jdm: "SLP Works is Daiwa's JDM customisation wing. If you blow a proprietary bearing or damage a specialised spool on a JDM Emeraldas or Gekkabijin, sourcing parts locally in Malaysia is very difficult – expect a 2–4 week wait ordering through Japanese sites like Plat or Digitaka.",
  },
  {
    id: "abugarcia",
    name: "Abu Garcia",
    code: "ABU",
    tagline: "Operates split Global (US, 2-digit sizing) and JDM (4-digit, shallow-spool) lineups under Pure Fishing, famous for extreme Rocket gear ratios.",
    philosophy: [
      { t: "Global vs. JDM Sizing", d: "Global (US) models use two-digit numbers (10–40) for North American bass/game fishing. JDM models use four-digit numbers (1000–2500) with specialised shallow (S/MS) spools for finesse braid." },
      { t: "A-SYM (Asymmetrical) Body", d: "Introduced on the Zenon and rolled out to the Revo series – eliminates unnecessary space on the non-handle side for an ultra-compact, lighter body." },
      { t: "Rocket Gear Ratio", d: "“Rocket” models push a blistering 7.6:1 ratio for line pickup speed rarely found elsewhere." },
      { t: "Salt Shield Bearings", d: "Water-repellent coating on bearing races (mainly JDM models) that drastically reduces salt crystal formation and grinding noise." },
    ],
    lineup: [
      { s: "Zenon", t: "Global/JDM Flagship", sz: ["1000S", "2000S", "2500MS", "3000MSH (JDM)", "20", "30 (US)"], w: "142g – 170g", b: "10+1 / 11+1", a: "Incredibly light; asymmetrical magnesium body; V-Rotor. Competes directly with Vanquish/Exist.", k: "Extreme skeletonized rotor prioritizes weight over brute-force winching.", ap: "The ultimate finesse reel for ultra-light casting, Ajing, and highly technical presentations.", p: "$500 – $550", d: { min: 3, max: 5.2, note: "Carbon Matrix. 1000S 3kg · 3000/Sz 30 5.2kg", src: "purefishing.jp" } },
      { s: "Zenon MG-X / Zenon X", t: "US High-End", sz: ["20", "30"], w: "155g – 195g", b: "10+1 / 9+1", a: "US market iterations of the Zenon. MG-X uses Magnesium; X uses aluminum/composite.", k: "Lacks the ultra-shallow JDM spools out of the box.", ap: "High-performance bass and walleye fishing; throwing jerkbaits and drop-shots.", p: "$350 – $450", d: { min: 5.2, max: 5.2, note: "Carbon Matrix. 5.2kg across line", src: "abugarcia.com" } },
      { s: "Revo MGX Theta", t: "JDM Finesse", sz: ["1000S", "2000S", "2000SH", "2500S", "2500MSH", "3000SH"], w: "163g – 185g", b: "10+1", a: "One-piece Feathermetal™ magnesium body. Exceptional lightness tuned for the Japanese market.", k: "Specialised for light lines; not designed for dragging against thick structure.", ap: "High-end finesse, Area Trout, light Eging (Squid), and technical Bass/Sebarau setups.", p: "$280 – $320", d: { min: 3, max: 5.2, note: "Carbon Matrix. 1000S 3kg · 3000SH 5.2kg", src: "purefishing.jp" } },
      { s: "Revo Rocket / SP Rocket", t: "Global/JDM Speed", sz: ["20", "30", "40 (US)", "2000S", "2500S", "3000S (JDM)"], w: "212g – 225g", b: "9+1", a: "Extreme 7.6:1 gear ratio; retrieves up to 43 inches of line per crank; asymmetrical body.", k: "Cranking torque is sacrificed for absolute speed; feels “heavier” under load.", ap: "Burning topwater lures, rapid slack-line pickup for Snakehead (Haruan) frogs.", p: "$190 – $210", d: { min: 5.2, max: 5.2, note: "Carbon Matrix. 5.2kg across line", src: "abugarcia.com" } },
      { s: "Revo STX", t: "Global Core Mid", sz: ["20", "30", "40"], w: "212g – 225g", b: "10+1", a: "Redesigned asymmetrical body, V-Rotor, and AMGearing. Incredible value-to-feature ratio.", k: "Standard global sizing lacks the super-shallow spool finesse options.", ap: "Universal lure fishing, from bass to aggressive rainforest predators.", p: "$190 – $200", d: { min: 5.2, max: 5.2, note: "Carbon Matrix. 5.2kg across line", src: "abugarcia.com" } },
      { s: "Revo ALX Theta", t: "JDM Core Mid", sz: ["1000S", "2000S", "2500S", "2500SH", "3000H", "4000H", "5000H"], w: "190g – 250g", b: "7+1", a: "Durametal (aluminum) one-piece body; Salt Shield bearings. Direct competitor to the Stradic.", k: "Slightly heavier than the MGX version due to the rigid metal construction.", ap: "The JDM workhorse for aggressive daily lure fishing in both fresh and brackish water.", p: "$170 – $190", d: { min: 3, max: 5.2, note: "Carbon Matrix. 1000S 3kg · 5000H 5.2kg", src: "purefishing.jp" } },
      { s: "Revo SX", t: "Global Core Mid", sz: ["20", "30", "40"], w: "212g – 230g", b: "8+1", a: "Nearly identical to the STX but with two fewer bearings. Rugged, dependable, asymmetrical design.", k: "Slightly less refined handle spin than the STX.", ap: "Excellent workhorse for medium/heavy game fishing.", p: "$160 – $170", d: { min: 5.2, max: 5.2, note: "Carbon Matrix. 5.2kg across line", src: "abugarcia.com" } },
      { s: "Revo Winch", t: "Global Cranking", sz: ["30"], w: "224g", b: "8+1", a: "Ultra-low 4.8:1 gear ratio specifically designed for high-torque cranking applications.", k: "Only available in a single size; extremely slow line pickup.", ap: "Deep-diving crankbaits and high-resistance spinnerbaits.", p: "$160 – $170", d: { min: 5.2, max: 5.2, note: "Carbon Matrix. 5.2kg", src: "abugarcia.com" } },
      { s: "Zata", t: "Global Mid", sz: ["20", "30", "40"], w: "225g – 250g", b: "10+1", a: "Aluminum frame with distinct olive drab styling; high bearing count for smoothness.", k: "Uses the older, symmetrical body design; noticeably heavier than the new Revo series.", ap: "Dependable all-around freshwater casting and medium bait fishing.", p: "$160 – $170", d: { min: 6.4, max: 6.4, note: "Carbon Matrix. 6.4kg (14lb) across line", src: "abugarcia.com" } },
      { s: "Salty Stage Concept-Free", t: "JDM Light SW", sz: ["3000", "4000", "5000"], w: "240g – 280g", b: "4+1", a: "Built specifically for saltwater resistance with Durametal bodies and shielded bearings.", k: "Lower bearing count; heavier rotor increases start-up inertia.", ap: "Light shore jigging, estuary lure casting, and coastal pelagics.", p: "$140 – $160", d: { min: 5, max: 5, note: "Carbon Matrix. 5kg across line", src: "purefishing.jp" } },
      { s: "Revo X", t: "Global Entry-Mid", sz: ["20", "30", "40"], w: "212g – 235g", b: "6+1", a: "Brings the Asymmetrical body design and V-Rotor to an aggressive price point.", k: "Uses composite materials (IM-C6) rather than full metal/magnesium.", ap: "The gateway into the modern Revo ecosystem for general lure casting.", p: "$120 – $140", d: { min: 5.2, max: 5.2, note: "Carbon Matrix. 5.2kg across line", src: "abugarcia.com" } },
      { s: "Roxani", t: "JDM Mid/Budget", sz: ["2000SH", "2500SH", "2500MSH", "3000SH", "4000SH"], w: "225g – 260g", b: "6+1", a: "Brings JDM styling, carbon handles, and shallow spools to a budget price.", k: "Composite body materials; lacks the metal rigidity of the ALX Theta.", ap: "Stylish entry point for technique-specific JDM styles (light Eging or Bass).", p: "$110 – $130", d: { min: 3, max: 5.2, note: "Carbon Matrix. 2000SH 3kg · 4000SH 5.2kg", src: "purefishing.jp" } },
      { s: "Elite Max", t: "Global Budget", sz: ["10", "20", "30", "40"], w: "225g – 270g", b: "6+1", a: "IM-C6 insert molded body; sleek design with a reliable Carbon Matrix drag.", k: "Older symmetrical body; heavier than the Revo X.", ap: "Weekend bass fishing and light inshore use.", p: "$80 – $90", d: { min: 6.4, max: 6.4, note: "Carbon Matrix. 6.4kg (14lb) across line", src: "abugarcia.com" } },
      { s: "Superior", t: "JDM Entry", sz: ["1000S", "2000S", "2500S", "2500MSH", "3000MH", "4000SH", "5000H"], w: "215g – 375g", b: "4+1", a: "DuraMetal integral body, Salt Shield bearing in the pinion gear.", k: "High weight in larger sizes; unrefined gears compared to Revo series.", ap: "Reliable backup reel, beginner lure casting, and light saltwater applications.", p: "$80 – $90", d: { min: 3, max: 5, note: "Carbon Matrix. 1000S 3kg · 5000H 5kg", src: "purefishing.jp" } },
      { s: "Max Pro / Max STX / Max X", t: "Global Base", sz: ["5", "10", "20", "30", "40"], w: "212g – 278g", b: "6+1 (Pro) / 5+1 (STX) / 3+1 (X)", a: "Rocket Line Management system; affordable entry points. Pro features Everlast bail.", k: "Heavy internal components; basic seals; plastic/composite frames.", ap: "Entry-level lure casting, casual weekend fishing, kids' setups.", p: "$40 – $70", d: { min: 3, max: 6.4, note: "Felt / Basic Carbon. Sz 5 3kg · Sz 40 6.4kg", src: "abugarcia.com" } },
      { s: "Cardinal III", t: "JDM Base", sz: ["1000", "2000", "2500", "3000", "4000", "5000"], w: "215g – 360g", b: "3+1", a: "Very affordable, often sold with spare spools out of the box in the Japanese market.", k: "Very basic drag washers; heavy handle materials.", ap: "General casual fishing, budget entry into the JDM sizing market.", p: "$30 – $40", d: { min: 3, max: 5, note: "Basic Felt. 1000 3kg · 5000 5kg", src: "purefishing.jp" } },
    ],
    capacity: [
      { sz: "5 / 10 → 1000S (Shallow)", br: "PE 0.4-100m, PE 0.6-80m", mf: "2lb-100m, 3lb-70m", st: "Mountain stream trout, extreme micro-finesse, and Ajing." },
      { sz: "N/A → 2000S (Shallow)", br: "PE 0.6-100m, PE 0.8-80m", mf: "3lb-100m, 4lb-80m", st: "High-precision finesse casting, skipping soft plastics in heavy cover." },
      { sz: "20 → 2500S (Shallow)", br: "PE 0.6-100m, PE 0.8-90m", mf: "4lb-100m, 5lb-80m", st: "Standard finesse size. Ideal for Eging (Squid) or light bass setups." },
      { sz: "20/30 → 2500MS (Mid-Shallow)", br: "PE 0.8-150m, PE 1.0-120m", mf: "6lb-100m, 8lb-80m", st: "Perfect intermediate spool for aggressive lure fishing; saves backing on thin 8-strand braids." },
      { sz: "30 → 3000 / 3000MS", br: "PE 1.2-150m, PE 1.5-120m", mf: "8lb-110m, 10lb-90m", st: "The universal standard for rainforest rivers targeting Sebarau." },
      { sz: "40 → 4000 / 4000SH", br: "PE 2.0-220m, PE 3.0-150m", mf: "12lb-120m, 14lb-100m", st: "Essential for brute-force extractions – dragging Snakehead from timber or light inshore duty." },
      { sz: "N/A → 5000 / 5000H", br: "PE 3.0-240m, PE 4.0-170m", mf: "16lb-150m, 20lb-120m", st: "Heavy estuary bait fishing, light offshore pelagics, and shore jigging." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 30 – 50", n: "Complete strip-down, ultrasonic clean, and re-greasing. Very straightforward for Abu reels." },
      { sv: "Single Bearing (Standard)", c: "RM 15 – 25", n: "Standard stainless steel bearing replacement (line roller or handle knob)." },
      { sv: "Single Bearing (HPCR / Salt Shield)", c: "RM 35 – 60+", n: "High Performance Corrosion Resistant bearing replacement – recommended for estuaries." },
      { sv: "Full Bearing Upgrade (Entry Models)", c: "RM 80 – 120", n: "Upgrading a Max Pro, Elite Max, or Superior to drastically improve retrieve smoothness." },
      { sv: "Gear Set Replacement", c: "RM 90 – 200+", n: "AMGearing sets are reasonably priced for global models; JDM Theta gears are harder to source locally." },
      { sv: "Carbon Matrix Drag Washers", c: "RM 25 – 45", n: "Replacing burnt-out drag washers – common after fighting oversized Toman on locked drags." },
    ],
    checklist: [
      { h: "Extreme Speed or Extreme Torque?", pts: ["Topwater frogs for Haruan/Toman needing instant slack pickup: buy the Revo Rocket (7.6:1) – no other brand offers this at this price.", "Deep-diving crankbaits causing wrist fatigue: seek out the Revo Winch (4.8:1)."] },
      { h: "Global vs. JDM Platforms", pts: ["Buy Global (Revo SX/STX/X) for a dependable workhorse with easy local warranty support and parts availability.", "Buy JDM (MGX/ALX Theta) for refined finesse features, super-shallow PE spools, and superior weight reduction."] },
      { h: "Weight vs. Durability", pts: ["Magnesium/Asymmetrical (Zenon, MGX) for all-day casting where wrist fatigue is the primary enemy.", "Aluminum/Durametal (ALX Theta, Salty Stage) if aggressively cranking hardbodies or abusing the reel in coastal saltwater."] },
      { h: "Saltwater Limitations", pts: ["Abu Garcia spinning reels cap out at size 5000.", "For a heavy offshore reel for 50kg+ pelagics or deep-sea jigging, pivot to Shimano (Stella/Saragosa SW) or Daiwa (Saltiga/Certate SW)."] },
    ],
    env: "No proprietary magnetic oils (like Daiwa's MagSealed) or restricted tool interfaces (like Daiwa's MQ plates) – Abu Garcia reels are easy to strip, clean, and re-grease at home with standard tools. The “Salt Shield” coating on JDM bearings (ALX Theta) performs well in corrosive Malaysian brackish waters (Port Klang, Jugra), but will still seize if submerged and left uncleaned.",
    jdm: "Sourcing parts for global/US models (Revo SX, Max series) is straightforward via local Pure Fishing dealers (TCE Tackles). Specialised JDM parts (MGX Theta spools, Roxani carbon handles) generally need ordering through Japanese tackle sites (Plat/Digitaka) with 2–4 week wait times.",
  },
  {
    id: "penn",
    name: "Penn",
    code: "PEN",
    tagline: "Skips the ultra-light finesse race entirely – full metal bodies, CNC gearing and IPX-rated sealing built to be absolute tanks.",
    philosophy: [
      { t: "Full Metal Body", d: "Found on almost all mid-to-high tier reels – rigid aluminum construction prevents the frame from twisting under extreme drag, keeping massive gears aligned." },
      { t: "CNC Gear Technology", d: "Gears machined directly from solid metals (brass, bronze, stainless) rather than cast, for an incredibly strong, durable gear train." },
      { t: "IPX Sealing", d: "Standardised international IPX ratings (IPX5, IPX6, IPX8) classify exactly how waterproof each reel is." },
      { t: "HT-100 & Dura-Drag", d: "Proprietary carbon-fibre drag materials, heavily greased out of the box, legendary for heat dissipation and stopping power." },
    ],
    lineup: [
      { s: "Torque II", t: "US-Made Flagship SW", sz: ["5500", "7500", "9500"], w: "555g – 790g", b: "9+1", a: "Fully machined in the USA; IPX6 Sealed; Slammer Drag System with Dura-Drag. Absolute maximum durability.", k: "Extremely heavy; very expensive; limited to large sizes.", ap: "Extreme offshore pelagics, monster sharks from the beach, heavy boat winching.", p: "$750 – $850", d: { min: 18.1, max: 22.6, note: "Dura-Drag (Carbon). 5500 18.1kg (40lb) · 9500 22.6kg (50lb)", src: "pennfishing.com" } },
      { s: "Authority", t: "Global Flagship SW", sz: ["2500", "3500", "4500", "5500", "6500", "7500", "8500", "10500"], w: "337g – 1057g", b: "12+1", a: "IPX8 sealed (fully submersible); CNC Stainless Steel main & pinion gears; Dura-Drag.", k: "Very heavy. Overkill for standard inshore or freshwater use.", ap: "Monster GTs, Tuna, extreme offshore popping, heavy surf submersion.", p: "$300 – $400", d: { min: 9.1, max: 27.2, note: "Dura-Drag. 2500 9.1kg (20lb) · 10500 27.2kg (60lb)", src: "pennfishing.com" } },
      { s: "Slammer IV / IV DX", t: "Heavy SW Premium", sz: ["2500", "3500", "4500", "5500", "6500", "7500", "8500", "10500"], w: "312g – 1215g", b: "8+1 (Std) / 9+1 (DX)", a: "IPX6 sealed body and spool; Dura-Drag. DX version upgrades to CNC Stainless Steel gears.", k: "High start-up inertia; heavily sealed rotor feels “tight” to turn.", ap: "Dedicated heavy offshore pelagics, shore jigging, and heavy charter boat use.", p: "$260 – $350", d: { min: 9.1, max: 27.2, note: "Dura-Drag. 2500 9.1kg (20lb) · 10500 27.2kg (60lb)", src: "pennfishing.com" } },
      { s: "Clash II", t: "Inshore High-End", sz: ["1000", "2000", "2500", "3000", "4000", "5000"], w: "200g – 435g", b: "8+1", a: "Much lighter than standard Penns; CNC aluminum gears; Clutch Armor system.", k: "Not fully sealed for submersion; gear strength is lighter than Spinfisher/Slammer.", ap: "Premium inshore/estuary lure casting; wading for Sea Bass and Mangrove Jack.", p: "$230 – $280", d: { min: 4.1, max: 11.3, note: "HT-100 Carbon. 1000 4.1kg (9lb) · 5000 11.3kg (25lb)", src: "pennfishing.com" } },
      { s: "Spinfisher VII", t: "SW Workhorse", sz: ["2500", "3500", "4500", "5500", "6500", "7500", "8500", "10500"], w: "311g – 1094g", b: "5+1", a: "IPX5 sealing; CNC brass gears (4500+). The undisputed king of surfcasting durability.", k: "Heavier than competitors in this price range; lacks Authority's IPX8 rating.", ap: "Surf casting, heavy estuary extraction, and general saltwater boat fishing.", p: "$170 – $250", d: { min: 6.8, max: 22.6, note: "HT-100 Carbon. 2500 6.8kg (15lb) · 10500 22.6kg (50lb)", src: "pennfishing.com" } },
      { s: "Conflict II", t: "Lightweight / Finesse", sz: ["1000", "2000", "2500", "3000", "4000", "5000"], w: "178g – 410g", b: "7+1", a: "Uses RR30 (Rigid Resin) for extreme weight reduction. Penn's lightest reel.", k: "RR30 body flexes slightly more than Penn's Full Metal Body under extreme stress.", ap: "Ultralight to medium lure casting; freshwater bass and Sebarau.", p: "$190 – $230", d: { min: 4.1, max: 9.1, note: "HT-100 Carbon. 1000 4.1kg (9lb) · 5000 9.1kg (20lb)", src: "pennfishing.com" } },
      { s: "Battle IV", t: "Mid-Tier Workhorse", sz: ["1000", "2000", "2500", "3000", "4000", "5000", "6000", "8000", "10000"], w: "220g – 1090g", b: "5+1", a: "Full Metal Body, Hydro Armor sealing, CNC Gearing, HT-100 drag. Massive upgrade over Battle III.", k: "Slightly heavier rotor feel compared to Clash II.", ap: "The ultimate mid-tier brute. Excellent for heavy Toman/Snakehead and light offshore.", p: "$140 – $190", d: { min: 4.1, max: 18.1, note: "HT-100 Carbon. 1000 4.1kg (9lb) · 10000 18.1kg (40lb)", src: "pennfishing.com" } },
      { s: "Fierce V / Fierce V LL", t: "Entry Metal", sz: ["1000", "2000", "2500", "3000", "4000", "5000", "6000", "8000"], w: "220g – 815g", b: "4+1", a: "Full Metal Body and CNC Gears at a budget price point. LL version adds a Live Liner drag.", k: "Lower bearing count; basic seals rather than full IPX ratings.", ap: "Budget heavy-duty bait fishing, weekend bottom fishing, and live baiting.", p: "$100 – $160", d: { min: 4.1, max: 13.6, note: "HT-100 Carbon. 1000 4.1kg (9lb) · 8000 13.6kg (30lb)", src: "pennfishing.com" } },
      { s: "Pursuit V", t: "Budget Graphite", sz: ["2500", "3000", "4000", "5000", "6000", "8000"], w: "278g – 825g", b: "4+1", a: "HT-100 drag washers in a corrosion-resistant graphite body. Very affordable.", k: "Graphite body will flex under heavy loads.", ap: "Casual weekend bait fishing, backup boat rigs, or pier fishing.", p: "$80 – $115", d: { min: 4.5, max: 11.3, note: "HT-100 Carbon. 2500 4.5kg (10lb) · 8000 11.3kg (25lb)", src: "pennfishing.com" } },
      { s: "Wrath II", t: "Base Entry", sz: ["2500", "3000", "4000", "5000", "6000", "8000"], w: "297g – 865g", b: "2+1", a: "The absolute cheapest entry into Penn.", k: "Felt drag washers (not carbon HT-100); only 2 bearings; graphite body.", ap: "Absolute beginners, kids setups, and disposable bait reels.", p: "$40 – $60", d: { min: 4.5, max: 11.3, note: "Basic Felt. 2500 4.5kg (10lb) · 8000 11.3kg (25lb)", src: "pennfishing.com" } },
    ],
    capacity: [
      { sz: "1000", br: "10lb-145m, 15lb-100m (PE 1.0-150m)", mf: "4lb-125m, 6lb-95m", st: "Ultralight and light finesse, stream fishing." },
      { sz: "2000", br: "10lb-210m, 15lb-165m (PE 1.5-180m)", mf: "6lb-165m, 8lb-115m", st: "Standard light lure casting. Equivalent to a Japanese 3000/C3000." },
      { sz: "2500", br: "15lb-220m, 20lb-145m (PE 2.0-180m)", mf: "8lb-160m, 10lb-125m", st: "Aggressive estuary casting, light inshore. Equivalent to a Japanese 4000." },
      { sz: "3000 / 3500", br: "20lb-230m, 30lb-150m (PE 2.5-200m)", mf: "10lb-180m, 12lb-150m", st: "The universal standard for dragging heavy Toman out of snag-infested timber." },
      { sz: "4000 / 4500", br: "30lb-290m, 40lb-210m (PE 3.0-260m)", mf: "12lb-210m, 15lb-175m", st: "Heavy estuary extraction, surf casting, light offshore jigging." },
      { sz: "5000 / 5500", br: "30lb-390m, 40lb-300m (PE 4.0-280m)", mf: "15lb-205m, 20lb-120m", st: "Offshore bottom fishing, medium pelagics, Sailfish setups." },
      { sz: "6000 / 6500", br: "40lb-450m, 50lb-300m (PE 5.0-350m)", mf: "20lb-210m, 25lb-190m", st: "Deepwater jigging, medium-heavy offshore popping." },
      { sz: "7500 / 8000 / 8500", br: "50lb-640m, 65lb-530m (PE 6.0-450m)", mf: "25lb-300m, 30lb-250m", st: "Dedicated GT popping and heavy offshore trolling/casting." },
      { sz: "9500 / 10500", br: "80lb-780m, 100lb-640m (PE 8.0-700m)", mf: "40lb-395m, 50lb-300m", st: "The massive winches. Reserved for monster Tuna, Marlin, and sharks." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Labor Only)", c: "RM 30 – 40", n: "Strip-down, clean, and re-greasing. Very fast and easy on Penn reels." },
      { sv: "Single Bearing Replacement", c: "RM 15 – 20", n: "Standard stainless steel bearing replacement (common on line rollers)." },
      { sv: "Line Roller Hydrophobic Bearing", c: "RM 30 – 50", n: "Specialised water-repelling bearings used in Slammer IV / Authority." },
      { sv: "HT-100 Drag Washer Set", c: "RM 25 – 40", n: "Replacing a burnt-out stack – very cheap and readily available locally." },
      { sv: "CNC Gear Set Replacement", c: "RM 120 – 250", n: "Replacing a blown brass/stainless gear set. Much cheaper than Japanese HAGANE or MQ gears." },
      { sv: "Full Service (Authority / IPX8)", c: "RM 60 – 80", n: "Labor costs slightly more – heavy sealing gaskets must be carefully reseated to maintain IPX8." },
    ],
    checklist: [
      { h: "Finesse or Brute Force?", pts: ["Buy Shimano/Daiwa if casting lures all day for Sebarau and need a lightweight reel (Vanford, Luvias) to prevent wrist fatigue.", "Buy Penn if dragging heavy Toman out of sunken trees, dropping baits offshore, or fishing from rocks where the reel gets banged around."] },
      { h: "The Sealing Tiers (IPX)", pts: ["Authority (IPX8): buy if you physically swim or deep-wade and gear will be fully submerged.", "Torque II / Slammer IV (IPX6) / Spinfisher VII (IPX5): buy for heavy surf casting, kayaking, or boat fishing with heavy spray.", "Battle IV (Hydro Armor) / Fierce V: buy for general freshwater dam and pier fishing, and budget applications."] },
      { h: "Size Down Your Spool", pts: ["A Penn 2500 equals a Japanese 4000.", "Don't buy a Penn 4000 for standard ultralight or medium river fishing – the setup will be wildly unbalanced."] },
      { h: "Gear Material Matters", pts: ["Choosing between Slammer IV and Slammer IV DX? Spend the extra for the DX's upgraded CNC Stainless Steel main gear.", "It dramatically increases lifespan under heavy offshore pelagic loads."] },
    ],
    env: "If Daiwa MagSealed reels are the sports cars needing authorised mechanics, Penn reels are the farm tractors – highly favoured by DIY Malaysian anglers, easily stripped and serviced with standard tools. Reels like the Spinfisher VII (IPX5), Slammer IV (IPX6), or Authority (IPX8) offer peace of mind wading the surf in Terengganu during monsoon season or kayaking Jugra's flats. Penn's HT-100/Dura-Drag rely on heavy greasing (Penn's blue grease or Cal's Drag Grease), which holds viscosity beautifully in Malaysian heat.",
    jdm: "Penn is distributed by Pure Fishing Malaysia. Unlike waiting weeks for JDM Shimano/Daiwa parts, basic Penn parts (drag washers, bails, standard bearings) are very easily sourced locally or swapped among standard industrial sizes.",
  },
];

export interface RulerRow {
  b: string;
  vals: string[];
}

export const RULER_COLS: string[] = ["Finesse / Micro", "Light / All-round", "Standard / Mid", "Heavy Estuary", "Light Offshore", "Heavy SW / GT"];

export const RULER_ROWS: RulerRow[] = [
  { b: "Shimano", vals: ["500 / 1000", "C2000 / 2500", "C3000 / 3000", "4000 / C5000", "SW 4000–6000", "SW 14000–30000"] },
  { b: "Daiwa", vals: ["LT 1000–2000S", "LT 2500", "LT 3000 / 4000-C", "LT 5000-C / 6000", "SW 8000–10000", "SW 14000–20000"] },
  { b: "Abu Garcia", vals: ["1000S / Sz 10", "2000S–2500S / Sz 20", "2500MS–3000 / Sz 30", "4000 / Sz 40", "5000 (light SW)", "– (not offered)"] },
  { b: "Penn", vals: ["1000", "2000", "2500 / 3000", "3500 / 4000", "4500 / 5000", "6500 – 10500"] },
];

export interface TierRow {
  tier: string;
  shi: string;
  dai: string;
  abu: string;
  pen: string;
}

export const TIER_ROWS: TierRow[] = [
  { tier: "Heavy SW Flagship", shi: "Stella SW", dai: "Saltiga", abu: "– not offered", pen: "Torque II · Authority" },
  { tier: "Finesse / LT Flagship", shi: "Vanquish", dai: "Exist · Airity", abu: "Zenon", pen: "Conflict II" },
  { tier: "Heavy / Mid SW", shi: "Twin Power SW · Saragosa SW", dai: "Certate SW · Saltist MQ", abu: "Salty Stage Concept-Free", pen: "Slammer IV · Spinfisher VII" },
  { tier: "All-round Workhorse", shi: "Stradic", dai: "Caldia · Certate", abu: "Revo ALX Theta · STX", pen: "Battle IV · Clash II" },
  { tier: "Budget Entry", shi: "Sedona · FX/IX", dai: "Legalis · Revros", abu: "Max Pro · Cardinal III", pen: "Wrath II · Pursuit V" },
];

// ---------------- Tagging / classification for the lineup filter chips ----------------

export type TierTag = "all" | "flagship" | "sw" | "finesse" | "workhorse" | "jdm" | "budget";

export const TAG_LABELS: Record<TierTag, string> = {
  all: "All",
  flagship: "Flagship",
  sw: "Heavy SW",
  finesse: "Finesse",
  workhorse: "Workhorse",
  jdm: "JDM",
  budget: "Budget",
};

export function classify(tier: string): TierTag[] {
  const s = tier.toLowerCase();
  if (s.includes("sw") && s.includes("flagship")) return ["flagship", "sw"];
  if (s.includes("flagship")) return ["flagship", "finesse"];
  if (s.includes("sw")) return ["sw"];
  if (s.includes("jdm")) return ["jdm"];
  if (s.includes("budget") || s.includes("base") || s.includes("entry")) return ["budget"];
  if (s.includes("finesse") || s.includes("light") || s.includes("speed")) return ["finesse"];
  return ["workhorse"];
}

export function priceLow(p: string): number {
  const m = p.match(/\$?([\d,]+)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}

export function weightLow(w: string): number {
  const m = w.match(/([\d.]+)g/);
  return m ? parseFloat(m[1]) : 0;
}

// ---------------- Quadrant plot support ----------------

export type AxisKey = "price" | "wMin" | "wMax" | "size" | "bearings" | "dragMax";

export interface AxisConfig {
  label: string;
  get: (p: ReelPoint) => number;
  log: boolean;
  fmt: (v: number) => string;
  low: string;
  high: string;
}

export interface ReelPoint {
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
  drag: DragInfo | null;
  dragMax: number;
  price: number;
  wMin: number;
  wMax: number;
  bearings: number;
  size: number;
}

export const BRAND_COLORS: Record<string, string> = {
  shimano: "#0077C0",
  daiwa: "#408A71",
  abugarcia: "#C1633C",
  penn: "#6B5CA5",
};

const SIZE_SCALE: Record<string, number> = { shimano: 1, daiwa: 1, abugarcia: 1, penn: 1.6 };

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

function sizeMax(sizes: string[], brandId: string): number {
  let best = 0;
  sizes.forEach((s) => {
    parseNums(s).forEach((n) => {
      const v = n < 100 ? n * 100 : n;
      if (v > best) best = v;
    });
  });
  return Math.round(best * SIZE_SCALE[brandId]);
}

export const POINTS: ReelPoint[] = (() => {
  const pts: ReelPoint[] = [];
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
        drag: i.d,
        dragMax: i.d?.max ?? 0,
        price: priceMid(i.p),
        wMin: wr.min,
        wMax: wr.max,
        bearings: bearingCount(i.b),
        size: sizeMax(i.sz, b.id),
      });
    });
  });
  return pts;
})();

export const AXES: Record<AxisKey, AxisConfig> = {
  price: { label: "Price (USD, midpoint)", get: (p) => p.price, log: true, fmt: (v) => "$" + Math.round(v), low: "Budget", high: "Premium" },
  wMin: { label: "Weight – lightest size (g)", get: (p) => p.wMin, log: false, fmt: (v) => Math.round(v) + "g", low: "Featherweight", high: "Heavy" },
  wMax: { label: "Weight – heaviest size (g)", get: (p) => p.wMax, log: true, fmt: (v) => Math.round(v) + "g", low: "Compact range", high: "Big-fish range" },
  size: { label: "Max size class (JP-normalised)", get: (p) => p.size, log: true, fmt: (v) => Math.round(v).toString(), low: "Finesse", high: "Brute force" },
  bearings: { label: "Bearing count (BB)", get: (p) => p.bearings, log: false, fmt: (v) => Math.round(v) + " BB", low: "Simple", high: "Refined" },
  dragMax: { label: "Max drag (kg, largest confirmed size)", get: (p) => p.dragMax, log: true, fmt: (v) => v.toFixed(v < 10 ? 1 : 0) + "kg", low: "Light drag", high: "Heavy drag" },
};

export const DRAG_AXES: Set<AxisKey> = new Set(["dragMax"]);

export const QUAD_LABELS: Record<string, [string, string, string, string]> = {
  "price|wMin": ["Budget brutes", "Offshore hardware", "Value featherweights", "Premium featherweights"],
  "price|size": ["Budget brutes", "Offshore hardware", "Cheap finesse", "Premium finesse"],
  "price|bearings": ["Overbuilt for the money", "Flagship refinement", "Bare-bones budget", "Priced on toughness"],
  "price|dragMax": ["Cheap muscle", "Expensive muscle", "Light-duty budget", "Paying for refinement"],
  "size|dragMax": ["Small but strong", "Big and strong", "Small, light-duty", "Big-bodied, modest drag"],
};

export function median(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function dragText(d: DragInfo | null): string | null {
  if (!d) return null;
  if (d.max == null) return "Drag: partial data";
  if (d.min == null) return "Drag up to " + d.max + " kg";
  if (d.min === d.max) return "Drag " + d.max + " kg";
  return "Drag " + d.min + "–" + d.max + " kg";
}
