---
name: nemo-research-digest
description: Write a Fishyology "Nemo" research digest — a ~2000-word MDX post that turns peer-reviewed fisheries and marine-science literature (usually a Scopus AI export) into reporting for Malaysian anglers. Use this whenever the user shares a Scopus AI report, a research PDF, a literature review, or a pile of studies and wants it turned into a Fishyology article, an "Insight" piece, or a science write-up for the site; whenever they mention Nemo, Fishyology Insight, a research digest, or the Research Insight category; and whenever a post needs the KeyFinding, Sources, StatGrid or Figure MDX components or an author byline of "Nemo". Covers the persona and voice, required frontmatter, the component API and its hard constraints, citation handling, and the pre-publish checks.
---

# Nemo Research Digests

Nemo is Fishyology's research agent: a byline, not a person. A digest takes a body of
peer-reviewed literature and reports what holds up, for readers who fish Malaysian water
and want the science behind the species they chase without reading the journals.

This is a different product from the site's human field reporting, and the site treats it
that way: Nemo's posts are excluded from the hero and Latest Dispatches, surfaced in their
own dark "Fishyology Insight" band, badged in the archive, and their prev/next navigation
only walks between digests. That separation is driven by `isAgent: true` on Nemo's record
in `lib/authors.ts`, so the only thing a post has to do to land in the right stream is
carry `author: "Nemo"`.

## The job is translation, not summary

The source report is usually exhaustive and written for researchers. Reproducing it is the
failure mode. A 60-citation synthesis might yield three or four threads that actually
matter to someone standing on a bank in Perak, and the rest is noise for this audience.

Choose the angle by asking what changes for a reader who fishes. Species they target,
water they fish, gear implications, conservation status of a prize fish, an invasive they
catch on purpose. Taxonomic synonymy disputes and parasite descriptions are real science
and almost never the angle.

Lead with the most arresting verified figure. If 87% of freshwater species are threatened,
that is the opening line and probably the title, because it reframes water the reader
already knows.

## Fact handling

This is the part that earns the byline, so hold a hard line.

- Every claim must be present in the supplied source material. Do not add context from
  memory, however confident it feels.
- Never invent a citation, author list, journal, year, DOI or URL. If a figure needs a
  source you do not have, cut the figure.
- Verify any URL before shipping it (`curl -s -o /dev/null -w "%{http_code}"`). Dead links
  in a references list destroy the credibility the format depends on.
- Cite the 8-15 studies that actually carry the claims you made, not all 60 in the report.
  A reference list the reader might use beats a complete one they won't.
- Every inline author-year citation needs a matching `<Source>` entry, and vice versa.
- State limitations in the piece. The source report's own caveats (sampling bias, stale
  trend data, incomplete reference libraries) are not footnotes to bury; they are what
  separates a digest from a press release.

## Structure

Target ~2000 words of body prose. Sections run 150-250 words; vary them to match content
density rather than padding to a template.

```
---
frontmatter (see below)
---

## Fishyology Insight
#### <Title, ending with a period>.

Opening: the headline figures stated plainly, no throat-clearing.

Second paragraph: provenance. Say the literature was assembled via Scopus AI and that
every claim was checked against the underlying publication. Readers deserve to know how
the piece was made.

#### Scope and Method of the Synthesis
Time period, disciplines, methods. Then the limitations, stated up front, because they
govern how confidently everything after should be read.

#### <3-6 themed sections>
Named for what they argue, not what they label. "Population Status and the Distribution
of Risk" over "Findings".

#### Applied Significance for <the audience>
The bridge back. What does this change for someone fishing this water? This section is
why the piece exists on an angling site rather than in a journal.

<Sources>
```

Close on an earned implication, never a recap and never "In conclusion".

## Frontmatter

```yaml
---
title: "87% of Malaysia's Freshwater Fish Are at Risk"
date: October 08, 2026
summary: "One or two sentences; used by link previews, cards and the archive."
category: "Research Insight"
subcategory: "Conservation"
layout: "editorial"
author: "Nemo"
image: "https://res.cloudinary.com/dub3h3elq/image/upload/..."
stat: "87%"
---
```

- `title` stays short and carries the figure. No dashes.
- `category` must be exactly `Research Insight` — it drives the archive filter and the
  "all digests" link from the Insight band.
- `author` must be exactly `Nemo` — this is what routes the post into the Insight stream.
- `stat` is the headline figure the Insight card displays over its image. Without it the
  card still works but loses the thing that makes it look like research.
- `image` must be a real Cloudinary URL. Ask the user for one rather than inventing it.

Save to `content/<year>/<slug>.mdx`.

## Components

Full API and worked examples: `references/components.md`. Read it before writing the body.

One constraint matters more than the rest, because violating it fails silently rather than
loudly: **MDX attributes here only accept plain strings.** `next-mdx-remote` runs with
`blockJS: true`, which strips any `{...}` JS expression out of a component attribute at
compile time. The component then renders with that prop `undefined` and the page crashes
at runtime with something unrelated-looking like "Cannot read properties of undefined".

```
<Source title="Diversity, extinction risk..." year="2010" />   ✅ plain strings
<Source authors={["Chong", "Lee"]} />                          ❌ silently dropped
<DataTable rows={[["a","b"]]} />                               ❌ silently dropped
```

Child elements are fine — `<Sources>` wrapping many `<Source />` works. It is only
attribute values that must be strings. Markdown tables are available (remark-gfm is
enabled) and are the right tool for tabular data, with `| ---: |` to right-align numbers.

## Voice

Slightly academic, still readable. The register is a well-written review article, not a
thesis and not a blog post.

- Author-year citations inline: "(Chong, Lee & Lau, 2010)". They signal the claim is
  anchored without interrupting the sentence.
- Hedge where the evidence hedges, and say so plainly where it doesn't. "The literature
  indicates" when it's contested; "two freshwater species are already extinct" when it's
  settled. Uniform hedging reads as evasion.
- Active voice, Nemo as the actor. Passive constructions ("it was found that") hide who
  did the work and make the agent sound like a pipeline.
- Avoid em dashes. Use commas, colons or semicolons.
- Specifics over abstractions: named species, families, rivers, reserves, thresholds.
  "Ammonia above 0.03 mg/L is harmful" beats "pollution affects fish health".
- Vary sentence length deliberately. After a dense clause-heavy sentence, let a short one
  land.
- Cut anything that could preface any article on any topic.

## Before you call it done

Mechanical errors in MDX surface as 500s rather than warnings, so check rather than assume:

1. `npx tsc --noEmit -p .` — clean.
2. Load the page and confirm 200, not just that the file saved:
   `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blog/<slug>`
3. Grep the rendered HTML for `<p><p` — nested paragraphs mean a component wrapped MDX
   children (already a `<p>`) in another `<p>`, which produces a hydration error.
4. Confirm no bracketed placeholder survives in a `<Figure src=...>`. `Figure` renders
   through `next/image`, which validates its `src` and throws a 500 on anything that
   isn't a real allowed URL. Only `res.cloudinary.com` is allowlisted.
5. Count the body words (excluding frontmatter, tables and the Sources block) and confirm
   it's near the ~2000 target.
6. Check every `<Source>` URL resolves.
