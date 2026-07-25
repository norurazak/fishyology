"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import OnboardingModal from '@/components/OnboardingModal';

// --- SUPABASE CLIENT INITIALIZATION ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- GAME CONSTANTS ---
const MAX_LINE = 400;
const MAX_DEPTH = 300;
const BASE_WIDTH = 360;
const BASE_HEIGHT = 640;
const FIT_MAX_WIDTH = 600;
const DIFF = 0.90;
const EASE = 2 - DIFF;
const BASE_REEL = 0.035;
const MIN_REEL = 0.012;
const HOOK_WINDOW_FRAMES = Math.round(120 * EASE);
const INSTANT_SNAP_CHANCE = 0.05 * DIFF;
const START_TENSION = 30 * DIFF;
const AUTO_ALIGN = 0.02;

const CURRENTS = [
  { name: 'Neap Tide (Light)', short: 'Neap', factor: 20, hex: '#3DDC97', color: 'text-emerald-400', bg: 'bg-emerald-500' },
  { name: 'Standard (Moderate)', short: 'Standard', factor: 60, hex: '#FFB020', color: 'text-amber-400', bg: 'bg-amber-500' },
  { name: 'Spring Tide (Strong)', short: 'Spring', factor: 100, hex: '#FF3B47', color: 'text-rose-500', bg: 'bg-rose-500' }
];

const JIGS = [
  { weight: 60, termVel: 0.0133, label: "0.8 m/s" },
  { weight: 100, termVel: 0.0167, label: "1.0 m/s" },
  { weight: 200, termVel: 0.0200, label: "1.2 m/s" },
  { weight: 300, termVel: 0.0250, label: "1.5 m/s" }
];

// --- TYPES ---
interface Current { name: string; short: string; factor: number; hex: string; color: string; bg: string; }
interface Jig { weight: number; termVel: number; label: string; }

interface Fish {
  name: string; archetype: string; tip: string;
  minDepth: number; maxDepth: number;
  pullStr: number; erratic: number; aggression: number; stamina: number;
  runFrames: number; weightMin: number; weightMax: number; color: string;
}

interface Encounter extends Fish {
  weightKg: number; weight: string; hookDepth: number;
  weightFactor: number; depthFactor: number;
  pull: number; reelRate: number; reelTensionMult: number;
  runPull: number; runFramesEff: number; runBudget: number; reRunChance: number;
  difficulty: number; stars: number;
}

type GameState = 'COVER' | 'SETUP' | 'READY' | 'DROPPING' | 'BOTTOM' | 'FISH_ON' | 'FIGHTING' | 'CAUGHT' | 'SNAPPED' | 'ESCAPED';
type SpotKey = 'water' | 'depth' | 'line' | 'tide' | 'hookset' | 'tension' | 'align' | 'run';
type DemoMode = 'idle' | 'drop' | 'hookset' | 'fight' | 'run';

interface TutorialStep { eyebrow: string; title: string; body: string; spot: SpotKey; demo: DemoMode; }

interface LeaderboardEntry {
  id: string;
  species: string;
  weight_kg: number;
  depth_m: number;
  caught_at?: string; // CHANGED: Updated to match your database schema
  profiles: {
    display_name: string;
    state: string;
    avatar_url: string;
  } | null;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
}

// --- TUTORIAL ---
const TUTORIAL_STEPS: TutorialStep[] = [
  { eyebrow: 'The drop', spot: 'water', demo: 'drop', title: 'Hold to lift, let go to sink', body: 'Tap the water to send the jig down. Holding lifts it, releasing lets it flutter back.' },
  { eyebrow: 'Depth', spot: 'depth', demo: 'drop', title: 'The ladder is the water column', body: 'Your jig rides this scale from the surface down to 300 m. Every fish has a band it lives in.' },
  { eyebrow: 'Line', spot: 'line', demo: 'drop', title: 'Line out runs ahead of depth', body: 'Current bows the line, so the spool always gives up more metres than you have gone down.' },
  { eyebrow: 'Conditions', spot: 'tide', demo: 'drop', title: 'The tide sets the tax', body: 'Heavier jigs cut through the current and hold their depth.' },
  { eyebrow: 'The strike', spot: 'hookset', demo: 'hookset', title: 'Three taps, fast', body: 'When a fish hits you get about two seconds to bury the hook. Three taps starts the fight.' },
  { eyebrow: 'The fight', spot: 'tension', demo: 'fight', title: 'Hold to reel, release to give line', body: 'Holding gains depth but loads the drag. Releasing bleeds load off.' },
  { eyebrow: 'Aim', spot: 'align', demo: 'fight', title: 'Keep the rod on the fish', body: 'Drag left and right to swing the rod tip. Reeling while they are apart spikes load fast.' },
  { eyebrow: 'Runs', spot: 'run', demo: 'run', title: 'When this lights, stop reeling', body: 'A running fish is taking line no matter what you do. Let go and ride it out.' },
  { eyebrow: 'Landing', spot: 'depth', demo: 'fight', title: 'Zero metres is the boat', body: 'Walk the marker up the ladder to the surface and the fish is yours.' },
];

// --- FISH DATABASE ---
const FISH_SPECIES: Fish[] = [
  { name: "Kembong", archetype: "Panfish", tip: "Light and jittery — just keep steady tension.", minDepth: 0, maxDepth: 40, pullStr: 0.020, erratic: 0.16, aggression: 0.12, stamina: 0.12, runFrames: 40, weightMin: 0.1, weightMax: 0.8, color: "text-slate-300" },
  { name: "Queenfish", archetype: "Speedster", tip: "Fast, flashy runs — yield and let it tire.", minDepth: 0, maxDepth: 50, pullStr: 0.030, erratic: 0.15, aggression: 0.45, stamina: 0.35, runFrames: 80, weightMin: 1, weightMax: 8, color: "text-cyan-300" },
  { name: "Mahi-Mahi", archetype: "Acrobat", tip: "Jumpy sprinter. Expect several short runs.", minDepth: 0, maxDepth: 60, pullStr: 0.035, erratic: 0.13, aggression: 0.55, stamina: 0.40, runFrames: 80, weightMin: 2, weightMax: 18, color: "text-green-400" },
  { name: "Barracuda", archetype: "Ambusher", tip: "Violent first burst, then fades quickly.", minDepth: 5, maxDepth: 70, pullStr: 0.045, erratic: 0.11, aggression: 0.50, stamina: 0.30, runFrames: 70, weightMin: 2, weightMax: 15, color: "text-teal-300" },
  { name: "Tenggiri", archetype: "Screamer", tip: "Blistering initial run — do NOT reel into it.", minDepth: 10, maxDepth: 80, pullStr: 0.040, erratic: 0.12, aggression: 0.70, stamina: 0.45, runFrames: 100, weightMin: 3, weightMax: 25, color: "text-sky-400" },
  { name: "Rainbow Runner", archetype: "Speedster", tip: "Quick and light — smooth pressure wins.", minDepth: 15, maxDepth: 90, pullStr: 0.035, erratic: 0.14, aggression: 0.50, stamina: 0.35, runFrames: 80, weightMin: 1, weightMax: 9, color: "text-lime-300" },
  { name: "Golden Trevally", archetype: "Bulldog", tip: "Strong and steady. Reel between head-shakes.", minDepth: 30, maxDepth: 110, pullStr: 0.055, erratic: 0.07, aggression: 0.45, stamina: 0.55, runFrames: 110, weightMin: 4, weightMax: 22, color: "text-yellow-400" },
  { name: "Cobia", archetype: "Grinder", tip: "Dogged, tireless pull. A patience fight.", minDepth: 20, maxDepth: 120, pullStr: 0.060, erratic: 0.06, aggression: 0.40, stamina: 0.60, runFrames: 120, weightMin: 6, weightMax: 35, color: "text-stone-300" },
  { name: "Coral Trout", archetype: "Reef Diver", tip: "Bolts for structure — turn its head fast.", minDepth: 40, maxDepth: 140, pullStr: 0.070, erratic: 0.05, aggression: 0.40, stamina: 0.40, runFrames: 60, weightMin: 2, weightMax: 14, color: "text-orange-400" },
  { name: "Giant Trevally", archetype: "Brute", tip: "Relentless bulldog. Multiple heavy runs.", minDepth: 40, maxDepth: 160, pullStr: 0.078, erratic: 0.06, aggression: 0.65, stamina: 0.75, runFrames: 160, weightMin: 8, weightMax: 45, color: "text-slate-200" },
  { name: "Sailfish", archetype: "Marathoner", tip: "Long screaming runs. Give line, stay patient.", minDepth: 30, maxDepth: 150, pullStr: 0.050, erratic: 0.10, aggression: 0.80, stamina: 0.85, runFrames: 200, weightMin: 15, weightMax: 60, color: "text-indigo-300" },
  { name: "Green Jobfish", archetype: "Speedster", tip: "Fast for its depth — react to sudden darts.", minDepth: 100, maxDepth: 200, pullStr: 0.050, erratic: 0.09, aggression: 0.50, stamina: 0.50, runFrames: 90, weightMin: 3, weightMax: 16, color: "text-emerald-400" },
  { name: "Dogtooth Tuna", archetype: "Reef Cutter", tip: "Explosive first run that cuts you off. Yield!", minDepth: 60, maxDepth: 180, pullStr: 0.088, erratic: 0.07, aggression: 0.85, stamina: 0.70, runFrames: 150, weightMin: 10, weightMax: 60, color: "text-blue-400" },
  { name: "Amberjack", archetype: "Grinder", tip: "Dives hard for the bottom. Endurance battle.", minDepth: 80, maxDepth: 200, pullStr: 0.070, erratic: 0.05, aggression: 0.55, stamina: 0.80, runFrames: 150, weightMin: 8, weightMax: 40, color: "text-amber-400" },
  { name: "Ruby Snapper", archetype: "Deep Steady", tip: "Slow, heavy, honest pull. Grind it up.", minDepth: 150, maxDepth: 280, pullStr: 0.052, erratic: 0.04, aggression: 0.35, stamina: 0.50, runFrames: 90, weightMin: 4, weightMax: 25, color: "text-rose-400" },
  { name: "Rosy Jobfish", archetype: "Deep Steady", tip: "Deep and dogged, but predictable.", minDepth: 160, maxDepth: 290, pullStr: 0.055, erratic: 0.05, aggression: 0.40, stamina: 0.55, runFrames: 100, weightMin: 3, weightMax: 18, color: "text-pink-300" },
  { name: "Barramundi Cod", archetype: "Reef Diver", tip: "Immense structure diver. Never give slack.", minDepth: 150, maxDepth: 260, pullStr: 0.082, erratic: 0.03, aggression: 0.40, stamina: 0.50, runFrames: 70, weightMin: 8, weightMax: 45, color: "text-orange-300" },
  { name: "Deepwater Amberjack", archetype: "Brute", tip: "Deep, huge, tireless. One of the hardest.", minDepth: 180, maxDepth: 300, pullStr: 0.076, erratic: 0.04, aggression: 0.60, stamina: 0.85, runFrames: 170, weightMin: 12, weightMax: 55, color: "text-amber-500" },
  { name: "Oilfish", archetype: "Dead Weight", tip: "Sluggish but crushing. Pure winch war.", minDepth: 200, maxDepth: 300, pullStr: 0.070, erratic: 0.03, aggression: 0.35, stamina: 0.70, runFrames: 120, weightMin: 10, weightMax: 50, color: "text-neutral-300" },
  { name: "Giant Grouper", archetype: "Reef Titan", tip: "The boss. It will try to rock you. Max drag.", minDepth: 180, maxDepth: 300, pullStr: 0.082, erratic: 0.02, aggression: 0.50, stamina: 0.60, runFrames: 90, weightMin: 20, weightMax: 120, color: "text-orange-700" },
];

