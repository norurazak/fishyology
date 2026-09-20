/**
 * The shape both gallery surfaces (the About page's plates, a trip's photos)
 * render through. Each domain keeps its own richer type — `GalleryPlate` in
 * lib/gallery.ts, a trip's photo list in lib/trips.ts — and maps down to this
 * before handing items to GalleryStrip / GallerySpread.
 */
export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  caption?: string;
  /**
   * Rendered as the meta row on the caption page — visible value with a
   * screen-reader-only label, e.g. [{ label: "Location", value: "..." }].
   */
  meta?: { label: string; value: string }[];
}
