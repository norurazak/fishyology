// Data for the Overhead Reel Master Guide (/resources/overhead-reel-guide)
// Ported from a standalone HTML draft into typed, reusable data + helpers.
// Structurally distinct from lib/reelGuideData.ts: drag info carries a `plus`
// flag (or a per-size `note` for Penn), lineup items carry drag type / speed /
// levelwind fields instead of spinning's braking/finesse fields, and every
// brand also ships a suffix decoder table.

export interface DragInfo {
  min: number;
  max: number;
  plus?: boolean;
  note?: string;
  src: string;
}

export interface OverheadSeries {
  s: string; // series name
  t: string; // tier label
  sz: string[]; // available sizes
  w: string; // weight range text
  b: string; // bearing count text
  sc: [number, number]; // size-class range (1 = ultra-light … 6 = big game)
  dt: string; // drag type: "Lever" / "Star" / "Star & Lever"
  sp: string; // speed: "1-speed" / "2-speed" / "1 or 2-speed"
  lw: string | null; // levelwind: "Open top" / "Levelwind" / null
  a: string; // advantage
  k: string; // weakness
  ap: string; // best applications
  p: string; // price text
  dg?: DragInfo; // drag info — absent for a handful of budget entries
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
  lineup: OverheadSeries[];
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
      "The gold standard at both ends – Ocea Jigger star drags for vertical work, Talica and Tiagra lever drags for live bait and trolling, with the Fall Lever as the one genuinely novel jigging idea.",
    philosophy: [
      { t: "Star vs Lever", d: "Star drags (Ocea Jigger, Torium) let you slam into gear from free-spool with a turn of the handle – mandatory for jigging. Lever drags (Talica, Tiagra) give preset drag curves and enormous stopping power for baiting and trolling." },
      { t: "The Fall Lever", d: "An external thumb lever on the F Custom jiggers that meters spool tension as the jig sinks, so you control fall speed precisely. Devastating in slow pitch." },
      { t: "InfinityDrive & MicroModule", d: "MicroModule gears in an offshore frame cut winding resistance under heavy load, so you can winch a 50kg fish without grinding the gear train to dust." },
      { t: "HAGANE / S-Compact", d: "Cold-forged aluminium frames, with the palming sideplate made deliberately smaller than the handle side to cut hand fatigue over a long day." },
    ],
    suffix: [
      { k: "PG / MG / HG / XG", v: "Power ~5.1:1, Medium ~5.7:1, High ~6.2:1, Extra High ~7.0:1+." },
      { k: "F Custom", v: "Fitted with the Fall Lever for jigging." },
      { k: "II", v: "2-speed gearbox – push-button high/low on the handle hub." },
      { k: "LD", v: "Lever drag model (Ocea Jigger LD)." },
      { k: "W / WLRS", v: "Wide spool. Long Range Special adds a heavier drag cam to fish heavy line on a smaller frame." },
      { k: "LC", v: "Line counter, mechanical or digital, for trolling and dropping." },
    ],
    lineup: [
      { s: "Tiagra", t: "Big Game Trolling Flagship", sz: ["12", "16", "20A", "30A", "30WLRSA", "50A", "50WLRSA", "80WA", "130A"], w: "920g – 4936g", b: "4+0 / 6+0", sc: [4, 6], dt: "Lever", sp: "2-speed", lw: "Open top", a: "The undisputed king of the ocean. Machined aluminium, hydrothermal drag, an indestructible lever drag.", k: "Extremely heavy; needs a fighting chair or harness in the larger sizes.", ap: "Marlin, massive Tuna, offshore trolling, extreme deep-dropping.", p: "$550 – $1300+", dg: { min: 15.0, max: 45.0, plus: true, src: "Brand comparison guide (supplied)" } },
      { s: "Talica / Talica II", t: "Lever Drag Flagship", sz: ["8", "10", "12", "16", "20", "25", "50"], w: "450g – 1588g", b: "6+1", sc: [2, 5], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "Incredible power-to-weight. The II models add a push-button 2-speed gearbox.", k: "2-speed models are slightly wider and heavier.", ap: "Heavy live baiting, Kertang bottom fishing, stand-up Tuna.", p: "$500 – $800", dg: { min: 9.0, max: 27.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Ocea Jigger", t: "Star Drag SPJ Flagship", sz: ["1000", "1500", "2000", "4000"], w: "400g – 790g", b: "8+1", sc: [2, 4], dt: "Star", sp: "1-speed", lw: "Open top", a: "InfinityDrive and MicroModule gearing. The smoothest slow pitch jigging reel on earth.", k: "No levelwind – you thumb the line on manually.", ap: "Slow pitch and fast jigging, highly technical vertical fishing.", p: "$450 – $550", dg: { min: 7.0, max: 18.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Ocea Jigger F Custom / LD", t: "JDM SPJ Elite", sz: ["1000", "1500", "2000", "2500 (LD)", "3000"], w: "430g – 620g", b: "8+1", sc: [2, 4], dt: "Star (F Custom) / Lever (LD)", sp: "1-speed", lw: "Open top", a: "The F Custom adds the Fall Lever; the LD is the lever drag version of the Jigger.", k: "Expensive, and the Fall Lever takes practice before you stop burning the spool edge.", ap: "The pinnacle of slow pitch jigging for demanding anglers.", p: "$500 – $600", dg: { min: 7.0, max: 20.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Trinidad A", t: "High-End Casting/Jigging", sz: ["10", "12", "14", "16", "20", "30"], w: "400g – 580g", b: "8+1", sc: [2, 5], dt: "Star", sp: "1-speed", lw: "Open top", a: "MagnumLite spool and X-Ship, tuned for casting live baits and irons rather than pure vertical work.", k: "Less ergonomic than the Jigger for all-day SPJ.", ap: "Casting surface irons for pelagics, light trolling, medium bottom fishing.", p: "$450 – $550", dg: { min: 11.0, max: 11.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Tyrnos / Tyrnos II", t: "Mid-Tier Trolling", sz: ["10", "12", "16", "20", "30"], w: "819g – 1080g", b: "4+0", sc: [2, 5], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "Heavy diecast aluminium frame and an affordable route into 2-speed trolling.", k: "Bulky, older generation design; not palmable.", ap: "Budget trolling for Sailfish and Marlin, heavy bottom dropping.", p: "$250 – $350", dg: { min: 15.0, max: 15.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Speedmaster LD / II", t: "Mid-Tier Lever Drag", sz: ["8", "10", "12", "16", "20", "25"], w: "525g – 1025g", b: "4+1", sc: [2, 5], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "The budget Talica – a compact lever drag on a solid HAGANE body, with 2-speed options.", k: "Lacks the Talica's refinement and high-end drag materials.", ap: "Coastal trolling, medium-heavy bottom fishing, budget live baiting.", p: "$250 – $300", dg: { min: 8.0, max: 18.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Tekota A", t: "Premium Levelwind", sz: ["300", "400", "500", "600", "800"], w: "435g – 845g", b: "4+1 / 3+1", sc: [1, 4], dt: "Star", sp: "1-speed", lw: "Levelwind", a: "Very rigid S-Compact body with a synchronised levelwind for even line lay.", k: "The levelwind can jam under extreme pressure or heavy debris.", ap: "Boat bottom fishing, deep-water snapper, wire-line trolling.", p: "$200 – $250", dg: { min: 11.0, max: 11.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Torium", t: "Mid-Tier Star Drag", sz: ["14", "16", "20", "30"], w: "425g – 560g", b: "3+1 / 4+1", sc: [3, 5], dt: "Star", sp: "1-speed", lw: "Open top", a: "The budget Ocea Jigger. Cross Carbon drag, fast gear ratio, absurdly durable for the money.", k: "Lower bearing count and no MicroModule gearing, so it feels less buttery.", ap: "Entry-to-mid jigging, general bottom fishing, all-round offshore work.", p: "$150 – $200", dg: { min: 11.0, max: 11.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Charter Special", t: "Lever Drag Levelwind", sz: ["TR1000", "TR2000"], w: "485g – 500g", b: "4+0", sc: [2, 3], dt: "Lever", sp: "1-speed", lw: "Levelwind", a: "A legacy reel that pairs a lever drag with a levelwind at a budget price.", k: "Graphite frame flexes under heavy load; visually dated.", ap: "Beginner offshore bait fishing, charter boat guest setups.", p: "$130 – $150", dg: { min: 6.8, max: 6.8, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "TR200G / 100G", t: "Absolute Budget", sz: ["100", "200"], w: "355g – 375g", b: "1+0", sc: [1, 2], dt: "Star", sp: "1-speed", lw: "Levelwind", a: "Rock-bottom price on a fully corrosion-resistant graphite frame with a levelwind.", k: "One bearing; very low drag capacity; entirely unrefined.", ap: "Disposable bottom fishing rigs, absolute beginner offshore setups.", p: "$80 – $100", dg: { min: 6.3, max: 6.3, plus: false, src: "Brand comparison guide (supplied)" } },
    ],
    capacity: [
      { sz: "1000 / 10", br: "PE 1.5-400m, PE 2.0-300m", mf: "–", st: "Light slow pitch jigging, shallow bottom fishing to about 50m." },
      { sz: "1500 / 14", br: "PE 2.0-500m, PE 2.5-400m, PE 3.0-320m", mf: "–", st: "The gold standard for Southeast Asian SPJ. 150g–250g jigs in 60m–120m." },
      { sz: "2000 / 16", br: "PE 3.0-400m, PE 4.0-300m", mf: "–", st: "Medium-heavy jigging, dropping large live baits for medium Grouper and Snapper." },
      { sz: "3000 / 4000 (Ocea Jigger)", br: "PE 4.0-500m, PE 5.0-400m", mf: "–", st: "Deep water heavy jigging past 150m, Amberjack and large Dogtooth Tuna." },
      { sz: "30 / 50 (Talica / Tiagra)", br: "PE 8.0-600m+", mf: "50lb-650m", st: "Heavy trolling for Marlin and Sailfish, massive live baits for monster Kertang." },
      { sz: "80W / 130A (Tiagra)", br: "–", mf: "80lb-850m, 130lb-900m", st: "The absolute limits of big game. Chair-fought Marlin and Tuna." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Star Drag)", c: "RM 45 – 70", n: "Strip-down, degrease and re-lube of a Torium or Ocea Jigger, with heavy marine greases." },
      { sv: "Full Service (Lever Drag / 2-Speed)", c: "RM 80 – 120", n: "Talica and Tiagra reels are far more complex to reassemble; labour reflects it." },
      { sv: "Cross Carbon Drag Washer Set", c: "RM 45 – 80", n: "Replacing burnt-out washers. Needs high-end drag grease, not general marine grease." },
      { sv: "Handle Knob Upgrade (T-Bar / Egg)", c: "RM 90 – 150+", n: "A very popular local upgrade – swapping factory knobs for big aluminium T-bars for winching." },
      { sv: "Pinion / Main Gear Replacement (Torium)", c: "RM 140 – 200", n: "Affordable brass or stainless gear replacement for mid-tier reels." },
      { sv: "MicroModule Gear Replacement (Ocea Jigger)", c: "RM 250 – 400+", n: "High-end brass/alloy gears if stripped under extreme misuse." },
    ],
    checklist: [
      { h: "Star drag or lever drag?", pts: ["Star (Ocea Jigger, Torium) if you're jigging. Being able to click into gear the instant a fish eats on the fall is mandatory.", "Lever (Talica, Speedmaster LD) if you're live-lining, bottom fishing for monster Grouper, or trolling – the preset pressure is consistent every time."] },
      { h: "Do you need the Fall Lever?", pts: ["Ocea Jigger F Custom if you're a technical slow pitch jigger who wants to control the exact fall rate to trigger fussy demersals.", "Skip it if you're just dropping bait to the bottom – it's complexity and cost you won't use."] },
      { h: "Levelwind or open top?", pts: ["Levelwind (Tekota A) if you're a beginner or fishing wire lines and don't want to thumb line across the spool.", "Open top (Ocea Jigger, Torium, Talica) for anything over 15kg. A levelwind is a mechanical weak point that eventually fails under winching pressure."] },
      { h: "Gear ratio", pts: ["HG / XG for deep water past 100m where retrieving rigs quickly matters, and for fast-pitch jigging.", "PG if you'd rather the gears do the lifting when winching a 20kg Grouper off the bottom."] },
    ],
    env: "Locking the drag on a 50kg Kertang can put enough load on a levelwind carriage to snap or jam it – for true monsters use a non-levelwind reel and guide line with your thumb. Cross Carbon washers must stay greased with genuine Shimano or Cal's drag grease or they'll shudder and pull hooks on a blistering run. On the Talica and Speedmaster, never turn the preset knob while the lever is engaged; pull back to free first, or you'll strip the internal cam threads.",
    jdm: "Shimano SEA supports the Ocea Jigger, Torium and Tekota well locally given how popular they are. Parts for a Tiagra 130A or a JDM Ocea Jigger F Custom often mean importing from Japan or the USA.",
  },
  {
    id: "daiwa",
    name: "Daiwa",
    code: "DAI",
    tagline:
      "Where Shimano adds a mechanical lever, Daiwa adds a screen – IC depth counters, MagSealed bearings and ATD drag, wrapped around HyperDrive gearing.",
    philosophy: [
      { t: "HyperDrive Design", d: "Four pillars: Hyper Armed Housing (one-piece machined frames), HyperDrive Digigear tooth profiles, Hyper Double Support (pinion on two bearings), and Hyper Tough Clutch." },
      { t: "MagSealed Ball Bearings", d: "Magnetic oil held in the bearing race forms a frictionless liquid seal against saltwater – a real advantage on reels that live in spray." },
      { t: "ATD", d: "Automatic Tournament Drag yields at the exact moment of the strike then progressively tightens as the fish runs, cutting break-offs from violent headshakes." },
      { t: "IC (Intelligent Counter)", d: "A digital depth counter with fall speed, retrieve speed and a depth alarm. It tells you exactly what water column your jig is in, which matters enormously for suspended pelagics." },
    ],
    suffix: [
      { k: "SJ", v: "Slow Jigging – longer handle, specialised drag cam, often a Spool Lock." },
      { k: "IC", v: "Intelligent Counter digital depth screen on top of the reel." },
      { k: "LD", v: "Lever drag model." },
      { k: "II", v: "2-speed gearbox, push-button high/low." },
      { k: "P / H / XH", v: "Power ~4.8:1, High ~6.4:1, Extra High ~7.1:1+." },
      { k: "L", v: "Left-hand retrieve (Saltiga 15HL is high gear, left hand)." },
    ],
    lineup: [
      { s: "Saltiga IC", t: "JDM Digital SPJ Flagship", sz: ["100", "300"], w: "310g – 400g", b: "11+1", sc: [1, 3], dt: "Star", sp: "1-speed", lw: "Open top", a: "Integrated IC depth counter on HyperDrive Design. Unmatched precision for targeting a specific water column.", k: "Narrow size range, and the IC display depends on a battery.", ap: "The ultimate technical slow pitch jigging and light jigging reel.", p: "$600 – $700", dg: { min: 7.0, max: 10.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Saltiga / Saltiga SJ", t: "Star Drag SPJ Flagship", sz: ["15", "35"], w: "400g – 600g", b: "8+1", sc: [3, 4], dt: "Star", sp: "1-speed", lw: "Open top", a: "SJ models are tuned for slow jigging with long T-bar handles and a Spool Lock for breaking off snags.", k: "Extremely heavy-duty, and no digital counter.", ap: "Deep water slow pitch jigging, fast jigging, aggressive vertical fishing.", p: "$500 – $650", dg: { min: 8.0, max: 10.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Saltiga LD / LD II", t: "Lever Drag Flagship", sz: ["10", "15", "20", "30", "35", "40", "50", "55", "60"], w: "430g – 1100g+", b: "6+1", sc: [2, 6], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "Immense stopping power on a precision machined frame, single or 2-speed. The direct Talica rival.", k: "The 60 is punishing without a harness.", ap: "Heavy live baiting, trolling for Sailfish and Tuna, monster Kertang.", p: "$450 – $750", dg: { min: 12.0, max: 20.0, plus: true, src: "Brand comparison guide (supplied)" } },
      { s: "Basara IC", t: "Premium Light Jigging", sz: ["150", "250"], w: "310g – 385g", b: "11+1", sc: [1, 2], dt: "Star", sp: "1-speed", lw: "Open top", a: "Very refined compact star drag with IC and ATD, in a magnesium/aluminium blend.", k: "Not enough capacity past 150m; strictly light setups.", ap: "Light jigging, Madai rubber jigging, Tenya in moderate depths.", p: "$400 – $500", dg: { min: 7.0, max: 10.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Saltist / Saltist LD", t: "Mid-Tier Workhorse", sz: ["15", "20", "30", "35", "40", "50 (LD)"], w: "435g – 680g", b: "4+1", sc: [3, 5], dt: "Star & Lever", sp: "1-speed", lw: "Open top", a: "Bulletproof aluminium frames in both star and lever drag. The direct answer to the Torium and Speedmaster.", k: "Heavy brass gears; none of the Saltiga's HyperDrive refinement.", ap: "Entry-to-mid jigging, coastal trolling, medium-heavy bottom fishing.", p: "$200 – $280", dg: { min: 8.0, max: 18.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Lightgame IC / Kohga IC", t: "JDM Light Specialists", sz: ["150", "200"], w: "220g – 240g", b: "5+1 / 6+1", sc: [1, 1], dt: "Star", sp: "1-speed", lw: "Levelwind", a: "Very light low-profile boat reels with IC counters. Kohga is tuned specifically for Tai Rubber.", k: "About 5kg max drag – not built for brute force extraction.", ap: "Estuary bottom fishing, ultra-light offshore jigging, Madai.", p: "$180 – $250", dg: { min: 5.0, max: 5.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Sealine LD / LD II", t: "Budget Lever Drag", sz: ["20", "30", "40", "50"], w: "480g – 850g", b: "6+0", sc: [4, 5], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "Genuinely affordable 2-speed lever drag capability.", k: "Older die-cast frames – bulky and heavy.", ap: "Budget trolling, heavy bottom dropping, beginner offshore setups.", p: "$160 – $200", dg: { min: 12.0, max: 18.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Seagate", t: "Budget Star Drag", sz: ["20", "30", "35"], w: "395g – 425g", b: "3+1", sc: [4, 5], dt: "Star", sp: "1-speed", lw: "Open top", a: "Corrosion-resistant composite frame with basic ATD at an excellent entry price.", k: "Composite frame flexes under load; very basic bearings.", ap: "Disposable bottom fishing rigs, absolute beginner offshore setups.", p: "$120 – $150", dg: { min: 8.0, max: 9.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Sealine SG-3B / LC", t: "Budget Levelwind", sz: ["17", "27", "47", "57"], w: "420g – 550g", b: "3+1", sc: [3, 5], dt: "Star", sp: "1-speed", lw: "Levelwind", a: "Reliable old-school levelwind; the LC models add a mechanical line counter.", k: "Mechanically dated, bulky, and the levelwind jams easily under pressure.", ap: "Wire-line trolling, budget boat bottom fishing.", p: "$100 – $130", dg: { min: 7.0, max: 9.0, plus: false, src: "Brand comparison guide (supplied)" } },
    ],
    capacity: [
      { sz: "100 / 150 (IC Models)", br: "PE 1.0-400m, PE 1.5-250m", mf: "–", st: "Ultra-light SPJ, Madai and Tai Rubber for Snapper, shallow water to about 50m." },
      { sz: "10 / 15 / 300", br: "PE 2.0-500m, PE 3.0-300m", mf: "–", st: "The gold standard for Southeast Asian SPJ. 150g–250g jigs in 60m–120m (Saltiga 15)." },
      { sz: "20 / 35 (Saltiga Star Drag)", br: "PE 3.0-400m, PE 4.0-300m", mf: "–", st: "Medium-heavy jigging past 100m, Amberjack and large Dogtooth Tuna." },
      { sz: "30 / 40 (Saltiga LD / Saltist)", br: "PE 5.0-400m", mf: "30lb-350m", st: "Heavy live baiting for monster Grouper, medium offshore trolling for Sailfish." },
      { sz: "50 / 60 (Saltiga LD)", br: "PE 8.0-600m+", mf: "50lb-500m", st: "Heavy trolling for Marlin and Sailfish, massive bottom dropping. Chair or harness." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Star Drag, non-MagSealed)", c: "RM 45 – 70", n: "Strip-down, degrease and re-lube of a Saltist or Seagate." },
      { sv: "Full Service (MagSealed / Saltiga)", c: "RM 80 – 150", n: "Specialised labour to handle MagSealed bearings and ATD grease application." },
      { sv: "Full Service (2-Speed Lever Drag)", c: "RM 100 – 150", n: "Saltiga LD II reels are complex; labour reflects the time to reassemble the 2-speed hub." },
      { sv: "IC Module Screen/Sensor Repair", c: "RM 250 – 450+", n: "If water breaches the counter screen, the whole top module usually comes from Japan." },
      { sv: "Carbon Washer / ATD Regrease", c: "RM 40 – 70", n: "Replacing burnt-out washers and applying genuine Daiwa ATD grease." },
      { sv: "MagSealed Bearing Replacement", c: "RM 80 – 140", n: "Replacing a seized pinion or sideplate MagSealed bearing, parts plus labour." },
    ],
    checklist: [
      { h: "Digital or feel?", pts: ["Saltiga IC if you're targeting suspended fish and want the depth counter to remove the guesswork of counting line colours.", "Saltiga SJ if you fish by feel and line colour and want an electronics-free reel you can hose down without worrying about a battery cap."] },
      { h: "Star drag or lever drag?", pts: ["Star (Saltiga, Saltist) for jigging – you need to engage the spool the millisecond a fish takes the falling jig.", "Lever (Saltiga LD) for trolling and live baits, where the preset stops you over-tightening in the panic of a strike."] },
      { h: "Levelwind or open top?", pts: ["Levelwind (Sealine SG, Lightgame IC) for light estuary tackle and wire-lining.", "Open top (Saltiga, Saltist) for anything over 10kg – the levelwind carriage jams or breaks under real winching torque."] },
      { h: "Gear ratio", pts: ["H / XH for fast-pitch jigging and retrieving from 150m+ without destroying your arms.", "P for slow pitch with 300g+ jigs, or when you want the reel winching a big bottom-dweller for you."] },
    ],
    env: "MagSealed bearings keep saltwater out beautifully but are not DIY serviceable – a contaminated one has to go to an authorised centre or a specialist stocking aftermarket ferrofluid. IC reels run CR2032 coin cells: tighten the cap firmly with a coin before washing, and pull the battery for long storage. ATD's yielding character depends on genuine Daiwa ATD grease; substitute Carbontex and cheap grease and it becomes an ordinary lockdown drag. Never engage the Saltiga SJ's spool lock while a fish is running – it will shear the locking pin.",
    jdm: "Local support runs through authorised Daiwa service. IC modules, MagSealed bearings and JDM-only SJ parts are the slow, expensive items; a fried counter board usually means a wait on Japan.",
  },
  {
    id: "abugarcia",
    name: "Abu Garcia",
    code: "ABU",
    tagline:
      "Deliberately out of the big-game race. The modern overhead line is light jigging, Tai Rubber and medium trolling, built around digital counters and robust levelwinds.",
    philosophy: [
      { t: "DLC (Digital Line Counter)", d: "An integrated LCD giving exact depth readings – the answer to Daiwa's IC, and crucial for placing a jig in front of a suspended school or dropping Tai Rubber to snapper." },
      { t: "Syncro Drag", d: "Wind the handle backward a third of a turn and drag pressure instantly drops by half. Invaluable when a fish lunges boat-side or when setting downriggers." },
      { t: "Mechanical Levelwinds", d: "Where high-end Shimano and Daiwa go open-top, almost every Abu overhead runs a synchronised levelwind, built robustly enough for medium offshore loads." },
      { t: "Durametal / X-Craeftic Frames", d: "Marine-grade aluminium alloys on the mid-to-high tier reels, resisting corrosion while keeping the reel notably light." },
    ],
    suffix: [
      { k: "DLC", v: "Digital line counter with an LCD screen." },
      { k: "LC", v: "Analog mechanical rolling-number line counter." },
      { k: "BG", v: "Big Game – a scaled-up, heavier version of a light jigging reel." },
      { k: "Syncro", v: "Syncro Drag fitted; reverse-wind to drop drag pressure instantly." },
      { k: "L", v: "Left-hand retrieve." },
      { k: "HG", v: "High gear, generally 7.3:1 or faster, for jigging." },
    ],
    lineup: [
      { s: "Salty Stage Concept-Free / PT", t: "JDM Jigging Flagship", sz: ["300", "300HG"], w: "220g – 254g", b: "4+1 / 5+1", sc: [2, 2], dt: "Star", sp: "1-speed", lw: null, a: "Full Durametal frame, extremely compact and light, often with a spare double handle for Tai Rubber.", k: "About 7kg max drag – strictly light-to-medium vertical work.", ap: "JDM light jigging, Tai Rubber, Tenggiri, shallow slow pitch.", p: "$180 – $220", dg: { min: 7.0, max: 7.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Altum DLC / Syncro", t: "Global Trolling/Boat", sz: ["12", "16", "20"], w: "510g – 540g", b: "2+1", sc: [3, 4], dt: "Star (Syncro)", sp: "1-speed", lw: "Levelwind + digital counter", a: "Carries both an illuminated digital line counter and the Syncro Drag system.", k: "Heavy graphite composite body; bulky.", ap: "Downrigger trolling, medium live baiting.", p: "$160 – $200", dg: { min: 7.7, max: 7.7, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Ambassadeur 7000 C3 / Pro Rocket", t: "Heavy Round Boat", sz: ["7000"], w: "580g – 610g", b: "2+1 / 3+1", sc: [5, 5], dt: "Star", sp: "1-speed", lw: "Levelwind", a: "Legendary durability – solid brass gears, synchronised levelwind, big line capacity.", k: "Mechanically dated, heavy, and running a basic multi-disc drag.", ap: "Heavy bottom fishing, monster Kertang baiting, bulletproof charter rigs.", p: "$150 – $180", dg: { min: 9.0, max: 9.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Max DLC / Max DLC BG", t: "JDM Digital Boat", sz: ["150", "300 (BG)"], w: "220g – 360g", b: "5+1", sc: [1, 2], dt: "Star", sp: "1-speed", lw: "Levelwind + digital counter", a: "Digital line counter tech in a genuinely affordable, compact baitcaster-style body.", k: "Polycarbonate frame flexes under load; basic electronics.", ap: "Estuary bottom dropping, ultra-light jigging, Madai, cuttlefish.", p: "$120 – $150", dg: { min: 5.0, max: 6.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Oceanfield BG / Jigging", t: "JDM Budget Jigging", sz: ["Standard", "BG (Big Game)"], w: "347g", b: "4+1", sc: [2, 3], dt: "Star", sp: "1-speed", lw: null, a: "An exceptional budget entry into JDM light jigging – deep spools and a 105mm power handle out of the box.", k: "Heavier brass/zinc gearing; less refined and rigid than the Salty Stage.", ap: "Beginner light jigging, boat casting, medium offshore bait fishing.", p: "$110 – $130", dg: { min: 7.0, max: 10.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Kurofune / Kurofune DLC", t: "JDM Light Boat", sz: ["150"], w: "220g – 260g", b: "4+1", sc: [1, 1], dt: "Star", sp: "1-speed", lw: "Levelwind", a: "Ultra-compact and very light, designed for Japanese Kawahagi and light boat work.", k: "Very low line capacity; not for fast pelagics or heavy drag.", ap: "Delicate estuary bottom fishing, Sabiki rigs, ultra-light marine drops.", p: "$100 – $130", dg: { min: 5.0, max: 5.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Alphamar LC / LC Syncro", t: "Budget Trolling", sz: ["12", "16", "20"], w: "480g – 510g", b: "2+1", sc: [3, 4], dt: "Star (Syncro)", sp: "1-speed", lw: "Levelwind + mechanical counter", a: "Analog line counter and highly reliable mechanicals for standard boat trolling.", k: "The mechanical counter gears wear or jam with salt buildup; bulky.", ap: "Budget boat trolling, deep dropping with heavy sinkers.", p: "$90 – $110", dg: { min: 7.0, max: 9.0, plus: false, src: "Brand comparison guide (supplied)" } },
    ],
    capacity: [
      { sz: "150 (Kurofune / Max DLC)", br: "PE 1.5-200m, PE 2.0-150m", mf: "–", st: "Ultra-light Tai Rubber, Sabiki rigs, estuary bottom fishing to about 40m." },
      { sz: "300 (Salty Stage / Oceanfield)", br: "PE 2.0-300m, PE 3.0-200m", mf: "–", st: "The standard for Malaysian light jigging. 80g–150g jigs in 40m–80m for Trevally and Tenggiri." },
      { sz: "12 / 16 (Altum / Alphamar)", br: "PE 3.0-400m, PE 4.0-300m", mf: "–", st: "Medium offshore trolling, downriggers, dropping live baits to structure." },
      { sz: "20 / 7000 (Ambassadeur)", br: "PE 4.0-450m, PE 5.0-350m", mf: "30lb-250m", st: "Heavy bottom dropping for Grouper and Snapper, wire-line trolling, heavy catfish." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Analog/Round)", c: "RM 35 – 50", n: "Complete strip-down and re-greasing of an Ambassadeur 7000 or Alphamar." },
      { sv: "Full Service (DLC Models)", c: "RM 50 – 80", n: "Higher labour to isolate the digital electronics from water and degreasers during cleaning." },
      { sv: "Levelwind Pawl/Worm Gear Replacement", c: "RM 25 – 45", n: "The most common failure point under heavy drag. Cheap and easy to fix locally." },
      { sv: "Carbon Matrix Drag Washer Set", c: "RM 30 – 50", n: "Replacing a burnt-out stack on a Salty Stage or Oceanfield." },
      { sv: "DLC Screen/Board Replacement", c: "RM 150 – 250+", n: "If water breaches the battery cap and fries the board, it's a full module replacement." },
    ],
    checklist: [
      { h: "Are you fishing for 20kg+ monsters?", pts: ["If yes, stop looking at Abu Garcia. You need an open-top lever drag winch – a Shimano Talica or Daiwa Saltiga LD.", "Abu's levelwinds and frame designs are not built for offshore Marlin or giant Tuna."] },
      { h: "Digital counter or analog feel?", pts: ["DLC (Max DLC, Altum) if you're dropping Tai Rubber or jigs and need to know the exact moment your lure passes a school on the sounder.", "Analog (Salty Stage, Oceanfield) if you count depth by PE colour and want a lighter reel you can hose down hard."] },
      { h: "Jigging or trolling?", pts: ["For light jigging: Salty Stage Concept-Free or Oceanfield BG. The low-profile bodies palm well and cut wrist fatigue while working jigs.", "For trolling and bottom dropping: Ambassadeur 7000 or Alphamar LC. Taller round profiles hold heavier line with far better winching torque."] },
    ],
    env: "Almost every Abu overhead runs a synchronised levelwind, and dropping baits in muddy estuaries packs sand and grit into the worm gear – if a 15kg Grouper takes off against a locked drag, a jammed pawl snaps instantly. Scrub the worm gear after every muddy trip. When changing a CR2032 in a DLC reel, seat and lightly silicone-grease the O-ring or tropical humidity will fog the screen from the inside. The upside: Ambassadeur and Alphamar mechanicals are simple enough to strip and rebuild on the boat with a multi-tool.",
    jdm: "Parts come easily through Pure Fishing Malaysia, and levelwind pawls and drag stacks are cheap. DLC boards are the exception – a fried one is a module-level replacement.",
  },
  {
    id: "penn",
    name: "Penn",
    code: "PEN",
    tagline:
      "American offshore tanks. Dura-Drag, stainless gears, machined aluminium where it matters and graphite where it doesn't, built to winch rather than to finesse.",
    philosophy: [
      { t: "Dura-Drag", d: "A drag material developed with auto-racing engineers, heavily greased, designed to eliminate hesitation and heat buildup even under multi-hour runs from very large pelagics." },
      { t: "Quick-Shift II", d: "Push-button 2-speed on the handle hub – instant shift from fast retrieve to low-gear winching torque." },
      { t: "Machined aluminium vs graphite", d: "International, Torque and Fathom run machined or die-cast aluminium for zero flex under maximum drag. Squall and Warfare use graphite for budget builds." },
      { t: "Live Spindle", d: "The spool spins independently of the spindle and pinion during free-spool, cutting friction and greatly improving casting distance with live baits." },
    ],
    suffix: [
      { k: "LD / SD", v: "Lever drag or star drag model." },
      { k: "II", v: "Generation marker (Fathom II is the second generation)." },
      { k: "2", v: "2-speed gearbox – Fathom II 30LD2." },
      { k: "LW / LC", v: "Level wind carriage / mechanical line counter." },
      { k: "N / XN", v: "Narrow or extra narrow spool, preferred for vertical jigging." },
      { k: "W", v: "Wide spool for large amounts of thick mono." },
      { k: "CS", v: "Casting Special – factory-tuned for casting distance." },
    ],
    lineup: [
      { s: "International VI", t: "Big Game Flagship", sz: ["12", "16", "30", "50", "70", "80", "130"], w: "880g – 4960g", b: "4+1 / 5+1", sc: [3, 6], dt: "Lever", sp: "2-speed", lw: "Open top", a: "Made in the USA, fully machined from aircraft-grade aluminium. The gold standard for big game trolling.", k: "Extremely heavy; a chair or harness is mandatory at 50 and above.", ap: "Giant Marlin, massive Tuna, heavy offshore trolling, extreme deep-dropping.", p: "$500 – $1300+", dg: { min: 9.1, max: 45.4, note: "16 9.1kg (20lb) · 50W 20.4kg (45lb) · 130 45.4kg (100lb)", src: "pennfishing.com" } },
      { s: "Torque Lever Drag", t: "Premium Machined", sz: ["15", "25", "30", "40"], w: "545g – 795g", b: "6+1", sc: [3, 5], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "Made in the USA, far lighter and more compact than the International. The direct Talica rival.", k: "High price, and it stops well short of the International's largest sizes.", ap: "Stand-up Tuna, heavy live baiting, premium offshore bottom fishing.", p: "$450 – $650", dg: { min: 9.1, max: 18.1, note: "15 9.1kg (20lb) · 25N/30 14.9kg (33lb) · 40N/60 18.1kg (40lb)", src: "pennfishing.com" } },
      { s: "Fathom II Lever Drag / 2-Speed", t: "Mid-Tier Metal", sz: ["10", "15", "25", "30", "40", "60", "80"], w: "430g – 1100g", b: "5+1", sc: [2, 6], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "Full die-cast aluminium frame and sideplates with stainless gears. The global workhorse.", k: "Heavier and bulkier than the Torque; the finish corrodes if you don't wash it.", ap: "Medium to heavy live baiting, bottom dropping for Kertang, Sailfish trolling.", p: "$230 – $350", dg: { min: 9.1, max: 22.6, note: "10XN/15 9.1kg (20lb) · 40N 18.1kg · 60N/80 22.6kg (50lb)", src: "pennfishing.com" } },
      { s: "Fathom II Star Drag / Casting", t: "Mid-Tier Metal", sz: ["12", "15", "25", "30", "40"], w: "480g – 550g", b: "6+1", sc: [2, 5], dt: "Star", sp: "1-speed", lw: "Open top", a: "Aluminium frame with a star drag and Live Spindle – exceptional casting distance for a conventional.", k: "Less precise than the lever versions for preset strike pressure.", ap: "Casting live baits or heavy irons for pelagics; general bottom fishing.", p: "$200 – $250", dg: { min: 13.6, max: 13.6, note: "30lb (13.6kg) across sizes 8XN–40", src: "pennfishing.com" } },
      { s: "Squall II Lever Drag", t: "Lightweight Graphite", sz: ["30", "40", "50", "60"], w: "510g – 1100g", b: "4+1", sc: [4, 5], dt: "Lever", sp: "1-speed", lw: "Open top", a: "Fathom mechanics in a light, corrosion-resistant, budget graphite frame.", k: "The graphite frame will flex under heavy drag and can bind gears on huge fish.", ap: "Budget trolling, medium offshore bottom fishing, light pelagics.", p: "$160 – $200", dg: { min: 6.4, max: 14.9, note: "40N HS 6.4kg (14lb) · 25N–40 9.1kg (20lb) · 50 12.2kg (27lb) · 60 14.9kg (33lb)", src: "halfhitch.com (PENN spec table)" } },
      { s: "Squall II Star Drag / Level Wind", t: "Budget Multi-Purpose", sz: ["12", "15", "25", "30", "40", "50"], w: "460g – 690g", b: "6+1 / 3+1", sc: [2, 5], dt: "Star", sp: "1-speed", lw: "Levelwind (LW models)", a: "Very affordable, and the LW models add a synchronised carriage for easy line lay.", k: "The levelwind is a weak point that jams under heavy pressure.", ap: "Estuary bottom fishing, wire-lining, basic boat setups.", p: "$140 – $170", dg: { min: 9.1, max: 14.9, note: "Star 9.1–11.3kg (20–25lb) · 15LW levelwind 14.9kg (33lb)", src: "pennfishing.com" } },
      { s: "Senator / Special Senator", t: "Legendary Legacy", sz: ["112H (3/0)", "113H (4/0)", "114H (6/0)", "up to 16/0"], w: "620g – 2500g+", b: "2+0", sc: [4, 6], dt: "Star", sp: "1-speed", lw: "Open top", a: "The most iconic red-and-black overhead in history. Bulletproof, simple brass gears, will outlive the angler.", k: "Ergonomically obsolete, very heavy, slow ratios, unrefined drag.", ap: "The unkillable workhorse of commercial bottom fishers and budget big game.", p: "$100 – $180", dg: { min: 5, max: 9.9, note: "112H 5kg (11lb) · 113H 9.1kg (20lb) · 114H 9.9kg (22lb)", src: "pennfishing.com" } },
      { s: "Warfare / Defiance", t: "Absolute Budget", sz: ["15", "20", "30"], w: "500g – 650g", b: "2+1", sc: [3, 4], dt: "Star", sp: "1-speed", lw: "Levelwind option", a: "Rock-bottom price on a graphite frame with an aluminium spool.", k: "Cheap composite feel, low drag capacity, basic felt/carbon washers.", ap: "Disposable bottom rigs, beginner offshore setups, charter guest rods.", p: "$70 – $100" },
    ],
    capacity: [
      { sz: "10 / 12 / 15", br: "PE 2.0-450m, PE 3.0-300m", mf: "15lb-250m, 20lb-170m", st: "Light offshore casting, live-lining baits, shallow bottom dropping." },
      { sz: "25 / 30 (Narrow)", br: "PE 4.0-450m, PE 5.0-300m", mf: "25lb-270m, 30lb-200m", st: "The standard Malaysian workhorse. Heavy live baits for Grouper and Snapper, Sailfish trolling." },
      { sz: "40 / 50 (Squall/Fathom)", br: "PE 6.0-650m, PE 8.0-450m", mf: "40lb-350m, 50lb-250m", st: "Heavy live baiting for monster Kertang, heavy trolling, light chair fishing." },
      { sz: "30W / 50W (International)", br: "PE 8.0-900m, PE 10.0-750m", mf: "50lb-500m, 80lb-300m", st: "Heavy trolling for Marlin and big sharks. Harness or chair." },
      { sz: "80W / 130 (International)", br: "Backing varies by custom topshot", mf: "80lb-900m, 130lb-900m", st: "The absolute limits of big game. Strictly chair-fought Marlin and Tuna." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Star Drag / Senator)", c: "RM 40 – 60", n: "Complete strip-down, degrease and re-lube. Very simple mechanicals." },
      { sv: "Full Service (Lever Drag / 2-Speed)", c: "RM 80 – 130", n: "2-speed hubs like the Fathom II 30LD2 are complex to reassemble; labour reflects the bench time." },
      { sv: "Dura-Drag Washer Refit/Regrease", c: "RM 45 – 70", n: "Penn's washers are thick and need heavy marine greasing." },
      { sv: "Levelwind Carriage Repair", c: "RM 30 – 50", n: "Replacing a jammed or snapped pawl – common on Squall LW models fished under too much drag." },
      { sv: "Gear Set Replacement (Stainless/Brass)", c: "RM 130 – 220", n: "Affordable replacement gears for Fathom or Squall if stripped under extreme misuse." },
    ],
    checklist: [
      { h: "Aluminium or graphite?", pts: ["Aluminium (Fathom II, Torque) for monster Grouper in wrecks, heavy Sailfish, or any time you lock the drag down hard – the rigid frame keeps gears aligned.", "Graphite (Squall II, Warfare) on a budget, trolling for smaller pelagics in open water where you won't apply 20lb+ of instant lockdown."] },
      { h: "Star drag or lever drag?", pts: ["Lever (LD) for trolling and dropping live baits – the preset stops you over-tightening in a panic.", "Star (SD) if you want to cast live baits or irons; star drags free-spool far better."] },
      { h: "Single or 2-speed?", pts: ["2-speed (30LD2) for deep water or fish over 20kg – dropping to low gear to winch a stubborn fish off the bottom saves enormous exertion.", "Single speed for general bottom dropping under 80m and fish under 15kg."] },
      { h: "Levelwind or open top?", pts: ["Levelwind (LW) if you're a beginner or fishing wire lines.", "Open top for large offshore fish – a levelwind will jam or break under real winching pressure."] },
    ],
    env: "The Squall's graphite frame will twist if you lock the drag on a 30kg Kertang, and that misalignment binds and eventually strips gears – step up to the aluminium Fathom II for monster bottom fish. Dura-Drag needs heavy, specific greasing (Penn Blue or Cal's); dried out in 35°C heat it will shudder and snap line on a pelagic run. On lever drags, never turn the preset knob with the lever engaged – pull back to free first or you'll strip the cam threads.",
    jdm: "Penn overheads are among the easiest reels in the world to service at home. Parts are heavily standardised and widely available through Pure Fishing Malaysia, which is a large part of why commercial and hardcore budget anglers favour them.",
  },
  {
    id: "okuma",
    name: "Okuma",
    code: "OKU",
    tagline:
      "Flagship features at mid-tier prices – machined 6061-T6 frames, dual-force Carbonite drags and custom thrust bearings that keep the handle turning under a locked-down lever.",
    philosophy: [
      { t: "Custom Thrust Bearings", d: "Lever drags normally load the pinion bearing sideways when locked down, making the handle brutal to turn. Okuma's thrust bearings absorb that side load, so the crank stays smooth past 40lb of drag." },
      { t: "Carbonite Dual Force Drag", d: "Carbonite friction material in a dual-drag layout contacting both sides, maximising heat dissipation and producing a stutter-free curve on blistering runs." },
      { t: "6061-T6 Machined Frames", d: "Premium overheads (Makaira, Alijos, Tesoro, Cavalla) skip die-casting for frames machined from solid bar stock, giving zero frame torque under load." },
      { t: "Magnetic Cast Control", d: "Adjustable magnetic braking built into star drag and compact lever drag models so you can cast live baits and heavy irons without thumb-burning overruns." },
    ],
    suffix: [
      { k: "II", v: "2-speed gearbox (Alijos 12II)." },
      { k: "N", v: "Narrow spool – preferred for vertical jigging and bottom dropping." },
      { k: "W", v: "Wide spool for long-range mono trolling." },
      { k: "a / b", v: "Generation markers (Solterra SLX b is the second generation)." },
      { k: "CS / C", v: "Casting Special – usually open top with magnetic cast control." },
      { k: "L / LX", v: "Left-hand retrieve." },
      { k: "LC / DLX", v: "Line counter with a mechanical rolling depth counter." },
    ],
    lineup: [
      { s: "Makaira", t: "Big Game Flagship", sz: ["10", "15", "16", "20", "30", "50", "80", "130"], w: "740g – 4750g", b: "4+1 (Custom Thrust)", sc: [3, 6], dt: "Lever", sp: "2-speed", lw: "Open top", a: "A world-class heavy winch – helical cut gears, factory Cal's grease, a massive dual force drag.", k: "Extremely heavy; strictly a boat or chair reel from 50 up.", ap: "Giant Marlin, massive Tuna, heavy offshore trolling, extreme deep-dropping.", p: "$550 – $1100+", dg: { min: 12.0, max: 45.0, plus: true, src: "Brand comparison guide (supplied)" } },
      { s: "Alijos", t: "Premium Compact Lever Drag", sz: ["5", "12", "16"], w: "540g – 1040g", b: "6+1", sc: [2, 4], dt: "Lever", sp: "2-speed", lw: "Open top", a: "A very compact, light 2-speed lever drag. The Talica competitor at a substantially lower price.", k: "Nothing above 16, so true monster big game is out of reach.", ap: "Stand-up Tuna, heavy live baiting, Sailfish trolling.", p: "$350 – $450", dg: { min: 11.0, max: 15.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Tesoro", t: "Premium Star Drag", sz: ["5", "10", "12"], w: "460g – 540g", b: "4+1 / 5+1", sc: [2, 3], dt: "Star", sp: "1-speed", lw: "Open top", a: "Fully machined aluminium star drag with a fast retrieve and excellent free-spool for casting.", k: "No preset drag precision – it's a star drag.", ap: "Casting heavy irons for pelagics, medium and fast jigging, heavy bait casting.", p: "$330 – $400", dg: { min: 10.0, max: 13.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Cavalla", t: "Mid-Tier Machined LD", sz: ["5", "12", "16"], w: "460g – 705g", b: "4+1", sc: [2, 4], dt: "Lever", sp: "1 or 2-speed", lw: "Open top", a: "The mid-tier workhorse – 6061-T6 frame, 2-speed options, extremely durable and rigid.", k: "Slightly less refined gearing than the Alijos, and heavier.", ap: "An excellent all-rounder for offshore bottom fishing, live baiting and jigging.", p: "$250 – $300", dg: { min: 11.0, max: 15.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Cortez", t: "Budget Star Drag", sz: ["5", "10", "12"], w: "396g – 520g", b: "4+1", sc: [2, 3], dt: "Star", sp: "1-speed", lw: "Open top", a: "Light graphite frame with an aluminium spool and magnetic cast control. Exceptional value.", k: "The graphite frame flexes under heavy lockdown drag.", ap: "Budget live bait casting, medium offshore bottom fishing, inshore pelagics.", p: "$160 – $190", dg: { min: 8.0, max: 9.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Solterra SLX “b”", t: "Composite Lever Drag", sz: ["10", "15", "20", "30", "50"], w: "620g – 1500g", b: "5+2 / 2+1", sc: [3, 5], dt: "Lever", sp: "1-speed", lw: "Open top", a: "A genuinely affordable lever drag, with stainless gears in the larger sizes.", k: "The bulky graphite frame will torque under massive pressure – think stopping a 30kg Grouper.", ap: "Budget trolling, charter guest rigs, casual offshore bottom dropping.", p: "$160 – $200", dg: { min: 7.0, max: 18.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Cold Water / Convector", t: "Line Counter", sz: ["15", "20", "30", "45"], w: "414g – 620g", b: "2+1 / 3+1", sc: [3, 5], dt: "Star", sp: "1-speed", lw: "Levelwind + mechanical counter", a: "Mechanical depth counter and synchronised levelwind for tightly controlled trolling depths.", k: "The mechanical counter is a weak point once salt builds up.", ap: "Downrigger trolling, depth-specific bait dropping, wire lining.", p: "$120 – $160", dg: { min: 8.0, max: 9.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Classic Pro XP / Magda", t: "Absolute Budget", sz: ["300", "400"], w: "430g – 500g", b: "2+0", sc: [1, 2], dt: "Star", sp: "1-speed", lw: "Levelwind", a: "Rock-bottom price with basic levelwind and star drag options.", k: "Cheap composite feel, low drag capacity, basic felt washers.", ap: "Disposable bottom fishing rigs, absolute beginner offshore setups.", p: "$50 – $80", dg: { min: 6.0, max: 8.0, plus: false, src: "Brand comparison guide (supplied)" } },
    ],
    capacity: [
      { sz: "5 / 5N", br: "PE 2.0-450m, PE 3.0-300m", mf: "15lb-250m, 20lb-170m", st: "Light offshore casting, live-lining baits, shallow bottom dropping." },
      { sz: "10 / 12 (Narrow)", br: "PE 4.0-450m, PE 5.0-300m", mf: "25lb-270m, 30lb-200m", st: "The standard Malaysian workhorse. Heavy live baits for Grouper and Snapper, Sailfish trolling." },
      { sz: "15 / 16 (Standard)", br: "PE 6.0-650m, PE 8.0-450m", mf: "40lb-350m, 50lb-250m", st: "Heavy live baiting for monster Kertang, heavy trolling, light chair fishing." },
      { sz: "30 / 50 (Makaira/Solterra)", br: "PE 8.0-900m, PE 10.0-750m", mf: "50lb-500m, 80lb-300m", st: "Heavy trolling for Marlin and offshore sharks. Harness or chair." },
      { sz: "80 / 130 (Makaira)", br: "Backing varies by custom topshot", mf: "80lb-900m, 130lb-900m", st: "The absolute limits of big game. Strictly chair-fought Marlin and Tuna." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Star Drag / Cortez)", c: "RM 40 – 60", n: "Complete strip-down, degrease and re-lube. Very simple mechanicals." },
      { sv: "Full Service (Lever Drag / 2-Speed)", c: "RM 80 – 130", n: "2-speed hubs like the Cavalla 12II or Alijos are complex to reassemble." },
      { sv: "Carbonite Drag Washer Refit/Regrease", c: "RM 45 – 70", n: "Replacing burnt-out washers. Needs genuine Cal's Universal drag grease." },
      { sv: "Thrust / Pinion Bearing Replacement", c: "RM 40 – 80", n: "Replacing a seized bearing under the lever drag cam, parts plus labour." },
      { sv: "Gear Set Replacement (Stainless/Brass)", c: "RM 130 – 250", n: "Affordable for Cavalla or Solterra. Makaira helical gears cost significantly more." },
    ],
    checklist: [
      { h: "Aluminium or graphite?", pts: ["Aluminium (Cavalla, Alijos) for monster Grouper in wrecks, heavy Sailfish, or aggressive lockdown drag – the rigid frame keeps gears aligned.", "Graphite (Solterra, Cortez) on a budget, trolling smaller pelagics in open water."] },
      { h: "Star drag or lever drag?", pts: ["Lever (Alijos, Cavalla) for trolling and live baits, where a preset lever guarantees consistency.", "Star (Tesoro, Cortez) if you need to cast live baits or heavy irons – free-spool is far better."] },
      { h: "Single or 2-speed?", pts: ["2-speed (Cavalla 12II) for deep water or fish over 20kg; low gear saves your arms and back winching a stubborn fish off the bottom.", "Single speed for bottom dropping under 80m and fish under 15kg."] },
      { h: "Narrow or standard spool?", pts: ["Narrow (N) for vertical dropping and jigging – far less thumb work to lay line evenly.", "Standard or wide for trolling, where you want maximum capacity for a long run."] },
    ],
    env: "The Solterra's graphite frame twists if you lock the drag on a big Kertang in a wreck, and that misalignment strips gears – step up to the machined Cavalla or Alijos for monster bottom fish. Okuma applies Cal's grease to Carbonite washers at the factory; replenish with genuine Cal's or a quality PTFE equivalent, because cheap grease burns off during a long Sailfish run and the drag starts stuttering. The custom thrust bearings need periodic cleaning and high-viscosity marine oil, or a seized one costs you the signature smooth crank under load.",
    jdm: "Parts are easy to source through authorised distributors, and wait times are traditionally much shorter than for specialised JDM Shimano or Daiwa offshore components.",
  },
  {
    id: "accurate",
    name: "Accurate",
    code: "ACC",
    tagline:
      "Made in California around one idea: put big-game drag pressure into a palmable frame. TwinDrag on both sides of the spool, CVX machining to strip out the weight.",
    philosophy: [
      { t: "TwinDrag", d: "Identical carbon washers and titanium plates on both sides of the spool. Side-load on the pinion bearing disappears, the curve smooths out, and heat sheds twice as fast on a long Dogtooth run." },
      { t: "CVX Technology", d: "Convex machining of the frame and sideplates removes large amounts of aluminium while increasing rigidity, so the reel gets lighter and resists frame torque better at once." },
      { t: "SPJ Customisation", d: "SPJ-designated reels arrive with extended crank arms, oversized SPJ knobs and ratios optimised for working heavy jigs in deep water." },
      { t: "Stainless AR & Dual Dogs", d: "A massive stainless anti-reverse bearing backed by two mechanical dogs, for zero back-play when you set a hook in deep water." },
    ],
    suffix: [
      { k: "SPJ", v: "Slow pitch jigging tune – long crank arm, SPJ knob, often no clicker to cut internal friction." },
      { k: "N / NN", v: "Narrow or extra narrow. Very popular for SPJ, since a narrow spool needs less thumb levelling." },
      { k: "W", v: "Wide spool for heavy mono capacity, trolling and topshots." },
      { k: "2", v: "2-speed model (BV2-500), push-button shift on the handle hub." },
      { k: "L", v: "Left-hand retrieve." },
      { k: "C", v: "Casting – optimised for free-spool distance, often without mechanical cast control." },
    ],
    lineup: [
      { s: "ATD Platinum", t: "Big Game Flagship", sz: ["12", "30", "50", "80", "130"], w: "1200g – 5200g+", b: "6+1 / 7+1", sc: [4, 6], dt: "Lever (TwinDrag)", sp: "2-speed", lw: "Open top", a: "The ultimate TwinDrag heavy winch, capable of over 100lb of drag. Used for record pelagic hunting.", k: "Exceptionally heavy and expensive; chair or harness only in the big sizes.", ap: "Giant Marlin, massive Tuna, heavy trolling, extreme deep-dropping.", p: "$900 – $1800+", dg: { min: 27.0, max: 45.0, plus: true, src: "Brand comparison guide (supplied)" } },
      { s: "Valiant / Valiant SPJ", t: "Lightweight LD Flagship", sz: ["300", "400", "500", "600", "800", "1000"], w: "280g – 820g", b: "6+1", sc: [2, 5], dt: "Lever (TwinDrag)", sp: "1 or 2-speed", lw: "Open top", a: "CVX makes it impossibly light for the stopping power on offer, in 1-speed or 2-speed.", k: "Very tight tolerances – salt or sand intrusion will cause binding if you don't wash it properly.", ap: "The pinnacle of slow pitch jigging, stand-up Tuna, heavy live baiting.", p: "$450 – $750", dg: { min: 10.4, max: 16.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Boss Extreme (BX / BX2)", t: "Heavy Duty LD", sz: ["400", "500", "600"], w: "450g – 700g", b: "6+1", sc: [3, 4], dt: "Lever (TwinDrag)", sp: "1 or 2-speed", lw: "Open top", a: "A traditional solid aluminium frame instead of CVX – thicker, heavier, built for blunt-force abuse.", k: "Bulkier and noticeably heavier in the hand than the Valiant.", ap: "Heavy bottom fishing, wrecks, coastal trolling, dragging monster Kertang.", p: "$450 – $600", dg: { min: 11.7, max: 15.8, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Tern 2 (TX2)", t: "Premium Star Drag", sz: ["300", "400", "500", "600"], w: "335g – 475g", b: "6+1", sc: [2, 4], dt: "Star (TwinStar)", sp: "1-speed", lw: "Open top", a: "The first TwinStar drag – TwinDrag in a star format – on a CVX body, with unmatched free-spool for casting.", k: "No numerical preset strike pressure like a lever drag.", ap: "Casting live baits, fast-pitch jigging, surface irons, general bottom fishing.", p: "$300 – $450", dg: { min: 10.0, max: 13.6, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Fury (FX / FX2)", t: "Entry/Mid Lever Drag", sz: ["400", "500", "600"], w: "415g – 650g", b: "4+1", sc: [3, 4], dt: "Lever (single drag)", sp: "1 or 2-speed", lw: "Open top", a: "Aerospace aluminium and stainless gears at a budget price, on a highly reliable single-drag system.", k: "Single drag only – none of TwinDrag's smoothness or heat dissipation.", ap: "Budget offshore live baiting, charter setups, standard bottom dropping.", p: "$250 – $350", dg: { min: 9.0, max: 11.0, plus: false, src: "Brand comparison guide (supplied)" } },
    ],
    capacity: [
      { sz: "300 / 300N", br: "PE 2.0-450m, PE 3.0-300m", mf: "–", st: "Light SPJ, shallow bottom fishing to about 60m, casting small live baits. Tiny enough to palm easily." },
      { sz: "400 / 400N", br: "PE 3.0-450m, PE 4.0-300m", mf: "–", st: "The standard Malaysian workhorse for Tenggiri jigging and medium bottom dropping, 60m–120m." },
      { sz: "500 / 500N", br: "PE 4.0-450m, PE 5.0-350m", mf: "–", st: "Deep water SPJ, live baits for medium Kertang and Snapper, light coastal trolling." },
      { sz: "600 / 600N", br: "PE 5.0-500m, PE 6.0-400m", mf: "–", st: "Heavy deep-water jigging past 150m – Amberjack, Dogtooth Tuna, heavy wreck extraction." },
      { sz: "800 / 1000 (Valiant)", br: "PE 8.0-600m+", mf: "50lb-400m", st: "Heavy trolling for Marlin and Sailfish, massive bottom dropping, stand-up Tuna." },
      { sz: "50 / 80 / 130 (ATD)", br: "Backing varies by custom topshot", mf: "Custom topshot", st: "The absolute limits of big game. Chair-fought Marlin and Tuna." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Star Drag – Tern 2)", c: "RM 60 – 90", n: "Strip-down, degrease and re-lube. Easier than the lever drags." },
      { sv: "Full Service (Lever Drag / TwinDrag)", c: "RM 100 – 150", n: "Specialised labour and real precision to re-shim the TwinDrag system correctly." },
      { sv: "Full Service (2-Speed TwinDrag)", c: "RM 130 – 180", n: "High complexity – reassembling the 2-speed hub and dual drag plates takes serious bench time." },
      { sv: "AR Bearing Replacement", c: "RM 80 – 130", n: "Replacing a seized anti-reverse bearing, common if the reel has been deeply submerged." },
      { sv: "TwinDrag Washer Refit (Cal's Grease)", c: "RM 60 – 100", n: "Both sets of carbon washers replaced and re-packed with genuine Cal's drag grease." },
      { sv: "Gear Set Replacement (Stainless)", c: "RM 250 – 450+", n: "Rarely fails under fish pressure, but expensive to replace from the USA if stripped through binding." },
    ],
    checklist: [
      { h: "Valiant (CVX) or Boss Extreme (solid)?", pts: ["Valiant if you're slow pitch jigging all day – the CVX weight saving spares your wrists and back, and the SPJ tune is right out of the box.", "Boss Extreme if you're commercial, dropping heavy live baits into wrecks for Kertang, or expect to bang the reel off the gunwales. Heavier but far more rigid."] },
      { h: "TwinDrag or single drag?", pts: ["TwinDrag (Valiant, Tern 2, Boss) for fish that make 100m+ blistering runs – Dogtooth, Amberjack, Sailfish. The heat dissipation is what saves your line.", "Single drag (Fury) on a budget, bottom fishing for standard Snapper and Grouper where extreme heat shedding isn't the issue."] },
      { h: "1-speed or 2-speed?", pts: ["2-speed (BV2-500) past 100m or for fish over 20kg – low gear to winch a stubborn Kertang out of a wreck is a huge physical advantage.", "1-speed for jigging in 60m or pelagics under 15kg. Saves weight, complexity and money."] },
      { h: "Lever drag or star drag?", pts: ["Lever (Valiant) for SPJ and trolling, where presetting exact strike pressure keeps everything consistent.", "Star (Tern 2) if you need to cast live baits or surface irons at schooling fish – free-spool is far better."] },
    ],
    env: "TwinDrag demands precision: the titanium plates and carbon washers have to be perfectly spaced and shimmed, and losing a micro-shim or over-greasing at home will bind the spool and cost you free-spool entirely. Unless you're very experienced, leave these to a professional. The big sleeved AR bearing under the handle hub is the silent killer – saltwater pools under the handle collar on a wet boat ride and rusts it solid, so rinse the hub meticulously every trip. Accurate uses Cal's Universal drag grease at the factory, and in 35°C heat substituting cheap grease will cost you the smooth curve.",
    jdm: "Distributed locally through specialists, and standard bearings and drag washers are usually in stock. A specialised frame component or a 2-speed shifting fork means 3–6 weeks waiting on California.",
  },
  {
    id: "som",
    name: "Studio Ocean Mark",
    code: "SOM",
    tagline:
      "A boutique Japanese shop building for one job only: the absolute pinnacle of slow pitch jigging. Small batches, asymmetrical frames, and drag cams tuned for thin PE.",
    philosophy: [
      { t: "Asymmetrical Frame", d: "The gearbox is pushed hard to the handle side, lowering the centre of gravity and shrinking the palming side dramatically. It's what makes multi-day SPJ trips survivable." },
      { t: "Lever Drag Tuned for Jigging", d: "Trolling lever drags ramp pressure aggressively. SOM's cams apply it very gradually, so you can make micro-adjustments mid-fight on PE 2.0 without popping the braid." },
      { t: "Factory Custom Handles", d: "SOM started as the world's premier aftermarket parts maker, so the reels ship with the best handle assemblies on earth – rigid carbon or forged alloy arms with AE or AG knobs." },
      { t: "Spool Replacement System", d: "Spools swap on a rocking boat in under a minute with an Allen key, so you can move from a PE 2.0 spool to PE 4.0 as current and depth change." },
    ],
    suffix: [
      { k: "Hi / Pw", v: "High gear (about 6.3:1 or 6.1:1) versus power gear (5.3:1 or lower) for winching torque." },
      { k: "R / L", v: "Right or left-hand retrieve (BHL50Hi/L is an L50, high gear, left hand)." },
      { k: "S2T", v: "Slow Style Tuning – a factory cam that applies pressure even more gradually, usually with a slower ratio." },
      { k: "Ota Garage", v: "Hand-tuned limited editions with skeletonised frames, specialised ceramics and custom anodising." },
      { k: "CF", v: "Carbon fibre drag upgrades or carbon handle arms." },
      { k: "AE / AG", v: "Which knob is factory-fitted – Air-Egg or Air-Grip." },
    ],
    lineup: [
      { s: "Blue Heaven L120", t: "Monster SPJ / Big Game", sz: ["L120"], w: "980g – 1050g", b: "9+1", sc: [5, 5], dt: "Lever", sp: "1-speed", lw: "Open top", a: "Immense stopping power in a massive frame, with 25kg+ of smooth drag.", k: "Exceptionally heavy and very rare; highly specialised.", ap: "Deep water monster jigging, Marlin, giant Tuna, Dogtooth.", p: "$1500 – $1800+", dg: { min: 25.0, max: 25.0, plus: true, src: "Brand comparison guide (supplied)" } },
      { s: "Blue Heaven L80", t: "Heavy Jigging", sz: ["L80"], w: "590g – 620g", b: "9+1", sc: [4, 4], dt: "Lever", sp: "1-speed", lw: "Open top", a: "The big-fish jigging weapon, and what most modern anglers use instead of the old L120.", k: "Heavy for repetitive all-day slow pitch.", ap: "Heavy Amberjack, Dogtooth Tuna, deep wrecks past 150m.", p: "$1200 – $1500", dg: { min: 14.0, max: 14.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Blue Heaven L50", t: "The SPJ Flagship", sz: ["L50"], w: "515g – 530g", b: "9+1", sc: [3, 3], dt: "Lever", sp: "1-speed", lw: "Open top", a: "The global benchmark for SPJ – the balance of capacity, torque and palming ergonomics is unmatched.", k: "Expensive, and it needs meticulous maintenance to keep the lever drag perfectly smooth.", ap: "The standard for Luconia Shoals and the Spratlys. Amberjack, large Kertang, Yellowfin.", p: "$1100 – $1300", dg: { min: 9.0, max: 10.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Blue Heaven L30", t: "Light/Mid SPJ", sz: ["L30"], w: "400g – 420g", b: "9+1", sc: [2, 2], dt: "Lever", sp: "1-speed", lw: "Open top", a: "Incredibly compact – the palming side is tiny, so it handles like a low-profile baitcaster with offshore winching power.", k: "Limited capacity past 100m if a large pelagic decides to run.", ap: "Light-to-medium SPJ, shallow reef jigging, Tenggiri, Snapper.", p: "$1000 – $1200", dg: { min: 7.0, max: 7.0, plus: false, src: "Brand comparison guide (supplied)" } },
      { s: "Blue Safari 35", t: "Star Drag Specialist", sz: ["BS35"], w: "390g – 400g", b: "8+1", sc: [2, 2], dt: "Star", sp: "1-speed", lw: "Open top", a: "SOM's modern star drag, with a spool lock, the asymmetrical frame and extreme free-spool for casting.", k: "No numerical preset strike precision like the Blue Heaven lever drags.", ap: "Casting live baits, fast-pitch jigging, highly technical light SPJ.", p: "$800 – $950", dg: { min: 6.0, max: 6.0, plus: false, src: "Brand comparison guide (supplied)" } },
    ],
    capacity: [
      { sz: "L30 / BS35", br: "PE 1.5-600m, PE 2.0-450m", mf: "–", st: "Light SPJ, shallow bottom fishing to 80m. Dropping 100g–200g jigs for local reef species." },
      { sz: "L50", br: "PE 3.0-400m, PE 4.0-300m", mf: "–", st: "The standard Malaysian SPJ workhorse. Deep dropping in the South China Sea, 80m–150m, for large Grouper and medium pelagics." },
      { sz: "L80", br: "PE 4.0-450m, PE 5.0-350m", mf: "–", st: "Heavy deep-water jigging past 150m, dropping 400g+ jigs for Dogtooth and Amberjack." },
      { sz: "L120", br: "PE 8.0-500m, PE 10.0-400m", mf: "–", st: "The absolute limits of jigging. Giant pelagics or extreme deep dropping past 300m." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Blue Heaven)", c: "RM 120 – 180", n: "Strip-down, ultrasonic clean and re-grease. Higher labour because the lever drag assembly is complex." },
      { sv: "Full Service (Blue Safari Star Drag)", c: "RM 80 – 130", n: "Easier than the lever drags, but still needs boutique PTFE greases." },
      { sv: "Anti-Reverse Bearing Replacement", c: "RM 150 – 250", n: "OEM AR bearings are expensive. Vital if saltwater pools in the handle hub and rusts it." },
      { sv: "Drag Washer Refit (Carbon/Cork)", c: "RM 120 – 200", n: "Specialised washers repacked with genuine high-end Teflon grease." },
      { sv: "Gear Set Replacement", c: "RM 500 – 800+", n: "Extremely expensive from Japan. Unlikely to break under fish pressure, but can shear if the spool is shimmed wrong." },
    ],
    checklist: [
      { h: "Blue Heaven (lever) or Blue Safari (star)?", pts: ["Blue Heaven if you're a dedicated slow pitch jigger – reading exact drag off the lever position is what protects PE 2.0 when a 20kg Grouper eats.", "Blue Safari if you want to cast jigs or live baits, or simply prefer instant star engagement. Free-spool for dropping baits is significantly better."] },
      { h: "L30 or L50?", pts: ["L50 for the deep South China Sea (Luconia, the Spratlys) or fish over 15kg – you need the capacity and the torque.", "L30 for the Malacca Strait, Tenggiri, or anything shallower than 80m. The lightness is what saves your wrists over a 12-hour session."] },
      { h: "High gear, power gear or S2T?", pts: ["High gear (Hi) to work the jig aggressively, or in deep water where picking up slack fast keeps you in contact.", "Power gear or S2T for purist slow style – the jig stays in the strike zone longer and the low ratio is a huge mechanical advantage winching dead weight."] },
      { h: "The maintenance reality check", pts: ["Don't buy SOM if you're the angler who throws gear in the garage corner after a saltwater trip.", "These need immediate freshwater misting, careful drying, and servicing by a top-tier local professional."] },
    ],
    env: "SOM lever drags need a specific pure Teflon/PTFE marine grease – standard thick drag grease ruins the micro-incremental adjustment of the SPJ cam, making it sticky and pulling hooks on thin PE. Because the gearbox is pushed to one side, tolerances inside the housing are microscopic: if saltwater gets past the sideplate it pools directly on the anti-reverse bearing and seizes it. Wash with a light mist, never a pressurised hose.",
    jdm: "The boutique parts trap. A broken lever drag cam or sheared gear must come directly from Japan through specialist dealers – wait times easily pass 4–8 weeks and the parts are exceptionally expensive.",
  },
];

export interface RulerRow {
  b: string;
  vals: string[];
}

export const RULER_COLS: string[] = [
  "Ultra-light / Tai Rubber",
  "Light SPJ (PE 2)",
  "Standard SPJ (PE 3)",
  "Heavy jig / live bait (PE 4–5)",
  "Offshore / trolling (PE 6–8)",
  "Big game (chair)",
];

export const RULER_ROWS: RulerRow[] = [
  { b: "Shimano", vals: ["100 / 300 (Tekota)", "1000 / 8 / 10", "1500 / 14", "2000 / 16 / 20", "3000–4000 / 25 / 30", "50 / 80W / 130A"] },
  { b: "Daiwa", vals: ["100 / 150 (IC)", "10 / 250", "15 / 300", "20 / 35", "30 / 40 / 50", "55 / 60"] },
  { b: "Abu Garcia", vals: ["150 (Kurofune / Max DLC)", "300 (Salty Stage)", "300 BG / 12", "16 / 20", "7000 (Ambassadeur)", "– (not offered)"] },
  { b: "Penn", vals: ["– (not offered)", "10 / 12", "15 / 25", "30 / 40", "50 / 60 / 70", "80 / 130 · Senator 6/0+"] },
  { b: "Okuma", vals: ["300 / 400 (Magda)", "5 / 5N", "10 / 12 (narrow)", "15 / 16", "20 / 30 / 50", "80 / 130 (Makaira)"] },
  { b: "Accurate", vals: ["– (not offered)", "300 / 300N", "400 / 400N", "500 / 600", "800 / 1000 · ATD 12–30", "ATD 50 / 80 / 130"] },
  { b: "Studio Ocean Mark", vals: ["– (not offered)", "L30 / BS35", "L50", "L80", "L120", "– (not offered)"] },
];

export interface TierRow {
  tier: string;
  cells: string[]; // one per brand, in BRANDS order (shimano..som)
}

export const TIER_ROWS: TierRow[] = [
  { tier: "Big Game / Chair", cells: ["Tiagra", "Saltiga LD 50–60", "– not offered", "International VI", "Makaira", "ATD Platinum", "– not offered"] },
  { tier: "Lever Drag Flagship", cells: ["Talica / Talica II", "Saltiga LD", "– not offered", "Torque Lever Drag", "Alijos", "Valiant / Valiant SPJ", "Blue Heaven L30–L120"] },
  { tier: "Jigging / SPJ Flagship", cells: ["Ocea Jigger · F Custom", "Saltiga SJ · Saltiga IC", "Salty Stage Concept-Free", "Fathom II Star Drag", "Tesoro", "Tern 2", "Blue Safari 35"] },
  { tier: "Mid-tier Workhorse", cells: ["Torium · Speedmaster LD", "Saltist · Saltist LD", "Oceanfield BG", "Fathom II LD · Squall II LD", "Cavalla · Cortez", "Fury", "– not offered"] },
  { tier: "Levelwind / Line Counter", cells: ["Tekota A · Charter Special", "Sealine SG-3B / LC", "Max DLC · Alphamar LC", "Squall II LW", "Cold Water / Convector", "– not offered", "– not offered"] },
  { tier: "Budget Entry", cells: ["TR200G / 100G", "Seagate", "Kurofune", "Warfare / Defiance", "Classic Pro XP / Magda", "– not offered", "– not offered"] },
];

// ---------------- Tagging / classification for the lineup filter chips ----------------

export type TierTag = "all" | "flagship" | "lever" | "star" | "twospeed" | "jigging" | "levelwind" | "biggame" | "budget";

export const TAG_LABELS: Record<TierTag, string> = {
  all: "All",
  flagship: "Flagship",
  lever: "Lever Drag",
  star: "Star Drag",
  twospeed: "2-Speed",
  jigging: "Jigging",
  levelwind: "Levelwind",
  biggame: "Big Game",
  budget: "Budget",
};

export function classify(item: OverheadSeries): TierTag[] {
  const tags: TierTag[] = [];
  if (/lever/i.test(item.dt)) tags.push("lever");
  if (/star/i.test(item.dt)) tags.push("star");
  if (/2-speed/i.test(item.sp)) tags.push("twospeed");
  if (item.lw && /levelwind/i.test(item.lw)) tags.push("levelwind");

  const s = item.t.toLowerCase();
  if (s.includes("flagship")) tags.push("flagship");
  if (s.includes("big game") || s.includes("trolling")) tags.push("biggame");
  if (s.includes("jig") || s.includes("spj")) tags.push("jigging");
  if (s.includes("budget") || s.includes("entry") || s.includes("legacy")) tags.push("budget");

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

export function dragRange(d: DragInfo): string {
  if (d.min === d.max) return `${d.max.toFixed(1)}${d.plus ? "+" : ""} kg`;
  return `${d.min.toFixed(1)}–${d.max.toFixed(1)}${d.plus ? "+" : ""} kg`;
}

// ---------------- Quadrant plot support ----------------

export type AxisKey = "price" | "wMin" | "wMax" | "dragMax" | "scMax" | "bearings";

export interface AxisConfig {
  label: string;
  get: (p: OverheadPoint) => number;
  log: boolean;
  fmt: (v: number) => string;
  low: string;
  high: string;
}

export interface OverheadPoint {
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
  dt: string;
  sp: string;
  lw: string | null;
  dg: DragInfo | null;
  dragMax: number;
  price: number;
  wMin: number;
  wMax: number;
  bearings: number;
  scMax: number;
}

// Distinct, accessible dot colors for the quadrant plot (7 brands, chosen to
// stay legible against white and clearly separable from one another):
// shimano — blue, matches the site accent and the spinning guide's Shimano;
// daiwa — green; abugarcia — rust; penn — navy, reusing the same #002D62 the
// spinning guide's ReelGuideIntro already assigns Penn's wordmark, for
// cross-guide consistency; okuma — violet; accurate — tan/gold;
// som (Studio Ocean Mark) — teal.
export const BRAND_COLORS: Record<string, string> = {
  shimano: "#0077C0",
  daiwa: "#408A71",
  abugarcia: "#C1633C",
  penn: "#002D62",
  okuma: "#8B5FBF",
  accurate: "#B8935A",
  som: "#1F9AAE",
};

export const CLASS_NAMES: string[] = ["", "Ultra-light", "Light SPJ", "Standard", "Heavy", "Offshore", "Big game"];

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

export const POINTS: OverheadPoint[] = (() => {
  const pts: OverheadPoint[] = [];
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
        dt: i.dt,
        sp: i.sp,
        lw: i.lw,
        dg: i.dg ?? null,
        dragMax: i.dg?.max ?? 0,
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
  dragMax: { label: "Max drag (kg, largest confirmed size)", get: (p) => p.dragMax, log: true, fmt: (v) => v.toFixed(v < 10 ? 1 : 0) + "kg", low: "Light drag", high: "Heavy drag" },
  scMax: { label: "Size class (largest in series)", get: (p) => p.scMax, log: false, fmt: (v) => CLASS_NAMES[Math.round(v)] || String(Math.round(v)), low: "Compact class", high: "Big-game class" },
  bearings: { label: "Bearing count (BB)", get: (p) => p.bearings, log: false, fmt: (v) => Math.round(v) + " BB", low: "Simple", high: "Refined" },
};

export const DRAG_AXES: Set<AxisKey> = new Set(["dragMax"]);

export const QUAD_LABELS: Record<string, [string, string, string, string]> = {
  "price|wMin": ["Budget heavyweights", "Premium heavyweights", "Budget featherweights", "Premium featherweights"],
  "price|wMax": ["Budget, big-fish range", "Premium, big-fish range", "Budget, compact range", "Premium, compact range"],
  "price|scMax": ["Budget, big-game class", "Premium, big-game class", "Budget, compact class", "Premium, compact class"],
  "price|bearings": ["Overbuilt for the money", "Flagship refinement", "Bare-bones budget", "Priced on toughness"],
  "scMax|wMin": ["Small class, heavy build", "Big game, heavy build", "Small class, light build", "Big game, light build"],
  "scMax|bearings": ["Small class, refined", "Big game, refined", "Small class, simple", "Big game, simple"],
  "price|dragMax": ["Cheap muscle", "Expensive muscle", "Light-duty budget", "Paying for refinement"],
  "wMax|dragMax": ["Compact range, heavy drag", "Big-fish range, heavy drag", "Compact range, light drag", "Big-fish range, light drag"],
  "scMax|dragMax": ["Small class, heavy drag", "Big game class, heavy drag", "Small class, light drag", "Big game class, light drag"],
};

export function median(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
