import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomType, JournalEntry, SeekerState } from '../types';
import { PenTool, ArrowLeft, Send } from 'lucide-react';
import { SANCTUARY_LANDMARKS } from '../data';
import { PrayerLamp } from './PrayerLamp';

interface ReflectionPoolRoomProps {
  onNavigate: (room: RoomType) => void;
  journalEntries: JournalEntry[];
  onSaveEntry: (content: string) => void;
  seekerState?: SeekerState;
  onToggleLamp?: (roomId: string) => void;
}

export const ReflectionPoolRoom: React.FC<ReflectionPoolRoomProps> = ({
  onNavigate,
  journalEntries,
  onSaveEntry,
  seekerState,
  onToggleLamp,
}) => {
  const [content, setContent] = useState<string>('');
  const [isSuccess, setIsPlaying] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSaveEntry(content);
    setContent('');
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <motion.div
      id="reflection-pool-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative w-full min-h-screen text-[#F6EFE7] p-6 md:p-12 flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Immersive Reflection Pool Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.42 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          src={SANCTUARY_LANDMARKS.REFLECTION_POOL}
          alt="Reflection Pool"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft misty dark-water gradient mask */}
        <div className="absolute inset-0 bg-radial-gradient(130% 70% at 50% -6%, rgba(18, 24, 23, 0.8) 0%, rgba(8, 12, 12, 0.96) 50%, #050707 100%)" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050707] via-transparent to-transparent" />
      </div>

      {/* Background Soft Water Aura */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none filter blur-3xl opacity-50 bg-gradient-to-tr from-[#7fa39c]/10 to-transparent z-0" />

      {/* Floating Lotus Flowers (reflecting the number of journal entries as Environmental Memory) */}
      <div className="absolute inset-x-0 bottom-16 top-1/3 z-5 select-none pointer-events-none flex items-center justify-center gap-8 md:gap-12 flex-wrap">
        {journalEntries.length === 0 ? (
          <div className="text-center opacity-40 font-sans text-xs text-[#8a7c6d] animate-pulse">
            🌱 A sleeping lotus seed rests in the deep black water. Write a reflection to let it grow.
          </div>
        ) : (
          Array.from({ length: Math.min(6, journalEntries.length) }).map((_, index) => {
            const isFullBloom = index < 1 || journalEntries.length >= 3;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 0.8, scale: 1, y: [0, -4, 0] }}
                transition={{
                  opacity: { duration: 1.5, delay: index * 0.25 },
                  scale: { duration: 1.5, delay: index * 0.25 },
                  y: { repeat: Infinity, duration: 4.5 + index, ease: 'easeInOut' }
                }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.12, 0, 0.12] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
                    className="absolute w-16 h-16 rounded-full border border-[#7fa39c]/20"
                  />
                  <span className="text-3xl drop-shadow-[0_0_10px_rgba(244,114,182,0.25)] select-none">
                    {isFullBloom ? '🌸' : '🪷'}
                  </span>
                </div>
                <span className="text-[7px] font-sans tracking-[0.15em] text-[#7fa39c]/65 uppercase">
                  {isFullBloom ? 'Lotus Blossomed' : 'Lotus Bud'}
                </span>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10">
        <button
          id="pool-back-sanctuary"
          onClick={() => onNavigate('COURTYARD')}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase text-[#D8C5B0] hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Sanctuary
        </button>
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-[#7fa39c]" />
          <span className="font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#7fa39c]">
            REFLECTION POOL
          </span>
        </div>
      </div>

      {/* Main Journal and Input Area */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8 z-10 flex flex-col gap-8">
        <div>
          <span className="font-sans font-semibold text-[10px] tracking-[0.28em] text-transform: uppercase text-[#7f938c]">
            THE SACRED JOURNAL · DEPTH 02
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F6EFE7] mt-3">
            What asked for your attention today?
          </h2>
          <p className="font-serif italic text-lg text-[#C8B7A5] mt-2">
            No form to produce. No prompt that pressures. Pour your mind onto the still black water.
          </p>
        </div>

        {/* Form */}
        <form id="save-journal-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              id="journal-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Begin writing... let tension leave the jaw as you speak to the stone"
              className="w-full min-h-[160px] p-5 rounded-2xl border border-[#D8C5B0]/14 bg-white/[0.01] focus:bg-white/[0.03] text-[#F6EFE7] placeholder-[#5c5145] font-serif text-lg leading-relaxed focus:outline-none focus:border-[#7fa39c]/50 transition-all resize-none"
            />
            {/* Success message popup */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-4 left-4 font-serif italic text-sm text-[#7fa39c]"
                >
                  The reflection has been settled into the pool.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-end">
            <button
              id="submit-reflection-btn"
              type="submit"
              disabled={!content.trim()}
              className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase bg-gradient-to-r from-[#63847e] to-[#7fa39c] text-[#090707] rounded-full px-5 py-3 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:pointer-events-none transition-all shadow-[0_0_20px_rgba(127,163,156,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
              Settle Reflection
            </button>
          </div>
        </form>

        {/* Older Pages representation */}
        {journalEntries.length > 0 && (
          <div className="mt-4">
            <div className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-[#6b5f52] mb-3">
              Earlier Pages
            </div>
            <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto scrollbar-none">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-xl border border-[#D8C5B0]/5 bg-white/[0.005] hover:bg-white/[0.01] transition-colors"
                >
                  <div className="font-sans text-xs text-[#8a7c6d]">{entry.date}</div>
                  <div className="font-serif text-md text-[#D8C5B0] mt-1.5 line-clamp-2">
                    {entry.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Prayer Lamp Widget */}
      <div className="absolute right-6 bottom-20 z-20 md:right-12 md:bottom-24">
        {onToggleLamp && (
          <PrayerLamp
            roomId="REFLECTION_POOL"
            isLit={seekerState?.litLamps?.includes('REFLECTION_POOL') || false}
            onToggle={onToggleLamp}
          />
        )}
      </div>

      {/* Footer message */}
      <div className="w-full text-center z-10 mt-auto pt-4 border-t border-[#D8C5B0]/5">
        <span className="font-serif italic text-sm text-[#5c5145] tracking-wide">
          still black water · teak deck · moon
        </span>
      </div>
    </motion.div>
  );
};
