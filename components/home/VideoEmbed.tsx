"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-play YouTube tile for the home page showcase. It shows a poster and
 * only loads YouTube's player when someone presses play, so the page pays
 * nothing for it until then. The no-cookie domain is used for the same reason.
 *
 * With no video id it renders a placeholder, so the tile can ship before the
 * first video is chosen. Set the id in components/home/Showcase.tsx.
 */
export default function VideoEmbed({
  videoId,
  title,
  className = "",
}: {
  videoId?: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const frame = `relative overflow-hidden rounded-3xl bg-abyss shadow-sm ${className}`;

  if (!videoId) {
    return (
      <div role="group" aria-label="Featured video, coming soon" className={`${frame} flex items-end bg-gradient-to-br from-[#1C1C1C] to-abyss`}>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[40%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFFFF]/15 text-[#FFFFFF]/70 ring-1 ring-[#FFFFFF]/25"
        >
          <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
        </span>
        <div className="relative z-10 p-6">
          <span className="block text-[#FFFFFF]/85 text-xs font-bold uppercase tracking-widest mb-2">
            Featured video · Coming soon
          </span>
          <p className="font-serif text-xl md:text-2xl leading-snug text-[#FFFFFF]">{title}</p>
          <p className="mt-1 text-[#FFFFFF]/80 text-sm">@FishyologyTV</p>
        </div>
      </div>
    );
  }

  if (playing) {
    return (
      <div className={`${frame} bg-black`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&color=white`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${title}`}
        className="group absolute inset-0 flex items-end text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFFFFF]"
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[40%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFFFF] text-abyss shadow-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110"
        >
          <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
        </span>
        <span className="relative z-10 block p-6">
          <span className="block text-[#FFFFFF]/85 text-xs font-bold uppercase tracking-widest mb-2">
            Watch · @FishyologyTV
          </span>
          <span className="block font-serif text-xl md:text-2xl leading-snug text-[#FFFFFF]">{title}</span>
        </span>
      </button>
    </div>
  );
}
