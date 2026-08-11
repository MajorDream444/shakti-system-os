import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RoomType, Practice, SeekerState } from '../types';
import { COLLECTIONS, SANCTUARY_LANDMARKS } from '../data';
import { Flame, ArrowLeft, Play } from 'lucide-react';
import { PrayerLamp } from './PrayerLamp';

interface FireCircleRoomProps {
  onNavigate: (room: RoomType) => void;
  onSelectPractice: (practice: Practice) => void;
  seekerState?: SeekerState;
  onToggleLamp?: (roomId: string) => void;
}

export const FireCircleRoom: React.FC<FireCircleRoomProps> = ({
  onNavigate,
  onSelectPractice,
  seekerState,
  onToggleLamp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Foundations');

  const activeCollection = COLLECTIONS.find(
    (c) => c.practices[0]?.category.toLowerCase() === selectedCategory.toLowerCase()
  ) || COLLECTIONS[0];

  return (
    <motion.div
      id="fire-circle-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative w-full min-h-screen text-[#F6EFE7] p-6 md:p-12 flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Immersive Fire Circle background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          src={SANCTUARY_LANDMARKS.FIRE_CIRCLE}
          alt="The Fire Circle"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Fire radial atmosphere glow and dark overlay */}
        <div className="absolute inset-0 bg-radial-gradient(circle at 50% 120%, rgba(226, 122, 63, 0.45) 0%, rgba(68, 31, 23, 0.85) 35%, #090707 90%)" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090707] via-transparent to-transparent" />
      </div>

      {/* Back Button & Title */}
      <div className="w-full flex justify-between items-center z-10">
        <button
          id="back-to-sanctuary"
          onClick={() => onNavigate('COURTYARD')}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase text-[#D8C5B0] hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Sanctuary
        </button>
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#E27A3F]" />
          <span className="font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#E27A3F]">
            THE FIRE CIRCLE
          </span>
        </div>
      </div>

      {/* Main Focus: The Hearth Fire representation */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8 z-10 flex flex-col items-center">
        {/* Fire Animation graphic */}
        <div className="relative w-40 h-32 mb-6 flex items-center justify-center">
          <div className="absolute bottom-2 w-32 h-32 rounded-full bg-gradient-to-t from-[#C35A2E] to-transparent filter blur-xl opacity-60 animate-[glowpulse_5s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 w-16 h-20 rounded-full bg-gradient-to-t from-[#E27A3F] via-[#C35A2E] to-transparent filter blur-md opacity-80 animate-[flicker_3s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 w-2 h-16 bg-gradient-to-t from-[#EDE4D4] to-transparent filter blur-xs animate-[drift_6s_ease-in-out_infinite]" />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-center text-[#F6EFE7]">
          Gather at the Flame
        </h2>
        <p className="font-serif italic text-lg text-center text-[#D8C5B0] mt-2 max-w-md">
          A physical hearth held in time. Sit with us. Choose your medicine.
        </p>

        {/* Collection Toggles */}
        <div className="flex gap-2.5 mt-8 border-b border-white/5 pb-4 w-full justify-center">
          {['Foundations', 'Breathwork', 'Somatics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans font-semibold text-xs tracking-[0.14em] text-transform: uppercase pb-1.5 transition-all ${
                selectedCategory === cat
                  ? 'text-[#E27A3F] border-b-2 border-[#E27A3F]'
                  : 'text-[#8a7c6d] hover:text-[#D8C5B0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Practices List */}
        <div className="flex flex-col gap-3 mt-6 w-full max-w-lg">
          <p className="font-sans text-[11px] text-[#8a7c6d] uppercase tracking-[0.18em] mb-1">
            {activeCollection.title}
          </p>
          {activeCollection.practices.map((practice) => (
            <button
              key={practice.id}
              id={`practice-item-${practice.id}`}
              onClick={() => onSelectPractice(practice)}
              className="flex items-center justify-between p-4.5 rounded-xl border border-[#D8C5B0]/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-[#E27A3F]/20 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-[#D8C5B0]/14 flex items-center justify-center text-[#E27A3F] group-hover:scale-105 transition-transform bg-black/40">
                  <Play className="w-3.5 h-3.5 text-[#E27A3F] fill-current" />
                </div>
                <div>
                  <div className="font-sans font-medium tracking-tight text-[#F6EFE7] text-[17px]">{practice.title}</div>
                  <div className="font-sans text-xs text-[#8a7c6d] mt-1">{practice.duration}</div>
                </div>
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '15px', color: '#8a7c6d' }}>
                begin ›
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Prayer Lamp Widget */}
      <div className="absolute right-6 bottom-6 z-20 md:right-12 md:bottom-12">
        {onToggleLamp && (
          <PrayerLamp
            roomId="FIRE_CIRCLE"
            isLit={seekerState?.litLamps?.includes('FIRE_CIRCLE') || false}
            onToggle={onToggleLamp}
          />
        )}
      </div>
    </motion.div>
  );
};
