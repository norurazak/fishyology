"use client";

import { useState } from "react";
// 1. Import the Turnstile component
import { Turnstile } from "@marsidev/react-turnstile";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  
  // 2. Add a state to hold the security token
  const [token, setToken] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // 3. Prevent submission if Turnstile hasn't verified the user
    if (!token) {
      setStatus("error");
      setMessage("Please complete the security check.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    // 4. Use the secure environment variable instead of hardcoding the key
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string);
    formData.append("subject", "New Fishyology Subscriber!");
    
    // 5. Pass the Turnstile token to Web3Forms so their server can verify it
    formData.append("cf-turnstile-response", token);

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
          <div className="relative flex items-center mb-2">
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
              disabled={status === "loading" || !token}
              className="absolute right-2 bg-[#1D242B] text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#0077C0] transition-colors disabled:opacity-50 shadow-md"
            >
              {status === "loading" ? "Joining..." : "Join"}
            </button>
          </div>
          
          {/* 6. Render the Turnstile widget directly below the input */}
          <div className="flex justify-center w-full min-h-[65px]">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
              onSuccess={(humanToken) => setToken(humanToken)}
              onError={() => {
                setStatus("error");
                setMessage("Security check failed. Please refresh the page.");
              }}
            />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-xs font-bold pl-4 drop-shadow-sm text-center">
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}