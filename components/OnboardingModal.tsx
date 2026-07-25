"use client";

import React, { useState } from 'react';

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

interface OnboardingModalProps {
  // We will call this function to send the data to Supabase later
  onSubmit: (profileData: { displayName: string; state: string; gender: string; avatarUrl: string }) => void;
  // NEW: We add an optional onCancel function so the user can close the modal
  onCancel?: () => void; 
}

export default function OnboardingModal({ onSubmit, onCancel }: OnboardingModalProps) {
  const [displayName, setDisplayName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [gender, setGender] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  // Form validation: check if all fields are filled
  const isFormValid = displayName.trim().length > 0 && selectedState !== '' && gender !== '' && selectedAvatar !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    onSubmit({
      displayName: displayName.trim(),
      state: selectedState,
      gender,
      avatarUrl: selectedAvatar
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#05070A]/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Modal Container */}
      <div className="bg-[#0D141B] border border-[#1C2733] max-w-md w-full shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90dvh]">
        
        {/* Header */}
        <div className="border-b border-[#1C2733] px-6 py-4 bg-[#0A1017]">
          <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#4DD0E1]">Welcome Angler</span>
          <h2 className="text-2xl font-black uppercase text-[#E6EDF3] tracking-tight mt-1">Complete Profile</h2>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="onboarding-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Display Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="displayName" className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-[#7C8B9C]">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                maxLength={15}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g., JigMaster99"
                className="bg-[#111A22] border border-[#1C2733] text-[#E6EDF3] px-4 py-3 outline-none focus:border-[#4DD0E1] transition-colors placeholder:text-[#31414F]"
              />
            </div>

            {/* Gender Selection */}
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-[#7C8B9C]">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Male', 'Female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-3 border text-sm font-semibold transition-colors ${
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
              <label htmlFor="state" className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-[#7C8B9C]">
                Malaysian State
              </label>
              <select
                id="state"
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
              <label className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-[#7C8B9C]">
                Select Avatar
              </label>
              <div className="grid grid-cols-5 gap-3">
                {AVATAR_OPTIONS.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.url)}
                    className={`relative aspect-square rounded-full overflow-hidden border-2 transition-all ${
                      selectedAvatar === avatar.url 
                        ? 'border-[#4DD0E1] scale-110 shadow-[0_0_15px_rgba(77,208,225,0.4)] z-10' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={avatar.url} alt="Avatar option" className="w-full h-full object-cover bg-[#1C2733]" />
                  </button>
                ))}
              </div>
            </div>

          </form>
        </div>

        {/* Footer / Action Buttons */}
        <div className="border-t border-[#1C2733] p-6 bg-[#0A1017] flex gap-3">
          {/* NEW: Cancel Button (Only shows if onCancel is provided) */}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-[#111A22] text-[#7C8B9C] border border-[#1C2733] hover:text-[#E6EDF3] hover:bg-[#1C2733]"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            form="onboarding-form"
            disabled={!isFormValid}
            className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              isFormValid 
                ? 'bg-[#4DD0E1] text-[#05070A] hover:bg-[#3DDC97] hover:shadow-[0_0_20px_rgba(77,208,225,0.3)] cursor-pointer' 
                : 'bg-[#1C2733] text-[#4A5A69] cursor-not-allowed'
            }`}
          >
            Save Profile
          </button>
        </div>

      </div>
    </div>
  );
}
