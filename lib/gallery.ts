import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import {
  extractField,
  fieldAsParagraphs,
  fieldAsSingleLine,
  slugify,
  splitEntryBlocks,
} from "@/lib/mdxFields";

const galleryFilePath = path.join(process.cwd(), "content", "gallery.mdx");

const FrontmatterSchema = z.object({
  title: z.string(),
  updated: z.string(),
});

export interface GalleryPlate {
  slug: string;
  title: string;
  image: string;
  /** Falls back to the title when the author hasn't written one. */
  alt: string;
  caption: string;
  location: string;
  year: string;
  credit: string;
}

function parsePlateBlock(block: string): GalleryPlate | null {
  const lines = block.split("\n");
  const title = lines[0].trim();
  const body = lines.slice(1);

  const image = fieldAsSingleLine(extractField(body, "Image"));
  // An entry without a usable image is skipped rather than rendered broken, so
  // a half-written plate can't take the page down.
  if (!image.startsWith("http")) return null;

  const alt = fieldAsSingleLine(extractField(body, "Alt"));

  return {
    slug: slugify(title),
    title,
    image,
    alt: alt || title,
    caption: fieldAsParagraphs(extractField(body, "Caption")),
    location: fieldAsSingleLine(extractField(body, "Location")),
    year: fieldAsSingleLine(extractField(body, "Year")),
    credit: fieldAsSingleLine(extractField(body, "Credit")),
  };
}

export function getGalleryPlates(): GalleryPlate[] {
  const fileContents = fs.readFileSync(galleryFilePath, "utf8");
  const { data, content } = matter(fileContents);
  FrontmatterSchema.parse(data);

  // Each "### {Plate Title}" heading under "## Plates" becomes one plate.
  return splitEntryBlocks(content, "## Plates")
    .map(parsePlateBlock)
    .filter((plate): plate is GalleryPlate => plate !== null);
}
