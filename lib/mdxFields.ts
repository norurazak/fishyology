/**
 * Shared parsing for the "- **Label:** value" content files under /content
 * (trips.mdx, gallery.mdx). Each file is a list of `### {Title}` blocks whose
 * body is a flat list of labelled fields, so authors can add an entry by
 * copying a template rather than editing code.
 *
 * These helpers are format-only — entity-specific parsing (prices, coordinates)
 * stays with the module that owns the entity.
 */

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Strips HTML comments (authoring notes and the copy-paste TEMPLATE block) so
 * they're never parsed as real entries.
 */
export function stripComments(markdown: string): string {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}

/**
 * Returns the raw lines belonging to one labelled field, or null when the
 * field is absent. Reads from the label to the next top-level field, so a
 * value may span multiple lines.
 */
export function extractField(lines: string[], label: string): string[] | null {
  const startIndex = lines.findIndex((line) =>
    new RegExp(`^-\\s*\\*\\*${label}:\\*\\*`, "i").test(line.trim())
  );
  if (startIndex === -1) return null;

  const firstLineMatch = lines[startIndex]
    .trim()
    .match(new RegExp(`^-\\s*\\*\\*${label}:\\*\\*\\s?(.*)$`, "i"));
  const content: string[] = [firstLineMatch?.[1] ?? ""];

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    // Stop at the next top-level "- **Label:**" field.
    if (/^-\s*\*\*[^*]+:\*\*/.test(line.trim())) break;
    content.push(line);
  }

  return content;
}

export function fieldAsParagraphs(lines: string[] | null): string {
  if (!lines) return "";
  return lines
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join("\n\n");
}

export function fieldAsSingleLine(lines: string[] | null): string {
  if (!lines) return "";
  const nonEmpty = lines.map((l) => l.trim()).find((l) => l.length > 0);
  return nonEmpty ?? "";
}

export function fieldAsListItems(lines: string[] | null): string[] {
  if (!lines) return [];
  const items = lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-"))
    .map((l) => l.replace(/^-\s*/, "").trim())
    .filter((l) => l.length > 0);

  if (items.length === 1 && /^none\b/i.test(items[0])) return [];
  return items;
}

/**
 * Splits the section under `heading` into one string per `### {Title}` block.
 * The title is the first line of each returned block.
 */
export function splitEntryBlocks(content: string, heading: string): string[] {
  const cleaned = stripComments(content);
  const sectionStart = cleaned.indexOf(heading);
  const section = sectionStart === -1 ? cleaned : cleaned.slice(sectionStart);
  return section.split(/^###\s+/m).slice(1);
}
