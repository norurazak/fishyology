import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Wrench, Spline, Ruler, Hand, Fish, IdCard, Heart, type LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Gear guides, field reference and tackle intel from Fishyology — practical resources for anglers fishing Malaysia's fresh and saltwater.",
  alternates: {
    canonical: "/resources",
  },
};

interface ResourceEntry {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tag: string;
  href: string;
  image?: string;
}

const resources: ResourceEntry[] = [
  {
    slug: "spinning-reel-guide",
    title: "Spinning Reel Master Guide",
    category: "Rod & Reel Sizing",
    summary:
      "70+ series compared across Shimano, Daiwa, Abu Garcia and Penn — an interactive spec sheet with line capacity, Malaysia-specific maintenance costs, and buying logic.",
    tag: "Interactive Guide",
    href: "/resources/spinning-reel-guide",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1788587308/Fishyology_Spinning_Reel_Master_Resources_yzsa2i.jpg",
  },
  {
    slug: "baitcasting-reel-guide",
    title: "Baitcasting Reel Master Guide",
    category: "Rod & Reel Sizing",
    summary:
      "55 series compared across Shimano, Daiwa, Abu Garcia, Okuma, Quantum and Pflueger — braking systems, frame materials, drag, and Malaysia-specific maintenance costs for jungle rivers, lily pads and brackish estuaries.",
    tag: "Interactive Guide",
    href: "/resources/baitcasting-reel-guide",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1788742059/Fishyology_Baitcaster_Master_Resources_azawye.jpg",
  },
  {
    slug: "overhead-reel-guide",
    title: "Overhead Reel Master Guide",
    category: "Rod & Reel Sizing",
    summary:
      "53 series compared across Shimano, Daiwa, Abu Garcia, Penn, Okuma, Accurate and Studio Ocean Mark — drag systems, PE capacity, and buying logic for slow pitch jigging, bottom dropping and big game.",
    tag: "Interactive Guide",
    href: "/resources/overhead-reel-guide",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1788742059/Fishyology_Overhead_Reel_Master_Resources_xebjoc.jpg",
  },
  {
    slug: "electric-reel-guide",
    title: "Electric Reel Master Guide",
    category: "Rod & Reel Sizing",
    summary:
      "19 series compared across Shimano, Daiwa, Banax, Miya Epoch and Penn electric reels — motors, power architecture, drag and line capacity, from palmable jigging setups to industrial 24V deck winches.",
    tag: "Interactive Guide",
    href: "/resources/electric-reel-guide",
    image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1788742059/Fishyology_Electric_Reel_Master_Resources_hh7t2y.jpg",
  },
];

const categories = Array.from(new Set(resources.map((r) => r.category)));

interface GettingStartedEntry {
  slug: string;
  title: string;
  summary: string;
  meta: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  href?: string;
}

const gettingStarted: GettingStartedEntry[] = [
  {
    slug: "knot-tying-101",
    title: "Knot Tying 101",
    summary: "Palomar, improved clinch, and braid-to-leader knots you'll actually tie on the water.",
    meta: "Coming Soon",
    icon: Spline,
    iconBg: "#1D242B0D",
    iconColor: "#1D242B59",
  },
  {
    slug: "rod-and-reel-sizing",
    title: "Rod & Reel Sizing",
    summary: "Spinning, baitcasting, overhead, and electric — sizing your first setup starts below.",
    meta: "Scroll to Guides",
    icon: Ruler,
    iconBg: "#0077C0",
    iconColor: "#FFFFFF",
    href: "#rod-reel-sizing",
  },
  {
    slug: "casting-fundamentals",
    title: "Casting Fundamentals",
    summary: "Overhead casting, roll casts, and distance control mechanics.",
    meta: "Coming Soon",
    icon: Hand,
    iconBg: "#1D242B0D",
    iconColor: "#1D242B59",
  },
  {
    slug: "live-bait-rigging",
    title: "Live Bait Rigging",
    summary: "Drop-shot, Carolina rig, slip bobber, and bottom rig setups.",
    meta: "Coming Soon",
    icon: Fish,
    iconBg: "#1D242B0D",
    iconColor: "#1D242B59",
  },
  {
    slug: "malaysia-fishing-licenses",
    title: "Fishing Licenses in Malaysia",
    summary: "No license, no bag limit, no closed season — the regulatory landscape as it stands.",
    meta: "Field Report",
    icon: IdCard,
    iconBg: "#408A71",
    iconColor: "#FFFFFF",
    href: "/blog/malaysia-recreational-fishing-license-gap",
  },
  {
    slug: "catch-and-release-protocol",
    title: "Catch & Release Protocol",
    summary: "Proper fish handling, revival techniques, and de-hooking ethics.",
    meta: "Coming Soon",
    icon: Heart,
    iconBg: "#1D242B0D",
    iconColor: "#1D242B59",
  },
];

