"use client";

import React, { useEffect, useRef, useState } from 'react';

// --- DATA: MALAYSIAN STATES ---
const MALAYSIA_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur',
  'Labuan', 'Putrajaya'
];

// --- DATA: AVATAR OPTIONS ---
// You can replace these URLs with your actual game assets
const AVATAR_OPTIONS = [
  { id: 'av1', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler1&backgroundColor=0D141B' },
  { id: 'av2', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler2&backgroundColor=0D141B' },
  { id: 'av3', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler3&backgroundColor=0D141B' },
  { id: 'av4', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler4&backgroundColor=0D141B' },
  { id: 'av5', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler5&backgroundColor=0D141B' },
  { id: 'av6', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler6&backgroundColor=0D141B' },
  { id: 'av7', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler7&backgroundColor=0D141B' },
  { id: 'av8', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler8&backgroundColor=0D141B' },
  { id: 'av9', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler9&backgroundColor=0D141B' },
  { id: 'av10', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Angler10&backgroundColor=0D141B' },
];

// Gender is optional: it isn't shown anywhere, so players aren't made to share it.
const GENDER_OPTIONS = ['Male', 'Female', 'Prefer not to say'];

const FOCUSABLE = 'button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])';
const FOCUS_RING = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DD0E1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D141B]';

export interface ProfileFields {
  displayName: string;
  state: string;
  gender: string;
  avatarUrl: string;
}

interface OnboardingModalProps {
  /** Saves the profile; resolves false when the save failed so the form can say so. */
  onSubmit: (profileData: ProfileFields) => Promise<boolean>;
  /** Closes the modal without saving. Escape does the same when this is provided. */
  onCancel?: () => void;
  /** The saved profile, when editing, so the form opens with it filled in. */
  initial?: ProfileFields | null;
  mode?: 'create' | 'edit';
}

/** "a, b and c" for the save hint. */
function listWords(words: string[]) {
  return words.length <= 1 ? words.join('') : `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;
}

export default function OnboardingModal({ onSubmit, onCancel, initial, mode = 'create' }: OnboardingModalProps) {
  const [displayName, setDisplayName] = useState(initial?.displayName ?? '');
  const [selectedState, setSelectedState] = useState(initial?.state ?? '');
  const [gender, setGender] = useState(initial?.gender ?? '');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(initial?.avatarUrl ?? '');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  // Held in a ref so a new onCancel from each parent render doesn't re-run the
  // focus effect below (which would keep pulling focus back to the name field).
  const cancelRef = useRef(onCancel);
  useEffect(() => {
    cancelRef.current = onCancel;
  }, [onCancel]);

  // The leaderboard shows name, state and avatar, so those are the required fields.
  const missing = [
    !displayName.trim() && 'a display name',
    !selectedState && 'your state',
    !selectedAvatar && 'an avatar',
  ].filter(Boolean) as string[];
  const isFormValid = missing.length === 0;

  // Dialog behaviour: focus the first field, keep Tab inside, Escape closes, and
  // focus returns to whatever opened it.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    nameRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && cancelRef.current) {
        cancelRef.current();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || saving) return;

    setSaving(true);
    setSaveError('');
    const saved = await onSubmit({
      displayName: displayName.trim(),
      state: selectedState,
      gender,
      avatarUrl: selectedAvatar
    });
    // On success the parent closes the modal; only a failure needs handling here.
    if (!saved) {
      setSaving(false);
      setSaveError("Couldn't save your profile. Please try again.");
    }
  };

  const labelClass = "font-sans text-xs font-bold tracking-[0.15em] uppercase text-[#7C8B9C]";

  return (
    <div className="fixed inset-0 z-[100] bg-[#05070A]/80 backdrop-blur-sm flex items-center justify-center p-4">

      {/* Modal Container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className="bg-[#0D141B] border border-[#1C2733] max-w-md w-full shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90dvh]"
      >

        {/* Header */}
        <div className="border-b border-[#1C2733] px-6 py-4 bg-[#0A1017]">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#4DD0E1]">
            {mode === 'edit' ? 'Your Angler Profile' : 'Welcome Angler'}
          </span>
          <h2 id="onboarding-title" className="text-2xl font-black uppercase text-[#E6EDF3] tracking-tight mt-1">
            {mode === 'edit' ? 'Edit Profile' : 'Complete Profile'}
          </h2>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="onboarding-form" onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Display Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="displayName" className={labelClass}>
                Display Name
              </label>
              <input
                ref={nameRef}
                id="displayName"
                type="text"
                maxLength={15}
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g., JigMaster99"
                className="bg-[#111A22] border border-[#1C2733] text-[#E6EDF3] px-4 py-3 outline-none focus:border-[#4DD0E1] transition-colors placeholder:text-[#4A5A69]"
              />
            </div>

            {/* Gender Selection (optional) */}
            <div className="flex flex-col gap-2">
              <span id="gender-label" className={labelClass}>
                Gender <span className="normal-case tracking-normal font-medium">(optional)</span>
              </span>
              <div role="group" aria-labelledby="gender-label" className="grid grid-cols-3 gap-3">
                {GENDER_OPTIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={gender === g}
                    onClick={() => setGender(gender === g ? '' : g)}
                    className={`py-3 px-2 border text-sm font-semibold transition-colors ${FOCUS_RING} ${
                      gender === g
                        ? 'bg-[#4DD0E1]/10 border-[#4DD0E1] text-[#4DD0E1]'
                        : 'bg-[#111A22] border-[#1C2733] text-[#7C8B9C] hover:border-[#4A5A69]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* State Dropdown */}
            <div className="flex flex-col gap-2">
              <label htmlFor="state" className={labelClass}>
                Malaysian State
              </label>
              <select
                id="state"
                required
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-[#111A22] border border-[#1C2733] text-[#E6EDF3] px-4 py-3 outline-none focus:border-[#4DD0E1] transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>Select your state</option>
                {MALAYSIA_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Avatar Grid */}
            <div className="flex flex-col gap-2">
              <span id="avatar-label" className={labelClass}>
                Select Avatar
              </span>
              <div role="group" aria-labelledby="avatar-label" className="grid grid-cols-5 gap-3">
                {AVATAR_OPTIONS.map((avatar, index) => (
                  <button
                    key={avatar.id}
                    type="button"
                    aria-label={`Avatar ${index + 1}`}
                    aria-pressed={selectedAvatar === avatar.url}
                    onClick={() => setSelectedAvatar(avatar.url)}
                    className={`relative aspect-square rounded-full overflow-hidden border-2 transition-all ${FOCUS_RING} ${
                      selectedAvatar === avatar.url
                        ? 'border-[#4DD0E1] scale-110 shadow-[0_0_15px_rgba(77,208,225,0.4)] z-10'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={avatar.url} alt="" className="w-full h-full object-cover bg-[#1C2733]" />
                  </button>
                ))}
              </div>
            </div>

          </form>
        </div>

        {/* Footer / Action Buttons */}
        <div className="border-t border-[#1C2733] p-6 bg-[#0A1017] flex flex-col gap-3">
          {saveError ? (
            <p role="alert" className="text-xs font-bold text-[#FF3B47]">{saveError}</p>
          ) : !isFormValid ? (
            <p id="onboarding-hint" className="text-xs text-[#7C8B9C]">
              Add {listWords(missing)} to save.
            </p>
          ) : null}

          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-[#111A22] text-[#7C8B9C] border border-[#1C2733] hover:text-[#E6EDF3] hover:bg-[#1C2733] ${FOCUS_RING}`}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              form="onboarding-form"
              disabled={!isFormValid || saving}
              aria-describedby={!isFormValid ? 'onboarding-hint' : undefined}
              className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${FOCUS_RING} ${
                isFormValid && !saving
                  ? 'bg-[#4DD0E1] text-[#05070A] hover:bg-[#3DDC97] hover:shadow-[0_0_20px_rgba(77,208,225,0.3)] cursor-pointer'
                  : 'bg-[#1C2733] text-[#4A5A69] cursor-not-allowed'
              }`}
            >
              {saving ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Save Profile'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
