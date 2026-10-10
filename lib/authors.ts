// lib/authors.ts

export type Author = {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  image: string;
  specialties: string[];
  /** Non-human byline. Agent-written pieces are kept out of the human dispatch
   *  sections and surfaced in their own Insight band instead. */
  isAgent?: boolean;
};

export const authorsData: Author[] = [
  {
    id: "noru-razak",
    name: "Noru Razak", // Make sure this matches the "author" field in your MDX frontmatter exactly
    role: "Founder & Lead Guide",
    shortBio: "Specialist in experiential angling, focused on Malaysian game fish.",
    fullBio: "Noru Razak is the founder of Fishyology and an avid angler driven by a passion for time on the water. His focus is simple, reliving and sharing the journey behind every trip, every cast, and every moment outdoors.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776785253/noru_profile_photo_e7bfe0.jpg",
    specialties: ["SW & FW Expedition", "Writer", "Venture Building"]
  },
  {
    id: "octo-sabri",
    name: "Octo @ A Sabri Harun",
    role: "Mentor and Senior Contributor",
    shortBio: "Social documentarist and sportfishing writer with roots in visual storytelling.",
    fullBio: "Octo is a social documentarist and sportfishing magazine writer whose work revolves around capturing authentic moments and stories. As the proprietor of PasarFoto, he continues to shape visual storytelling through a focus on people, culture, and life on the ground.",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1776784018/IMG-20260125-WA0043_209835874247036.jpg_esuelu.jpg",
    specialties: ["Social Documentarist", "Mag Write", "SportFishing"]
  },
  {
    id: "nemo",
    name: "Nemo",
    role: "Fishyology Insight",
    shortBio: "Works a question through the peer-reviewed fisheries literature, tests what it finds against the source papers, and reports back what holds up.",
    fullBio: "Nemo is Fishyology's research agent, a byline rather than a person. Handed a question, it sweeps the peer-reviewed literature through Scopus AI, pulls the studies that actually bear on it, and checks every figure against the source paper before letting that figure into a piece. It makes the calls as it goes: what matters to someone standing on the bank, what is academic noise, where the evidence is thinner than the abstract implies, and which gaps the research has not closed. It holds itself to one standard. Every number it files traces back to a citation you can open and check yourself.",
    image: "/nemo-avatar.svg",
    specialties: ["Research Synthesis", "Conservation Science", "Scopus AI"],
    isAgent: true
  }
];

const agentNames = new Set(authorsData.filter((a) => a.isAgent).map((a) => a.name));

/** True when a post's byline belongs to an agent persona rather than a person. */
export function isAgentAuthor(author?: string): boolean {
  return !!author && agentNames.has(author);
}

/** Resolve a frontmatter byline to a display name and avatar, falling back to the
 *  Fishyology mark for a guest contributor with no roster entry. */
export function resolveAuthor(author?: string): { name: string; image: string; role?: string } {
  const match = authorsData.find((a) => a.name === author);
  if (match) return { name: match.name, image: match.image, role: match.role };
  return { name: author || 'Fishyology Team', image: '/logo.svg', role: 'Guest Writer' };
}