"use client";

import { useState } from "react";
import TurnstileField, { TURNSTILE_ENABLED } from "@/components/TurnstileField";

const INPUT =
  "w-full bg-white border border-abyss/15 rounded-lg px-4 py-3 text-abyss placeholder:text-abyss/60 focus:outline-none focus:border-abyss focus:ring-2 focus:ring-abyss/15 transition-colors";

/**
 * The story pitch form, shown in the roster's "Future Contributor" modal.
 * Submissions go to Web3Forms, which emails them on.
 */
export default function PitchForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (TURNSTILE_ENABLED && !token) {
      setStatus("error");
      setMessage("Please complete the security check.");
      return;
    }
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "1b489a29-4789-4f82-ae2b-77ff5829c0d8");
    formData.append("subject", "New Story Pitch from Fishyology!");
    if (TURNSTILE_ENABLED) formData.append("cf-turnstile-response", token);

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
    // A Turnstile token works once, so a failed attempt needs a fresh check.
    if (TURNSTILE_ENABLED) {
      setToken("");
      setResetKey((k) => k + 1);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="bg-abyss/5 border border-abyss/10 rounded-2xl p-6 text-center">
        <p className="text-abyss font-bold tracking-widest uppercase text-lg mb-2">Pitch Received!</p>
        <p className="text-abyss/80">We will review your submission and reach out via email shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pitch-name" className="text-abyss text-sm font-bold">
          Name
        </label>
        <input type="text" id="pitch-name" name="name" required placeholder="E.g. Jeremy Wade" className={INPUT} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pitch-email" className="text-abyss text-sm font-bold">
          Email
        </label>
        <input type="email" id="pitch-email" name="email" required placeholder="your@email.com" className={INPUT} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pitch-message" className="text-abyss text-sm font-bold">
          Your Story Idea
        </label>
        <textarea
          id="pitch-message"
          name="message"
          required
          rows={4}
          placeholder="Tell us briefly about the trip, strategy, or story you want to share..."
          className={`${INPUT} resize-none`}
        />
      </div>
      <TurnstileField onToken={setToken} resetKey={resetKey} theme="light" />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full mt-1 px-8 py-3.5 rounded-lg font-bold text-lg disabled:opacity-70"
      >
        {status === "loading" ? "Sending Pitch..." : "Submit Pitch"}
      </button>
      {status === "error" && (
        <p className="text-tuna-on-light text-sm font-bold text-center" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
