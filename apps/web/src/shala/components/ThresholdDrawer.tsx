import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomType } from '../types';
import {
  X,
  Compass,
  ChevronRight,
  Library,
  Flower2,
  Droplets,
  Footprints,
  Mountain,
  Flame,
  DoorOpen,
  Sparkles,
  CircleDot,
} from 'lucide-react';

interface ThresholdDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoom: RoomType;
  onNavigate: (room: RoomType) => void;
  onBeginPractice?: () => void;
}

export const ThresholdDrawer: React.FC<ThresholdDrawerProps> = ({
  isOpen,
  onClose,
  currentRoom,
  onNavigate,
  onBeginPractice,
}) => {
  const mountainPath: {
    type: RoomType;
    label: string;
    desc: string;
    state: 'Open' | 'Available to Request' | 'Requires Preparation' | 'By Invitation';
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { type: 'GATES', label: 'Temple Gates', desc: 'Arrival and orientation', state: 'Open', icon: DoorOpen },
    { type: 'COURTYARD', label: 'Courtyard', desc: 'Return and choose a direction', state: 'Open', icon: Compass },
    { type: 'PRACTICE_ROOM', label: 'Practice', desc: 'Somatics, pranayama, kriyas, movement', state: 'Open', icon: Footprints },
    { type: 'LIBRARY', label: 'Temple Library', desc: 'Approved teachings and source material', state: 'Open', icon: Library },
    { type: 'GODDESS_CHAMBERS', label: 'Goddess Pathways', desc: 'Doctrine-sensitive chambers, entered with care', state: 'Requires Preparation', icon: Flower2 },
    { type: 'REFLECTION_POOL', label: 'Reflection Pool', desc: 'Private stillness and integration', state: 'Open', icon: Droplets },
    { type: 'JOURNEY', label: 'Personal Journey', desc: 'Memory, not surveillance', state: 'Open', icon: Sparkles },
    { type: 'RETREAT', label: 'Retreat Threshold', desc: 'Interest is not readiness', state: 'Available to Request', icon: Mountain },
    { type: 'FIRE_CIRCLE', label: 'Fire Circle', desc: 'Shadow work held with human care', state: 'By Invitation', icon: Flame },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="threshold-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090707] z-50 cursor-pointer backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            id="threshold-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-b from-[#181012] to-[#090707] border-l border-[#D8C5B0]/24 p-6 md:p-8 z-50 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D8B45E]" />
                  <span className="font-sans font-bold text-xs tracking-[0.16em] text-transform: uppercase text-[#E9C77E]">
                    Sanctuary Map
                  </span>
                </div>
                <button
                  id="close-threshold-btn"
                  onClick={onClose}
                  className="min-h-11 min-w-11 rounded-full bg-white/[0.08] border border-white/[0.18] hover:bg-white/[0.12] transition-colors text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-6">
                <div className="threshold-map-seal" aria-hidden="true">
                  <span className="threshold-map-lotus" />
                </div>
                <h3 className="font-serif text-3xl text-[#F6EFE7]">Where are you in the sanctuary?</h3>
                <p className="font-sans text-sm text-[#C8B7A5] mt-2 leading-relaxed">
                  See what is open now, what can be requested, and what opens with preparation or invitation.
                </p>
              </div>

              {/* Vertical Ascent Path */}
              <div className="relative pl-6 flex flex-col gap-4">
                {/* Connecting mountain ridge line */}
                <div className="absolute left-[13px] top-4 bottom-12 w-[1px] bg-gradient-to-b from-white/10 via-[#E27A3F]/30 to-white/5" />

                {mountainPath.map((node) => {
                  const isActive = currentRoom === node.type;
                  const isOpen = node.state === 'Open' || node.state === 'Available to Request';
                  const Icon = node.icon;

                  return (
                    <div key={node.label} className="relative flex items-start gap-4">
                      {/* Altitude Node Dot */}
                      <div className="absolute left-[-21px] top-1.5 flex items-center justify-center">
                        {isActive ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-[#E27A3F] border border-white/20 shadow-[0_0_12px_#E27A3F]" />
                        ) : (
                          <div className={`w-2.5 h-2.5 rounded-full bg-[#1c1414] border transition-colors ${isOpen ? 'border-[#D8C5B0]/30 hover:border-[#E27A3F]/50' : 'border-[#8a7c6d]/25'}`} />
                        )}
                      </div>

                      {/* Map Location Card */}
                      <button
                        id={`nav-room-${node.type.toLowerCase()}`}
                        onClick={() => {
                          if (node.type === 'PRACTICE_ROOM' && onBeginPractice) {
                            onBeginPractice();
                            onClose();
                            return;
                          }

                          if (isOpen) {
                            onNavigate(node.type as RoomType);
                            onClose();
                          }
                        }}
                        className={`flex-1 p-4 rounded-xl border text-left transition-all relative flex justify-between items-center ${
                          isActive
                            ? 'border-[#E9C77E] bg-[#4a1f24]/26 text-[#F6EFE7] shadow-[0_0_18px_rgba(233,199,126,0.1)]'
                            : !isOpen
                            ? 'border-white/10 bg-black/44 text-[#AFA194] opacity-95 cursor-default'
                            : 'border-[#D8C5B0]/14 hover:border-[#D8C5B0]/36 bg-white/[0.025] hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#E27A3F]' : isOpen ? 'text-[#D8C5B0]' : 'text-[#8a7c6d]'}`} />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif text-lg text-[#F6EFE7]">{node.label}</span>
                              <span className={`font-sans text-[10px] font-bold tracking-[0.04em] px-2 py-0.5 rounded ${
                                node.state === 'Open'
                                  ? 'text-[#8FB98A] bg-[#8FB98A]/10'
                                  : node.state === 'Available to Request'
                                  ? 'text-[#D8B45E] bg-[#D8B45E]/10'
                                  : node.state === 'Requires Preparation'
                                  ? 'text-[#C98BA0] bg-[#C98BA0]/10'
                                  : 'text-[#9FB4BD] bg-[#9FB4BD]/10'
                              }`}>
                                {node.state}
                              </span>
                            </div>
                            <span className="font-sans text-xs text-[#C8B7A5] mt-1 block">
                              {node.desc}
                            </span>
                          </div>
                        </div>

                        {!isOpen ? (
                          <CircleDot className="w-3.5 h-3.5 text-[#6b5f52]" />
                        ) : (
                          <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#E27A3F]' : 'text-[#6b5f52] group-hover:translate-x-0.5'}`} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer message */}
            <div className="mt-8 pt-4 border-t border-[#D8C5B0]/5 text-center">
              <span className="font-sans font-semibold text-[10px] tracking-[0.12em] text-[#C8B7A5] uppercase block leading-relaxed">
                Open rooms can be entered now. Other doorways are held with preparation or invitation.
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
