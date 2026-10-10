# MDX components available to a digest

All are registered in `components/MDXComponents.tsx`. Posts render through
`next-mdx-remote/rsc` from `app/blog/[slug]/page.tsx`.

## The attribute constraint (read first)

`next-mdx-remote` defaults to `blockJS: true`, which runs a remark plugin that strips JS
expressions from JSX attributes before compilation. A `{...}` attribute does not error —
it vanishes, and the component renders with that prop `undefined`.

```
headers={["a","b"]}      ❌ stripped
rows={[[1,2],[3,4]]}     ❌ stripped
label={`template`}       ❌ stripped (it's still an expression)
label="plain string"     ✅ survives
<Parent><Child /></Parent>  ✅ child elements are unaffected
```

So every component below takes string props only. Anything list-shaped is either a
comma-separated string the component splits, or repeated child elements.

---

## KeyFinding

A pulled-out statistic. The workhorse of a digest — use 2-4 per piece for the figures
that carry the argument.

```mdx
<KeyFinding
  stat="47%"
  label="of lotic (river-dwelling) freshwater species in Malaysia are restricted to a single state."
  source="Cheok & Soo, 2022"
  image="https://images.unsplash.com/photo-...?auto=format&fit=crop&q=80&w=400&h=900"
  imageAlt="A narrow stream running through dense tropical rainforest"
>
Optional elaboration paragraph. Explains why the number matters.
</KeyFinding>
```

| Prop | Required | Notes |
|---|---|---|
| `stat` | yes | Big tabular numeral. Keep short: "47%", "~68%", "1,951" |
| `label` | yes | Completes the sentence the stat starts |
| `source` | no | Renders as "Source: ..." beneath. Use it — inline attribution is most of why the format reads as credible |
| `image` | no | Portrait crop beside the blue rule. `<img>`, so any host works |
| `imageAlt` | no | Literal description |
| children | no | One short paragraph |

## Sources / Source

Collapsible reference list. One per digest, at the end. Native `<details>`, collapsed by
default.

```mdx
<Sources title="Sources (17 studies)">
  <Source n="1" title="Diversity, extinction risk and conservation of Malaysian fishes" authors="Chong, V.C., Lee, P.K.Y., Lau, C.M." publication="Journal of Fish Biology" year="2010" url="https://www.scopus.com/pages/publications/77954781559?origin=scopusAI" />
  <Source n="2" title="..." authors="..." publication="..." year="..." url="..." />
</Sources>
```

Keep each `<Source />` on one line — blank lines between them make MDX wrap each in a
paragraph, which breaks the card grid. Number them in citation order.

## StatGrid / StatMeter

Comparison tiles. Reach for this instead of a table when a few categories each carry two
measures on different scales (a count and a percentage); plotting both on one axis would
be a dual-axis chart, which misleads.

```mdx
<StatGrid caption="Figure 1. Native fish diversity by habitat. Bar length shows the share of species classified as threatened.">
  <StatMeter label="Freshwater" value="420" unit="species" percent="87" percentLabel="Threatened" tags="Cyprinidae, Bagridae" tagHref="https://en.wikipedia.org/wiki/{}" />
  <StatMeter label="Estuarine" value="~100" unit="species" percent="66" percentLabel="Threatened" tags="Ariidae, Leiognathidae" tagHref="https://en.wikipedia.org/wiki/{}" />
</StatGrid>
```

- `percent` is a bare number string, parsed and clamped to 0-100.
- All meters share one hue; bar **length** encodes magnitude. Never colour bars by
  severity — colour encoding rank is misleading.
- `tags` is comma-separated. `tagHref` is a URL template; `{}` is replaced with the
  URL-encoded tag, turning each into a link. Omit `tagHref` for non-taxonomic tags so
  they don't link somewhere wrong.
- Call it "Figure N" in the caption, not "Table N" — it isn't a table.

## Markdown tables

`remark-gfm` is enabled, so standard pipe tables work and are styled as journal-style
tables (rules, no boxed grid, tabular figures).

```mdx
| Habitat Type | No. of Species | % Threatened | Dominant Families |
| --- | ---: | ---: | --- |
| Freshwater | 420 | 87% | Cyprinidae, Bagridae |

*Table 1. Caption in italics directly beneath.*
```

Use `---:` on numeric columns. The alignment is forwarded to the cell and combines with
`tabular-nums` so digits line up in a column.

## Figure

Photograph with caption. Renders through `next/image`.

```mdx
<Figure
  src="https://res.cloudinary.com/dub3h3elq/image/upload/v.../photo.jpg"
  alt="Literal description of the photograph"
  caption="Captions do work: add a fact or a connection the body text doesn't carry."
/>
```

`next/image` validates `src` against `remotePatterns` in `next.config.ts`, where only
`res.cloudinary.com` is allowed. A bracketed placeholder, an Unsplash URL, or any other
host throws a **500 on the whole page**. If there's no real Cloudinary asset yet, leave a
plain-text placeholder note in the body and ask the user for the image — do not ship a
`<Figure>` with a fake src.

Add `orientation="vertical"` for portrait shots.

## PullQuote

One per piece at most, for the sentence that captures the central judgement. Attribute it
to Nemo, since it's the agent's synthesis rather than a quote from a cited researcher.
Never fabricate a quotation from a real author.

```mdx
<PullQuote author="Nemo, Fishyology Insight">
  The mahseer is the clearest case in the literature of a species anglers already prize
  being actively engineered a path back from population collapse.
</PullQuote>
```

## Others

`<Callout title="...">`, `<Divider />`, `<YouTube id="..." />`, `<ImageGrid />`,
`<SpeciesStats />`, `<GearLoadout />`, `<TripBanner slug="..." />`. These lean toward
field reporting; a digest rarely needs them.

---

## Where the post surfaces

| Surface | Behaviour for a Nemo post |
|---|---|
| Hero slider | Excluded (human posts only) |
| Latest Dispatches | Excluded (human posts only) |
| Fishyology Insight band | Included — image card showing `stat`, title, derived source count, date |
| Archive | Included, with a "Research Digest" badge |
| Prev/next on the post | Only walks between digests; falls back to the filtered archive when it's the only one |

Source counts in the Insight card are derived by counting `<Source` in the body, so they
never need maintaining in frontmatter.
