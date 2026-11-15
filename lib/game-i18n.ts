// Text for the Jigging Master page in English (BI) and Bahasa Melayu (BM).
//
// Fish names, gender values and other data saved to Supabase stay in English, so
// the leaderboard is the same whichever language a player uses; only what is shown
// on screen is translated. The BM text is a working translation: worth a read by a
// native speaker before it goes live.

export type GameLang = "en" | "ms";

const en = {
  // Language switch
  "lang.label": "Language",

  // In-game readouts (game window)
  "hud.line": "Line",
  "hud.unknownTarget": "Unknown target",
  "hud.dragLoad": "Drag load",
  "hud.rodFish": "Rod / fish",
  "align.on": "On line",
  "align.off": "Off line",
  "align.wide": "Way off",
  "hud.fishRunning": "Fish running",
  "hud.letGo": "Let go — give line",
  "hud.spoolEmpty": "Spool empty",
  "hud.jigHanging": "Jig hanging in the current",
  "hud.fishOn": "Fish on — set the hook",
  "hud.tap3": "TAP 3×",
  "ready.tapWater": "Tap the water to drop",
  "ready.changeJig": "Change jig",
  "howToPlay": "How to play",
  "retrieve.aria": "Retrieve the jig and reset the drop",
  "retrieve.label": "Retrieve",

  // Cover and setup (game window)
  "cover.presents": "Fishyology presents",
  "cover.start": "Start the drop",
  "cover.tagline": "20 species · 300 m of water · one leader",
  "cover.line1": "Master the Ocean.",
  "cover.line2": "Conquer the Fight.",
  "setup.title": "Jigging Setup",
  "setup.current": "Current",
  "setup.tideLabel": "{tide} tide",
  "setup.jigWeight": "Jig weight",
  "setup.jigHelp": "Heavier sinks faster and cuts the current, so less line goes out for the same depth.",
  "setup.board": "Board the boat",
  "fit.exit": "Exit full screen",
  "fit.enter": "Fit to screen",

  // Results (game window)
  "result.landed": "Landed",
  "result.weight": "Weight",
  "result.hookedAt": "Hooked at",
  "result.dropAgain": "Drop again",
  "save.saving": "Saving catch to leaderboard...",
  "save.saved": "✓ Logged to Leaderboard!",
  "save.error": "Error saving catch record",
  "save.offline": "Leaderboard offline — playing as guest",
  "save.login": "Log in with Google to post score",
  "save.profile": "Complete your profile to post score",
  "lost.snappedTitle": "Leader parted",
  "lost.escapedTitle": "Hook pulled",
  "lost.escapedBody": "The line went slack and the hook fell out. Keep some load on it, even while you are giving line.",
  "lost.snappedCta": "Rig a new leader",
  "lost.escapedCta": "Reel up and retie",
  "snap.monster": "A monster {fish} hit your jig and snapped the leader on impact.",
  "snap.spoolEmpty": "A heavy strike, but the spool was already empty. Nothing left to give.",
  "snap.midRun": "You leaned on it mid-run. The {fish} took the leader with it.",
  "snap.redline": "Drag redlined. The {fish} shook as you cranked through it.",
  "snap.spooled": "The {fish} spooled you. Four hundred metres, all of it gone.",

  // Tutorial controls (game window)
  "tut.back": "Back",
  "tut.next": "Next",
  "tut.start": "Start fishing",
  "tut.skip": "Skip",
  "tut.hintTouch": "Tap anywhere to continue",
  "tut.hintMouse": "Click anywhere, or use ← →",

  // Page: hero
  "hero.subtitle": "The Fishyology Creative Studio",
  "hero.tagline": "Master the Ocean. Conquer the Fight.",
  "playNow": "Play now",

  // Page: leaderboard
  "lb.title": "Season 1 Leaderboard",
  "lb.dates": "December 1, 2026 – December 31, 2026",
  "lb.endsIn": "Ends in",
  "lb.titleTest": "Testing Phase Leaderboard",
  "lb.datesTest": "Now – November 30, 2026",
  "lb.startsIn": "Season 1 starts in",
  "lb.testChip": "Testing phase",
  "lb.rulesTest": "Testing phase: play, break things and tell us what you find. Scores until November 30 are for practice and do not count towards Season 1, which opens on a fresh board on December 1.",
  "lb.emptyTitleTest": "No test catches logged yet",
  "lb.emptyBodyTest": "Land the first fish of the testing phase and your name opens the board.",
  "lb.countdown": "{d}d {h}h {m}m {s}s",
  "lb.concluded": "Season Concluded",
  "lb.rules": "Ranked by the heaviest catch of the season. Winners are contacted at the Google email they signed in with.",
  "lb.offline": "The leaderboard is offline right now. You can still play as a guest.",
  "lb.loading": "Loading records…",
  "lb.emptyTitle": "No catches logged for Season 1 yet",
  "lb.emptyBody": "Land the first fish of the season and your name opens the board.",
  "lb.top3": "Top three catches",
  "lb.place": "Place ",
  "lb.unknownAngler": "Unknown Angler",

  // Page: sign-in bar and messages
  "auth.guest": "Playing as guest — sign-in is unavailable right now",
  "auth.checking": "Checking session…",
  "auth.signedIn": "Signed in — your catches will post here",
  "auth.editProfile": "Edit Profile",
  "auth.logout": "Log Out",
  "auth.needProfile": "Signed in — finish your profile to post catches",
  "auth.completeProfile": "Complete Profile",
  "auth.wantName": "Want your name on the board?",
  "auth.google": "Log in with Google",
  "err.profileLoad": "Couldn't load your profile. Refresh to try again.",
  "err.signIn": "Couldn't start Google sign-in. Please try again.",
  "err.logout": "Couldn't log out. Please try again.",
  "err.heldCatch": "Couldn't post the catch from before you signed in.",
  "notice.heldCatch": "Your catch from before you signed in is on the leaderboard.",

  // Page: about
  "about.title": "The ocean rewards skill, patience, and precision.",
  "about.species": "Saltwater species",
  "about.tides": "Tide strengths",
  "about.live": "Live leaderboard",
  "about.body": "Read the tide, choose your jig and work every layer of the water column. Giant Groupers dive for cover, Dogtooth Tuna unleash blistering runs and Sailfish explode across the surface, so every fight asks for a different touch.",
  "about.closing1": "The fish are wild. The ocean is unforgiving.",
  "about.closing2": "Become the Jigging Master.",

  // Profile form
  "pf.eyebrowEdit": "Your Angler Profile",
  "pf.eyebrowCreate": "Welcome Angler",
  "pf.titleEdit": "Edit Profile",
  "pf.titleCreate": "Complete Profile",
  "pf.displayName": "Display Name",
  "pf.placeholder": "e.g., JigMaster99",
  "pf.gender": "Gender",
  "pf.optional": "(optional)",
  "pf.male": "Male",
  "pf.female": "Female",
  "pf.na": "Prefer not to say",
  "pf.state": "Malaysian State",
  "pf.selectState": "Select your state",
  "pf.avatar": "Select Avatar",
  "pf.avatarN": "Avatar {n}",
  "pf.missName": "a display name",
  "pf.missState": "your state",
  "pf.missAvatar": "an avatar",
  "pf.and": "and",
  "pf.hint": "Add {missing} to save.",
  "pf.saveError": "Couldn't save your profile. Please try again.",
  "pf.cancel": "Cancel",
  "pf.saving": "Saving…",
  "pf.saveChanges": "Save Changes",
  "pf.saveProfile": "Save Profile",

  // Catch card and Fish Log
  "card.view": "View catch card",
  "card.save": "Save / share card",
  "card.saving": "Preparing…",
  "card.saveError": "Couldn't make the image. Try again.",
  "card.close": "Close",
  "card.landedBy": "Landed by {name}",
  "card.yourWeight": "Your weight",
  "card.caughtAt": "Caught at",
  "card.rating": "Rating",
  "card.caught": "Caught",
  "card.times": "{n}×",
  "card.yourBest": "Your best",
  "card.record": "Record",
  "card.by": "by {name}",
  "card.pb": "Personal best",
  "card.newRecord": "New record",
  "card.first": "First catch",
  "card.depthBand": "Depth band",
  "card.guest": "Guest",
  "card.footer": "Relive Our Journey",
  "tier.common": "Common",
  "tier.good": "Good",
  "tier.big": "Big",
  "tier.trophy": "Trophy",
  "tier.legendary": "Legendary",
  "log.open": "Fish Log",
  "log.title": "Your Fish Log",
  "log.summary": "{caught} of {total} species · {catches} catches",
  "log.loading": "Loading your log…",
  "log.error": "Couldn't load your log. Try again.",
  "log.guestNote": "Saved on this device only. Sign in and finish your profile to keep your log.",
  "log.notCaught": "Not caught yet",
  "log.viewCard": "Open card",
};

