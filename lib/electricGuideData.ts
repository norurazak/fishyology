// Data for the Electric Reel Master Guide (/resources/electric-reel-guide)
// Ported from a standalone HTML draft into typed, reusable data + helpers.
// Same architecture as lib/reelGuideData.ts (the spinning reel guide), with the
// guide-specific shapes called out in AGENTS.md: a 3-element drag tuple, motor/power/
// programmable-jigging fields on lineup items, and no suffix-decoder UI (see the note
// above ElectricGuideBrandPanel's usage of `suffix` below).

// Drag is published as [min, max, plusBoolean] for this brand set — a different shape
// again from the spinning guide's {min,max,note,src} object.
export type DragInfo = [number, number, boolean] | null;

export interface ReelSeries {
  s: string; // series name
  t: string; // tier label
  sz: string[]; // sizes / model codes
  w: string; // weight range text
  b: string; // bearing count text
  dg: DragInfo; // [min, max, plus]
  mo: string | null; // motor description (nullable — cheapest models often don't name one)
  pw: string; // power / voltage requirement text
  ej: boolean; // has a programmable "Electric Jigging" mode
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
  k: string;
  v: string;
}

export interface CapacityRow {
  sz: string;
  br: string; // braid capacity — electric reels are fished on braid, no mono/fluoro column here
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
  tagline: string;
  philosophy: PhilosophyItem[];
  // Each brand does carry suffix/designation data in the source, but the source's own
  // buildBrandPanels() never renders a suffix-decoder subsection for this guide (only
  // the spinning-reel reference panel's section list — title, philosophy, lineup,
  // capacity, maintenance, checklist — has an equivalent here). We keep the data typed
  // and populated for completeness but deliberately do NOT render it, matching both the
  // source's actual behaviour and the reference component's architecture. See
  // ElectricGuideBrandPanel.tsx for the same note next to where it's omitted.
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
      "Brute force and heat management. The only brand here putting a brushless motor in a fishing reel, and the one that built programmable jigging into the firmware.",
    philosophy: [
      { t: "GigaMax Motor (Brushless)", d: "Flagship BeastMaster only. No carbon brushes to wear out or generate heat, so it delivers substantially higher torque, faster winding and a dramatically longer life under continuous heavy load." },
      { t: "Muteki / Muteki+ (Brushed)", d: "The refined brushed system in ForceMaster and Plays. Runs hotter than the GigaMax but offers the best torque-to-price ratio in the mid tier." },
      { t: "Thermo Adjust Drag", d: "Heat-dissipating vents plus software that automatically cuts motor output if the drag washers pass a critical temperature, preventing gear failure when a 50kg fish runs." },
      { t: "EJ (Electric Jigging) Mode", d: "Program jerk-and-pause cadences into the microcomputer so the reel executes slow pitch or high-speed jigging motions on its own, all day, without exhausting you." },
    ],
    suffix: [
      { k: "MD (Monster Drive)", v: "Vastly oversized motor and reinforced gear train for Giant Grouper or Swordfish." },
      { k: "EJ", v: "Carries the programmable jerk/fall jigging software." },
      { k: "DH (Double Handle)", v: "Factory dual-paddle handle, common on 200 and 600 for light Tai Rubber." },
      { k: "Left hand", v: "Most electrics are right-hand. Left-hand models end in 1 (ForceMaster 601) and are very rare above size 1000." },
    ],
    lineup: [
      { s: "BeastMaster MD", t: "Monster Drive Flagship", sz: ["3000", "6000", "12000"], w: "1090g – 2300g", b: "14+1 to 20+1", dg: [25.0, 43.0, false], mo: "GigaMax brushless", pw: "12V boat power or large external lithium", ej: false, a: "The most powerful reels Shimano makes. GigaMax brushless motor paired with heavily reinforced gears.", k: "Immensely heavy; needs boat power or a massive external lithium battery to run at 100%.", ap: "Extreme deep dropping (300m+), monster Kertang (Giant Grouper), Ruby Snapper, Swordfish.", p: "$1,200 – $1,800+" },
      { s: "BeastMaster / BM EJ", t: "Standard Flagship", sz: ["1000", "2000", "3000"], w: "700g – 900g", b: "11+1 to 14+1", dg: [15.0, 23.0, false], mo: "GigaMax brushless", pw: "12V / 14.4V lithium", ej: true, a: "Brushless GigaMax power in a highly palmable frame. The EJ models add advanced programmable jigging modes.", k: "Very expensive for sizes under 3000 compared to the ForceMaster.", ap: "Fast-paced Electric Jigging, deep water Amberjack, heavy bottom dropping (150m–200m).", p: "$900 – $1,300" },
      { s: "ForceMaster", t: "High-End Workhorse", sz: ["200", "600", "1000", "2000", "3000", "6000", "9000"], w: "395g – 1500g", b: "8+1 to 14+1", dg: [8.0, 30.0, false], mo: "Muteki+ brushed", pw: "12V / 14.4V lithium", ej: false, a: "Muteki+ brushed motor delivering about 85% of the BeastMaster's performance at a significantly lower price.", k: "Motor runs hotter than the GigaMax during prolonged fights with monster fish.", ap: "The ultimate all-rounder. Deep dropping, heavy live baiting, general offshore winching.", p: "$600 – $950" },
      { s: "Plays", t: "Mid-Tier Workhorse", sz: ["600", "3000", "4000"], w: "475g – 1230g", b: "5+1 to 7+1", dg: [10.0, 15.0, false], mo: "Muteki brushed", pw: "12V / 14.4V lithium", ej: false, a: "Bulletproof Muteki motor, simple highly-legible LCD, and exceptional durability for the price.", k: "Considerably slower retrieval and lower max winding strength than the ForceMaster.", ap: "Budget deep dropping, commercial handline replacements, weekend offshore bottom fishing.", p: "$400 – $600" },
      { s: "Plemio", t: "Absolute Budget", sz: ["3000"], w: "625g", b: "1+0", dg: [10.0, 10.0, false], mo: null, pw: "12V", ej: false, a: "Rock-bottom price for a branded electric reel. Very simple single-button layout.", k: "Only 1 bearing; completely unrefined; very slow winding under heavy load.", ap: "Disposable deep drop rigs, absolute beginner electric setups, shallow reef winching.", p: "$300 – $350" },
    ],
    capacity: [
      { sz: "200 / 600 (Ultra-Light)", br: "PE 2.0 - 300m, PE 3.0 - 200m", st: "Tai Rubber (Madai), Tenya, and light jigging in 50m–100m. Easily palmed in one hand." },
      { sz: "1000 / 2000 (Medium)", br: "PE 3.0 - 400m, PE 4.0 - 300m", st: "The standard for Electric Jigging and medium bottom dropping for Snapper and Trevally (80m–150m)." },
      { sz: "3000 / 4000 (Heavy)", br: "PE 5.0 - 400m, PE 6.0 - 300m", st: "The Malaysian standard. Perfect for Luconia Shoals – heavy baits for medium Kertang, Amberjack, Ruby Snapper (150m–250m)." },
      { sz: "6000 / 9000 (Extra Heavy)", br: "PE 8.0 - 600m, PE 10.0 - 500m", st: "Deep drop specialty (250m–400m+). Pulling massive Kertang from wrecks, deep-water oil rig fishing." },
      { sz: "12000 (Commercial)", br: "PE 10.0 - 900m, PE 12.0 - 700m", st: "Extreme depths. Swordfish dropping, commercial long-lining, hauling 100kg+ monsters from the abyss." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Clean & Lube)", c: "RM 80 – 150", n: "Strip down, ultrasonic clean of gears, re-grease. Excludes electronic repairs." },
      { sv: "Power Cable Replacement", c: "RM 150 – 250", n: "OEM Shimano cables are expensive but vital once the alligator clips rust out." },
      { sv: "LCD Screen / Motherboard", c: "RM 500 – 1,000+", n: "Required if the board is fried by an unstable boat battery or deep saltwater submersion." },
      { sv: "Muteki Motor Replacement", c: "RM 450 – 800", n: "Replacing a burnt-out brushed motor on a Plays or ForceMaster. Scales heavily with reel size." },
      { sv: "GigaMax Motor Replacement", c: "RM 800 – 1,500+", n: "Brushless motors rarely burn out, but replacement parts are exceptionally costly." },
      { sv: "Levelwind Pawl / Worm Gear", c: "RM 60 – 100", n: "The most common mechanical failure point. Cheap and easy to fix if parts are in stock." },
    ],
    env: "The number one cause of Shimano electric reel death in Malaysia is running off the boat's main battery – alternator voltage spikes instantly fry the LCD microcomputer. Use a dedicated 14.4V lithium pack. The 2-pin power port suffers galvanic corrosion: if saltwater pools in it and you connect a live battery, the pins oxidise and snap off. Wash, dry with compressed air, and apply dielectric grease.",
    logistics: "The levelwind worm gear is exposed, and retrieving 300 metres of wet braid squeezes saltwater straight onto it. Flush aggressively or the salt crystallises and the carriage pawl shatters on the next drop. Parts often require direct ordering from Shimano Japan.",
    checklist: [
      { h: "Brushless (BeastMaster) vs. Brushed (ForceMaster)", pts: ["Buy the BeastMaster if you fish 250m+, drop 1kg sinkers, and target fish over 30kg. The brushless motor won't overheat and fade during a 20-minute winching battle.", "Buy the ForceMaster or Plays if you're a weekend angler at 100m–200m. The brushed motor has more than enough torque for 90% of bottom fishing at a fraction of the cost."] },
      { h: "Electric Jigging (EJ) vs. Bottom Dropping", pts: ["Buy an EJ model if you want to slow-pitch jig but lack the stamina to do it manually for ten hours a day.", "Avoid EJ if you just want to drop cut bait or live squid and wait for a bite – the software adds cost bait anglers never use."] },
      { h: "Size 3000 vs. Size 9000", pts: ["Buy size 3000 for 90% of Malaysian offshore fishing (Luconia, Pulau Jarak deeps). Light enough at around 800g to hold and feel the bite.", "Buy 6000/9000 only if the rod stays in the holder to winch dead weight – at 1500g+ they're far too heavy to hold for more than a few minutes."] },
      { h: "The Battery Mandate", pts: ["Factor an extra RM 400–800 for a dedicated 14.4V lithium battery.", "Running a high-end BeastMaster on a dying 12V lead-acid boat battery cuts winding power by up to 40% and risks the internal electronics."] },
    ],
  },
  {
    id: "daiwa",
    name: "Daiwa",
    code: "DAI",
    tagline:
      "Digital refinement over brute force – the JOG thumb lever, MagSealed bearings on an offshore platform, and a motor that shifts its own gears under load.",
    philosophy: [
      { t: "MAGMAX / MEGATWIN Motors", d: "High-output brushed and brushless technologies. MEGATWIN, on the Seaborg 800MJ and 1200MJ, lets the reel shift gears automatically or manually under load – from high-speed retrieve to a low-speed winch gear when a big fish strikes." },
      { t: "JOG Power Lever", d: "A scrolling wheel in the centre of the reel body instead of a side-mounted throttle dial, so you adjust winding speed or engage the motor with the thumb of the palming hand. One-handed operation done properly." },
      { t: "MagSealed Ball Bearings", d: "Magnetic oil (ferrofluid) placed directly in the bearing race creates a frictionless liquid seal that stops saltwater intrusion at the most vulnerable rotational points." },
      { t: "ATD (Automatic Tournament Drag)", d: "Yields smoothly at the exact millisecond of a strike to stop the hook pulling, then progressively tightens as the fish runs." },
    ],
    suffix: [
      { k: "J", v: "Standard single-handle JDM styling (Seaborg 300J)." },
      { k: "JL", v: "Left-hand retrieve." },
      { k: "MJ (MegaTwin)", v: "Carries the MEGATWIN shifting dual-gear system (Seaborg 800MJ)." },
      { k: "G", v: "MAGMAX-G motor – a durable brushed motor tuned for longevity and torque (Seaborg G300J)." },
      { k: "DH", v: "Factory double handle, preferred for light jigging and Tai Rubber." },
    ],
    lineup: [
      { s: "Seaborg MJ / SBG", t: "Monster Flagship", sz: ["800", "1200"], w: "1720g – 2000g", b: "22+1", dg: [33.0, 36.0, false], mo: "MEGATWIN dual-gear (MAGMAX)", pw: "Dedicated 12V–24V boat power or large external battery", ej: false, a: "MEGATWIN dual-gear motor system and MagSealed bearings. Unmatched digital intelligence and power.", k: "Extremely heavy and exceptionally expensive; needs dedicated boat power or massive external batteries.", ap: "Extreme deep dropping (300m+), monster Kertang, Swordfish dropping, commercial hauls.", p: "$1,500 – $2,000+" },
      { s: "Seaborg / Seaborg G", t: "Standard Flagship", sz: ["200", "300", "400", "500"], w: "475g – 825g", b: "12+1 to 18+1", dg: [10.0, 23.0, false], mo: "MAGMAX brushed", pw: "14.4V lithium", ej: true, a: "The gold standard for palmable electric reels. JOG Power Lever, MAGMAX motors, MagSealed bearings.", k: "Higher maintenance costs if a MagSealed bearing eventually fails compared to standard seals.", ap: "Electric Jigging (EJ), Amberjack, medium-heavy deep dropping, offshore all-rounder.", p: "$900 – $1,300" },
      { s: "Leobritz", t: "Premium Mid-Tier Workhorse", sz: ["200", "300", "500"], w: "460g – 800g", b: "8+2 to 12+2", dg: [10.0, 16.0, false], mo: "BRITZ brushed", pw: "14.4V lithium", ej: false, a: "The premium JOG Power Lever and a similar form factor to the Seaborg at a much reduced price.", k: "Standard BRITZ brushed motors give less torque than MAGMAX; no MagSealed bearings.", ap: "Deep dropping for Snapper and Grouper, light Electric Jigging, weekend offshore.", p: "$600 – $900" },
      { s: "Seapower", t: "Heavy Mid-Tier", sz: ["800", "1200"], w: "1720g – 2110g", b: "7+1", dg: [30.0, 33.0, false], mo: null, pw: "12V / 14.4V", ej: false, a: "Daiwa's budget monster-winch. Massive line capacity and brutal lifting power without the flagship price.", k: "Very basic electronics next to the Seaborg; extremely heavy; no MEGATWIN gear shifting.", ap: "Budget Swordfish dropping, heavy kite fishing, deep-water oil rig dead baiting.", p: "$800 – $1,200" },
      { s: "Tanacom", t: "The Global Budget Standard", sz: ["500", "750", "800", "1000", "1200"], w: "800g – 2040g", b: "4+0 to 7+1", dg: [22.0, 25.0, false], mo: null, pw: "12V / 14.4V", ej: false, a: "The most popular budget electric reel in the world. Legendary durability, massive capacity, highly affordable.", k: "Very heavy for their size; slow winding; older bulky bodies without the JOG lever.", ap: "Disposable deep drop rigs, heavy kite fishing, budget charter setups, beginner electric dropping.", p: "$550 – $900" },
    ],
    capacity: [
      { sz: "200 (Ultra-Light)", br: "PE 2.0 - 300m, PE 3.0 - 200m", st: "Tai Rubber (Madai), Tenya, and light jigging in 50m–100m. Easily palmed in one hand." },
      { sz: "300 / 400 (Medium)", br: "PE 3.0 - 400m, PE 4.0 - 300m", st: "The standard for Electric Jigging and medium bottom dropping for Snapper and Trevally (80m–150m). The Seaborg 300J is heavily favoured." },
      { sz: "500 (Heavy)", br: "PE 5.0 - 400m, PE 6.0 - 300m", st: "The Malaysian standard. Perfect for Luconia Shoals – heavy baits for medium Kertang, Amberjack, Ruby Snapper (150m–250m)." },
      { sz: "750 / 800 (Extra Heavy)", br: "PE 6.0 - 500m, PE 8.0 - 400m", st: "Deep drop specialty (250m–400m+). Pulling massive Kertang from wrecks, heavy kite fishing." },
      { sz: "1000 / 1200 (Commercial)", br: "PE 8.0 - 800m, PE 10.0 - 600m+", st: "Extreme depths. Swordfish dropping, commercial long-lining, hauling 100kg+ monsters from the abyss." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Tanacom / Leobritz)", c: "RM 80 – 150", n: "Strip down, ultrasonic clean of gears, re-grease. Excludes electronic repairs." },
      { sv: "Full Service (Seaborg / MagSealed)", c: "RM 130 – 200", n: "Higher labour for handling and replenishing MagSealed ferrofluid bearings." },
      { sv: "Power Cable Replacement", c: "RM 150 – 250", n: "OEM Daiwa cables; vital once the 2-pin connector oxidises or the alligator clips rust." },
      { sv: "LCD Screen / Motherboard", c: "RM 500 – 1,000+", n: "Required if the board is fried by an unstable boat battery. Parts ordered from Japan." },
      { sv: "Motor Replacement (BRITZ / MAGMAX)", c: "RM 450 – 1,000+", n: "Replacing a burnt-out brushed motor. Scales heavily with reel size and motor tier." },
      { sv: "MagSealed Bearing Replacement", c: "RM 80 – 150", n: "Replacing a seized pinion or sideplate MagSealed bearing, part plus labour." },
    ],
    env: "MagSealed bearings keep saltwater out of the Seaborg beautifully but are not DIY friendly – once one runs dry or gets contaminated you cannot flush and re-pack it at home. It goes to TCE Sports or a specialist who stocks aftermarket ferrofluid. As with every brand here, relying on the boat's main battery risks frying the LCD microcomputer; use a dedicated 14.4V lithium.",
    logistics: "The JOG Power Lever sits flush in the centre of the reel body. Fish messy cut baits – squid, oily tuna belly – and debris works into the dial crevice until it turns sticky or fails to engage the motor smoothly. Rinse the dial area with a light freshwater mist after every trip.",
    checklist: [
      { h: "Seaborg vs. Leobritz", pts: ["Buy the Seaborg if you fish harsh offshore conditions, target massive fish, and want MagSealed waterproofing plus MAGMAX torque.", "Buy the Leobritz if you're a weekend angler on Snapper and Grouper at 100m–200m. You get the JOG lever ergonomics far cheaper, sacrificing only MagSealed and top-end torque."] },
      { h: "Tanacom vs. Seapower", pts: ["Buy the Seapower (800/1200) for extreme monsters at 300m+ – a budget winch with more modern tech and pulling power than the older Tanacom.", "Buy the Tanacom if you need a bulletproof, disposable tank for kite fishing or dead-weight dropping and don't care about weight, ergonomics or speed."] },
      { h: "Size 300 vs. Size 500", pts: ["Buy size 300 for Electric Jigging or active bottom fishing where you hold the rod for hours – the Seaborg 300J is incredibly palmable.", "Buy size 500 as the standard for Malaysian heavy deep-dropping. It has the capacity and motor power for Kertang out of wrecks, but sits at the borderline of too heavy to hold manually."] },
      { h: "The Battery Mandate", pts: ["Factor an extra RM 400–800 for a dedicated 14.4V lithium battery.", "Running a high-end Seaborg on a dying 12V lead-acid boat battery reduces winding power and risks the internal electronics."] },
    ],
  },
  {
    id: "banax",
    name: "Banax",
    code: "BNX",
    tagline:
      "The Korean workhorse. No brushless motors, no ferrofluid, no app – just rugged mechanics, simple menus, and the one thing JDM boutique brands can't offer here: parts on the shelf in Malaysia.",
    philosophy: [
      { t: "Robust Direct-Drive DC Motors", d: "High-torque 12V DC motors with oversized internal brass gears and multiple carbon drag washers. No brushless complexity – famously forgiving and mechanically resilient under heavy load." },
      { t: "Oversized Carbon Matrix Drag", d: "Multi-disc carbon washer stacks, up to six washers in the Kaigen 1000, built to handle sustained friction heat and hold against hard-pulling bottom dwellers." },
      { t: "Speed Lever & Memory Backup", d: "An intuitive speed lever throttle with memory backup – unplug the reel or lose power mid-trip and the computer retains your line length and depth settings." },
      { t: "Washable Die-Cast Frames", d: "Black-anodised aluminium die-cast frames with sealed electronic ports, so the reel can be safely rinsed with freshwater after a saltwater trip." },
    ],
    suffix: [
      { k: "TM (Tournament Model)", v: "Standard universal multi-purpose framing configured for deep drop and bottom fishing." },
      { k: "G (Gen Series)", v: "Updated model generations with refined digital displays and enhanced body coatings." },
      { k: "BM (Big Mega)", v: "Heavy commercial-class winches optimised for extreme lifting power and capacity." },
      { k: "L", v: "Left-hand retrieve configuration." },
    ],
    lineup: [
      { s: "Kaigen G / Gen Series", t: "Premium Flagship", sz: ["500G", "1000G"], w: "730g – 1480g", b: "4+1 to 6+1", dg: [13.0, 20.0, false], mo: "12V DC direct-drive", pw: "12V / 14.4V lithium", ej: false, a: "Modernised styling, a clearer digital LCD, enhanced motor torque and a smoother drag layout.", k: "Lacks the multi-axis microcomputer intelligence of a BeastMaster or Seaborg.", ap: "Heavy bottom fishing, deep reef dropping (200m+), Kertang (Grouper) extraction.", p: "$400 – $650" },
      { s: "Kaigen Standard Series", t: "The Global Workhorse", sz: ["150", "500TM", "1000"], w: "475g – 1620g", b: "2+1 to 3+1", dg: [10.0, 20.0, false], mo: "12V DC direct-drive", pw: "12V / 14.4V lithium", ej: false, a: "Legendary reliability, a simple interface, a heavily proven record in Asian waters, and widely available parts.", k: "Slower retrieval and bulkier bodies than modern JDM flagships.", ap: "Standard deep dropping for Snapper and Grouper, light kite fishing, general bottom charter work.", p: "$250 – $450" },
      { s: "Mega / SW Series", t: "Heavy Commercial Winch", sz: ["7000BM"], w: "885g", b: "7+1", dg: [60.0, 60.0, false], mo: "12V DC direct-drive", pw: "12V", ej: false, a: "Massive instant winding power and extreme line capacity designed for commercial-grade extraction.", k: "Exceptionally heavy in use and unrefined for light recreational work; basic electronics.", ap: "Commercial deep water winching, heavy shark dropping, deep oil rig fishing.", p: "$350 – $500" },
    ],
    capacity: [
      { sz: "150 / 500", br: "PE 2.0 - 400m, PE 3.0 - 300m", st: "Light electric jigging, Tai Rubber (Madai), shallow bottom dropping in 50m–100m." },
      { sz: "500TM / 500G", br: "PE 4.0 - 400m, PE 5.0 - 300m", st: "The versatile mid-tier standard. Multi-hook rigs for Snapper and medium Grouper in 100m–200m." },
      { sz: "1000 / 1000G", br: "PE 6.0 - 1000m, PE 8.0 - 800m, PE 10.0 - 600m", st: "The Malaysian standard for deep drop. Built for Luconia Shoals – large Kertang and Ruby Snapper from 300m+." },
      { sz: "7000BM", br: "PE 8.0 - 900m, PE 10.0 - 700m", st: "Extreme commercial deep-drop applications and heavy shark extraction from the abyssal zone." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Clean & Lube)", c: "RM 60 – 100", n: "Complete mechanical strip-down, gear degreasing and re-greasing. Very straightforward layout." },
      { sv: "Power Cable Replacement (OEM)", c: "RM 100 – 180", n: "Replacing corroded or damaged power cords with genuine Banax replacements." },
      { sv: "Carbon Drag Washer Set Refit", c: "RM 50 – 90", n: "Replacing the multi-disc carbon stack to restore smooth drag pressure." },
      { sv: "LCD Screen / Motherboard Repair", c: "RM 300 – 600", n: "Localised board repairs or module swaps – significantly cheaper and faster than JDM imports." },
      { sv: "Motor Assembly Replacement", c: "RM 400 – 800", n: "Replacing a worn or burnt-out DC motor unit with readily available local stock." },
    ],
    env: "Plugging into an unstable or dying boat alternator can spike the voltage and fry the circuit board – use a dedicated 14.4V lithium marine pack. The 2-pin connector port is prone to green salt-crystal oxidation if left unwashed; rinse it thoroughly and apply a dab of dielectric or marine grease before attaching cables.",
    logistics: "This is the reason Banax sells here. Trusted local tackle houses such as TCE Tackles stock almost every internal spare part, eliminating the multi-month waits that come with boutique JDM brands. The exposed levelwind worm gear accumulates salt and grit during deep retrieval – flush aggressively and apply light machine oil to stop the carriage pawl binding.",
    checklist: [
      { h: "Why choose Banax over the JDM giants?", pts: ["Buy Banax (Kaigen) for rock-solid reliability, easy digital menus, and readily available local spare parts and service without paying Shimano or Daiwa prices.", "Look elsewhere if you need an ultra-compact palmable body, proprietary magnetic waterproofing, or programmable automated jigging cadences."] },
      { h: "Kaigen 500 vs. Kaigen 1000", pts: ["Buy the Kaigen 500 if you mainly target table-size reef fish in 100m–200m and want a lighter, more manageable unit.", "Buy the Kaigen 1000 for Luconia Shoals, multi-hook rigs to 300m+, or heavy bottom dwellers where maximum capacity and a 20kg drag ceiling are mandatory."] },
    ],
  },
  {
    id: "miya",
    name: "Miya Epoch",
    code: "MIY",
    tagline:
      "Not a fishing reel so much as deck machinery. Industrial commercial winches rated in drag tolerance and hoisting force, sold in 24V, weighing up to 6.3 kilograms.",
    philosophy: [
      { t: "Hoisting Force vs. Drag Tolerance", d: "Rated differently from consumer brands. Where a Shimano lists a max drag, a flagship Miya lists a drag tolerance of 40kg to 110kg alongside an instant maximum hoisting force reaching 120kg on the CZ-30 – the pulling power the motor exerts before stalling." },
      { t: "Drag Assist Lever", d: "An external control on the CZ series letting you mechanically fine-tune drag pressure mid-fight without taking your hands off the main control unit, which matters when a 100kg+ tuna lunges." },
      { t: "12V vs. 24V Architecture", d: "Flagship winches (CZ-15, CZ-20, CZ-30) come in dedicated 24V configurations. This drastically cuts amperage draw on the boat's system while delivering sustained torque a 12V system cannot maintain across a two-hour fight." },
      { t: "Click Sound Brake System", d: "Dropping 2kg to 4kg weights past 800 metres, Miya uses a mechanical sound-brake rather than a delicate digital tensioner – audible, physical feedback that stops the spool overrunning as the sinker plummets." },
    ],
    suffix: [
      { k: "HP (High Power)", v: "Upgraded motor configuration (CZ-10HP) tuned for maximum torque over retrieval speed." },
      { k: "SP (Special)", v: "Enhanced programming features, distinct colours, or upgraded drag washers." },
      { k: "APJ", v: "Specialised, highly customisable programmable jigging function, popular for working massive jigs for Dogtooth Tuna." },
      { k: "12V / 24V", v: "The most critical designation on the reel. A 12V reel will fry on a 24V system, and a 24V reel will not operate on a 12V battery." },
    ],
    lineup: [
      { s: "Command Z / CZ", t: "Absolute Flagship", sz: ["CZ-15", "CZ-20", "CZ-30"], w: "5700g – 6300g", b: "10+0", dg: [40.0, 110.0, false], mo: "Industrial DC (12V or 24V)", pw: "24V marine bank preferred; 12V available", ej: true, a: "Unmatched hoisting power, up to 120kg on the CZ-30. Fully programmable digital jigging and depth memory.", k: "Requires commercial-grade 24V marine battery systems for 24V models. Immensely heavy.", ap: "Giant Bluefin Tuna, Swordfish, commercial long-lining, hauling multiple 50kg+ fish at once.", p: "$2,500 – $4,500+" },
      { s: "Command Z-9 / CZ-9", t: "Heavy Duty Workhorse", sz: ["CZ-9", "CZ-9s", "CZ-10HP"], w: "2600g – 5200g", b: "10+0", dg: [40.0, 110.0, false], mo: "Industrial DC", pw: "12V", ej: true, a: "Brings the commercial power of the CZ line into a slightly more manageable frame for heavy recreational boats.", k: "Still vastly heavier than a Shimano BeastMaster 9000.", ap: "Monster Kertang (Giant Grouper), heavy deep-water oil rig fishing (300m+).", p: "$1,500 – $2,200" },
      { s: "Command AC / CX", t: "Legacy Commercial", sz: ["CX-4", "AC-5SC", "CX-9"], w: "1800g – 2500g", b: "6+0 to 8+0", dg: [20.0, 40.0, false], mo: "Industrial DC", pw: "12V", ej: false, a: "Legendary, indestructible legacy designs. Capable of instant hoisting forces over 60kg.", k: "Older generation LCD screens and bulkier body architectures.", ap: "Standard commercial deep-dropping, heavy charter boat setups.", p: "$1,100 – $1,500" },
      { s: "Action Tracker / AT", t: "Recreational Heavy", sz: ["AT-3S", "AT-5S"], w: "1500g – 1700g", b: "6+0", dg: [15.0, 25.0, false], mo: "Industrial DC", pw: "12V", ej: false, a: "High line capacity and hoisting control functions optimised for standard deep-sea recreational anglers.", k: "Lacks the Drag Assist Lever system of the flagship CZ line.", ap: "Deep dropping for Snapper, Grouper and medium bottom species in 150m–250m.", p: "$600 – $950" },
    ],
    capacity: [
      { sz: "AT-3S / CX-4", br: "PE 6.0 - 700m, PE 8.0 - 500m", st: "The standard for heavy Malaysian deep dropping (Luconia Shoals). Multi-hook rigs for Ruby Snapper." },
      { sz: "CZ-9 / CZ-10", br: "PE 10.0 - 1600m, PE 12.0 - 1400m", st: "Pulling massive Kertang from deep wrecks, hauling five-hook rigs completely loaded with 10kg fish." },
      { sz: "CZ-15 / CZ-20", br: "PE 15.0 - 1200m, PE 20.0 - 1000m", st: "Extreme depths (400m+). Targeted commercial Swordfish drops, heavy shark hauling." },
      { sz: "CZ-30 (The Monster)", br: "PE 20.0 - 1200m, PE 30.0 - 900m", st: "The absolute limit of rod-and-reel fishing. Mounted to heavy boat gunwales for Giant Bluefin and commercial extraction." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Clean & Lube)", c: "RM 250 – 400", n: "Complete strip-down and degreasing of massive gear trains. Highly labour-intensive due to the heavy housing." },
      { sv: "Power Cord Replacement (OEM)", c: "RM 300 – 500", n: "Commercial-grade cords are extremely thick to handle high amperage, and expensive to replace." },
      { sv: "Drag Washer Refit (Industrial)", c: "RM 200 – 400", n: "Replacing the oversized clutch board linings used to generate 110kg of drag tolerance." },
      { sv: "LCD Screen / Motherboard", c: "RM 1,500 – 3,000+", n: "The most catastrophic failure. Usually requires shipping the housing back to Japan to recalibrate the software." },
      { sv: "Motor Replacement", c: "RM 2,000 – 4,500+", n: "Replacing a burnt-out 120kg hoisting motor on a CZ-30 costs roughly what a new high-end Shimano does." },
    ],
    env: "Buy a CZ-15 or CZ-30 in 24V and you cannot use standard portable 12V lithium reel batteries – the reel wires directly into a dedicated 24V marine bank on the boat. Unstable boat alternators fry the internal computers, which cost a fortune to replace. These reels use massive shielded industrial bearings and heavy brass/stainless gear trains, so they want thick high-viscosity marine grease (Yamaha Marine, Cal's) rather than standard reel oils.",
    logistics: "There is virtually no walk-in retail support for Miya Epoch parts in Malaysia. Burn out a motor or snap a drag lever on a CZ-9 and the reel often ships back to Japan through a specialised broker, or parts come direct from Miyamae Co., Ltd. Wait times easily exceed two to three months.",
    checklist: [
      { h: "Recreational or commercial?", pts: ["Avoid Miya Epoch – buy Shimano or Daiwa – if you're doing a standard three-day Luconia trip and want a reel you can pack in luggage and hold in your hand. A BeastMaster 9000 or Seaborg 1200 is vastly better for that.", "Buy Miya Epoch (CZ series) if you own a large boat, bolt the rod into a heavy gunwale holder, and haul 50kg to 100kg of fish and weight at a time, trip after trip, without the motor overheating."] },
      { h: "12V vs. 24V systems", pts: ["Buy 12V (CZ-9, AT-5S) if you use standard portable deep-cycle or lithium marine batteries, or your boat runs a standard 12V system.", "Buy 24V (CZ-15, CZ-30) only if the vessel has a dedicated 24V system. They run cooler, draw fewer amps under load, and hoist significantly harder than the 12V versions."] },
      { h: "CZ-9 vs. CZ-30", pts: ["The CZ-9 / CZ-10 is the largest size a very strong, dedicated angler could realistically manage without relying entirely on boat-mounted rod holders. Perfect for monster Kertang.", "The CZ-30 is strictly for Giant Tuna, commercial long-lining or Swordfish. It weighs over six kilograms and is a piece of deck machinery, not a fishing reel."] },
    ],
  },
  {
    id: "penn",
    name: "Penn",
    code: "PEN",
    tagline: "The American answer to a cable problem. The Fathom Electric carries its own swappable lithium battery, so nothing trails across the deck.",
    philosophy: [
      { t: "Integrated Lithium-Ion Battery", d: "The hallmark of the Fathom Electric. No alligator clips, no long cables, no auxiliary battery bank – a high-capacity rechargeable lithium pack lives in the reel's own chassis, so you move freely around the deck." },
      { t: "Full Metal Body & Sideplates", d: "Machined or die-cast marine-grade aluminium frames that stop flex under extreme load and shield the internal electronics from salt spray." },
      { t: "HT-100 Carbon Fiber Drag", d: "Penn's carbon matrix material, greased on both sides for silkiness, built to absorb immense friction heat through long battles with bottom-dwelling monsters." },
      { t: "Direct-Drive Simplicity", d: "Penn avoids convoluted microcomputer menus in favour of intuitive glove-friendly buttons and mechanical depth readouts that prioritise reliability in harsh conditions." },
    ],
    suffix: [
      { k: "W (Wide)", v: "Expanded spool width for massive capacities of thick line or heavy topshots (International 80W)." },
      { k: "Electric / E", v: "Factory-integrated motor and battery." },
      { k: "Kit", v: "Package includes the primary rechargeable lithium battery, wall charger and specialised tools." },
    ],
    lineup: [
      { s: "Penn Fathom Electric", t: "Cordless Flagship", sz: ["30", "50", "80"], w: "1700g – 2400g", b: "5+1", dg: [13.6, 18.1, false], mo: "Integrated electric drive", pw: "Integrated swappable lithium (cordless)", ej: false, a: "Completely wireless operation via an integrated, swappable lithium battery. Full metal body, highly mobile.", k: "Limited next to JDM multi-axis computers; needs spare batteries for multi-day trips.", ap: "Deep dropping to 1,000 feet, flying kites for pelagics, mobile reef extraction without trailing wires.", p: "$700 – $1,000+" },
      { s: "Penn International Electric", t: "Heavy Commercial Winch", sz: ["80W", "130W"], w: "4500g+", b: "4+0", dg: [22.0, 30.0, true], mo: "Heavy-duty electric drive", pw: "Hardwired to boat power", ej: false, a: "Heavy-duty powerhouse designed for massive commercial dredges, heavy kite fishing and giant big-game teasers.", k: "Immensely heavy; requires direct hardwiring to boat power; lacks digital finesse features.", ap: "Teaser and dredge control, heavy tournament kite fishing, commercial-grade offshore support.", p: "$1,200 – $2,000+" },
    ],
    capacity: [
      { sz: "Size 30 (Fathom)", br: "PE 4.0 - 500m, PE 5.0 - 400m", st: "The standard for deep reef bottom dropping (300m+), multi-hook rigs for Snapper and Grouper." },
      { sz: "Size 50 (Fathom / International)", br: "PE 6.0 - 600m, PE 8.0 - 450m", st: "Heavy-duty deep dropping, flying large live-bait kites, extracting medium Kertang from deep structure." },
      { sz: "Size 80 / 130 (International)", br: "PE 10.0 - 800m+ / Mono: 80lb - 900m", st: "Commercial dredge control, running heavy teasers for Marlin, extreme deep-sea winching." },
    ],
    maintenance: [
      { sv: "Basic Full Service (Clean & Lube)", c: "RM 60 – 100", n: "Complete strip-down, gear degreasing and re-greasing of the internal mechanical housing." },
      { sv: "HT-100 Drag Washer Service / Swap", c: "RM 40 – 70", n: "Cleaning and re-greasing the carbon matrix drag washers." },
      { sv: "Replacement Battery Pack (OEM)", c: "RM 350 – 600", n: "High-capacity proprietary lithium pack. A recommended spare for multi-day trips." },
      { sv: "Motor / Gear Assembly Maintenance", c: "RM 200 – 400", n: "Servicing the internal planetary gear drive and electric motor housing." },
    ],
    env: "The lithium packs are sealed, but leaving spares in a hot car boot or on an unshaded deck at 35°C+ degrades their charge capacity over time – store them in a cool dry tackle locker. Because the Fathom drops the external wires, the internal battery compartment seal is what stands between the electronics and the sea: keep the O-ring clean, lightly silicone-greased and firmly locked before dropping in heavy spray.",
    logistics: "HT-100 carbon washers are famously durable, but tropical humidity and oily bait residue make them stick if the reel is stored wet. Routine cleaning and light re-greasing keeps the drag curve smooth.",
    checklist: [
      { h: "Why choose the Fathom Electric?", pts: ["Buy the Fathom if you want an electric motor for deep dropping or kite fishing but refuse to deal with external 12V wires, alligator clips and auxiliary batteries cluttering the cockpit.", "Look to Shimano or Daiwa instead if you need multi-axis computer depth screens, automated programmable jigging cycles, or an ultra-compact palmable body."] },
      { h: "Battery management strategy", pts: ["For a multi-day liveaboard to Luconia Shoals, invest in at least one spare OEM lithium pack.", "Wall charging isn't available mid-trip, so a single battery is a hard limit on how much dropping you can do."] },
    ],
  },
];

