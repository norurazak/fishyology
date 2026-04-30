"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // This function intercepts the form submission and sends it to Web3Forms
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    
    // --- SETUP REQUIRED ---
    // 1. Paste your Web3Forms Access Key inside the quotes below
    formData.append("access_key", "1b489a29-4789-4f82-ae2b-77ff5829c0d8");
    // 2. This is the subject line of the email you will receive
    formData.append("subject", "New Fishyology Subscriber!");
    // -----------------------

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Welcome to the Fishyology brotherhood!");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Check your internet connection and try again.");
    }
  }

  return (
    <div className="w-full max-w-md">
      {status === "success" ? (
        <div className="bg-[#408A71]/10 border border-[#408A71]/20 p-4 rounded-xl text-center shadow-inner">
          <p className="text-[#408A71] font-bold tracking-widest uppercase text-sm">
            {message}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative flex items-center">
            {/* The name="email" attribute is crucial for Web3Forms to read the input */}
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full bg-white border border-[#1D242B]/10 rounded-full px-6 py-4 text-[#1D242B] focus:outline-none focus:border-[#0077C0] transition-colors shadow-sm"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-2 bg-[#1D242B] text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#0077C0] transition-colors disabled:opacity-50 shadow-md"
            >
              {status === "loading" ? "Joining..." : "Join"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-500 text-xs font-bold pl-4 drop-shadow-sm">{message}</p>
          )}
        </form>
      )}
    </div>
  );
}