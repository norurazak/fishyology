import { getPostBySlug } from "@/lib/mdx";
import { BannerShell } from "@/components/TripBanner";

/**
 * <PostBanner slug="tioman-island-sailfish-expedition-part-1" /> links to
 * another post, in the same style as TripBanner. Title, summary and cover are
 * read live from the post itself, so they can't drift out of sync; `image`
 * overrides the cover for one placement and `eyebrow` swaps the label. An
 * unrecognized slug renders nothing rather than a broken link.
 */
export default function PostBanner({
  slug,
  image,
  eyebrow = "Keep Reading",
}: {
  slug: string;
  image?: string;
  eyebrow?: string;
}) {
  const post = getPostBySlug(slug);
  const heroImage = image || post?.frontmatter.image;
  if (!post || !heroImage) return null;

  return (
    <BannerShell
      image={heroImage}
      eyebrow={eyebrow}
      title={post.frontmatter.title}
      meta={post.frontmatter.date}
      ctaText="Read the Report"
      href={`/blog/${post.slug}`}
    />
  );
}