const COVER_BUBBLES = [
  { left: '8%', size: 4, delay: 0.0, dur: 11 },
  { left: '18%', size: 6, delay: 2.6, dur: 9 },
  { left: '29%', size: 3, delay: 1.2, dur: 13 },
  { left: '41%', size: 5, delay: 4.1, dur: 10 },
  { left: '56%', size: 3, delay: 0.7, dur: 12 },
  { left: '68%', size: 7, delay: 3.3, dur: 9.5 },
  { left: '79%', size: 4, delay: 1.9, dur: 14 },
  { left: '91%', size: 5, delay: 5.0, dur: 11.5 },
];

const COVER_MARQUEE = ['Giant Grouper', 'Dogtooth Tuna', 'Sailfish', 'Giant Trevally', 'Amberjack', 'Tenggiri', 'Ruby Snapper', 'Barramundi Cod'];

// --- HELPERS ---
const FRAME_MS = 1000 / 60;
function smoothFactor(k: number, dt: number): number { return 1 - Math.pow(1 - k, dt); }
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const buzz = (pattern: number | number[]) => { try { navigator.vibrate?.(pattern); } catch { /* unsupported */ } };
const kg3 = (v: number | null | undefined) => (typeof v === 'number' && Number.isFinite(v) ? v.toFixed(3) : '—');

// --- TIME-OF-DAY SKY & SEA ENGINE ---
// Palette evokes a bright tropical offshore scene (turquoise water, warm sky),
// cycled across the day. Clock is Malaysia time (UTC+8), matching the moon/tide model.
const TAU = Math.PI * 2;
const HORIZON_FRAC = 0.3;               // water starts at this fraction of H
type RGB = [number, number, number];
interface SkyStop { h: number; top: RGB; hor: RGB; sea: RGB; sun: RGB; light: number; }

// Keyframes: h (hour 0–24), top/horizon sky, upper-sea tint, sun/moon-glow tint, light 0–1.
const SKY_STOPS: SkyStop[] = [
  { h: 0.0,  top: [6, 10, 20],    hor: [14, 26, 42],    sea: [7, 22, 32],    sun: [70, 90, 120],   light: 0.10 },
  { h: 5.0,  top: [10, 20, 42],   hor: [46, 54, 86],    sea: [10, 28, 44],   sun: [120, 130, 160], light: 0.18 },
  { h: 6.4,  top: [36, 70, 116],  hor: [233, 150, 96],  sea: [26, 72, 92],   sun: [255, 214, 170], light: 0.55 },
  { h: 8.0,  top: [26, 104, 170], hor: [150, 200, 214], sea: [16, 116, 146], sun: [255, 240, 214], light: 0.86 },
  { h: 12.0, top: [30, 120, 190], hor: [168, 214, 226], sea: [16, 130, 160], sun: [255, 250, 236], light: 1.00 },
  { h: 16.0, top: [40, 116, 172], hor: [206, 200, 172], sea: [18, 112, 138], sun: [255, 238, 200], light: 0.86 },
  { h: 17.6, top: [54, 86, 140],  hor: [246, 160, 88],  sea: [34, 90, 112],  sun: [255, 196, 132], light: 0.60 },
  { h: 18.8, top: [52, 48, 96],   hor: [250, 108, 66],  sea: [36, 60, 86],   sun: [255, 150, 96],  light: 0.40 },
  { h: 19.7, top: [26, 30, 66],   hor: [126, 72, 112],  sea: [20, 38, 62],   sun: [150, 110, 150], light: 0.22 },
  { h: 21.0, top: [10, 16, 36],   hor: [30, 34, 64],    sea: [11, 26, 40],   sun: [90, 100, 130],  light: 0.12 },
  { h: 24.0, top: [6, 10, 20],    hor: [14, 26, 42],    sea: [7, 22, 32],    sun: [70, 90, 120],   light: 0.10 },
];

const lerpN = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRGB = (a: RGB, b: RGB, t: number): RGB => [lerpN(a[0], b[0], t), lerpN(a[1], b[1], t), lerpN(a[2], b[2], t)];
const rgbCss = (c: RGB, a?: number) => a == null ? `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})` : `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

function skyPaletteAt(h: number) {
  let a = SKY_STOPS[0], b = SKY_STOPS[SKY_STOPS.length - 1];
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    if (h >= SKY_STOPS[i].h && h <= SKY_STOPS[i + 1].h) { a = SKY_STOPS[i]; b = SKY_STOPS[i + 1]; break; }
  }
  const t = clamp((h - a.h) / ((b.h - a.h) || 1), 0, 1);
  return {
    top: mixRGB(a.top, b.top, t),
    hor: mixRGB(a.hor, b.hor, t),
    sea: mixRGB(a.sea, b.sea, t),
    sun: mixRGB(a.sun, b.sun, t),
    light: lerpN(a.light, b.light, t),
  };
}

// Sun arcs across the sky between rise/set; otherwise the moon takes the same arc.
function celestialAt(h: number, W: number, H: number) {
  const horizonY = H * HORIZON_FRAC;
  const RISE = 6.2, SET = 19.0;
  if (h >= RISE && h <= SET) {
    const f = (h - RISE) / (SET - RISE);
    return { x: W * (0.10 + 0.80 * f), y: horizonY - Math.sin(Math.PI * f) * H * 0.24, isMoon: false };
  }
  const nf = ((h - SET + 24) % 24) / ((RISE + 24) - SET);
  return { x: W * (0.10 + 0.80 * nf), y: horizonY - Math.sin(Math.PI * nf) * H * 0.20, isMoon: true };
}

const ACCENT_HEX: Record<string, string> = {
  'text-slate-300': '#cbd5e1', 'text-cyan-300': '#67e8f9', 'text-green-400': '#4ade80',
  'text-teal-300': '#5eead4', 'text-sky-400': '#38bdf8', 'text-lime-300': '#bef264',
  'text-[#FFB020]': '#facc15', 'text-stone-300': '#d6d3d1', 'text-orange-400': '#fb923c',
  'text-slate-200': '#e2e8f0', 'text-indigo-300': '#a5b4fc', 'text-emerald-400': '#34d399',
  'text-blue-400': '#60a5fa', 'text-amber-400': '#fbbf24', 'text-rose-400': '#fb7185',
  'text-pink-300': '#f9a8d4', 'text-orange-300': '#fdba74', 'text-amber-500': '#f59e0b',
  'text-neutral-300': '#d4d4d4', 'text-orange-700': '#c2410c',
};
const accentOf = (fish: Fish) => ACCENT_HEX[fish.color] || '#4DD0E1';

function rollWeight(fish: Fish): number { return fish.weightMin + (fish.weightMax - fish.weightMin) * Math.pow(Math.random(), 2); }
function difficultyLabel(stars: number): string { return ['', 'Easy', 'Moderate', 'Tough', 'Hard', 'Brutal'][stars] || ''; }

function computeEncounter(fish: Fish, hookDepth: number, jig: Jig): Encounter {
  const weightKg = rollWeight(fish);
  const weightFactor = clamp((weightKg - fish.weightMin) / (fish.weightMax - fish.weightMin), 0, 1);
  const depthFactor = clamp(hookDepth / MAX_DEPTH, 0, 1);
  const jigLeverage = 1 - ((jig.weight - 60) / (300 - 60)) * 0.25;

  const pull = fish.pullStr * (1 + 0.5 * weightFactor) * (1 + 0.4 * depthFactor) * DIFF;
  const reelRate = Math.max(MIN_REEL * EASE, BASE_REEL * EASE * (1 - 0.35 * weightFactor) * (1 - 0.30 * depthFactor));
  const reelTensionMult = (1 + 0.6 * weightFactor + 0.4 * depthFactor) * jigLeverage * DIFF;

  const runPull = (1.3 + fish.aggression * 0.6 + weightFactor * 0.5) * DIFF;
  const runFramesEff = fish.runFrames * (1 + fish.stamina * 0.6 + weightFactor * 0.5) * DIFF;
  const runBudget = Math.round(fish.aggression * fish.stamina * 4 * DIFF);
  const reRunChance = (0.0006 + fish.aggression * fish.stamina * 0.004) * DIFF;

  const pullComponent = fish.pullStr * (1 + 0.5 * weightFactor) * (1 + 0.4 * depthFactor) * 300;
  const runComponent = (fish.aggression * 0.5 + fish.stamina * 0.5) * 22;
  const erraticComponent = fish.erratic * 55;
  const depthComponent = depthFactor * 18;
  const weightComponent = weightFactor * 14;
  const difficulty = clamp(pullComponent * 0.6 + runComponent + erraticComponent + depthComponent + weightComponent, 5, 100);
  const stars = difficulty < 20 ? 1 : difficulty < 38 ? 2 : difficulty < 55 ? 3 : difficulty < 72 ? 4 : 5;

  return {
    ...fish, weightKg, weight: weightKg.toFixed(3), hookDepth, weightFactor, depthFactor,
    pull, reelRate, reelTensionMult, runPull, runFramesEff, runBudget, reRunChance, difficulty, stars,
  };
}

function getMoonAndTideData() {
  const date = new Date();
  const timeString = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kuala_Lumpur', hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  const synodic = 29.53058867;
  const knownNewMoon = new Date('2026-01-18T00:00:00Z');
  const diff = date.getTime() - knownNewMoon.getTime();
  const cycle = (diff / (1000 * 60 * 60 * 24)) % synodic;
  const phase = cycle < 0 ? cycle + synodic : cycle;

  let phaseName = "";
  let currentObj: Current = CURRENTS[1];

  if (phase < 1.84 || phase > 27.68) { phaseName = "New Moon"; currentObj = CURRENTS[2]; }
  else if (phase < 5.53) { phaseName = "Waxing Crescent"; currentObj = CURRENTS[1]; }
  else if (phase < 9.22) { phaseName = "First Quarter"; currentObj = CURRENTS[0]; }
  else if (phase < 12.91) { phaseName = "Waxing Gibbous"; currentObj = CURRENTS[1]; }
  else if (phase < 16.60) { phaseName = "Full Moon"; currentObj = CURRENTS[2]; }
  else if (phase < 20.29) { phaseName = "Waning Gibbous"; currentObj = CURRENTS[1]; }
  else if (phase < 23.98) { phaseName = "Last Quarter"; currentObj = CURRENTS[0]; }
  else { phaseName = "Waning Crescent"; currentObj = CURRENTS[1]; }

  return { timeString, phaseName, currentObj };
}

// Countdown Calculation Helper
function calculateTimeRemaining(targetDateIso: string): TimeRemaining {
  const total = Date.parse(targetDateIso) - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, isEnded: false };
}

// --- SMALL UI PARTS ---
function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} of 5 difficulty`} className="tracking-[0.15em]">
      {'\u2586'.repeat(n)}<span className="opacity-20">{'\u2586'.repeat(5 - n)}</span>
    </span>
  );
}