export interface RulerRow {
  b: string;
  vals: string[];
}

export const RULER_COLS: string[] = [
  "Ultra-light / Tai Rubber",
  "Medium / EJ",
  "Heavy 150–250m",
  "Extra heavy 250–400m",
  "Commercial 400m+",
  "Industrial winch",
];

export const RULER_ROWS: RulerRow[] = [
  { b: "Shimano", vals: ["200 / 600", "1000 / 2000", "3000 / 4000", "6000 / 9000", "12000", "–"] },
  { b: "Daiwa", vals: ["200", "300 / 400", "500", "750 / 800", "1000 / 1200", "–"] },
  { b: "Banax", vals: ["150", "500", "500TM / 500G", "–", "1000 / 1000G · 7000BM", "–"] },
  { b: "Miya Epoch", vals: ["–", "–", "–", "AT-3S / CX-4", "CZ-9 / CZ-10", "CZ-15 / 20 / 30"] },
  { b: "Penn", vals: ["–", "–", "30 (Fathom)", "50 (Fathom / Intl)", "80W / 130W", "–"] },
];

export interface TierRow {
  tier: string;
  shi: string;
  dai: string;
  bnx: string;
  miy: string;
  pen: string;
}

export const TIER_ROWS: TierRow[] = [
  { tier: "Monster / commercial winch", shi: "BeastMaster MD", dai: "Seaborg MJ · Seapower", bnx: "Mega 7000BM", miy: "Command Z (CZ-15/20/30)", pen: "International Electric" },
  { tier: "Palmable flagship", shi: "BeastMaster / BM EJ", dai: "Seaborg / Seaborg G", bnx: "Kaigen G", miy: "–", pen: "Fathom Electric" },
  { tier: "High-end workhorse", shi: "ForceMaster", dai: "Leobritz", bnx: "Kaigen Standard", miy: "Command AC / CX", pen: "–" },
  { tier: "Budget workhorse", shi: "Plays", dai: "Tanacom", bnx: "Kaigen 150 / 500TM", miy: "Action Tracker", pen: "–" },
  { tier: "Absolute budget", shi: "Plemio", dai: "Tanacom 500", bnx: "Kaigen 150", miy: "–", pen: "–" },
];