export type GameStringKey = keyof typeof en;

const ms: Record<GameStringKey, string> = {
  "lang.label": "Bahasa",

  "hud.line": "Tali",
  "hud.unknownTarget": "Sasaran tidak diketahui",
  "hud.dragLoad": "Beban drag",
  "hud.rodFish": "Joran / ikan",
  "align.on": "Sejajar",
  "align.off": "Tersasar",
  "align.wide": "Jauh tersasar",
  "hud.fishRunning": "Ikan sedang lari",
  "hud.letGo": "Lepaskan — beri tali",
  "hud.spoolEmpty": "Gelendong kosong",
  "hud.jigHanging": "Jig tergantung dalam arus",
  "hud.fishOn": "Ikan menyambar — sangkutkan mata kail",
  "hud.tap3": "KETIK 3×",
  "ready.tapWater": "Ketik air untuk melabuh",
  "ready.changeJig": "Tukar jig",
  "howToPlay": "Cara bermain",
  "retrieve.aria": "Tarik naik jig dan ulang labuhan",
  "retrieve.label": "Tarik Naik",

  "cover.presents": "Fishyology mempersembahkan",
  "cover.start": "Mula melabuh",
  "cover.tagline": "20 spesies · 300 m air · seorang juara",
  "cover.line1": "Kuasai lautan.",
  "cover.line2": "Menangi pertarungan.",
  "setup.title": "Persediaan Jigging",
  "setup.current": "Arus",
  "setup.tideLabel": "{tide}",
  "setup.jigWeight": "Berat jig",
  "setup.jigHelp": "Jig yang lebih berat tenggelam lebih laju dan membelah arus, jadi kurang tali keluar untuk kedalaman yang sama.",
  "setup.board": "Naik bot",
  "fit.exit": "Keluar skrin penuh",
  "fit.enter": "Muat ke skrin",

  "result.landed": "Berjaya didaratkan",
  "result.weight": "Berat",
  "result.hookedAt": "Disambar pada",
  "result.dropAgain": "Labuh semula",
  "save.saving": "Menyimpan tangkapan ke carta kedudukan...",
  "save.saved": "✓ Direkodkan di Carta Kedudukan!",
  "save.error": "Ralat menyimpan rekod tangkapan",
  "save.offline": "Carta kedudukan luar talian — bermain sebagai tetamu",
  "save.login": "Log masuk dengan Google untuk menghantar skor",
  "save.profile": "Lengkapkan profil anda untuk menghantar skor",
  "lost.snappedTitle": "Leader putus",
  "lost.escapedTitle": "Mata kail tercabut",
  "lost.escapedBody": "Tali kendur dan mata kail tercabut. Kekalkan sedikit beban, walaupun ketika memberi tali.",
  "lost.snappedCta": "Pasang leader baharu",
  "lost.escapedCta": "Gulung naik dan ikat semula",
  "snap.monster": "Seekor {fish} gergasi menyambar jig anda dan terus memutuskan leader.",
  "snap.spoolEmpty": "Sambaran yang berat, tetapi gelendong sudah kosong. Tiada lagi tali untuk diberi.",
  "snap.midRun": "Anda menahan ketika ia sedang lari. {fish} itu membawa lari leader anda.",
  "snap.redline": "Drag melampaui had. {fish} itu meronta ketika anda terus menggulung.",
  "snap.spooled": "{fish} itu menghabiskan tali anda. Empat ratus meter, semuanya habis.",

  "tut.back": "Kembali",
  "tut.next": "Seterusnya",
  "tut.start": "Mula memancing",
  "tut.skip": "Langkau",
  "tut.hintTouch": "Ketik di mana-mana untuk teruskan",
  "tut.hintMouse": "Klik di mana-mana, atau guna ← →",

  "hero.subtitle": "The Fishyology Creative Studio",
  "hero.tagline": "Kuasai lautan. Menangi pertarungan.",
  "playNow": "Main sekarang",

  "lb.title": "Carta Kedudukan Musim 1",
  "lb.dates": "1 Disember 2026 – 31 Disember 2026",
  "lb.endsIn": "Berakhir dalam",
  "lb.titleTest": "Carta Kedudukan Fasa Ujian",
  "lb.datesTest": "Kini – 30 November 2026",
  "lb.startsIn": "Musim 1 bermula dalam",
  "lb.testChip": "Fasa ujian",
  "lb.rulesTest": "Fasa ujian: bermain, cuba semua dan beritahu kami apa yang anda temui. Skor hingga 30 November hanyalah untuk latihan dan tidak dikira untuk Musim 1, yang dibuka dengan carta baharu pada 1 Disember.",
  "lb.emptyTitleTest": "Belum ada tangkapan ujian",
  "lb.emptyBodyTest": "Daratkan ikan pertama fasa ujian dan jadilah nama pertama di carta kedudukan.",
  "lb.countdown": "{d} hari {h}j {m}m {s}s",
  "lb.concluded": "Musim Tamat",
  "lb.rules": "Kedudukan mengikut tangkapan paling berat sepanjang musim. Pemenang akan dihubungi melalui e-mel Google yang digunakan semasa log masuk.",
  "lb.offline": "Carta kedudukan sedang luar talian. Anda masih boleh bermain sebagai tetamu.",
  "lb.loading": "Memuatkan rekod…",
  "lb.emptyTitle": "Belum ada tangkapan untuk Musim 1",
  "lb.emptyBody": "Daratkan ikan pertama musim ini dan jadilah nama pertama di carta kedudukan.",
  "lb.top3": "Tiga tangkapan teratas",
  "lb.place": "Tempat ",
  "lb.unknownAngler": "Pemancing Tanpa Nama",

  "auth.guest": "Bermain sebagai tetamu — log masuk tidak tersedia buat masa ini",
  "auth.checking": "Menyemak sesi…",
  "auth.signedIn": "Sudah log masuk — tangkapan anda akan dipaparkan di sini",
  "auth.editProfile": "Sunting Profil",
  "auth.logout": "Log Keluar",
  "auth.needProfile": "Sudah log masuk — lengkapkan profil untuk menghantar tangkapan",
  "auth.completeProfile": "Lengkapkan Profil",
  "auth.wantName": "Mahu nama anda di carta kedudukan?",
  "auth.google": "Log masuk dengan Google",
  "err.profileLoad": "Profil anda tidak dapat dimuatkan. Muat semula untuk cuba lagi.",
  "err.signIn": "Log masuk Google tidak dapat dimulakan. Sila cuba lagi.",
  "err.logout": "Tidak dapat log keluar. Sila cuba lagi.",
  "err.heldCatch": "Tangkapan sebelum anda log masuk tidak dapat dihantar.",
  "notice.heldCatch": "Tangkapan anda sebelum log masuk kini di carta kedudukan.",

  "about.title": "Lautan memberi ganjaran kepada kemahiran, kesabaran dan ketepatan.",
  "about.species": "Spesies air masin",
  "about.tides": "Kekuatan air pasang",
  "about.live": "Carta Kedudukan Terkini",
  "about.body": "Baca air pasang, pilih jig anda dan kerjakan setiap lapisan turus air. Giant Grouper menyelam ke tempat persembunyian, Dogtooth Tuna meluncur laju dan Sailfish melompat di permukaan, jadi setiap pertarungan memerlukan sentuhan yang berbeza.",
  "about.closing1": "The fish are wild. The ocean is unforgiving.",
  "about.closing2": "Become the Jigging Master.",

  "pf.eyebrowEdit": "Profil Pemancing Anda",
  "pf.eyebrowCreate": "Selamat Datang, Pemancing",
  "pf.titleEdit": "Sunting Profil",
  "pf.titleCreate": "Lengkapkan Profil",
  "pf.displayName": "Nama Paparan",
  "pf.placeholder": "cth., JigMaster99",
  "pf.gender": "Jantina",
  "pf.optional": "(pilihan)",
  "pf.male": "Lelaki",
  "pf.female": "Perempuan",
  "pf.na": "Tidak mahu nyatakan",
  "pf.state": "Negeri",
  "pf.selectState": "Pilih negeri anda",
  "pf.avatar": "Pilih Avatar",
  "pf.avatarN": "Avatar {n}",
  "pf.missName": "nama paparan",
  "pf.missState": "negeri anda",
  "pf.missAvatar": "avatar",
  "pf.and": "dan",
  "pf.hint": "Tambah {missing} untuk menyimpan.",
  "pf.saveError": "Profil anda tidak dapat disimpan. Sila cuba lagi.",
  "pf.cancel": "Batal",
  "pf.saving": "Menyimpan…",
  "pf.saveChanges": "Simpan Perubahan",
  "pf.saveProfile": "Simpan Profil",

  "card.view": "Lihat kad tangkapan",
  "card.save": "Simpan / kongsi kad",
  "card.saving": "Menyediakan…",
  "card.saveError": "Imej tidak dapat dibuat. Cuba lagi.",
  "card.close": "Tutup",
  "card.landedBy": "Ditangkap oleh {name}",
  "card.yourWeight": "Berat anda",
  "card.caughtAt": "Ditangkap pada",
  "card.rating": "Penilaian",
  "card.caught": "Ditangkap",
  "card.times": "{n}×",
  "card.yourBest": "Terbaik anda",
  "card.record": "Rekod",
  "card.by": "oleh {name}",
  "card.pb": "Terbaik peribadi",
  "card.newRecord": "Rekod baharu",
  "card.first": "Tangkapan pertama",
  "card.depthBand": "Lapisan kedalaman",
  "card.guest": "Tetamu",
  "card.footer": "Relive Our Journey",
  "tier.common": "Biasa",
  "tier.good": "Bagus",
  "tier.big": "Besar",
  "tier.trophy": "Trofi",
  "tier.legendary": "Legenda",
  "log.open": "Log Ikan",
  "log.title": "Log Ikan Anda",
  "log.summary": "{caught} daripada {total} spesies · {catches} tangkapan",
  "log.loading": "Memuatkan log anda…",
  "log.error": "Log anda tidak dapat dimuatkan. Cuba lagi.",
  "log.guestNote": "Disimpan pada peranti ini sahaja. Log masuk dan lengkapkan profil untuk menyimpan log anda.",
  "log.notCaught": "Belum ditangkap",
  "log.viewCard": "Buka kad",
};

