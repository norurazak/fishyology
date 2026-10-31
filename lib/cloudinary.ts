const UPLOAD_SEGMENT = "/image/upload/";

/** Full-bleed heroes: wide enough for large screens, down to phones. */
export const HERO_WIDTHS = [828, 1280, 1920, 2560];
/** Cards and thumbnails. */
export const CARD_WIDTHS = [400, 640, 960, 1280];

/** "auto" for photos; "auto:best" for heroes and anything with fine text or line art. */
export type CloudinaryQuality = "auto" | "auto:best";

interface CloudinaryImageOptions {
  sizes: string;
  widths?: number[];
  quality?: CloudinaryQuality;
}

function transformedUrl(base: string, path: string, width: number, quality: CloudinaryQuality) {
  return `${base}${UPLOAD_SEGMENT}f_auto,q_${quality},c_limit,w_${width}/${path}`;
}

/** True when a URL is a Cloudinary upload with no transformation applied yet. */
function isPlainUpload(path?: string): path is string {
  return !!path && !/^[a-z]{1,3}_[^/]+\//.test(path);
}

/**
 * A 1200×630 JPEG for link previews. WhatsApp and Facebook need a plain format
 * and these proportions, so this skips the f_auto used on the site itself.
 */
export function cloudinaryShareImage(src: string): string {
  const [base, path] = src.split(UPLOAD_SEGMENT);
  if (!isPlainUpload(path)) return src;
  return `${base}${UPLOAD_SEGMENT}f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/${path}`;
}

/**
 * Props for a plain <img> showing a Cloudinary upload: a srcset of resized,
 * modern-format versions instead of the full-size original. The original in
 * Cloudinary is untouched. Non-Cloudinary or already-transformed URLs pass
 * through as they are.
 */
export function cloudinaryImage(
  src: string,
  { sizes, widths = CARD_WIDTHS, quality = "auto" }: CloudinaryImageOptions
): { src: string; srcSet?: string; sizes?: string } {
  const [base, path] = src.split(UPLOAD_SEGMENT);
  if (!isPlainUpload(path)) return { src };

  return {
    src: transformedUrl(base, path, widths[widths.length - 1], quality),
    srcSet: widths.map((w) => `${transformedUrl(base, path, w, quality)} ${w}w`).join(", "),
    sizes,
  };
}
