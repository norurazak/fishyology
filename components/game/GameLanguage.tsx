"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate, type GameLang, type GameStringKey } from "@/lib/game-i18n";

const STORAGE_KEY = "fishyology_game_lang";

interface GameLanguageValue {
  lang: GameLang;
  setLang: (lang: GameLang) => void;
  t: (key: GameStringKey, params?: Record<string, string | number>) => string;
}

const GameLanguageContext = createContext<GameLanguageValue>({
  lang: "en",
  setLang: () => {},
  t: (key, params) => translate("en", key, params),
});

/**
 * Language for the game page. The first render is English (that's what the server
 * sends); straight after, it switches to the player's saved choice, or to BM when
 * their device's main language is Malay. A choice is remembered on that device.
 */
export function GameLanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<GameLang>("en");

  useEffect(() => {
    let initial: GameLang = "en";
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ms") {
        initial = stored;
      } else {
        const deviceLang = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
        if (deviceLang.startsWith("ms")) initial = "ms";
      }
    } catch {
      /* storage blocked: stay in English */
    }
    setLangState(initial);
  }, []);

  // Screen readers pronounce the page in the chosen language.
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang === "ms" ? "ms" : "en";
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  const setLang = useCallback((next: GameLang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* not remembered, but still switched */
    }
  }, []);

  const t = useCallback(
    (key: GameStringKey, params?: Record<string, string | number>) => translate(lang, key, params),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <GameLanguageContext.Provider value={value}>{children}</GameLanguageContext.Provider>;
}

export function useGameLanguage() {
  return useContext(GameLanguageContext);
}

/** Bahasa / English switch. Each option names its language in full for screen readers. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useGameLanguage();
  const options: { code: GameLang; short: string; full: string }[] = [
    { code: "ms", short: "Bahasa", full: "Bahasa Melayu" },
    { code: "en", short: "English", full: "English" },
  ];

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`inline-flex rounded-full border border-white/25 bg-[#05070A]/60 p-1 backdrop-blur-md ${className}`}
    >
      {options.map(({ code, short, full }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={full}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`min-h-[40px] min-w-[48px] px-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DD0E1] ${
            lang === code ? "bg-white text-[#05070A]" : "text-white/80 hover:text-white"
          }`}
        >
          {short}
        </button>
      ))}
    </div>
  );
}
