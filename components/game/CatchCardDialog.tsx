"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CatchCard, { speciesSlug, type CatchCardProps } from "@/components/game/CatchCard";
import { useGameLanguage } from "@/components/game/GameLanguage";

/** Shows a catch card on top of the page, with Save / share and Close. */
export default function CatchCardDialog({ card, onClose }: { card: CatchCardProps; onClose: () => void }) {
  const { t } = useGameLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  // Escape closes; focus moves in, and returns to the trigger on close. The latest
  // onClose is read from a ref so a new function each render doesn't re-run this.
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      opener?.focus?.();
    };
  }, []);

  async function save() {
    if (!cardRef.current || busy) return;
    setBusy(true);
    setFailed(false);
    try {
      const { toPng } = await import("html-to-image");
      const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], `${speciesSlug(card.species.name)}-${card.weightKg.toFixed(1)}kg.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Fishyology · Jigging Master" });
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
      }
    } catch (err) {
      // Closing the share sheet is not an error.
      if (!(err instanceof DOMException && err.name === "AbortError")) setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={card.species.name}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 overflow-y-auto bg-black/85 px-4 py-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <CatchCard ref={cardRef} {...card} />
      <div className="flex w-full max-w-[380px] gap-3">
        <button type="button" onClick={save} disabled={busy} className="btn-primary min-h-[44px] flex-1 rounded-lg px-4 text-sm font-bold disabled:opacity-60">
          {busy ? t("card.saving") : t("card.save")}
        </button>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="min-h-[44px] rounded-lg border-2 border-white px-5 text-sm font-bold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {t("card.close")}
        </button>
      </div>
      {failed && (
        <p role="alert" className="text-sm font-bold text-tuna-on-dark">
          {t("card.saveError")}
        </p>
      )}
    </div>,
    document.body
  );
}
