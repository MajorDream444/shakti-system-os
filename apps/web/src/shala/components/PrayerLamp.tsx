import React from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import { playResonantBell } from '../lib/audio';

interface PrayerLampProps {
  roomId: string;
  isLit: boolean;
  onToggle: (roomId: string) => void;
}

export const PrayerLamp: React.FC<PrayerLampProps> = ({ roomId, isLit, onToggle }) => {
  const handleLight = () => {
    onToggle(roomId);
    playResonantBell();
  };

  return (
    <div className="flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md select-none w-28 text-center">
      <span className="text-[8px] font-sans font-bold tracking-[0.2em] uppercase text-[#8a7c6d]">
        {isLit ? 'LAMP GLOWING' : 'OFFER FLAME'}
      </span>

      <button
        id={`prayer-lamp-btn-${roomId.toLowerCase()}`}
        onClick={handleLight}
        className={`relative w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-500 cursor-pointer ${
          isLit
            ? 'border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
            : 'border-white/10 bg-white/[0.01] hover:border-[#E27A3F]/30 hover:bg-white/[0.03]'
        }`}
        title={isLit ? 'A warm, sacred flame is lit for you.' : 'Click to light this prayer lamp.'}
      >
        {isLit ? (
          <>
            {/* Glowing flickering halo */}
            <motion.div
              animate={{ scale: [1, 1.2, 0.95, 1], opacity: [0.6, 0.95, 0.5, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-amber-500/25 filter blur-xs"
            />
            <Flame className="w-5 h-5 text-amber-500 fill-amber-400 drop-shadow-[0_0_8px_#f59e0b] relative z-10" />
          </>
        ) : (
          <Flame className="w-5 h-5 text-white/20 hover:text-[#E27A3F]/40 transition-colors relative z-10" />
        )}
      </button>

      <span className="text-[8px] font-serif italic text-[#6b5f52] truncate max-w-full">
        {isLit ? 'Burning steady' : 'Tap to light'}
      </span>
    </div>
  );
};
