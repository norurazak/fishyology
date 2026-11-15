import type { GameLang } from "@/lib/game-i18n";

/** A scientific name and one-line description for each species, shown on the catch card. */
export const FISH_INFO: Record<string, { sci: string; en: string; ms: string }> = {
  "Kembong": {
    sci: "Rastrelliger kanagurta",
    en: "A schooling mackerel of Malaysia's coastal waters, filtering plankton in dense shoals and a staple of local kitchens.",
    ms: "Ikan kembung yang berkumpulan di perairan pantai Malaysia, menapis plankton dalam kawanan padat dan hidangan asas dapur tempatan.",
  },
  "Queenfish": {
    sci: "Scomberoides commersonnianus",
    en: "A fast, silver jack with dark blotches along its side that chases small fish and bursts into sudden, flashy runs.",
    ms: "Ikan jek perak yang laju dengan tompok gelap di sisi, memburu ikan kecil dan meluru tiba-tiba dengan larian yang mengejutkan.",
  },
  "Mahi-Mahi": {
    sci: "Coryphaena hippurus",
    en: "A fast-growing, gold-and-green open-ocean hunter, famous for leaping clear of the water when hooked.",
    ms: "Pemburu lautan terbuka yang cepat membesar, berwarna emas dan hijau, terkenal melompat keluar dari air apabila terkail.",
  },
  "Barracuda": {
    sci: "Sphyraena barracuda",
    en: "A long, silver ambush predator with a mouthful of fangs that strikes from stillness in one violent burst.",
    ms: "Pemangsa penyergap yang panjang dan keperakan dengan mulut penuh taring, menyerang dari keadaan diam dalam satu letusan ganas.",
  },
  "Tenggiri": {
    sci: "Scomberomorus commerson",
    en: "A streamlined Spanish mackerel with narrow bars, built for blistering runs and prized across the region as a table fish.",
    ms: "Ikan tenggiri yang ramping dengan belang halus, dibina untuk larian pantas dan dihargai di seluruh rantau sebagai ikan hidangan.",
  },
  "Rainbow Runner": {
    sci: "Elagatis bipinnulata",
    en: "A slender jack with blue and yellow stripes that cruises offshore in fast, tight schools.",
    ms: "Ikan jek langsing berjalur biru dan kuning yang meronda di lepas pantai dalam kawanan laju dan padat.",
  },
  "Golden Trevally": {
    sci: "Gnathanodon speciosus",
    en: "A golden jack that roots along the bottom for small prey, then fights with strong, steady pulls.",
    ms: "Ikan jek keemasan yang mencari mangsa kecil di dasar, kemudian melawan dengan tarikan yang kuat dan mantap.",
  },
  "Cobia": {
    sci: "Rachycentron canadum",
    en: "A solitary, broad-headed fish that often shadows rays and sharks, and a dogged, tireless fighter.",
    ms: "Ikan bersendirian berkepala lebar yang sering mengekori pari dan jerung, dan pelawan yang gigih serta tidak penat.",
  },
  "Coral Trout": {
    sci: "Plectropomus leopardus",
    en: "A red, blue-spotted reef predator that ambushes prey around coral and bolts for cover the moment it is hooked.",
    ms: "Pemangsa terumbu merah berbintik biru yang menyergap mangsa di sekitar karang dan meluru berlindung sebaik sahaja terkail.",
  },
  "Giant Trevally": {
    sci: "Caranx ignobilis",
    en: "The reef's heavyweight jack, thick-shouldered and relentless, known for smashing lures and fighting to the last.",
    ms: "Jek berat terumbu yang bahunya tebal dan tidak mengalah, terkenal menerkam umpan dan melawan sehingga akhir.",
  },
  "Sailfish": {
    sci: "Istiophorus platypterus",
    en: "A billfish with a towering sail-like fin, among the fastest in the sea, making long runs and leaps across the surface.",
    ms: "Ikan paruh dengan sirip tinggi seperti layar, antara yang terpantas di laut, membuat larian panjang dan lompatan di permukaan.",
  },
  "Green Jobfish": {
    sci: "Aprion virescens",
    en: "A deep-bodied, olive-green snapper that prowls reefs and drop-offs and darts hard when it feels the hook.",
    ms: "Ikan merah berbadan dalam dan hijau zaitun yang meronda di terumbu dan cerun curam, meluru laju apabila terasa kail.",
  },
  "Dogtooth Tuna": {
    sci: "Gymnosarda unicolor",
    en: "A reef-edge tuna with conical teeth and one of the hardest pulls in the sea, with an explosive first run.",
    ms: "Tuna tepi terumbu bergigi tirus dengan tarikan antara yang paling kuat di laut, bermula dengan larian pertama yang meletup.",
  },
  "Amberjack": {
    sci: "Seriola dumerili",
    en: "A powerful, deep-diving jack with an amber stripe through the eye, famous for sheer endurance.",
    ms: "Ikan jek yang kuat dan menyelam dalam dengan jalur ambar melalui mata, terkenal dengan ketahanan yang luar biasa.",
  },
  "Ruby Snapper": {
    sci: "Etelis carbunculus",
    en: "A deep-water red snapper of rocky slopes, giving a slow, heavy and honest pull all the way up.",
    ms: "Ikan merah laut dalam di cerun berbatu, memberi tarikan yang perlahan, berat dan jujur sepanjang perjalanan ke atas.",
  },
  "Rosy Jobfish": {
    sci: "Pristipomoides filamentosus",
    en: "A pink-tinted snapper of the deep slopes, prized at the table and found hundreds of metres down.",
    ms: "Ikan merah kemerah-jambuan di cerun dalam, dihargai sebagai hidangan dan ditemui ratusan meter ke bawah.",
  },
  "Eightbar Grouper": {
    sci: "Hyporthodus octofasciatus",
    en: "A heavy grouper of the deep reef, banded with dark bars, that dives for caves and ledges the moment it is hooked.",
    ms: "Kerapu berat di terumbu dalam dengan belang gelap, menyelam ke gua dan tebing sebaik sahaja terkail.",
  },
  "Almaco Jack": {
    sci: "Seriola rivoliana",
    en: "A dark, deep-bodied jack that patrols reefs and open water and wears anglers down with tireless pulling.",
    ms: "Ikan jek gelap berbadan dalam yang meronda di terumbu dan air terbuka, memenatkan pemancing dengan tarikan yang tidak kenal lelah.",
  },
  "Oilfish": {
    sci: "Ruvettus pretiosus",
    en: "A dark, rough-skinned deep-water fish with very oily flesh, sluggish but crushingly heavy on the line.",
    ms: "Ikan laut dalam berkulit kasar dan gelap dengan isi sangat berminyak, lembap tetapi sangat berat pada tali.",
  },
  "Giant Grouper": {
    sci: "Epinephelus lanceolatus",
    en: "The largest bony fish of the coral reef, an enormous grouper that swallows prey whole and dives for cover.",
    ms: "Ikan bertulang terbesar di terumbu karang, kerapu gergasi yang menelan mangsa bulat-bulat dan menyelam untuk berlindung.",
  },
};

export function fishInfo(name: string, lang: GameLang) {
  const info = FISH_INFO[name];
  return info ? { sci: info.sci, text: lang === "ms" ? info.ms : info.en } : null;
}
