"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Scale, Lock, ArrowLeft } from "lucide-react";

const legalDocs = [
  {
    id: "terms",
    title: "Terms of Use",
    icon: <Scale className="w-5 h-5" />,
    content: `
      ## 1. Content Ownership
      All content published on Fishyology, including but not limited to photography, videos, logos, and written journal entries, is the intellectual property of Fishyology Malaysia. Unauthorized reproduction or distribution is strictly prohibited.

      ## 2. User Contributions
      By pitching a story or submitting content, you grant Fishyology a non-exclusive right to review and discuss the material. We do not claim ownership of your pitches until a formal contributor agreement is signed.

      ## 3. Disclaimers
      Fishing is an inherently unpredictable activity. Fishyology provides information for educational and inspirational purposes. We are not liable for any actions taken by users based on the content of this site.
    `
  },
  {
    id: "game-rules",
    title: "Game Rules",
    icon: <ShieldCheck className="w-5 h-5" />,
    content: `
      ## 1. Playing the game
      Jigging Master is a free game by Fishyology. You can play as a guest. To appear on the leaderboard, sign in with Google and create a profile.

      ## 2. Seasons and ranking
      Each season runs between the start and end dates shown on the game page (Season 1: 15 November to 31 December 2026, Malaysia time). Players are ranked by their single heaviest catch of the season. We may change the dates or rules, and will update this page when we do.

      ## 3. Fair play
      Do not use bots, scripts, modified code or other tools, or exploit bugs, to post catches, and do not post catches for another player. Catches are checked automatically and may also be reviewed by hand. We may remove catches or profiles and disqualify any player we believe has cheated, and our decision is final.

      ## 4. Prizes
      Any prize, and how winners are chosen and contacted, will be announced by Fishyology. Winners are contacted at the Google email they signed in with and must reply within the time given, or the prize may go to the next player. Prizes are not transferable and have no cash alternative unless we say so.

      ## 5. Our property
      The game, its code, artwork, text and design belong to Fishyology and are protected by copyright. You may play it, but you may not copy it, redistribute it, scrape it, reverse engineer it, build a competing game from it or use it commercially without our written permission.

      ## 6. Your profile
      Your display name, state, avatar and catches are shown publicly on the leaderboard. Your Google email is not shown. See our Privacy Policy.
    `
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: <Lock className="w-5 h-5" />,
    content: `
      ## 1. Data Collection
      We collect email addresses via our Subscription and Pitch forms. This data is processed through Web3Forms and delivered directly to our secure inbox.

      ## 2. Usage of Data
      Your email is used solely for the purpose you intended (Newsletter updates or Story Pitch responses). We do not sell, rent, or share your contact information with third-party advertisers.

      ## 3. Cookies
      We use basic analytical cookies (Google Analytics) to understand site traffic. These do not track personal identifying information.

      ## 4. Jigging Master accounts
      If you sign in to Jigging Master with Google, we use your Google account only to log you in. Your email is kept privately with the login service and is never shown on the leaderboard; we use it only to contact prize winners. The display name, state, avatar and catch records you create are public on the leaderboard.

      ## 5. Spam protection
      Our forms may use Cloudflare Turnstile to block spam. It may process technical information from your browser to tell people from bots.
    `
  }
];

export default function LegalPage() {
  const [activeDoc, setActiveDoc] = useState(0);

  // /legal#game-rules (or #terms, #privacy) opens that document.
  useEffect(() => {
    const index = legalDocs.findIndex((doc) => doc.id === window.location.hash.slice(1));
    if (index >= 0) setActiveDoc(index);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-abyss pt-40 pb-20 selection:bg-tuna selection:text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-abyss/70 hover:text-tuna-on-light transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Return to Port
            </Link>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Legal <br/><span className="text-tuna">& Compliance.</span></h1>
          </div>
          <div className="flex gap-2">
            {legalDocs.map((doc, index) => (
              <button
                key={doc.id}
                onClick={() => setActiveDoc(index)}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                  activeDoc === index 
                    ? "bg-abyss text-white shadow-lg" 
                    : "bg-white border border-abyss/10 text-abyss/70 hover:border-abyss/30"
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white border border-abyss/5 rounded-[2.5rem] p-8 md:p-16 shadow-xl">
          <div className="flex items-center gap-3 mb-8 text-abyss/70">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-black uppercase tracking-widest text-sm">Official Fishyology Documentation</span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* We map the string content into blocks for clean display */}
            {legalDocs[activeDoc].content.split('##').filter(Boolean).map((section, i) => {
              const [title, ...text] = section.split('\n');
              return (
                <div key={i} className="mb-10">
                  <h2 className="text-2xl font-serif font-bold mb-4 text-abyss">{title.trim()}</h2>
                  <p className="text-abyss/70 leading-relaxed font-medium whitespace-pre-line">
                    {text.join('\n').trim()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center text-abyss/70 text-xs font-bold uppercase tracking-[0.2em]">
          Last Updated: November 2026
        </div>
      </div>
    </div>
  );
}