const HERO_IMAGE =
  "https://res.cloudinary.com/dub3h3elq/image/upload/v1788590836/Fishyology_Master_Resources_Cover_02_xb3gum.jpg";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HERO */}
      <section className="relative h-[100dvh] min-h-[600px] w-full bg-[#1D242B] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Fishyology Resources"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[#1D242B]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D242B] via-[#1D242B]/20 to-transparent" />
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-overlay">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <div className="absolute bottom-24 md:bottom-32 left-0 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-start">
          <span className="text-[#C7EEFF] font-bold tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-md">
            Field Reference
          </span>
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] font-black text-[#FAFAFA] tracking-tighter uppercase mb-6 drop-shadow-2xl max-w-6xl">
            Resources
          </h1>
          <p className="text-lg md:text-2xl text-[#FAFAFA]/90 max-w-3xl font-medium mb-10 leading-relaxed drop-shadow-md">
            Gear guides and field reference built from real Malaysian fishing conditions — starting with tackle,
            with more angles on the way.
          </p>
          <Link
            href="#rod-reel-sizing"
            className="group relative inline-flex items-center gap-3 bg-[#FAFAFA] text-[#1D242B] px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl"
          >
            <span className="relative z-10">Explore the Guides</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 md:pt-28 pb-32">

        {/* GETTING STARTED — beginner icon/box grid */}
        <div className="mb-20 scroll-mt-32" id="getting-started">
          <div className="mb-10 md:mb-14">
            <span className="text-[#0077C0] font-bold tracking-widest uppercase mb-3 block text-sm">
              Getting Started
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1D242B] mb-4">
              New to Angling? Start Here.
            </h2>
            <p className="text-[#1D242B]/60 max-w-xl text-sm md:text-base font-medium leading-relaxed">
              Field-tested fundamentals before you hit the water — zero fluff, just the basics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {gettingStarted.map((item) => {
              const cardClassName = `group bg-white border border-[#1D242B]/10 rounded-xl shadow-sm p-6 flex items-start gap-4 transition-all duration-300 ${
                item.href ? "hover:shadow-md" : "opacity-70"
              }`;

              const cardInner = (
                <>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.iconColor }} />
                  </div>
                  <div>
                    <h3
                      className={`font-serif italic text-lg text-[#1D242B] font-bold ${
                        item.href ? "group-hover:text-[#0077C0] transition-colors" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#1D242B]/60 mt-1 leading-relaxed">{item.summary}</p>
                    {item.href ? (
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#0077C0] mt-2 inline-block">
                        {item.meta}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1D242B]/40 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D242B]/40 animate-pulse"></span>
                        {item.meta}
                      </span>
                    )}
                  </div>
                </>
              );

              if (!item.href) {
                return (
                  <div key={item.slug} className={cardClassName}>
                    {cardInner}
                  </div>
                );
              }

              return (
                <Link key={item.slug} href={item.href} className={cardClassName}>
                  {cardInner}
                </Link>
              );
            })}
          </div>
        </div>

        {categories.map((category) => (
          <div
            key={category}
            id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
            className="mb-16 scroll-mt-32"
          >
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#1D242B] mb-6">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources
                .filter((r) => r.category === category)
                .map((r) => (
                  <Link
                    key={r.slug}
                    href={r.href}
                    className="group flex flex-col bg-white border border-[#1D242B]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] bg-[#1D242B] flex items-center justify-center overflow-hidden">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className="absolute top-0 right-0 w-40 h-40 bg-[#0077C0]/25 rounded-full blur-[60px] -translate-y-1/3 translate-x-1/4" />
                          <Wrench className="w-12 h-12 text-[#C7EEFF] relative z-10" strokeWidth={1.5} />
                        </>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <span className="inline-block self-start bg-[#C7EEFF]/50 text-[#0077C0] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md mb-3">
                        {r.tag}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#1D242B] leading-tight group-hover:text-[#0077C0] transition-colors mb-2">
                        {r.title}
                      </h3>
                      <p className="text-sm text-[#1D242B]/60 leading-relaxed line-clamp-3 flex-1">{r.summary}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#1D242B] mt-4">
                        Read the guide
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
