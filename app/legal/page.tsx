"use client";

import { useState } from "react";
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
    `
  }
];

export default function LegalPage() {
  const [activeDoc, setActiveDoc] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D242B] pt-40 pb-20 selection:bg-[#0077C0] selection:text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1D242B]/40 hover:text-[#0077C0] transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Return to Port
            </Link>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Legal <br/><span className="text-[#0077C0]">& Compliance.</span></h1>
          </div>
          <div className="flex gap-2">
            {legalDocs.map((doc, index) => (
              <button
                key={doc.id}
                onClick={() => setActiveDoc(index)}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                  activeDoc === index 
                    ? "bg-[#1D242B] text-white shadow-lg" 
                    : "bg-white border border-[#1D242B]/10 text-[#1D242B]/50 hover:border-[#1D242B]/30"
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white border border-[#1D242B]/5 rounded-[2.5rem] p-8 md:p-16 shadow-xl">
          <div className="flex items-center gap-3 mb-8 text-[#408A71]">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-black uppercase tracking-widest text-sm">Official Fishyology Documentation</span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* We map the string content into blocks for clean display */}
            {legalDocs[activeDoc].content.split('##').filter(Boolean).map((section, i) => {
              const [title, ...text] = section.split('\n');
              return (
                <div key={i} className="mb-10">
                  <h2 className="text-2xl font-serif font-bold mb-4 text-[#1D242B]">{title.trim()}</h2>
                  <p className="text-[#1D242B]/70 leading-relaxed font-medium whitespace-pre-line">
                    {text.join('\n').trim()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center text-[#1D242B]/40 text-xs font-bold uppercase tracking-[0.2em]">
          Last Updated: April 2026
        </div>
      </div>
    </div>
  );
}