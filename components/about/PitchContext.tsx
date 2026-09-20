"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface PitchContextValue {
  isOpen: boolean;
  open: () => void;
  toggle: () => void;
}

const PitchContext = createContext<PitchContextValue | null>(null);

/**
 * Shared open-state for the pitch form. It lives in a provider because the
 * "You?" card in the roster opens a form that renders in a different section —
 * the two are separate client islands, and the static copy between them stays
 * server-rendered by passing through as children.
 */
export function PitchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      toggle: () => setIsOpen((previous) => !previous),
    }),
    [isOpen]
  );

  return <PitchContext.Provider value={value}>{children}</PitchContext.Provider>;
}

export function usePitch(): PitchContextValue {
  const context = useContext(PitchContext);
  if (!context) throw new Error("usePitch must be used within a PitchProvider");
  return context;
}
