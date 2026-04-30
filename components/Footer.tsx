"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "1b489a29-4789-4f82-ae2b-77ff5829c0d8");
    formData.append("subject", "New Fishyology Subscriber!");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Welcome to Fishyology.");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Check your internet connection.");
    }
  }

  return (
    <footer className="bg-[#121212] text-[#E5E5E5] relative overflow-hidden pt-24 pb-10 flex flex-col items-center border-t border-white/5">
      
      {/* 1. Subscription Section */}
      <div className="flex flex-col items-center z-10 px-6 w-full max-w-xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 font-serif italic text-[#D4D4D4]">
          Subscribe and never miss an expedition.
        </h3>
        
        {status === "success" ? (
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center transition-all duration-500">
            <p className="text-[#A3A3A3] font-bold tracking-widest uppercase text-sm">
              {message}
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <form 
              onSubmit={handleSubmit} 
              className="flex w-full bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 focus-within:border-white/20 focus-within:bg-white/[0.05] transition-all duration-300"
            >
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                className="flex-1 bg-transparent px-4 outline-none text-[#FAFAFA] placeholder:text-white/20 text-sm font-medium disabled:opacity-50"
                required
                disabled={status === "loading"}
              />
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="group flex items-center gap-2 bg-[#E5E5E5] text-[#121212] hover:bg-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-500/80 text-xs font-medium text-left pl-4">{message}</p>
            )}
          </div>
        )}
      </div>

      {/* 2. Massive Brand Tagline */}
      <div className="w-full text-center px-4 z-0 mt-20">
        <h1 className="text-[clamp(2.7rem,10.8vw,12.6rem)] leading-[0.8] font-black text-[#1A1A1A] tracking-tighter">
          RELIVE OUR
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#262626] via-[#404040] to-[#262626]">
            JOURNEY
          </span>
        </h1>
      </div>

      {/* 3. Copyright Bar */}
      <div className="mt-20 text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase z-10 w-full text-center px-6">
        &copy; {new Date().getFullYear()} Fishyology Malaysia. All Rights Reserved.
      </div>

    </footer>
  );
}