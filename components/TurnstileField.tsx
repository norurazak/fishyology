"use client";

import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** True when a Turnstile site key is configured. Without one the forms work as before. */
export const TURNSTILE_ENABLED = Boolean(SITE_KEY);

/**
 * Cloudflare Turnstile spam check for a form. It renders nothing unless
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so a missing key never blocks a form.
 * onToken gets the one-time token (or "" when it expires or fails). Change
 * resetKey after a failed submit to get a fresh check, since a token works once.
 */
export default function TurnstileField({
  onToken,
  resetKey = 0,
  theme = "auto",
}: {
  onToken: (token: string) => void;
  resetKey?: number;
  theme?: "light" | "dark" | "auto";
}) {
  if (!SITE_KEY) return null;
  return (
    <Turnstile
      key={resetKey}
      siteKey={SITE_KEY}
      options={{ theme, size: "flexible" }}
      onSuccess={onToken}
      onExpire={() => onToken("")}
      onError={() => onToken("")}
    />
  );
}