// ---------------- Tagging / classification for the lineup filter chips ----------------

export type TierTag = "all" | "flagship" | "workhorse" | "winch" | "budget" | "ej" | "cordless" | "v24";

export const TAG_LABELS: Record<TierTag, string> = {
  all: "All",
  flagship: "Flagship",
  workhorse: "Workhorse",
  winch: "Winch",
  budget: "Budget",
  ej: "Programmable jigging",
  cordless: "Cordless",
  v24: "24V capable",
};

export const TAG_ORDER: TierTag[] = ["all", "flagship", "workhorse", "winch", "budget", "ej", "cordless", "v24"];

// Ported faithfully from the source's classify(). Tags are independent checks, not
// mutually exclusive, so a "Standard Flagship" reel legitimately picks up both
// `flagship` and `workhorse` (it contains both "flagship" and "standard"). The
// source's dead `item.sc && item.sc[1] >= 6` branch on the winch check is omitted —
// this guide's lineup items never carry an `sc` field (see the Brand/ReelSeries
// interfaces above), so that branch could never fire in the original either.
export function classify(item: ReelSeries): TierTag[] {
  const tags: TierTag[] = [];
  const s = item.t.toLowerCase();
  if (s.includes("flagship")) tags.push("flagship");
  if (/commercial|winch|monster|industrial/.test(s)) tags.push("winch");
  if (/workhorse|standard|mid-tier|recreational/.test(s)) tags.push("workhorse");
  if (s.includes("budget")) tags.push("budget");
  if (item.ej) tags.push("ej");
  if (/cordless|integrated/i.test(item.pw)) tags.push("cordless");
  if (/24V/.test(item.pw)) tags.push("v24");
  if (tags.length === 0) tags.push("workhorse");
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

// [min, max, plusBoolean] -> "min–max(+) kg", or "max(+) kg" when min === max.
export function dragRange(d: DragInfo): string | null {
  if (!d) return null;
  const plus = d[2] ? "+" : "";
  return d[0] === d[1] ? d[1].toFixed(1) + plus + " kg" : d[0].toFixed(1) + "–" + d[1].toFixed(1) + plus + " kg";
}

// ---------------- Quadrant plot support ----------------

// `scMax` is included for parity with the source's AXES object, but no lineup item in
// this guide's data carries a size-class field, so ElectricPoint.scMax is always 0 and
// this axis can never plot a point (see the AXES.scMax entry below and AGENTS.md point
// 7). This is the source's actual behaviour, not a bug we're introducing.
export type AxisKey = "price" | "dragMax" | "wMin" | "wMax" | "scMax" | "bearings";

export interface AxisConfig {
  label: string;
  get: (p: ElectricPoint) => number;
  log: boolean;
  fmt: (v: number) => string;
  low: string;
  high: string;
}

export interface ElectricPoint {
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
  drag: DragInfo;
  dragMax: number;
  price: number;
  wMin: number;
  wMax: number;
  bearings: number;
  scMax: number; // always 0 — see the AxisKey comment above
  motor: string | null;
  power: string;
  ej: boolean;
}

// Brand identity colors. Shimano/Daiwa reuse the same site-convention hexes as the
// spinning guide (blue/green). Banax (violet) and Miya (rust) are new brands in this
// set, picked to stay clearly distinct from Shimano/Daiwa and from each other on a
// white background. Penn reuses the same navy documented in ReelGuideIntro.tsx's
// BRAND_WORDMARK_COLORS map, since it's the same real-world brand.
export const BRAND_COLORS: Record<string, string> = {
  shimano: "#0077C0",
  daiwa: "#408A71",
  banax: "#8B5FBF",
  miya: "#C1633C",
  penn: "#002D62",
};

export const POINTS: ElectricPoint[] = (() => {
  const pts: ElectricPoint[] = [];
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
        drag: i.dg,
        dragMax: i.dg ? i.dg[1] : 0,
        price: priceMid(i.p),
        wMin: wr.min,
        wMax: wr.max,
        bearings: bearingCount(i.b),
        scMax: 0,
        motor: i.mo,
        power: i.pw,
        ej: i.ej,
      });
    });
  });
  return pts;
})();

