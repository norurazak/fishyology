"use client";

import { useState } from "react";
import { PenTool } from "lucide-react";
import { usePitch } from "@/components/about/PitchContext";

export default function PitchSection() {
  const { isOpen, toggle } = usePitch();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "1b489a29-4789-4f82-ae2b-77ff5829c0d8");
    formData.append("subject", "New Story Pitch from Fishyology!");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Pitch received! We'll review it and reach out soon.");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Check your internet connection and try again.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="pitch-form-panel"
        className="group relative inline-flex items-center gap-3 bg-[#0077C0] text-white px-8 py-4 rounded-[1.5rem] font-bold text-lg hover:bg-[#FAFAFA] hover:text-[#1D242B] transition-colors duration-300 shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7EEFF]"
      >
        <span className="relative z-10">{isOpen ? "Close Form" : "Pitch a Story"}</span>
        <PenTool className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div
        id="pitch-form-panel"
        className={`w-full max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
          isOpen ? "max-h-[800px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {status === "success" ? (
          <div className="bg-[#408A71]/20 border border-[#408A71]/40 rounded-2xl p-6 text-center shadow-inner">
            <p className="text-[#C7EEFF] font-bold tracking-widest uppercase text-lg mb-2">
              Pitch Received!
            </p>
            <p className="text-[#FAFAFA]/80">
              We will review your submission and reach out via email shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-4 text-left shadow-2xl backdrop-blur-sm"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[#FAFAFA] text-sm font-bold ml-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="E.g. Jeremy Wade"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-[#FAFAFA] placeholder:text-[#FAFAFA]/30 focus:outline-none focus:border-[#0077C0] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[#FAFAFA] text-sm font-bold ml-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-[#FAFAFA] placeholder:text-[#FAFAFA]/30 focus:outline-none focus:border-[#0077C0] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[#FAFAFA] text-sm font-bold ml-2">
                Your Story Idea
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us briefly about the trip, strategy, or story you want to share..."
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-[#FAFAFA] placeholder:text-[#FAFAFA]/30 focus:outline-none focus:border-[#0077C0] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-1 bg-[#FAFAFA] text-[#1D242B] px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-[#0077C0] hover:text-white transition-colors duration-300 disabled:opacity-70"
            >
              {status === "loading" ? "Sending Pitch..." : "Submit Pitch"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-sm font-bold text-center mt-2" role="alert">
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </>
  );
}
