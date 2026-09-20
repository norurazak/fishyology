import { ArrowUpRight, MessageCircle, Mail } from "lucide-react";

// --- Custom SVGs matching Lucide's stroked style (lucide-react no longer ships brand icons) ---
type IconProps = { className?: string; style?: React.CSSProperties };

const InstagramIcon = ({ className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const ThreadsIcon = ({ className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
  </svg>
);

const YoutubeIcon = ({ className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);
// ----------------------------------------------------------------------------------

const channels = [
  {
    name: "Instagram",
    handle: "@fishyologyig",
    url: "https://www.instagram.com/fishyologyig/",
    description: "Daily catches, reels, and behind-the-scenes from the water.",
    background: "linear-gradient(45deg, #feda75, #d62976, #4f5bd5)",
    iconColor: "#FFFFFF",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    handle: "Fishyology",
    url: "https://www.facebook.com/Fishyology",
    description: "Trip recaps, community stories, and the full expedition archive.",
    background: "#1877F2",
    iconColor: "#FFFFFF",
    Icon: FacebookIcon,
  },
  {
    name: "Threads",
    handle: "@fishyologyig",
    url: "https://www.threads.com/@fishyologyig",
    description: "Quick takes, live updates, and conversations between casts.",
    background: "#000000",
    iconColor: "#FFFFFF",
    Icon: ThreadsIcon,
  },
  {
    name: "YouTube",
    handle: "Launching Soon",
    url: null,
    description: "Full-length expedition films and in-depth technique breakdowns.",
    background: "#FF0000",
    iconColor: "#FFFFFF",
    Icon: YoutubeIcon,
  },
  {
    name: "WhatsApp",
    handle: "+60 19-778 9924",
    url: "https://wa.me/60197789924",
    description: "Message directly for trip planning, press, or collabs.",
    background: "#25D366",
    iconColor: "#FFFFFF",
    Icon: MessageCircle,
  },
  {
    name: "Email",
    handle: "noru.razak@gmail.com",
    url: "mailto:noru.razak@gmail.com",
    description: "For longer inquiries, partnerships, or press requests.",
    background: "#1D242B",
    iconColor: "#FFFFFF",
    Icon: Mail,
  },
];

export default function SocialChannels() {
  return (
    <section className="pt-[10px] pb-24 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto relative">
      <div className="mb-10 md:mb-14">
        <span className="text-[#0077C0] font-bold tracking-widest uppercase mb-3 block text-sm">
          Stay Connected
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1D242B] mb-4">
          Follow The Journey
        </h2>
        <p className="text-[#1D242B]/60 max-w-xl text-sm md:text-base font-medium leading-relaxed">
          Trip dispatches and stories from the water, wherever you already scroll.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {channels.map((channel) => {
          const comingSoon = !channel.url;
          const cardClassName = `group relative flex flex-col justify-between p-6 md:p-8 rounded-[1.75rem] bg-white border border-[#1D242B]/8 min-h-[220px] overflow-hidden transition-all duration-500 ${
            comingSoon ? "opacity-70" : "shadow-sm hover:shadow-xl hover:-translate-y-1"
          }`;

          const cardContent = (
            <>
              {comingSoon && (
                <span className="absolute top-5 right-5 bg-[#1D242B] text-[#FAFAFA] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}

              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: channel.background }}
                >
                  <channel.Icon className="w-6 h-6" style={{ color: channel.iconColor }} />
                </div>
                {!comingSoon && (
                  <ArrowUpRight className="w-5 h-5 text-[#1D242B]/20 group-hover:text-[#1D242B] group-hover:rotate-45 transition-all duration-300" />
                )}
              </div>

              <div className="mt-8">
                <h3 className="font-serif italic text-2xl text-[#1D242B] mb-1">
                  {channel.name}
                </h3>
                <p className="text-sm text-[#1D242B]/60 font-medium mb-4 leading-relaxed">
                  {channel.description}
                </p>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1D242B]/40">
                  {channel.handle}
                </span>
              </div>
            </>
          );

          if (comingSoon) {
            return (
              <div key={channel.name} className={cardClassName}>
                {cardContent}
              </div>
            );
          }

          return (
            <a
              key={channel.name}
              href={channel.url as string}
              target="_blank"
              rel="noreferrer"
              className={cardClassName}
            >
              {cardContent}
            </a>
          );
        })}
      </div>
    </section>
  );
}
