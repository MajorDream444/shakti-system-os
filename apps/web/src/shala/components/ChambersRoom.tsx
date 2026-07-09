import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomType, SeekerState } from '../types';
import { GODDESS_CHAMBERS } from '../data';
import { Compass, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { PrayerLamp } from './PrayerLamp';

interface ChambersRoomProps {
  onNavigate: (room: RoomType) => void;
  onOpenThreshold: () => void;
  seekerState?: SeekerState;
  onToggleLamp?: (roomId: string) => void;
}

export const ChambersRoom: React.FC<ChambersRoomProps> = ({
  onNavigate,
  onOpenThreshold,
  seekerState,
  onToggleLamp,
}) => {
  const [activeChamberId, setActiveChamberId] = useState<string>('kali');

  const currentChamber = GODDESS_CHAMBERS.find((c) => c.id === activeChamberId) || GODDESS_CHAMBERS[0];

  return (
    <motion.div
      id="chambers-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      className="relative w-full min-h-screen text-[#F6EFE7] p-6 md:p-12 flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Immersive Architectural Goddess Chambers Background Cross-Fade */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeChamberId}
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.38 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            src={currentChamber.bgImage}
            alt={`${currentChamber.name} Chamber`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Soft atmospheric overlay tailored to the current chamber's gradient theme */}
        <div
          style={{ background: currentChamber.bgGradient }}
          className="absolute inset-0 opacity-85 transition-all duration-[1200ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090707] via-transparent to-transparent" />
      </div>
      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10">
        <button
          id="chambers-back-sanctuary"
          onClick={() => onNavigate('COURTYARD')}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase text-[#D8C5B0] hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Sanctuary
        </button>
        <button
          id="chambers-open-threshold"
          onClick={onOpenThreshold}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#E27A3F] hover:opacity-80 transition-opacity"
        >
          <Compass className="w-4 h-4" />
          THRESHOLD
        </button>
      </div>

      {/* Main Chamber Explorer */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8 z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Chamber Picker */}
        <div className="md:col-span-4 flex flex-row md:flex-col gap-2.5 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none w-full">
          {GODDESS_CHAMBERS.map((g) => {
            const isActive = g.id === activeChamberId;
            return (
              <button
                key={g.id}
                id={`chamber-tab-${g.id}`}
                onClick={() => setActiveChamberId(g.id)}
                className={`flex-1 md:flex-initial text-left p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'border-[#E27A3F] bg-white/[0.03] shadow-[0_0_15px_rgba(226,122,63,0.1)]'
                    : 'border-white/5 bg-transparent hover:border-white/10'
                }`}
              >
                <div className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-[#8a7c6d]">
                  CHAMBER
                </div>
                <div className="font-serif text-2xl text-[#F6EFE7] mt-1">{g.name}</div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Chamber Details & Environmental Plate */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChamberId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div>
                <span className="font-sans font-semibold text-[10px] tracking-[0.28em] text-transform: uppercase text-[#B27A52]">
                  {currentChamber.atmosphere} Atmosphere
                </span>
                <h3 className="font-serif text-4xl md:text-5xl text-[#F6EFE7] mt-2">
                  {currentChamber.name}
                </h3>
                <p className="font-serif italic text-xl text-[#D8C5B0] mt-1.5">
                  {currentChamber.title}
                </p>
              </div>

              <p className="font-sans text-sm line-height-relaxed text-[#C8B7A5]">
                {currentChamber.description}
              </p>

              {/* Sensory Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#D8C5B0]/10 pt-5 mt-2">
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-semibold text-[9px] tracking-[0.16em] text-transform: uppercase text-[#B27A52]">
                    MATERIALS &amp; SPACE
                  </span>
                  <span className="font-sans text-xs text-[#C8B7A5]">{currentChamber.materials}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-semibold text-[9px] tracking-[0.16em] text-transform: uppercase text-[#B27A52]">
                    LIGHT
                  </span>
                  <span className="font-sans text-xs text-[#C8B7A5]">{currentChamber.light}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-semibold text-[9px] tracking-[0.16em] text-transform: uppercase text-[#B27A52]">
                    SOUND
                  </span>
                  <span className="font-sans text-xs text-[#C8B7A5]">{currentChamber.sound}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-semibold text-[9px] tracking-[0.16em] text-transform: uppercase text-[#B27A52]">
                    MOVEMENT &amp; BODILY POSTURE
                  </span>
                  <span className="font-sans text-xs text-[#C8B7A5]">{currentChamber.movement}</span>
                </div>
              </div>

              {/* Start Practice for this Goddess */}
              <button
                id="enter-goddess-practice-btn"
                onClick={() => onNavigate('FIRE_CIRCLE')}
                className="flex items-center justify-between p-4.5 rounded-xl border border-[#E27A3F]/30 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#E27A3F]/50 transition-all text-left mt-4 group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-[#E27A3F]" />
                  <span className="font-serif text-lg text-[#F6EFE7]">Access the Practice Circle</span>
                </div>
                <span className="text-[#E27A3F] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Prayer Lamp Widget */}
      <div className="absolute right-6 bottom-6 z-20 md:right-12 md:bottom-12">
        {onToggleLamp && (
          <PrayerLamp
            roomId="GODDESS_CHAMBERS"
            isLit={seekerState?.litLamps?.includes('GODDESS_CHAMBERS') || false}
            onToggle={onToggleLamp}
          />
        )}
      </div>

      {/* Footer message */}
      <div className="w-full text-center z-10 mt-auto pt-4 border-t border-[#D8C5B0]/5">
        <span className="font-sans font-semibold text-[9px] tracking-[0.18em] text-transform: uppercase text-[#6b5f52]">
          Eight sovereign environments · aligned to deep shakti lineages
        </span>
      </div>
    </motion.div>
  );
};
