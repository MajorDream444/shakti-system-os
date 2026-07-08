import React from 'react';
import { motion } from 'motion/react';
import { RoomType, SeekerState } from '../types';
import { SANCTUARY_LANDMARKS } from '../data';
import { PrayerLamp } from './PrayerLamp';

interface GatesRoomProps {
  onNavigate: (room: RoomType) => void;
  onQuickStart: () => void;
  hoursInStillness: number;
  seekerState?: SeekerState;
  onToggleLamp?: (roomId: string) => void;
  onIncrementFlags?: () => void;
}

export const GatesRoom: React.FC<GatesRoomProps> = ({
  onNavigate,
  onQuickStart,
  hoursInStillness,
  seekerState,
  onToggleLamp,
  onIncrementFlags,
}) => {
  return (
    <motion.div
      id="gates-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="relative w-full min-h-screen text-[#F6EFE7] flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-black"
    >
      {/* Immersive Cinematic Background Landscape & Architecture */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          src={SANCTUARY_LANDMARKS.GATES}
          alt="Temple Gates"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft Vignette and Shadow Masking to ensure readability and high-fidelity depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090707] via-[#090707]/70 to-[#090707]/30" />
        <div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 20%, #090707 90%)" />
      </div>

      {/* Background Breathing Glow */}
      <div className="absolute left-1/2 top-[-90px] -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-b from-[#E27A3F]/15 to-transparent pointer-events-none filter blur-3xl opacity-60 z-0 animate-[glowpulse_12s_ease-in-out_infinite]" />

      {/* Header */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#8a7c6d]">
          SHAKTI SHALA
        </span>
        <button
          id="enter-courtyard-btn"
          onClick={() => onNavigate('COURTYARD')}
          className="font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase text-[#E27A3F] border border-[#E27A3F]/20 rounded-full px-4 py-2 hover:bg-[#E27A3F]/10 transition-colors"
        >
          Enter Shala
        </button>
      </div>

      {/* Main Center Area */}
      <div className="max-w-lg mx-auto w-full text-center my-auto py-12 z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-sans font-semibold text-xs tracking-[0.28em] text-transform: uppercase text-[#B27A52]"
        >
          THE TEMPLE GATES
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif italic text-2xl text-[#C8B7A5] mt-6"
        >
          The mountain is quiet today.
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif text-3xl md:text-4xl leading-tight text-[#F6EFE7] mt-3"
        >
          Where is your practice calling you?
        </motion.h1>

        {/* Options */}
        <div className="flex flex-col gap-3 mt-12 w-full">
          {/* Quick Practice */}
          <button
            id="gate-opt-practice"
            onClick={onQuickStart}
            className="flex items-center justify-between p-5 rounded-2xl border border-[#D8C5B0]/14 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#D8C5B0]/30 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#cdbfa8] to-[#9c9080] shadow-[0_0_12px_rgba(205,191,168,0.6)]" />
              <div>
                <div className="font-serif text-xl text-[#F6EFE7]">Continue Daily Practice</div>
                <div className="font-sans text-xs text-[#8a7c6d] mt-1">Grounding · 12 min</div>
              </div>
            </div>
            <span className="text-[#8a7c6d] text-lg font-serif">›</span>
          </button>

          {/* Enter Vault / Library */}
          <button
            id="gate-opt-library"
            onClick={() => onNavigate('LIBRARY')}
            className="flex items-center justify-between p-5 rounded-2xl border border-[#E27A3F]/20 bg-gradient-to-r from-[#741f24]/30 to-transparent hover:border-[#E27A3F]/40 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#E27A3F] to-[#C35A2E] shadow-[0_0_12px_rgba(226,122,63,0.7)] animate-[flicker_5s_ease-in-out_infinite]" />
              <div>
                <div className="font-serif text-xl text-[#F6EFE7]">Enter the Temple Library</div>
                <div className="font-sans text-xs text-[#8a7c6d] mt-1">The Vault of Teachings</div>
              </div>
            </div>
            <span className="text-[#E27A3F] text-lg font-serif">›</span>
          </button>

          {/* Walk the Goddess Pathways */}
          <button
            id="gate-opt-chambers"
            onClick={() => onNavigate('GODDESS_CHAMBERS')}
            className="flex items-center justify-between p-5 rounded-2xl border border-[#D8C5B0]/14 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#D8C5B0]/30 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#B65A3C] to-[#7a3a20] shadow-[0_0_12px_rgba(182,90,60,0.6)]" />
              <div>
                <div className="font-serif text-xl text-[#F6EFE7]">Walk the Goddess Pathways</div>
                <div className="font-sans text-xs text-[#8a7c6d] mt-1">The Eight Chambers</div>
              </div>
            </div>
            <span className="text-[#8a7c6d] text-lg font-serif">›</span>
          </button>
        </div>

        {/* Environmental Memories Area */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center z-10">
          {onToggleLamp && (
            <PrayerLamp
              roomId="GATES"
              isLit={seekerState?.litLamps?.includes('GATES') || false}
              onToggle={onToggleLamp}
            />
          )}

          {/* Prayer Flags Interactive Widget */}
          <div className="flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md select-none w-28 text-center">
            <span className="text-[8px] font-sans font-bold tracking-[0.2em] uppercase text-[#8a7c6d]">
              PRAYER FLAGS
            </span>
            <button
              id="add-prayer-flag-btn"
              onClick={() => {
                if (onIncrementFlags) onIncrementFlags();
              }}
              className="w-11 h-11 rounded-full border border-white/10 hover:border-[#E27A3F]/40 hover:bg-white/[0.03] bg-white/[0.01] flex items-center justify-center text-lg cursor-pointer transition-all duration-300 active:scale-95"
              title="Hang a prayer flag to carry your intention on the mountain winds."
            >
              🎏
            </button>
            <span className="text-[8px] font-serif italic text-[#6b5f52] truncate max-w-full">
              {seekerState?.prayerFlagsCount || 0} Fluttering
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center z-10 mt-auto">
        <span className="font-sans font-semibold text-[10px] tracking-[0.18em] text-transform: uppercase text-[#6b5f52]">
          Himalayan stillness · {hoursInStillness} Hours Kept
        </span>
      </div>
    </motion.div>
  );
};
