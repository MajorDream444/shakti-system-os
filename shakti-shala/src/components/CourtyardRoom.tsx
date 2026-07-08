import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RoomType, SeekerState } from '../types';
import { Compass, BookOpen, Flame, PenTool, Mountain, ShieldCheck, Sun, Moon } from 'lucide-react';
import { SANCTUARY_LANDMARKS } from '../data';
import { PrayerLamp } from './PrayerLamp';

interface CourtyardRoomProps {
  onNavigate: (room: RoomType) => void;
  onOpenThreshold: () => void;
  seekerName: string;
  externalTimeOfDay?: 'MORNING' | 'AFTERNOON' | 'SUNSET' | 'NIGHT';
  seekerState?: SeekerState;
  onToggleLamp?: (roomId: string) => void;
  onIncrementFlags?: () => void;
}

type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'GOLDEN_HOUR' | 'EVENING' | 'NIGHT';

export const CourtyardRoom: React.FC<CourtyardRoomProps> = ({
  onNavigate,
  onOpenThreshold,
  seekerName,
  externalTimeOfDay,
  seekerState,
  onToggleLamp,
  onIncrementFlags,
}) => {
  // Detect time of day or allow user selection
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('GOLDEN_HOUR');

  useEffect(() => {
    if (externalTimeOfDay) {
      if (externalTimeOfDay === 'SUNSET') {
        setTimeOfDay('GOLDEN_HOUR');
      } else {
        setTimeOfDay(externalTimeOfDay);
      }
    }
  }, [externalTimeOfDay]);

  useEffect(() => {
    if (!externalTimeOfDay) {
      const hours = new Date().getHours();
      if (hours >= 5 && hours < 12) {
        setTimeOfDay('MORNING');
      } else if (hours >= 12 && hours < 16) {
        setTimeOfDay('AFTERNOON');
      } else if (hours >= 16 && hours < 19) {
        setTimeOfDay('GOLDEN_HOUR');
      } else if (hours >= 19 && hours < 22) {
        setTimeOfDay('EVENING');
      } else {
        setTimeOfDay('NIGHT');
      }
    }
  }, []);

  const timeConfigs: Record<
    TimeOfDay,
    { label: string; desc: string; bg: string; orbColor: string; textColor: string; opacity: number }
  > = {
    MORNING: {
      label: 'Morning',
      desc: 'Begin gently',
      bg: 'radial-gradient(130% 70% at 50% -6%, rgba(58, 47, 40, 0.8) 0%, rgba(13, 9, 8, 0.95) 60%, #090707 100%)',
      orbColor: 'radial-gradient(circle, rgba(107, 90, 72, 0.4), transparent 70%)',
      textColor: 'text-[#d8c5b0]',
      opacity: 0.35,
    },
    AFTERNOON: {
      label: 'Afternoon',
      desc: 'Study & steady',
      bg: 'radial-gradient(130% 70% at 50% -6%, rgba(61, 47, 33, 0.75) 0%, rgba(13, 9, 8, 0.95) 60%, #090707 100%)',
      orbColor: 'radial-gradient(circle, rgba(160, 121, 63, 0.35), transparent 70%)',
      textColor: 'text-[#c6b79c]',
      opacity: 0.4,
    },
    GOLDEN_HOUR: {
      label: 'Golden Hour',
      desc: 'The warmest welcome',
      bg: 'radial-gradient(130% 70% at 50% -6%, rgba(74, 39, 24, 0.75) 0%, rgba(14, 9, 8, 0.95) 55%, #090707 100%)',
      orbColor: 'radial-gradient(circle, rgba(226, 122, 63, 0.4), transparent 70%)',
      textColor: 'text-[#e27a3f]',
      opacity: 0.45,
    },
    EVENING: {
      label: 'Evening',
      desc: 'Turn inward',
      bg: 'radial-gradient(130% 70% at 50% -6%, rgba(33, 18, 29, 0.8) 0%, rgba(12, 8, 9, 0.97) 52%, #090707 100%)',
      orbColor: 'radial-gradient(circle, rgba(90, 42, 46, 0.35), transparent 70%)',
      textColor: 'text-[#ca6a7c]',
      opacity: 0.3,
    },
    NIGHT: {
      label: 'Night & New Moon',
      desc: 'Rest & release in stillness',
      bg: 'radial-gradient(130% 70% at 50% -6%, rgba(11, 11, 20, 0.85) 0%, rgba(6, 6, 10, 0.98) 50%, #050505 100%)',
      orbColor: 'radial-gradient(circle, rgba(30, 30, 50, 0.3), transparent 70%)',
      textColor: 'text-[#8a949e]',
      opacity: 0.25,
    },
  };

  const currentConfig = timeConfigs[timeOfDay];

  return (
    <motion.div
      id="courtyard-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative w-full min-h-screen text-[#F6EFE7] p-6 md:p-12 flex flex-col justify-between transition-all duration-1000 bg-black overflow-hidden"
    >
      {/* Immersive Valley of Stillness Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img
          key={timeOfDay}
          initial={{ scale: 1.03, opacity: 0 }}
          animate={{ scale: 1, opacity: currentConfig.opacity }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          src={SANCTUARY_LANDMARKS.COURTYARD}
          alt="Valley of Stillness"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Deep, dynamic tint overlay according to selection */}
        <div 
          style={{ background: currentConfig.bg }}
          className="absolute inset-0 transition-all duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090707] via-transparent to-transparent" />
      </div>
      {/* Dynamic Ambiance Orb */}
      <div
        style={{ backgroundImage: currentConfig.orbColor }}
        className="absolute left-1/2 top-[-80px] -translate-x-1/2 w-[380px] h-[340px] rounded-full pointer-events-none filter blur-3xl opacity-75 animate-[glowpulse_12s_ease-in-out_infinite]"
      />

      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10">
        <button
          id="threshold-nav-trigger"
          onClick={onOpenThreshold}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#E27A3F] hover:opacity-80 transition-opacity"
        >
          <Compass className="w-4 h-4" />
          THRESHOLD
        </button>

        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5">
          <Sun className="w-3.5 h-3.5 text-[#8a7c6d]" />
          <div className="flex gap-1">
            {(['MORNING', 'AFTERNOON', 'GOLDEN_HOUR', 'EVENING', 'NIGHT'] as TimeOfDay[]).map((time) => (
              <button
                key={time}
                onClick={() => setTimeOfDay(time)}
                className={`w-2 h-2 rounded-full transition-all ${
                  timeOfDay === time ? 'bg-[#E27A3F] scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
                title={time}
              />
            ))}
          </div>
          <Moon className="w-3.5 h-3.5 text-[#8a7c6d]" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full my-auto py-12 z-10 flex flex-col gap-10">
        {/* Welcome Block */}
        <div>
          <span className={`font-sans font-semibold text-[10px] tracking-[0.28em] text-transform: uppercase ${currentConfig.textColor}`}>
            {currentConfig.label} · {currentConfig.desc}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight text-[#F6EFE7] mt-3">
            Welcome home, <span className="italic">{seekerName}</span>.
          </h1>
          <p className="font-serif italic text-lg text-[#C8B7A5] mt-2">
            The vault is open. The mountain stands steady beneath your feet.
          </p>
        </div>

        {/* Environmental memory metrics */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-[#D8C5B0]/10 rounded-2xl bg-white/[0.005]">
          <div className="flex-1">
            <h4 className="font-serif text-[#F6EFE7] text-md">Mountain Living Sanctuary</h4>
            <p className="font-sans text-xs text-[#8a7c6d] mt-1 leading-relaxed">
              Your continuous presence shapes this high valley. At present, <strong className="text-[#D8C5B0]">{seekerState?.litLamps?.length || 0} prayer lamps</strong> burn brightly across the rooms, and <strong className="text-[#D8C5B0]">{seekerState?.prayerFlagsCount || 0} prayer flags</strong> carry your quiet aspirations upon the wind.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {onToggleLamp && (
              <PrayerLamp
                roomId="COURTYARD"
                isLit={seekerState?.litLamps?.includes('COURTYARD') || false}
                onToggle={onToggleLamp}
              />
            )}
            
            {/* Interactive Prayer Flags */}
            <div className="flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md select-none w-28 text-center">
              <span className="text-[8px] font-sans font-bold tracking-[0.2em] uppercase text-[#8a7c6d]">
                HANG FLAG
              </span>
              <button
                id="add-courtyard-flag-btn"
                onClick={() => {
                  if (onIncrementFlags) onIncrementFlags();
                }}
                className="w-11 h-11 rounded-full border border-white/10 hover:border-[#E27A3F]/40 hover:bg-white/[0.03] bg-white/[0.01] flex items-center justify-center text-lg cursor-pointer transition-all duration-300 active:scale-95"
                title="Hang another prayer flag on the courtyard ridge."
              >
                🎏
              </button>
              <span className="text-[8px] font-serif italic text-[#6b5f52] truncate max-w-full">
                {seekerState?.prayerFlagsCount || 0} Flags
              </span>
            </div>
          </div>
        </div>

        {/* Spatial Navigation Grid (The places to go) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Fire Circle */}
          <button
            id="courtyard-go-fire"
            onClick={() => onNavigate('FIRE_CIRCLE')}
            className="flex flex-col gap-4 p-5 rounded-2xl border border-[#D8C5B0]/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#E27A3F]/30 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#E27A3F]/10 border border-[#E27A3F]/20 flex items-center justify-center text-[#E27A3F] group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-xl text-[#F6EFE7]">The Fire Circle</div>
              <p className="font-sans text-xs text-[#8a7c6d] mt-1">Gather by the steady hearth for daily practice.</p>
            </div>
          </button>

          {/* Temple Library */}
          <button
            id="courtyard-go-library"
            onClick={() => onNavigate('LIBRARY')}
            className="flex flex-col gap-4 p-5 rounded-2xl border border-[#D8C5B0]/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#E27A3F]/30 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#E27A3F]/10 border border-[#E27A3F]/20 flex items-center justify-center text-[#E27A3F] group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-xl text-[#F6EFE7]">Temple Library</div>
              <p className="font-sans text-xs text-[#8a7c6d] mt-1">Explore the archive, curated doctrine, and meditations.</p>
            </div>
          </button>

          {/* Reflection Pool */}
          <button
            id="courtyard-go-pool"
            onClick={() => onNavigate('REFLECTION_POOL')}
            className="flex flex-col gap-4 p-5 rounded-2xl border border-[#D8C5B0]/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#E27A3F]/30 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#E27A3F]/10 border border-[#E27A3F]/20 flex items-center justify-center text-[#E27A3F] group-hover:scale-105 transition-transform">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-xl text-[#F6EFE7]">Reflection Pool</div>
              <p className="font-sans text-xs text-[#8a7c6d] mt-1">Pour your mind into the quiet water of the Sacred Journal.</p>
            </div>
          </button>

          {/* Personal Journey */}
          <button
            id="courtyard-go-journey"
            onClick={() => onNavigate('JOURNEY')}
            className="flex flex-col gap-4 p-5 rounded-2xl border border-[#D8C5B0]/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#E27A3F]/30 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#E27A3F]/10 border border-[#E27A3F]/20 flex items-center justify-center text-[#E27A3F] group-hover:scale-105 transition-transform">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-xl text-[#F6EFE7]">Personal Journey</div>
              <p className="font-sans text-xs text-[#8a7c6d] mt-1">Witness your hours in stillness and set pathway goals.</p>
            </div>
          </button>

          {/* Goddess Chambers */}
          <button
            id="courtyard-go-chambers"
            onClick={() => onNavigate('GODDESS_CHAMBERS')}
            className="sm:col-span-2 flex items-center gap-4 p-5 rounded-2xl border border-[#D8C5B0]/14 bg-gradient-to-r from-[#4A1F24]/20 to-transparent hover:from-[#4A1F24]/30 hover:border-[#E27A3F]/40 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#E27A3F]/10 border border-[#E27A3F]/20 flex items-center justify-center text-[#E27A3F] group-hover:scale-105 transition-transform flex-0 0 auto">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-serif text-xl text-[#F6EFE7]">The Goddess Chambers</div>
              <p className="font-sans text-xs text-[#8a7c6d] mt-1">Walk the silent mountain path to each of the eight distinct rooms of wisdom.</p>
            </div>
            <span className="text-[#8a7c6d] text-xl font-serif pr-2">›</span>
          </button>
        </div>
      </div>

      {/* Bottom bar / Global Nav */}
      <div className="w-full max-w-lg mx-auto border-t border-[#D8C5B0]/10 pt-4 mt-auto flex justify-between items-center z-10 bg-gradient-to-b from-transparent to-[#090707]/90 backdrop-blur-xs">
        <button
          id="footer-nav-gates"
          onClick={() => onNavigate('GATES')}
          className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-transparent border border-[#6b5f52]" />
          <span className="font-sans text-[9px] tracking-[0.08em] text-transform: uppercase text-[#6b5f52]">Gates</span>
        </button>
        <button
          id="footer-nav-courtyard"
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#E27A3F] shadow-[0_0_10px_#E27A3F]" />
          <span className="font-sans text-[9px] tracking-[0.08em] text-transform: uppercase text-[#D8C5B0]">Sanctuary</span>
        </button>
        <button
          id="footer-nav-retreat"
          onClick={() => onNavigate('RETREAT')}
          className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-transparent border border-[#6b5f52]" />
          <span className="font-sans text-[9px] tracking-[0.08em] text-transform: uppercase text-[#6b5f52]">Retreat</span>
        </button>
      </div>
    </motion.div>
  );
};