export const AXES: Record<AxisKey, AxisConfig> = {
  price: { label: "Price (USD, midpoint)", get: (p) => p.price, log: true, fmt: (v) => "$" + Math.round(v), low: "Budget", high: "Premium" },
  dragMax: { label: "Max drag (kg, largest confirmed size)", get: (p) => p.dragMax, log: true, fmt: (v) => v.toFixed(v < 10 ? 1 : 0) + "kg", low: "Light drag", high: "Heavy drag" },
  wMin: { label: "Weight – lightest size (g)", get: (p) => p.wMin, log: true, fmt: (v) => Math.round(v) + "g", low: "Featherweight", high: "Heavy" },
  wMax: { label: "Weight – heaviest size (g)", get: (p) => p.wMax, log: true, fmt: (v) => Math.round(v) + "g", low: "Compact range", high: "Deck-monster range" },
  scMax: { label: "Max size class (not tracked for electric reels)", get: (p) => p.scMax, log: true, fmt: (v) => Math.round(v).toString(), low: "Compact", high: "Large" },
  bearings: { label: "Bearing count (BB)", get: (p) => p.bearings, log: false, fmt: (v) => Math.round(v) + " BB", low: "Simple", high: "Refined" },
};

export const DRAG_AXES: Set<AxisKey> = new Set(["dragMax"]);

export const QUAD_LABELS: Record<string, [string, string, string, string]> = {
  "price|dragMax": ["Budget muscle", "Premium winches", "Entry-level, light duty", "Overpriced for the pull"],
  "price|wMin": ["Cheap and heavy", "Expensive and heavy", "Budget featherweights", "Premium featherweights"],
  "price|wMax": ["Budget deck monsters", "Premium deck monsters", "Cheap and compact", "Paying for compactness"],
  "wMin|dragMax": ["Light but brutal", "Heavy and brutal", "Light duty, light weight", "Heavy for what it pulls"],
  "price|bearings": ["Overbuilt for the money", "Flagship refinement", "Bare-bones budget", "Paying for motor, not bearings"],
  "scMax|dragMax": ["Compact, high drag", "Large, high drag", "Compact, light duty", "Large, light duty"],
};

export function median(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
