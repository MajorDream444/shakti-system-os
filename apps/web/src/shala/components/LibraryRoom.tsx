import React from 'react';
import { motion } from 'motion/react';
import { RoomType, Practice, SeekerState, Collection } from '../types';
import { COLLECTIONS, SANCTUARY_LANDMARKS } from '../data';
import { BookOpen, ArrowLeft, Play } from 'lucide-react';
import { PrayerLamp } from './PrayerLamp';

interface LibraryRoomProps {
  onNavigate: (room: RoomType) => void;
  onSelectPractice: (practice: Practice) => void;
  collections?: Collection[];
  seekerState?: SeekerState;
  onToggleLamp?: (roomId: string) => void;
}

export const LibraryRoom: React.FC<LibraryRoomProps> = ({
  onNavigate,
  onSelectPractice,
  collections = COLLECTIONS,
  seekerState,
  onToggleLamp,
}) => {
  return (
    <motion.div
      id="library-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative w-full min-h-screen text-[#F6EFE7] p-6 md:p-12 flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Immersive Temple Library Archive Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          src={SANCTUARY_LANDMARKS.LIBRARY}
          alt="Temple Library Archive"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, dust-golden ambient overlay */}
        <div className="absolute inset-0 bg-radial-gradient(130% 70% at 50% -6%, rgba(37, 31, 22, 0.85) 0%, rgba(16, 12, 8, 0.97) 55%, #090707 100%)" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090707] via-transparent to-transparent" />
      </div>

      {/* Background Soft Aura */}
      <div className="absolute left-1/2 top-[-80px] -translate-x-1/2 w-[380px] h-[340px] rounded-full pointer-events-none filter blur-3xl opacity-60 bg-gradient-to-b from-[#EDE4D4]/5 to-transparent z-0" />

      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10">
        <button
          id="library-back-sanctuary"
          onClick={() => onNavigate('COURTYARD')}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase text-[#D8C5B0] hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Sanctuary
        </button>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#E27A3F]" />
          <span className="font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#E27A3F]">
            TEMPLE LIBRARY
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto w-full my-auto py-12 z-10 flex flex-col gap-10">
        <div>
          <span className="font-sans font-semibold text-[10px] tracking-[0.28em] text-transform: uppercase text-[#8a7f6b]">
            THE ARCHIVE · DEPTH 02
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F6EFE7] mt-3">
            The Temple Vault
          </h2>
          <p className="font-serif italic text-lg text-[#C8B7A5] mt-2">
            The core doctrine of Sheetal Kandola. Restored, organized, and preserved.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="flex flex-col gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="border-t border-[#D8C5B0]/10 pt-6 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Collection Left Header */}
              <div className="md:w-1/3 flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-[#F6EFE7]">{collection.title}</h3>
                <p className="font-sans text-xs text-[#8a7c6d] leading-relaxed">
                  {collection.description}
                </p>
              </div>

              {/* Practices in this collection */}
              <div className="md:w-2/3 w-full flex flex-col gap-2.5">
                {collection.practices.map((practice) => (
                  <button
                    key={practice.id}
                    id={`lib-practice-${practice.id}`}
                    onClick={() => onSelectPractice(practice)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-[#D8C5B0]/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-[#E27A3F]/20 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.03] text-[#8a7c6d] flex items-center justify-center group-hover:scale-105 transition-all">
                        <Play className="w-3 h-3 text-[#E27A3F] fill-current" />
                      </div>
                      <div>
                        <div className="font-serif text-lg text-[#F6EFE7]">{practice.title}</div>
                        <div className="font-sans text-[11px] text-[#8a7c6d] mt-0.5">
                          {practice.duration} · {practice.category}
                        </div>
                      </div>
                    </div>
                    <span className="font-serif italic text-xs text-[#8a7c6d] group-hover:text-[#E27A3F] transition-colors pr-1">
                      begin ›
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Prayer Lamp Widget */}
      <div className="absolute right-6 bottom-6 z-20 md:right-12 md:bottom-12">
        {onToggleLamp && (
          <PrayerLamp
            roomId="LIBRARY"
            isLit={seekerState?.litLamps?.includes('LIBRARY') || false}
            onToggle={onToggleLamp}
          />
        )}
      </div>

      {/* Footer message */}
      <div className="w-full text-center z-10 mt-auto pt-4 border-t border-[#D8C5B0]/5">
        <span className="font-sans font-semibold text-[9px] tracking-[0.18em] text-transform: uppercase text-[#6b5f52]">
          Doctrines kept unchanged · verified lineage
        </span>
      </div>
    </motion.div>
  );
};
