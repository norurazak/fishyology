/**
 * Species artwork on Cloudinary. To add a fish, upload it and add one line here:
 * the species name (as in the game's fish table) and the part of the Cloudinary URL
 * after /image/upload/, for example "v1794750201/Queenfish-Fishyology_fimay3.jpg".
 * A species with no entry shows the grey fish silhouette on its card.
 */
const BASE = "https://res.cloudinary.com/dub3h3elq/image/upload";

const FISH_IMAGES: Record<string, string> = {
  Queenfish: "v1794750201/Queenfish-Fishyology_fimay3.jpg",
  Cobia: "v1794750805/Cobia_-_Fishyology_dbzjsj.jpg",
  "Mahi-Mahi": "v1794750908/Mahi-Mahi-Fishyology_jmxlzp.jpg",
  Kembong: "v1794908954/Kembong_htkyge.jpg",
  "Great Barracuda": "v1794908953/Great_Barracuda_tuotvc.jpg",
  "Rainbow Runner": "v1794908953/Rainbow_Runner_uszlzg.jpg",
  "Coral Trout": "v1794909493/Coral_Trout_clyxig.jpg",
  "Green Jobfish": "v1794908953/Green_Jobfish_c3274r.jpg",
  "Dogtooth Tuna": "v1794908954/Dogtooth_Tuna_ummy4g.jpg",
  Amberjack: "v1794908957/Amberjack_hdye29.jpg",
  "Ruby Snapper": "v1794908954/Ruby_Snapper_kucxeu.jpg",
  "Rosy Jobfish": "v1794908953/Rosy_Jobfish_qlojse.jpg",
  "Eightbar Grouper": "v1794908953/Eightbar_Grouper_i87tzi.jpg",
  "Narrow-barred Spanish Mackerel": "v1794927200/Narrow_Barred_Spanish_Mackerel_-Fishyology_pnynxh.jpg",
  "Golden Trevally": "v1794927345/Gemini_Generated_Image_isbyp1isbyp1isby_qr6hgj.jpg",
  "Giant Trevally":"v1794927191/Giant_Trevalley_hisk85.jpg",
  Sailfish: "v1794927191/Pacific-Sailfish-Fishyology_krmk0l.jpg",
  "Giant Grouper": "v1794927226/Gemini_Generated_Image_5wdsj35wdsj35wds_guu1iv.jpg",
  "Almaco Jack": "v1794908953/Almaco_Jack_mz06x2.jpg",
  Oilfish: "v1794908967/Oilfish_jzfzhy.jpg",
};

/**
 * A 720 px wide, modern-format version of the species image, or null if there is none yet.
 * Every image is cropped to Cobia's shape (2752 x 1536), so all species sit in the card's
 * picture area at the same size, whatever shape the original was uploaded in.
 */
export function fishImageUrl(name: string): string | null {
  const path = FISH_IMAGES[name];
  return path ? `${BASE}/f_auto,q_auto,c_fill,ar_2752:1536,g_center,w_720/${path}` : null;
}