const STRINGS: Record<GameLang, Record<GameStringKey, string>> = { en, ms };

/** The string for a key in a language, with {placeholders} filled in. */
export function translate(
  lang: GameLang,
  key: GameStringKey,
  params?: Record<string, string | number>
): string {
  let text = STRINGS[lang][key] ?? en[key];
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

/** BM text for the ten tutorial steps, in the same order as TUTORIAL_STEPS. */
export const TUTORIAL_MS: { eyebrow: string; title: string; body: string }[] = [
  { eyebrow: "Labuh", title: "Tahan untuk angkat, lepas untuk tenggelam", body: "Ketik air untuk melabuhkan jig. Tahan untuk mengangkatnya, lepas untuk membiarkannya berkibar turun semula." },
  { eyebrow: "Kedalaman", title: "Tangga ini ialah turus air", body: "Jig anda bergerak pada skala ini dari permukaan hingga 300 m. Setiap ikan ada lapisan kedalaman tempat ia hidup." },
  { eyebrow: "Tali", title: "Tali keluar sentiasa melebihi kedalaman", body: "Arus melengkungkan tali, jadi gelendong sentiasa melepaskan lebih banyak meter daripada kedalaman jig anda." },
  { eyebrow: "Keadaan", title: "Air pasang menentukan cabarannya", body: "Jig yang lebih berat membelah arus dan kekal pada kedalamannya." },
  { eyebrow: "Tarik Naik", title: "Gulung naik dengan satu ketikan", body: "Terlalu dalam atau tersalah pilih jig? Tarik Naik membawa jig terus ke atas supaya anda boleh memilih semula. Butang ini hilang apabila ikan sudah menyambar." },
  { eyebrow: "Sambaran", title: "Tiga ketikan, pantas", body: "Apabila ikan menyambar, anda ada kira-kira dua saat untuk menyangkutkan mata kail. Tiga ketikan memulakan pertarungan." },
  { eyebrow: "Pertarungan", title: "Tahan untuk gulung, lepas untuk beri tali", body: "Menahan menarik ikan naik tetapi membebankan drag. Melepaskan mengurangkan beban." },
  { eyebrow: "Sasaran", title: "Halakan joran pada ikan", body: "Seret ke kiri dan kanan untuk menghayun hujung joran. Menggulung ketika kedua-duanya tidak sejajar akan menaikkan beban dengan cepat." },
  { eyebrow: "Larian", title: "Bila ini menyala, berhenti menggulung", body: "Ikan yang sedang lari akan mengambil tali walau apa pun anda lakukan. Lepaskan dan biarkan ia reda." },
  { eyebrow: "Daratkan", title: "Sifar meter ialah bot", body: "Bawa penanda naik tangga hingga ke permukaan dan ikan itu milik anda." },
];

/** BM names for the fish types shown on the catch screen. */
const ARCHETYPE_MS: Record<string, string> = {
  "Panfish": "Ikan Kecil",
  "Speedster": "Pelumba",
  "Acrobat": "Akrobat",
  "Ambusher": "Penyerang Hendap",
  "Screamer": "Pelari Laju",
  "Bulldog": "Penarik Degil",
  "Grinder": "Penahan Lasak",
  "Reef Diver": "Penyelam Karang",
  "Brute": "Gergasi Ganas",
  "Marathoner": "Pelari Jarak Jauh",
  "Reef Cutter": "Pemutus Karang",
  "Deep Steady": "Penarik Dalam",
  "Dead Weight": "Beban Mati",
  "Reef Titan": "Raja Karang",
};

/** BM tide names, keyed by the English short name. */
const TIDE_MS: Record<string, { name: string; short: string }> = {
  "Neap": { name: "Air Mati (Ringan)", short: "Air Mati" },
  "Standard": { name: "Biasa (Sederhana)", short: "Biasa" },
  "Spring": { name: "Air Hidup (Kuat)", short: "Air Hidup" },
};

/** BM moon phase names, keyed by the English name. */
const MOON_MS: Record<string, string> = {
  "New Moon": "Bulan Baharu",
  "Waxing Crescent": "Bulan Sabit Muda",
  "First Quarter": "Suku Pertama",
  "Waxing Gibbous": "Bulan Cembung Muda",
  "Full Moon": "Bulan Purnama",
  "Waning Gibbous": "Bulan Cembung Tua",
  "Last Quarter": "Suku Akhir",
  "Waning Crescent": "Bulan Sabit Tua",
};

const DIFFICULTY: Record<GameLang, string[]> = {
  en: ["", "Easy", "Moderate", "Tough", "Hard", "Brutal"],
  ms: ["", "Mudah", "Sederhana", "Mencabar", "Sukar", "Sangat Sukar"],
};

export const archetypeLabel = (lang: GameLang, archetype: string) =>
  lang === "ms" ? ARCHETYPE_MS[archetype] ?? archetype : archetype;

export const tideName = (lang: GameLang, tide: { name: string; short: string }) =>
  lang === "ms" ? TIDE_MS[tide.short]?.name ?? tide.name : tide.name;

export const tideShort = (lang: GameLang, tide: { short: string }) =>
  lang === "ms" ? TIDE_MS[tide.short]?.short ?? tide.short : tide.short;

export const moonLabel = (lang: GameLang, phase: string) =>
  lang === "ms" ? MOON_MS[phase] ?? phase : phase;

export const difficultyText = (lang: GameLang, stars: number) => DIFFICULTY[lang][stars] || "";