const starHex = (n: number) => n >= 5 ? '#FF3B47' : n >= 4 ? '#FF8A3B' : n >= 3 ? '#FFB020' : n >= 2 ? '#B8D949' : '#3DDC97';

function StatRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="fs-label w-[74px] shrink-0">{label}</span>
      <div className="flex-1 h-[3px] bg-[#111A22]">
        <div className="h-full" style={{ width: `${clamp(value * 100, 0, 100)}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// --- INTERNAL SIMULATOR COMPONENT ---
function FishingSimulator({ user, hasProfile, onCatchSaved, onLoginRequest }: { 
  user: any; 
  hasProfile: boolean; 
  onCatchSaved: () => void;
  onLoginRequest: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const depthTextRef = useRef<HTMLSpanElement>(null);
  const depthMarkerRef = useRef<HTMLDivElement>(null);
  const spoolTextRef = useRef<HTMLSpanElement>(null);
  const spoolBarRef = useRef<HTMLDivElement>(null);
  const tensionBarRef = useRef<HTMLDivElement>(null);
  const tensionTextRef = useRef<HTMLSpanElement>(null);
  const alignFishRef = useRef<HTMLDivElement>(null);
  const alignRodRef = useRef<HTMLDivElement>(null);
  const alignGapRef = useRef<HTMLDivElement>(null);
  const alignTextRef = useRef<HTMLSpanElement>(null);
  const runBandRef = useRef<HTMLDivElement>(null);
  const spoolWarnRef = useRef<HTMLDivElement>(null);
  const hookTimerBarRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<GameState>('COVER');
  const [activeCurrent, setActiveCurrent] = useState<Current>(CURRENTS[0]);
  const [moonPhase, setMoonPhase] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [selectedJig, setSelectedJig] = useState<Jig>(JIGS[1]);
  const [caughtFish, setCaughtFish] = useState<Encounter | null>(null);
  const [snapReason, setSnapReason] = useState("");
  const [hookSets, setHookSets] = useState(0);
  const [encounter, setEncounter] = useState<Encounter | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const [fitScreen, setFitScreen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [spotRect, setSpotRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [demoHookSets, setDemoHookSets] = useState(0);
  const spotEls = useRef<Partial<Record<SpotKey, HTMLElement | null>>>({});
  const demoRef = useRef<{ mode: DemoMode; t: number }>({ mode: 'idle', t: 0 });

  const isInteracting = useRef(false);
  const hasJigged = useRef(false);
  const dropBiteDepth = useRef<number | null>(null);
  const pointerX = useRef(BASE_WIDTH / 2);
  const pointerHeld = useRef(false);
  const dims = useRef({ w: BASE_WIDTH, h: BASE_HEIGHT });
  const animationFrameId = useRef<number>();
  const coverSeen = useRef(false);

  const gameStateRef = useRef<GameState>(gameState);
  const activeCurrentRef = useRef<Current>(activeCurrent);
  const selectedJigRef = useRef<Jig>(selectedJig);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { activeCurrentRef.current = activeCurrent; }, [activeCurrent]);
  useEffect(() => { selectedJigRef.current = selectedJig; }, [selectedJig]);

  const spoolTierRef = useRef('');
  const tensionTierRef = useRef('');
  const alignTierRef = useRef('');
  const wasRunningRef = useRef(false);

  const gameData = useRef({
    depth: 0, lineOut: 0, velocity: 0, rodTipY: BASE_HEIGHT * 0.6,
    tension: 0, fishX: 0, fishTargetX: 0, rodX: 0, runTimer: 0, runsRemaining: 0,
    activeFish: null as Encounter | null, hookWindowTimer: 0
  });

  const step = TUTORIAL_STEPS[tutorialStep];
  const demoMode: DemoMode = tutorialOpen ? step.demo : 'idle';
  const demoFight = demoMode === 'fight' || demoMode === 'run';

  useEffect(() => {
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    setIsTouch(coarse);
    if (coarse || window.innerWidth < 640) setFitScreen(true);
  }, []);

  useEffect(() => {
    const onFsChange = () => { if (!document.fullscreenElement && fitScreen && !isTouch) setFitScreen(false); };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, [fitScreen, isTouch]);

  const toggleFitScreen = useCallback(async () => {
    const next = !fitScreen;
    setFitScreen(next);
    try {
      if (next) {
        await rootRef.current?.requestFullscreen?.();
        await (screen.orientation as unknown as { lock?: (o: string) => Promise<void> })?.lock?.('portrait');
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch { /* CSS fit still applies */ }
  }, [fitScreen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = frameRef.current;
    if (!canvas || !holder) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const applySize = () => {
      const rect = holder.getBoundingClientRect();
      const w = Math.max(240, Math.round(rect.width));
      const h = Math.max(360, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 3);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const prev = dims.current;
      dims.current = { w, h };
      pointerX.current = clamp(pointerX.current * (w / (prev.w || w)), 0, w);
      gameData.current.rodTipY = gameData.current.rodTipY * (h / (prev.h || h));
    };

    applySize();
    const ro = new ResizeObserver(applySize);
    ro.observe(holder);
    window.addEventListener('orientationchange', applySize);
    return () => { ro.disconnect(); window.removeEventListener('orientationchange', applySize); };
  }, []);

  const resetDrop = useCallback(() => {
    hasJigged.current = false;
    dropBiteDepth.current = null;
    isInteracting.current = false;
    pointerHeld.current = false;
    pointerX.current = dims.current.w / 2;
    gameData.current = {
      depth: 0, lineOut: 0, velocity: 0, rodTipY: dims.current.h * 0.6,
      tension: 0, fishX: 0, fishTargetX: 0, rodX: 0, runTimer: 0, runsRemaining: 0,
      activeFish: null, hookWindowTimer: 0
    };
    setEncounter(null);
    setHookSets(0);
    setSaveStatus('idle');
    setGameState(coverSeen.current ? 'SETUP' : 'COVER');
  }, []);

  const generateConditions = useCallback(() => {
    const { timeString, phaseName, currentObj } = getMoonAndTideData();
    setLocalTime(timeString);
    setMoonPhase(phaseName);
    setActiveCurrent(currentObj);
    resetDrop();
  }, [resetDrop]);

  useEffect(() => {
    generateConditions();
    const timer = setInterval(() => setLocalTime(getMoonAndTideData().timeString), 60000);
    return () => clearInterval(timer);
  }, [generateConditions]);

  // Save catch to Supabase when landed
  useEffect(() => {
    if (gameState === 'CAUGHT' && caughtFish && user && hasProfile && saveStatus === 'idle') {
      const recordCatch = async () => {
        setSaveStatus('saving');
        const { error } = await supabase.from('catches').insert([
          {
            profile_id: user.id,
            species: caughtFish.name,
            weight_kg: Number(caughtFish.weightKg.toFixed(3)),
            depth_m: caughtFish.hookDepth,
          }
        ]);

        if (error) {
          console.error("Error saving catch:", error);
          setSaveStatus('error');
        } else {
          setSaveStatus('saved');
          onCatchSaved(); // Refresh global leaderboard
        }
      };
      recordCatch();
    }
  }, [gameState, caughtFish, user, hasProfile, saveStatus, onCatchSaved]);

  const openTutorial = useCallback(() => { setTutorialStep(0); setTutorialOpen(true); }, []);
  const closeTutorial = useCallback(() => {
    setTutorialOpen(false);
    demoRef.current = { mode: 'idle', t: 0 };
    gameData.current.depth = 0;
    gameData.current.lineOut = 0;
    gameData.current.tension = 0;
    gameData.current.runTimer = 0;
    gameData.current.fishX = 0;
    gameData.current.rodX = 0;
    if (runBandRef.current) runBandRef.current.style.opacity = '0';
  }, []);

  const leaveCover = useCallback(() => {
    coverSeen.current = true;
    setGameState('SETUP');
  }, []);

  const coverToTutorial = useCallback(() => {
    coverSeen.current = true;
    setGameState('SETUP');
    setTutorialStep(0);
    setTutorialOpen(true);
  }, []);

  const nextTutorial = useCallback(() => {
    if (tutorialStep >= TUTORIAL_STEPS.length - 1) { closeTutorial(); return; }
    setTutorialStep(tutorialStep + 1);
  }, [tutorialStep, closeTutorial]);

  const prevTutorial = useCallback(() => setTutorialStep((s) => Math.max(0, s - 1)), []);

  useEffect(() => { demoRef.current = { mode: demoMode, t: 0 }; }, [demoMode]);

  useEffect(() => {
    if (demoMode !== 'hookset') { setDemoHookSets(0); return; }
    const id = setInterval(() => setDemoHookSets((n) => (n + 1) % 4), 420);
    return () => clearInterval(id);
  }, [demoMode]);

  useEffect(() => {
    if (!tutorialOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTutorial();
      else if (e.key === 'ArrowLeft') prevTutorial();
      else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); nextTutorial(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tutorialOpen, closeTutorial, nextTutorial, prevTutorial]);

  useEffect(() => {
    if (!tutorialOpen) { setSpotRect(null); return; }
    let raf = 0;
    const measure = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const fr = frame.getBoundingClientRect();
      const pad = 8;

      if (step.spot === 'water') {
        setSpotRect({ left: fr.width * 0.12, top: fr.height * 0.44, width: fr.width * 0.76, height: fr.height * 0.3 });
        return;
      }
      const el = spotEls.current[step.spot];
      if (!el) { setSpotRect(null); return; }
      const r = el.getBoundingClientRect();
      setSpotRect({ left: r.left - fr.left - pad, top: r.top - fr.top - pad, width: r.width + pad * 2, height: r.height + pad * 2 });
    };
    raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
  }, [tutorialOpen, tutorialStep, step.spot, demoFight]);

  const triggerBite = useCallback(() => {
    dropBiteDepth.current = null;
    const depth = gameData.current.depth;
    const available = FISH_SPECIES.filter(f => depth >= f.minDepth && depth <= f.maxDepth);
    const species = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : FISH_SPECIES[2];

    if (Math.random() <= INSTANT_SNAP_CHANCE) {
      buzz(120);
      setSnapReason(`A monster ${species.name} hit your jig and snapped the leader on impact.`);
      setGameState('SNAPPED');
      return;
    }

    const enc = computeEncounter(species, depth, selectedJigRef.current);
    gameData.current.activeFish = enc;
    gameData.current.tension = START_TENSION;
    gameData.current.fishX = 0;
    gameData.current.hookWindowTimer = HOOK_WINDOW_FRAMES;
    setEncounter(enc);

    if (gameData.current.lineOut >= MAX_LINE) {
      buzz(120);
      setSnapReason("A heavy strike, but the spool was already empty. Nothing left to give.");
      setGameState('SNAPPED');
    } else {
      buzz([0, 40, 60, 40]);
      setHookSets(0);
      setGameState('FISH_ON');
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const JIG_PULL_VELOCITY = -0.0333;
    const ACCELERATION_RATE = 0.05;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let lastTime = performance.now();

    const render = (now: number) => {
      animationFrameId.current = requestAnimationFrame(render);
      const W = dims.current.w;
      const H = dims.current.h;
      const rodJiggingY = H * 0.3;

      let dt = (now - lastTime) / FRAME_MS;
      lastTime = now;
      if (!Number.isFinite(dt) || dt <= 0) dt = 1;
      if (dt > 4) dt = 4;

      const state = gameStateRef.current;
      const activeCur = activeCurrentRef.current;
      const jig = selectedJigRef.current;
      const demo = demoRef.current.mode;

      let isMaxLine = false;
      let running = false;

      if (demo !== 'idle') {
        demoRef.current.t += dt;
        const t = demoRef.current.t;
        if (demo === 'drop') {
          gameData.current.depth = (t * 0.55) % MAX_DEPTH;
        } else if (demo === 'hookset') {
          gameData.current.depth = 128;
        } else {
          gameData.current.depth = 90 + Math.sin(t / 90) * 26;
          gameData.current.tension = demo === 'run' ? 62 + Math.sin(t / 22) * 30 : 44 + Math.sin(t / 40) * 32;
          gameData.current.fishX = Math.sin(t / 55) * 0.75;
          gameData.current.rodX = Math.sin(t / 55 - 1.1) * 0.55;
          running = demo === 'run';
        }
        gameData.current.lineOut = gameData.current.depth * (1 + (activeCur.factor / jig.weight));
      }

      if (demo === 'idle' && (state === 'DROPPING' || state === 'BOTTOM')) {
        if (dropBiteDepth.current !== null && gameData.current.depth >= dropBiteDepth.current) { triggerBite(); return; }
        if (hasJigged.current && gameData.current.depth > 10 && Math.random() < 0.0012 * dt) { triggerBite(); return; }

        const targetVelocity = isInteracting.current ? JIG_PULL_VELOCITY : jig.termVel;
        gameData.current.velocity += (targetVelocity - gameData.current.velocity) * smoothFactor(ACCELERATION_RATE, dt);
        gameData.current.depth += gameData.current.velocity * dt;

        if (gameData.current.depth <= 0) {
          gameData.current.depth = 0;
          gameData.current.velocity = 0;
          if (hasJigged.current) { resetDrop(); return; }
        }

        gameData.current.lineOut = gameData.current.depth * (1 + (activeCur.factor / jig.weight));
        isMaxLine = gameData.current.lineOut >= MAX_LINE;

        if (isMaxLine) {
          gameData.current.lineOut = MAX_LINE;
          gameData.current.depth = MAX_LINE / (1 + (activeCur.factor / jig.weight));
          gameData.current.velocity = 0;
        }
        if (gameData.current.depth >= MAX_DEPTH && state !== 'BOTTOM') {
          gameData.current.depth = MAX_DEPTH;
          gameData.current.velocity = 0;
          setGameState('BOTTOM');
        }
      }

      if (demo === 'idle' && state === 'FISH_ON') {
        gameData.current.hookWindowTimer -= dt;
        if (gameData.current.hookWindowTimer <= 0) {
          gameData.current.activeFish = null;
          setEncounter(null);
          setHookSets(0);
          setGameState(gameData.current.depth >= MAX_DEPTH ? 'BOTTOM' : 'DROPPING');
        } else {
          gameData.current.velocity += (jig.termVel - gameData.current.velocity) * smoothFactor(ACCELERATION_RATE, dt);
          gameData.current.depth += gameData.current.velocity * dt;
          if (gameData.current.depth >= MAX_DEPTH) { gameData.current.depth = MAX_DEPTH; gameData.current.velocity = 0; }
          gameData.current.lineOut = gameData.current.depth * (1 + (activeCur.factor / jig.weight));
        }
      }

      if (demo === 'idle' && state === 'FIGHTING') {
        const fish = gameData.current.activeFish!;
        const wasRunning = gameData.current.runTimer > 0;

        if (wasRunning) {
          gameData.current.runTimer -= dt;
        } else if (gameData.current.runsRemaining > 0 && gameData.current.depth < fish.hookDepth - 3 && Math.random() < fish.reRunChance * dt) {
          gameData.current.runTimer = fish.runFramesEff * 0.7;
          gameData.current.runsRemaining -= 1;
        }
        running = gameData.current.runTimer > 0;

        if (running && !wasRunningRef.current) buzz([0, 30, 40, 30]);
        wasRunningRef.current = running;

        if (pointerHeld.current) {
          const pointerNorm = (pointerX.current / W) * 2 - 1;
          gameData.current.rodX += (pointerNorm - gameData.current.rodX) * smoothFactor(0.2, dt);
        } else {
          gameData.current.rodX += (gameData.current.fishX - gameData.current.rodX) * smoothFactor(AUTO_ALIGN, dt);
        }

        const erraticChance = (running ? fish.erratic * 2 : fish.erratic) * DIFF * dt;
        if (Math.random() < erraticChance) gameData.current.fishTargetX = (Math.random() * 2) - 1;
        gameData.current.fishX += (gameData.current.fishTargetX - gameData.current.fishX) * smoothFactor(running ? 0.03 : 0.015, dt);

        const alignmentPenalty = Math.abs(gameData.current.fishX - gameData.current.rodX);
        let tensionDelta = 0;
        let depthDelta = 0;

        if (isInteracting.current) {
          if (running) {
            tensionDelta = 1.2 * DIFF * fish.reelTensionMult;
            depthDelta = -0.012 * EASE;
          } else {
            tensionDelta = (0.15 + alignmentPenalty * 1.0 * DIFF) * fish.reelTensionMult;
            depthDelta = -fish.reelRate;
          }
        } else {
          tensionDelta = -(0.9 - fish.stamina * 0.25) * EASE + (alignmentPenalty * 0.3 * DIFF);
          if (gameData.current.tension > 20) depthDelta = running ? fish.pull * fish.runPull : fish.pull;
        }

        gameData.current.tension = clamp(gameData.current.tension + tensionDelta * dt, 0, 100);
        gameData.current.depth += depthDelta * dt;
        gameData.current.lineOut = gameData.current.depth * (1 + (activeCur.factor / jig.weight));

        if (gameData.current.tension >= 100) {
          buzz(150);
          setSnapReason(running ? `You leaned on it mid-run. The ${fish.name} took the leader with it.` : `Drag redlined. The ${fish.name} shook as you cranked through it.`);
          setGameState('SNAPPED'); return;
        }
        if (gameData.current.lineOut >= MAX_LINE) {
          buzz(150);
          setSnapReason(`The ${fish.name} spooled you. Four hundred metres, all of it gone.`);
          setGameState('SNAPPED'); return;
        }
        if (gameData.current.tension <= 0 && !isInteracting.current && gameData.current.depth > 10) {
          setGameState('ESCAPED'); return;
        }
        if (gameData.current.depth <= 0) {
          buzz([0, 40, 50, 40, 50, 80]);
          setCaughtFish(fish);
          setGameState('CAUGHT'); return;
        }
      }

      const showFight = state === 'FIGHTING' || demo === 'fight' || demo === 'run';

      if (depthTextRef.current) depthTextRef.current.innerText = gameData.current.depth.toFixed(1);
      if (depthMarkerRef.current) { depthMarkerRef.current.style.top = `${clamp(gameData.current.depth / MAX_DEPTH, 0, 1) * 100}%`; }
      if (spoolTextRef.current) spoolTextRef.current.innerText = gameData.current.lineOut.toFixed(0);

      if (spoolBarRef.current) {
        const pct = clamp((gameData.current.lineOut / MAX_LINE) * 100, 0, 100);
        spoolBarRef.current.style.width = `${pct}%`;
        const tier = pct > 90 ? 'danger' : pct > 70 ? 'warn' : 'ok';
        if (spoolTierRef.current !== tier) {
          spoolTierRef.current = tier;
          spoolBarRef.current.style.backgroundColor = tier === 'danger' ? '#FF3B47' : tier === 'warn' ? '#FFB020' : '#3DDC97';
        }
      }
      if (spoolWarnRef.current) spoolWarnRef.current.style.opacity = isMaxLine ? '1' : '0';

      if (showFight) {
        const t = gameData.current.tension;
        if (tensionBarRef.current) {
          tensionBarRef.current.style.width = `${clamp(t, 0, 100)}%`;
          const tier = t > 85 ? 'danger' : t > 55 ? 'warn' : 'ok';
          if (tensionTierRef.current !== tier) {
            tensionTierRef.current = tier;
            tensionBarRef.current.style.backgroundColor = tier === 'danger' ? '#FF3B47' : tier === 'warn' ? '#FFB020' : '#3DDC97';
            tensionBarRef.current.style.boxShadow = tier === 'danger' ? '0 0 12px #FF3B47' : 'none';
          }
        }
        if (tensionTextRef.current) tensionTextRef.current.innerText = `${Math.round(t)}%`;

        const fx = clamp((gameData.current.fishX + 1) / 2, 0, 1) * 100;
        const rx = clamp((gameData.current.rodX + 1) / 2, 0, 1) * 100;
        if (alignFishRef.current) alignFishRef.current.style.left = `${fx}%`;
        if (alignRodRef.current) alignRodRef.current.style.left = `${rx}%`;
        if (alignGapRef.current) {
          alignGapRef.current.style.left = `${Math.min(fx, rx)}%`;
          alignGapRef.current.style.width = `${Math.abs(fx - rx)}%`;
        }
        const gap = Math.abs(gameData.current.fishX - gameData.current.rodX);
        const aTier = gap > 0.55 ? 'wide' : gap > 0.25 ? 'off' : 'on';
        if (alignTierRef.current !== aTier && alignTextRef.current) {
          alignTierRef.current = aTier;
          alignTextRef.current.innerText = aTier === 'wide' ? 'Way off' : aTier === 'off' ? 'Off line' : 'On line';
          alignTextRef.current.style.color = aTier === 'wide' ? '#FF3B47' : aTier === 'off' ? '#FFB020' : '#3DDC97';
        }
      }

      if (runBandRef.current) runBandRef.current.style.opacity = running ? '1' : '0';
      if (hookTimerBarRef.current && state === 'FISH_ON') {
        hookTimerBarRef.current.style.width = `${Math.max(0, (gameData.current.hookWindowTimer / HOOK_WINDOW_FRAMES) * 100)}%`;
      }

      const drawFighting = showFight;
      const boatRockingOffset = Math.sin(Date.now() / 600) * (H * 0.0125);
      const rodRestingY = (H * 0.6) + boatRockingOffset;
      const targetRodY = isInteracting.current && !drawFighting ? rodJiggingY : rodRestingY;
      gameData.current.rodTipY += (targetRodY - gameData.current.rodTipY) * smoothFactor(0.2, dt);

      // --- ANIMATED, TIME-OF-DAY SKY & SEA ---
      const klHour = ((Date.now() / 3600000) + 8) % 24;   // Malaysia time (UTC+8)
      const wavT = reducedMotion ? 0 : now * 0.001;        // animation clock (s)
      const pal = skyPaletteAt(klHour);
      const cel = celestialAt(klHour, W, H);
      const horizonY = H * HORIZON_FRAC;

      ctx.clearRect(0, 0, W, H);

      // Sky gradient (top → horizon)
      const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
      sky.addColorStop(0, rgbCss(pal.top));
      sky.addColorStop(1, rgbCss(pal.hor));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, horizonY);

      // Stars (fade in as the sky darkens)
      if (pal.light < 0.3) {
        const sa = clamp((0.3 - pal.light) / 0.3, 0, 1);
        for (let i = 0; i < 36; i++) {
          const sx = (Math.sin(i * 127.1) * 0.5 + 0.5) * W;
          const sy = (Math.sin(i * 311.7) * 0.5 + 0.5) * horizonY * 0.92;
          const tw = 0.45 + 0.55 * Math.sin(wavT * 1.4 + i);
          ctx.fillStyle = rgbCss([230, 240, 255], 0.55 * sa * tw);
          ctx.fillRect(sx, sy, 1.4, 1.4);
        }
      }

      // Sun / moon glow + disc
      const glowR = H * (cel.isMoon ? 0.11 : 0.17);
      const glow = ctx.createRadialGradient(cel.x, cel.y, 0, cel.x, cel.y, glowR);
      glow.addColorStop(0, rgbCss(pal.sun, (cel.isMoon ? 0.45 : 0.8) * clamp(pal.light + 0.25, 0, 1)));
      glow.addColorStop(1, rgbCss(pal.sun, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(cel.x - glowR, cel.y - glowR, glowR * 2, glowR * 2);
      const discR = cel.isMoon ? H * 0.017 : H * 0.026;
      ctx.fillStyle = rgbCss(cel.isMoon ? [214, 224, 240] : pal.sun, cel.isMoon ? 0.9 : 0.96);
      ctx.beginPath();
      ctx.arc(cel.x, cel.y, discR, 0, TAU);
      ctx.fill();

      // Slow drifting clouds
      const cloudTint = mixRGB(pal.hor, [255, 255, 255], 0.22);
      for (let i = 0; i < 3; i++) {
        const speed = 5 + i * 3.5;
        const cx = (((wavT * speed) + i * W * 0.55) % (W + 220)) - 110;
        const cy = horizonY * (0.26 + 0.2 * i);
        const cw = W * (0.26 + 0.06 * i);
        ctx.fillStyle = rgbCss(cloudTint, 0.05 * pal.light + 0.015);
        ctx.beginPath();
        ctx.ellipse(cx, cy, cw, cw * 0.16, 0, 0, TAU);
        ctx.fill();
      }

      // Horizon glow strip
      const hg = ctx.createLinearGradient(0, horizonY - H * 0.06, 0, horizonY + H * 0.015);
      hg.addColorStop(0, rgbCss(pal.hor, 0));
      hg.addColorStop(1, rgbCss(mixRGB(pal.hor, [255, 255, 255], 0.18), 0.5));
      ctx.fillStyle = hg;
      ctx.fillRect(0, horizonY - H * 0.06, W, H * 0.075);

      // Sea gradient (upper sea tint → deep, kept dark low for HUD readability)
      let seaTop = pal.sea;
      if (drawFighting) seaTop = mixRGB(seaTop, [6, 20, 32], 0.5);
      const water = ctx.createLinearGradient(0, horizonY, 0, H);
      water.addColorStop(0, rgbCss(seaTop));
      water.addColorStop(0.5, rgbCss(mixRGB(seaTop, [4, 16, 26], 0.6)));
      water.addColorStop(1, '#04101A');
      ctx.fillStyle = water;
      ctx.fillRect(0, horizonY, W, H - horizonY);

      // Shimmering sun/moon reflection column on the water
      const refA = clamp(pal.light, 0.12, 1);
      const colTop = horizonY;
      const colBot = horizonY + (H - horizonY) * 0.55;
      for (let i = 0; i < 14; i++) {
        const p = i / 14;
        const y = colTop + p * (colBot - colTop);
        const wdt = W * (0.03 + p * 0.10);
        const jitter = Math.sin(wavT * 2 + i * 1.7) * (6 + p * 10);
        const a = 0.16 * refA * (0.5 + 0.5 * Math.sin(wavT * 3 + i * 0.9)) * (1 - p);
        ctx.fillStyle = rgbCss(mixRGB(pal.sun, [255, 255, 255], 0.2), Math.max(0, a));
        ctx.fillRect(cel.x - wdt / 2 + jitter, y, wdt, Math.max(1.2, 2.4 * (1 - p)));
      }

      // Rolling wave crest lines near the surface
      for (let w = 0; w < 4; w++) {
        const baseY = horizonY + (H - horizonY) * (0.03 + w * 0.05);
        const amp = 2 + w * 1.3;
        const wl = W / (1.2 + w * 0.4);
        const a = Math.max(0.03, (0.10 - w * 0.02) * (0.6 + 0.4 * pal.light));
        ctx.strokeStyle = rgbCss(mixRGB(pal.hor, [255, 255, 255], 0.3), a);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const y = baseY + Math.sin((x / wl) * TAU + wavT * (0.8 + w * 0.3)) * amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = gameData.current.lineOut >= MAX_LINE || gameData.current.tension > 85 ? '#FF3B47' : 'rgba(230,237,243,0.55)';
      ctx.lineWidth = drawFighting ? 2 : 1.5;
      ctx.beginPath();

      const visualRodTipX = drawFighting ? (W / 2) + (gameData.current.rodX * (W * 0.22)) : W / 2;
      ctx.moveTo(visualRodTipX, gameData.current.rodTipY);

      if (drawFighting) {
        const visualFishX = (W / 2) + (gameData.current.fishX * (W / 2 - 20));
        ctx.lineTo(visualFishX, H * 0.4);
        ctx.stroke();
        ctx.fillStyle = 'rgba(77,208,225,0.35)';
        ctx.beginPath();
        ctx.ellipse(visualFishX, H * 0.4, W * 0.042, W * 0.014, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const bowX = (W / 2) + (activeCur.factor * 1.5 * (gameData.current.depth / MAX_DEPTH)) * (W / BASE_WIDTH);
        ctx.quadraticCurveTo(bowX, H * 0.6, W / 2, H);
        ctx.stroke();
      }

      const rodThickness = clamp(W * 0.039, 10, 20);
      ctx.strokeStyle = '#05070A';
      ctx.lineWidth = rodThickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(W + 30, H + 30);
      ctx.lineTo(visualRodTipX, gameData.current.rodTipY);
      ctx.stroke();

      ctx.fillStyle = '#4DD0E1';
      ctx.beginPath();
      ctx.arc(visualRodTipX, gameData.current.rodTipY, rodThickness * 0.3, 0, Math.PI * 2);
      ctx.fill();
    };

    animationFrameId.current = requestAnimationFrame(render);
    return () => { if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current); };
  }, [triggerBite, resetDrop]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (tutorialOpen || gameState === 'COVER') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.current = e.clientX - rect.left;
    pointerHeld.current = true;

    if (gameState === 'READY') {
      setGameState('DROPPING');
      if (Math.random() <= 0.05) dropBiteDepth.current = Math.floor(Math.random() * 220) + 30;
      return;
    }
    if (gameState === 'DROPPING' || gameState === 'BOTTOM') {
      isInteracting.current = true;
      hasJigged.current = true;
    }
    if (gameState === 'FISH_ON') {
      buzz(15);
      const next = hookSets + 1;
      setHookSets(next);
      if (next >= 3) {
        const fish = gameData.current.activeFish!;
        gameData.current.runTimer = fish.runFramesEff;
        gameData.current.runsRemaining = fish.runBudget;
        wasRunningRef.current = true;
        setGameState('FIGHTING');
        setHookSets(0);
      }
      return;
    }
    if (gameState === 'FIGHTING') isInteracting.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'FIGHTING' || tutorialOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.current = e.clientX - rect.left;
    pointerHeld.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* already gone */ }
    isInteracting.current = false;
    if (e.pointerType !== 'mouse') pointerHeld.current = false;
  };

  const inPlay = gameState === 'READY' || gameState === 'DROPPING' || gameState === 'BOTTOM' || gameState === 'FIGHTING' || gameState === 'FISH_ON';
  const hudVisible = inPlay || tutorialOpen;
  const showFightGauges = gameState === 'FIGHTING' || demoFight;
  const showHookset = gameState === 'FISH_ON' || demoMode === 'hookset';
  const hookPips = demoMode === 'hookset' ? demoHookSets : hookSets;
  const captionAtBottom = !spotRect || (spotRect.top + spotRect.height) < dims.current.h * 0.55;

  const ticks = [0, 50, 100, 150, 200, 250, 300];
  const setSpot = (key: SpotKey) => (el: HTMLDivElement | null) => { spotEls.current[key] = el; };

  return (
    <div
      ref={rootRef}
      className={
        fitScreen
          ? "fixed inset-0 z-50 flex items-stretch justify-center bg-[#05070A] text-[#E6EDF3] select-none overflow-hidden"
          : "flex w-full flex-col items-center justify-center bg-[#05070A] px-2 py-1 text-[#E6EDF3] select-none"
      }
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
    >
      <style>{`
        .fs-label { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #7C8B9C; line-height: 1; }
        .fs-num { font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", "Roboto Mono", monospace; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
        @keyframes fsBlink { 0%, 100% { opacity: 1 } 50% { opacity: .38 } }
        .fs-blink { animation: fsBlink 1.1s steps(2, end) infinite; }

        @keyframes fsUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
        .fs-up { animation: fsUp .8s cubic-bezier(.16,1,.3,1) both; }
        @keyframes fsSonar { 0% { transform: scale(.28); opacity: .5 } 70% { opacity: .12 } 100% { transform: scale(1.75); opacity: 0 } }
        .fs-sonar { animation: fsSonar 4.2s ease-out infinite; }
        @keyframes fsBubbleUp { 0% { transform: translateY(0) scale(.6); opacity: 0 } 12% { opacity: .55 } 85% { opacity: .2 } 100% { transform: translateY(-460px) scale(1.15); opacity: 0 } }
        .fs-bubble { animation-name: fsBubbleUp; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes fsJigBob { 0%, 100% { transform: translate(-50%, -50%) translateY(-10px) rotate(-6deg) } 50% { transform: translate(-50%, -50%) translateY(12px) rotate(5deg) } }
        .fs-jig { animation: fsJigBob 4.6s ease-in-out infinite; }
        @keyframes fsSweep { 0% { transform: translateY(-30%); opacity: 0 } 25% { opacity: .5 } 75% { opacity: .5 } 100% { transform: translateY(560%); opacity: 0 } }
        .fs-sweep { animation: fsSweep 7s cubic-bezier(.4,0,.6,1) infinite; }
        @keyframes fsDrift { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .fs-drift { display: flex; width: max-content; animation: fsDrift 26s linear infinite; }
        @keyframes fsPulseSoft { 0%, 100% { opacity: .45 } 50% { opacity: 1 } }
        .fs-pulse { animation: fsPulseSoft 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .fs-blink, .fs-sonar, .fs-bubble, .fs-jig, .fs-sweep, .fs-drift, .fs-pulse { animation: none }
          .fs-up { animation-duration: .01ms }
        }
      `}</style>

      <div
        ref={frameRef}
        className={
          fitScreen
            ? "relative h-full w-full overflow-hidden bg-[#05070A] border-x border-[#1C2733]"
            : "relative w-[min(560px,calc(100vw-1.5rem))] h-[min(775px,calc(100dvh-4.5rem))] overflow-hidden bg-[#05070A] rounded-[22px] border border-[#1C2733] shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        }
        style={fitScreen ? { maxWidth: FIT_MAX_WIDTH } : undefined}
      >
        {hudVisible && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-x-0 top-0 bg-[#0D141B]/94 backdrop-blur-md border-b border-[#1C2733]" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
              <div className="h-[3px] w-full bg-[#111A22]">
                <div ref={spoolBarRef} className="h-full w-0 bg-[#3DDC97] transition-[width] duration-75" />
              </div>

              <div className="flex items-center justify-between px-3 py-2">
                <div ref={setSpot('line')} className="flex items-baseline gap-2">
                  <span className="fs-label">Line</span>
                  <span className="fs-num text-[15px] font-semibold text-[#E6EDF3]">
                    <span ref={spoolTextRef}>0</span>
                    <span className="text-[#4A5A69]"> / {MAX_LINE} m</span>
                  </span>
                </div>

                {gameState === 'FIGHTING' && encounter ? (
                  <div className="flex items-center gap-2">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#FF3B47] fs-blink" />
                    <span className="fs-label !text-[#FF3B47]">Unknown target</span>
                  </div>
                ) : (
                  <div ref={setSpot('tide')} className="flex items-center gap-2">
                    <span className="fs-num text-[11px] text-[#4A5A69]">{localTime}</span>
                    <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: activeCurrent.hex }} />
                    <span className="fs-label" style={{ color: activeCurrent.hex }}>{activeCurrent.short}</span>
                  </div>
                )}
              </div>

              {showFightGauges && (
                <div ref={setSpot('tension')} className="px-3 pb-2.5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="fs-label">Drag load</span>
                    <span ref={tensionTextRef} className="fs-num text-[13px] font-semibold text-[#E6EDF3]">0%</span>
                  </div>
                  <div className="relative h-[14px] bg-[#0A1017] overflow-hidden">
                    <div ref={tensionBarRef} className="h-full w-0 bg-[#3DDC97]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0) 0 5px, #0D141B 5px 7px)' }} />
                    <div className="absolute inset-y-0 right-0 w-[15%] border-l border-[#FF3B47]/70 bg-[#FF3B47]/10" />
                  </div>
                </div>
              )}

              {showFightGauges && (
                <div ref={setSpot('align')} className="px-3 pb-2.5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="fs-label">Rod / fish</span>
                    <span ref={alignTextRef} className="fs-label" style={{ color: '#3DDC97' }}>On line</span>
                  </div>
                  <div className="relative h-[22px] bg-[#0A1017] border border-[#1C2733] overflow-hidden">
                    <div className="absolute left-1/2 inset-y-0 w-px bg-[#1C2733]" />
                    <div ref={alignGapRef} className="absolute inset-y-0 bg-[#FF3B47]/18" style={{ left: '50%', width: '0%' }} />
                    <div ref={alignFishRef} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '50%' }}>
                      <div className="w-[18px] h-[6px] rounded-full bg-[#4DD0E1]" />
                    </div>
                    <div ref={alignRodRef} className="absolute top-0 bottom-0 -translate-x-1/2 w-[2px] bg-[#E6EDF3]" style={{ left: '50%' }} />
                  </div>
                </div>
              )}

              <div ref={(el) => { runBandRef.current = el; spotEls.current.run = el; }} className="flex items-center justify-between px-3 py-[7px] bg-[#FFB020] opacity-0 transition-opacity duration-150">
                <span className="fs-label !text-[#0D141B] fs-blink">&#9666;&#9666; Fish running</span>
                <span className="fs-label !text-[#0D141B]/70">Let go — give line</span>
              </div>
            </div>

            <div ref={setSpot('depth')} className="absolute left-3 top-[36%] bottom-[13%] w-[52px]">
              <div className="relative h-full">
                <div className="absolute left-0 inset-y-0 w-px bg-[#1C2733]" />
                {ticks.map((d) => (
                  <div key={d} className="absolute left-0 -translate-y-1/2 flex items-center gap-1.5" style={{ top: `${(d / MAX_DEPTH) * 100}%` }}>
                    <div className={d % 100 === 0 ? "w-[10px] h-px bg-[#31414F]" : "w-[5px] h-px bg-[#1C2733]"} />
                    {d % 100 === 0 && <span className="fs-num text-[8px] text-[#4A5A69]">{d}</span>}
                  </div>
                ))}
                <div ref={depthMarkerRef} className="absolute left-0 -translate-y-1/2 flex items-center gap-1.5" style={{ top: '0%' }}>
                  <div className="w-[14px] h-px bg-[#4DD0E1]" />
                  <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#4DD0E1]" />
                  <span className="fs-num text-[19px] font-bold text-[#4DD0E1] leading-none drop-shadow-[0_0_10px_rgba(77,208,225,0.45)]">
                    <span ref={depthTextRef}>0.0</span>
                  </span>
                  <span className="fs-label !text-[#4DD0E1]/60 self-end pb-[2px]">m</span>
                </div>
              </div>
            </div>

            <div ref={spoolWarnRef} className="absolute inset-x-0 top-[46%] opacity-0 transition-opacity duration-300">
              <div className="bg-[#FF3B47]/12 border-y border-[#FF3B47]/50 py-3 px-4 flex items-center justify-between">
                <span className="fs-label !text-[#FF3B47] fs-blink">Spool empty</span>
                <span className="fs-label">Jig hanging in the current</span>
              </div>
            </div>

            {showHookset && (
              <div ref={setSpot('hookset')} className="absolute inset-x-0 top-[40%] flex flex-col items-center">
                <div className="bg-[#0D141B]/95 border border-[#3DDC97]/40 px-5 py-4 flex flex-col items-center gap-3 shadow-[0_0_40px_rgba(61,220,151,0.15)]">
                  <span className="fs-label !text-[#3DDC97] fs-blink">Fish on — set the hook</span>
                  <div className="flex gap-2.5">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className={`w-7 h-[6px] transition-colors duration-150 ${hookPips >= n ? 'bg-[#3DDC97]' : 'bg-[#1C2733]'}`} />
                    ))}
                  </div>
                  <div className="w-[168px] h-[2px] bg-[#111A22]">
                    <div ref={hookTimerBarRef} className="h-full w-full bg-[#3DDC97]" />
                  </div>
                  <span className="fs-num text-[15px] font-bold text-[#E6EDF3]">TAP 3&#215;</span>
                </div>
              </div>
            )}

            {gameState === 'READY' && !tutorialOpen && (
              <div className="absolute inset-x-0 bottom-[14%] flex flex-col items-center gap-5">
                <span className="fs-label fs-blink !text-[#E6EDF3]">Tap the water to drop</span>
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button className="min-h-[46px] px-5 bg-[#0D141B] border border-[#1C2733] text-[#7C8B9C] hover:text-[#E6EDF3] active:scale-95 transition" onPointerDown={(e) => { e.stopPropagation(); resetDrop(); }}>
                    <span className="fs-label">Change jig</span>
                  </button>
                  <button className="min-h-[46px] px-5 bg-[#0D141B] border border-[#1C2733] text-[#FFB020] active:scale-95 transition" onPointerDown={(e) => { e.stopPropagation(); openTutorial(); }}>
                    <span className="fs-label !text-[#FFB020]">How to play</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- ANIMATED COVER / ATTRACT SCREEN --- */}
        {gameState === 'COVER' && (
          <div className="absolute inset-0 z-20 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(125% 85% at 50% -5%, #0E5A80 0%, #08283C 42%, #04090F 100%)' }} />

            <div className="absolute inset-x-0 top-[15%] h-px bg-gradient-to-r from-transparent via-[#4DD0E1]/40 to-transparent" />

            <div className="fs-sweep absolute inset-x-0 top-0 h-[110px]" style={{ background: 'linear-gradient(180deg, transparent, rgba(77,208,225,0.10), transparent)' }} />

            <div className="absolute inset-0">
              {COVER_BUBBLES.map((b, i) => (
                <span
                  key={i}
                  className="fs-bubble absolute bottom-0 rounded-full bg-[#4DD0E1]/35"
                  style={{ left: b.left, width: b.size, height: b.size, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }}
                />
              ))}
            </div>

            <div className="absolute left-1/2 top-[32%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="fs-sonar absolute inset-0 rounded-full border border-[#4DD0E1]/30" style={{ animationDelay: `${i * 1.4}s` }} />
              ))}
              <div className="fs-jig absolute left-1/2 top-1/2">
                <div className="mx-auto h-[46px] w-px bg-gradient-to-b from-transparent to-[#4DD0E1]/70" />
                <div className="mx-auto h-[30px] w-[9px] rounded-full bg-gradient-to-b from-[#E6EDF3] to-[#4DD0E1] shadow-[0_0_22px_rgba(77,208,225,0.8)]" />
                <div className="mx-auto mt-[2px] h-[9px] w-[9px] rotate-45 border-b border-r border-[#E6EDF3]/70" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6" style={{ paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom))' }}>
              <span className="fs-up fs-label !text-[#4DD0E1] mb-3" style={{ animationDelay: '.05s' }}>Fishyology presents</span>

              <h2 className="fs-up text-center text-[40px] font-black uppercase leading-[0.86] tracking-[-0.02em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.8)]" style={{ animationDelay: '.18s' }}>
                Jigging<br />Master
              </h2>

              <p className="fs-up mt-3 text-center text-[18px] font-semibold uppercase leading-relaxed tracking-[0.24em] text-[#B8C4D0]" style={{ animationDelay: '.32s' }}>
                Master the water.<br />Conquer the fight.
              </p>

              <div
                className="fs-up mt-5 w-full overflow-hidden border-y border-[#1C2733]/80 py-2"
                style={{ animationDelay: '.46s', maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
              >
                <div className="fs-drift">
                  {[...COVER_MARQUEE, ...COVER_MARQUEE].map((n, i) => (
                    <span key={i} className="fs-label whitespace-nowrap px-4 !text-[#4A5A69]">{n}</span>
                  ))}
                </div>
              </div>

              <div className="fs-up mt-5 flex w-full max-w-[320px] flex-col gap-2" style={{ animationDelay: '.6s' }}>
                <button onClick={leaveCover} className="min-h-[54px] w-full bg-[#3DDC97] text-[#05070A] transition-transform active:scale-[0.98]">
                  <span className="fs-label !text-[11px] !text-[#05070A]">Start the drop</span>
                </button>
                <button onClick={coverToTutorial} className="min-h-[44px] w-full border border-[#1C2733] bg-[#0D141B]/80 text-[#FFB020] transition active:scale-95">
                  <span className="fs-label !text-[#FFB020]">How to play</span>
                </button>
              </div>

              <span className="fs-pulse fs-label mt-4 !text-[8px] !text-[#31414F]">20+ species &middot; 300 m of water &middot; one leader</span>
            </div>
          </div>
        )}

        {gameState === 'SETUP' && !tutorialOpen && (
          <div className="absolute inset-0 bg-[#05070A]/96 backdrop-blur-md z-20 flex flex-col justify-center px-6 overflow-y-auto" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))', paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
            <div className="w-full max-w-[320px] mx-auto relative">
              <span className="fs-label !text-[#FFB020]">Jigging Setup</span>
              <h2 className="fs-num text-[26px] font-bold text-[#E6EDF3] leading-none mt-2 mb-1">{localTime}</h2>
              <p className="text-[12.5px] text-[#7C8B9C] mb-5">{moonPhase} &middot; {activeCurrent.name}</p>

              <div className="flex items-center justify-between border-y border-[#1C2733] py-2.5 mb-5">
                <span className="fs-label">Current</span>
                <div className="flex items-center gap-2">
                  <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: activeCurrent.hex }} />
                  <span className="fs-num text-[12.5px]" style={{ color: activeCurrent.hex }}>{activeCurrent.short} tide</span>
                </div>
              </div>

              <span className="fs-label">Jig weight</span>
              <p className="text-[11.5px] text-[#4A5A69] leading-relaxed mt-2 mb-3">Heavier sinks faster and cuts the current, so less line goes out for the same depth.</p>
              <div className="grid grid-cols-2 gap-px bg-[#1C2733] border border-[#1C2733] mb-5">
                {JIGS.map((jig) => {
                  const on = selectedJig.weight === jig.weight;
                  return (
                    <button key={jig.weight} onClick={() => setSelectedJig(jig)} className={`min-h-[60px] flex flex-col items-start justify-center px-4 transition-colors ${on ? 'bg-[#FFB020] text-[#05070A]' : 'bg-[#0D141B] text-[#7C8B9C] hover:bg-[#121B24]'}`}>
                      <span className="fs-num text-[18px] font-bold leading-none">{jig.weight}g</span>
                      <span className={`fs-num text-[10px] mt-1.5 ${on ? 'text-[#05070A]/70' : 'text-[#4A5A69]'}`}>{jig.label}</span>
                    </button>
                  );
                })}
              </div>

              <button onClick={() => setGameState('READY')} className="w-full min-h-[52px] bg-[#3DDC97] text-[#05070A] active:scale-[0.98] transition-transform">
                <span className="fs-label !text-[#05070A] !text-[11px]">Board the boat</span>
              </button>

              <div className="flex gap-2 mt-2.5">
                <button onClick={openTutorial} className="flex-1 min-h-[44px] bg-[#0D141B] border border-[#1C2733] text-[#FFB020] active:scale-95 transition">
                  <span className="fs-label !text-[#FFB020]">How to play</span>
                </button>
                <button onClick={toggleFitScreen} className="flex-1 min-h-[44px] bg-[#0D141B] border border-[#1C2733] active:scale-95 transition">
                  <span className="fs-label">{fitScreen ? 'Exit full screen' : 'Fit to screen'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'CAUGHT' && caughtFish && (
          <div className="absolute inset-0 bg-[#05070A]/97 backdrop-blur-md z-20 flex flex-col justify-center px-6 overflow-y-auto" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))', paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
            <div className="w-full max-w-[320px] mx-auto">
              <span className="fs-label !text-[#3DDC97]">Landed</span>
              <h3 className="text-[27px] font-bold leading-[1.05] mt-2" style={{ color: accentOf(caughtFish) }}>{caughtFish.name}</h3>
              <p className="text-[12.5px] text-[#7C8B9C] mb-5">{caughtFish.archetype}</p>

              <div className="grid grid-cols-2 gap-px bg-[#1C2733] border border-[#1C2733] mb-5">
                <div className="bg-[#0D141B] px-4 py-3">
                  <span className="fs-label">Weight</span>
                  <p className="fs-num text-[20px] font-bold text-[#E6EDF3] mt-1.5">{kg3(caughtFish.weightKg)}<span className="text-[12px] text-[#4A5A69]"> kg</span></p>
                </div>
                <div className="bg-[#0D141B] px-4 py-3">
                  <span className="fs-label">Hooked at</span>
                  <p className="fs-num text-[20px] font-bold text-[#4DD0E1] mt-1.5">{caughtFish.hookDepth.toFixed(0)}<span className="text-[12px] text-[#4A5A69]"> m</span></p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mb-5">
                <StatRow label="Power" value={caughtFish.pullStr / 0.09} color={accentOf(caughtFish)} />
                <StatRow label="Agility" value={caughtFish.erratic / 0.18} color={accentOf(caughtFish)} />
                <StatRow label="Aggression" value={caughtFish.aggression} color={accentOf(caughtFish)} />
                <StatRow label="Stamina" value={caughtFish.stamina} color={accentOf(caughtFish)} />
              </div>

              <div className="flex items-center justify-between border-y border-[#1C2733] py-2.5 mb-3.5">
                <span className="fs-label">{difficultyLabel(caughtFish.stars)}</span>
                <span className="text-[13px]" style={{ color: starHex(caughtFish.stars) }}><Stars n={caughtFish.stars} /></span>
              </div>

              {/* Dynamic Leaderboard Status Indicator */}
              <div className="mb-5 py-2 px-3 bg-[#0D141B] border border-[#1C2733] text-center rounded">
                {saveStatus === 'saving' && <p className="text-[11px] text-[#FFB020] fs-blink uppercase tracking-widest font-bold">Saving catch to leaderboard...</p>}
                {saveStatus === 'saved' && <p className="text-[11px] text-[#3DDC97] uppercase tracking-widest font-bold">✓ Logged to Leaderboard!</p>}
                {saveStatus === 'error' && <p className="text-[11px] text-[#FF3B47] uppercase tracking-widest font-bold">Error saving catch record</p>}
                {saveStatus === 'idle' && !user && (
                  <button onClick={onLoginRequest} className="text-[11px] text-[#4DD0E1] hover:underline uppercase tracking-widest font-bold">
                    Log in with Google to post score
                  </button>
                )}
              </div>

              <button onClick={generateConditions} className="w-full min-h-[52px] bg-[#4DD0E1] text-[#05070A] active:scale-[0.98] transition-transform">
                <span className="fs-label !text-[#05070A] !text-[11px]">Drop again</span>
              </button>
            </div>
          </div>
        )}

        {(gameState === 'SNAPPED' || gameState === 'ESCAPED') && (
          <div className="absolute inset-0 bg-[#05070A]/97 backdrop-blur-md z-20 flex flex-col justify-center px-6">
            <div className="w-full max-w-[320px] mx-auto">
              <span className="fs-label" style={{ color: gameState === 'SNAPPED' ? '#FF3B47' : '#FFB020' }}>{gameState === 'SNAPPED' ? 'Leader parted' : 'Hook pulled'}</span>
              <h2 className="fs-num text-[30px] font-bold leading-none mt-3 mb-4" style={{ color: gameState === 'SNAPPED' ? '#FF3B47' : '#FFB020' }}>{gameState === 'SNAPPED' ? 'SNAP' : 'DROPPED'}</h2>
              <p className="text-[13px] text-[#7C8B9C] leading-relaxed mb-7">{gameState === 'SNAPPED' ? snapReason : 'The line went slack and the hook fell out. Keep some load on it, even while you are giving line.'}</p>
              <button onClick={generateConditions} className="w-full min-h-[52px] border active:scale-[0.98] transition-transform" style={{ backgroundColor: gameState === 'SNAPPED' ? '#FF3B47' : '#FFB020', borderColor: gameState === 'SNAPPED' ? '#FF3B47' : '#FFB020', color: '#05070A' }}>
                <span className="fs-label !text-[#05070A] !text-[11px]">{gameState === 'SNAPPED' ? 'Rig a new leader' : 'Reel up and retie'}</span>
              </button>
            </div>
          </div>
        )}

        {tutorialOpen && (
          <>
            <div className="absolute inset-0 z-30 cursor-pointer" onPointerDown={nextTutorial}>
              {spotRect ? <div className="absolute border border-[#FFB020] pointer-events-none transition-all duration-300 ease-out" style={{ left: spotRect.left, top: spotRect.top, width: spotRect.width, height: spotRect.height, boxShadow: '0 0 0 9999px rgba(5,7,10,0.88), 0 0 24px rgba(255,176,32,0.35)' }} /> : <div className="absolute inset-0 bg-[#05070A]/88" />}
            </div>
            <div className={`absolute inset-x-0 z-40 px-4 ${captionAtBottom ? 'bottom-0' : 'top-0'}`} style={captionAtBottom ? { paddingBottom: 'max(1rem, env(safe-area-inset-bottom))', paddingTop: '1rem' } : { paddingTop: 'max(1rem, env(safe-area-inset-top))', paddingBottom: '1rem' }}>
              <div className="bg-[#0D141B] border border-[#1C2733] p-4">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="fs-label !text-[#FFB020]">{step.eyebrow}</span>
                  <span className="fs-num text-[10px] text-[#4A5A69]">{String(tutorialStep + 1).padStart(2, '0')} / {String(TUTORIAL_STEPS.length).padStart(2, '0')}</span>
                </div>
                <h3 className="text-[19px] font-bold text-[#E6EDF3] leading-[1.15] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#7C8B9C] leading-relaxed">{step.body}</p>
                <div className="flex gap-1 my-4">{TUTORIAL_STEPS.map((_, i) => (<div key={i} className={`h-[2px] flex-1 ${i <= tutorialStep ? 'bg-[#FFB020]' : 'bg-[#1C2733]'}`} />))}</div>
                <div className="flex gap-2">
                  <button aria-disabled={tutorialStep === 0} className={`min-h-[44px] px-4 bg-[#111A22] border border-[#1C2733] active:scale-95 transition ${tutorialStep === 0 ? 'opacity-30' : ''}`} onPointerDown={(e) => { e.stopPropagation(); prevTutorial(); }}><span className="fs-label">Back</span></button>
                  <button className="flex-1 min-h-[44px] bg-[#FFB020] text-[#05070A] active:scale-[0.98] transition-transform" onPointerDown={(e) => { e.stopPropagation(); nextTutorial(); }}><span className="fs-label !text-[#05070A]">{tutorialStep === TUTORIAL_STEPS.length - 1 ? 'Start fishing' : 'Next'}</span></button>
                  <button className="min-h-[44px] px-4 bg-[#111A22] border border-[#1C2733] active:scale-95 transition" onPointerDown={(e) => { e.stopPropagation(); closeTutorial(); }}><span className="fs-label">Skip</span></button>
                </div>
                <p className="fs-label !text-[8px] text-center mt-3.5 !text-[#31414F]">{isTouch ? 'Tap anywhere to continue' : 'Click anywhere, or use \u2190 \u2192'}</p>
              </div>
            </div>
          </>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 touch-none block cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerOut={() => { isInteracting.current = false; }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

const gameHeroData = {
  title: "Jigging Master",
  subtitle: "The Fishyology Creative Studio",
  tagline: "Master the water. Conquer the fight.",
  image: "https://res.cloudinary.com/dub3h3elq/image/upload/v1783502920/IMG_5329-EDIT_xh673d.jpg", 
};

// --- HORIZONTAL LEADERBOARD CARD ---
function RankCard({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  const medal = rank === 1 ? '#FFB020' : rank === 2 ? '#B8C4D0' : rank === 3 ? '#C2410C' : '#31414F';
  return (
    <article className="flex w-[248px] shrink-0 items-center gap-3 border-r border-[#1C2733] bg-[#0D141B] px-4 py-3">
      <span className="fs-num w-7 shrink-0 text-center text-[15px] font-bold leading-none" style={{ color: medal }}>
        {rank}
      </span>

      {entry.profiles?.avatar_url ? (
        <img src={entry.profiles.avatar_url} alt="" className="h-9 w-9 shrink-0 rounded-full border border-[#1C2733] bg-[#111A22] object-cover" />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1C2733] text-[13px] font-bold text-white">
          {entry.profiles?.display_name?.charAt(0) || 'A'}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold leading-tight text-[#E6EDF3]">
          {entry.profiles?.display_name || 'Unknown Angler'}
        </p>
        <p className="truncate text-[10.5px] leading-tight text-[#7C8B9C]">
          {entry.species} &middot; {entry.profiles?.state || 'Malaysia'}
        </p>
        <p className="fs-num mt-1 text-[13px] font-bold leading-none text-[#4DD0E1]">
          {kg3(entry.weight_kg)}<span className="text-[9px] text-[#4A5A69]"> kg</span>
        </p>
      </div>
    </article>
  );
}

// --- MAIN EXPORT WITH DYNAMIC LEADERBOARD, SEASONAL CYCLES & SUPABASE AUTH ---
export default function GamePage() {
  const gameRef = useRef<HTMLDivElement>(null);
  
  // Auth & Profile State
  const [user, setUser] = useState<any>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Leaderboard Data State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  // SEASON DATES CONFIGURATION
  const SEASON_START = '2026-07-25T00:00:00.000Z'; // Season Start: July 25, 2026
  const SEASON_END = '2026-08-31T23:59:59.999Z';   // Season End: August 31, 2026

  // Countdown State
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining(SEASON_END));

  // Live Timer Tick Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(SEASON_END));
    }, 1000);

    return () => clearInterval(timer);
  }, [SEASON_END]);

  // Fetch dynamic leaderboard from Supabase filtered by Active Season
  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardLoading(true);
    const { data, error } = await supabase
      .from('catches')
      .select(`
        id,
        species,
        weight_kg,
        depth_m,
        caught_at, 
        profiles (
          display_name,
          state,
          avatar_url
        )
      `)
      .gte('caught_at', SEASON_START)
      .lte('caught_at', SEASON_END)
      .order('weight_kg', { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching leaderboard:", {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
    } else if (data) {
      setLeaderboard(data as unknown as LeaderboardEntry[]);
    }
    setLeaderboardLoading(false);
  }, [SEASON_START, SEASON_END]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Check initial auth session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        await checkProfile(session.user.id);
      }
      setAuthLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        await checkProfile(session.user.id);
      } else {
        setHasProfile(false);
        setShowOnboarding(false);
      }
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  const checkProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setHasProfile(true);
      setShowOnboarding(false);
    } else {
      setHasProfile(false);
      setShowOnboarding(true);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/game`, 
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setHasProfile(false);
  };

  const handleCompleteProfile = async (profileData: { displayName: string; state: string; gender: string; avatarUrl: string }) => {
    if (!user) return;
    
    const { error } = await supabase.from('profiles').upsert([
      {
        id: user.id,
        email: user.email,
        display_name: profileData.displayName,
        state: profileData.state,
        gender: profileData.gender,
        avatar_url: profileData.avatarUrl,
      }
    ]);

    if (!error) {
      setHasProfile(true);
      setShowOnboarding(false);
      fetchLeaderboard();
    } else {
      console.error("Error saving profile:", error);
    }
  };

  const scrollToGame = () => {
    gameRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const repeats = leaderboard.length > 0 ? Math.max(1, Math.ceil(6 / leaderboard.length)) : 0;
  const loop = repeats > 0 ? Array.from({ length: repeats }).flatMap(() => leaderboard) : [];
  const marqueeSeconds = Math.max(18, loop.length * 4.5);

  return (
    <main className="bg-[#05070A] min-h-screen text-[#E6EDF3] selection:bg-[#4DD0E1] selection:text-[#05070A]">
      
      <style>{`
        @keyframes fsMarquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        .fs-marquee { mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
                      -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
        .fs-marquee-track { display: flex; width: max-content; animation-name: fsMarquee; animation-timing-function: linear; animation-iteration-count: infinite; }
        .fs-marquee:hover .fs-marquee-track, .fs-marquee:focus-within .fs-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .fs-marquee { overflow-x: auto; mask-image: none; -webkit-mask-image: none; }
          .fs-marquee-track { animation: none; }
        }
      `}</style>

      {/* CHANGED: Passed onCancel prop so users can close the modal without saving */}
      {showOnboarding && (
        <OnboardingModal 
          onSubmit={handleCompleteProfile} 
          onCancel={() => setShowOnboarding(false)} 
        />
      )}

      <nav className="absolute top-0 left-0 w-full p-5 z-50">
        <Link href="/" className="text-[#E6EDF3] hover:text-[#4DD0E1] transition-colors flex items-center gap-2 group w-max drop-shadow-md">
          <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
          <span className="tracking-widest uppercase text-[10px] font-bold text-white">Back to Main Site</span>
        </Link>
      </nav>

      <section className="relative h-[500px] max-h-[70dvh] w-full flex items-center justify-center overflow-hidden">
        <img src={gameHeroData.image} alt={gameHeroData.title} className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-[#05070A]/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/60 to-transparent"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center mt-8">
          <span className="text-[#4DD0E1] text-[16px] font-bold tracking-widest uppercase mb-3 block drop-shadow-md">
            {gameHeroData.subtitle}
          </span>
          <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tighter uppercase text-white drop-shadow-2xl leading-[0.85]">
            {gameHeroData.title}
          </h1>
          <p className="mt-4 text-[14px] md:text-[14px] font-bold uppercase tracking-widest text-[#B8C4D0] drop-shadow-md">
            {gameHeroData.tagline}
          </p>
        </div>
      </section>

      <section className="relative bg-[#05070A] pt-9 pb-11 px-6 z-20">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-serif text-white leading-tight mb-5">
            The ocean rewards skill, patience, and precision.
          </h2>

          <div className="space-y-4 text-[#7C8B9C] text-[16px] md:text-[16px] font-medium leading-relaxed">
            <p>
              In Jigging Master, every decision shapes the outcome. Read the tide, understand the current, choose the right jig, and work every layer of the water column to tempt predators from the deep.
            </p>
            <p>
              Face more than 20 legendary saltwater species, each with unique behavior and relentless power. Giant Groupers dive for cover. Dogtooth Tuna unleash blistering runs. Sailfish explode across the surface. Every encounter demands focus, timing, and complete control.
            </p>
            <p>
              Changing tides transform every trip. Gentle currents give you confidence, while powerful flows challenge your tackle and your technique. Learn to adapt, refine your approach, and turn every strike into a trophy catch.
            </p>
          </div>

          <p className="mt-7 w-full border-t border-[#1C2733] pt-6 text-[13px] md:text-[14px] font-bold uppercase leading-relaxed tracking-widest text-[#E6EDF3]">
            The fish are wild. The ocean is unforgiving.
            <span className="block text-[#4DD0E1]">Become the Jigging Master.</span>
          </p>

          <button onClick={scrollToGame} className="group mt-7 inline-flex items-center gap-3 bg-[#4DD0E1] text-[#05070A] px-8 py-4 font-bold text-[11px] tracking-widest uppercase hover:bg-[#3DDC97] transition-colors duration-300 shadow-[0_0_30px_rgba(77,208,225,0.15)]">
            <span>Play now</span>
            <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </button>
        </div>
      </section>

      {/* --- 3. DYNAMIC LEADERBOARD WITH SEASONAL TIMER --- */}
      <section className="relative bg-[#05070A] py-10 px-4 md:px-6 z-20 border-t border-[#1C2733]">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Row: Title & Countdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#3DDC97] fs-blink"></span>
                <h2 className="text-[12px] font-bold text-[#4DD0E1] uppercase tracking-widest">
                  Season 1 Leaderboard
                </h2>
              </div>
              <p className="text-[10px] text-[#7C8B9C] uppercase tracking-widest mt-0.5">
                July 25, 2026 – August 31, 2026
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="bg-[#0D141B] border border-[#1C2733] px-3.5 py-1.5 rounded flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[9px] uppercase font-bold text-[#FFB020] tracking-widest">
                Ends In:
              </span>
              {timeLeft.isEnded ? (
                <span className="fs-num text-[11px] font-bold text-[#FF3B47] uppercase tracking-wider">
                  Season Concluded
                </span>
              ) : (
                <span className="fs-num text-[12px] font-bold text-[#E6EDF3] tracking-tight">
                  {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              )}
            </div>
          </div>

          <div className="border border-[#1C2733] bg-[#0A1017] rounded-lg overflow-hidden">
            {leaderboardLoading ? (
              <div className="p-6 text-center text-[#7C8B9C] text-[11px] font-bold uppercase tracking-widest">Loading records…</div>
            ) : leaderboard.length === 0 ? (
              <div className="p-6 text-center text-[#7C8B9C] text-[11px] font-bold uppercase tracking-widest">No catches logged for Season 1 yet. Be the first!</div>
            ) : (
              <div className="fs-marquee relative overflow-hidden">
                <div className="fs-marquee-track" style={{ animationDuration: `${marqueeSeconds}s` }}>
                  {[...loop, ...loop].map((entry, i) => (
                    <RankCard
                      key={`${entry.id}-${i}`}
                      entry={entry}
                      rank={(i % leaderboard.length) + 1}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="px-5 py-4 bg-[#0D141B] border-t border-[#1C2733] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              {authLoading ? (
                <p className="text-[#7C8B9C] text-[11px] uppercase tracking-widest">Checking session…</p>
              ) : user && hasProfile ? (
                <>
                  <p className="text-[#3DDC97] text-[11px] font-bold tracking-widest uppercase">Signed in — your catches will post here</p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowOnboarding(true)}
                      className="text-[#E6EDF3] border border-[#1C2733] bg-[#111A22] px-4 py-2 rounded text-[10px] tracking-widest uppercase font-bold hover:bg-[#1C2733] transition-colors"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="text-[#FF3B47] border border-[#FF3B47]/30 bg-[#111A22] px-4 py-2 rounded text-[10px] tracking-widest uppercase font-bold hover:bg-[#FF3B47]/10 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[#7C8B9C] text-[12px]">Want your name on the board?</p>
                  <button 
                    onClick={handleGoogleLogin}
                    className="text-[#E6EDF3] border border-[#1C2733] bg-[#111A22] px-5 py-2 rounded text-[10px] tracking-widest uppercase font-bold hover:bg-[#1C2733] transition-colors"
                  >
                    Log in with Google
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. GAME SECTION --- */}
      <section ref={gameRef} className="relative w-full border-t border-[#1C2733] py-6 md:py-10">
        <FishingSimulator 
          user={user} 
          hasProfile={hasProfile} 
          onCatchSaved={fetchLeaderboard}
          onLoginRequest={handleGoogleLogin} 
        />
      </section>
      
    </main>
  );
}
