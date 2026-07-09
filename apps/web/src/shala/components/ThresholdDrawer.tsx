import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomType } from '../types';
import { X, Compass, ChevronRight, Lock } from 'lucide-react';

interface ThresholdDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoom: RoomType;
  onNavigate: (room: RoomType) => void;
}

export const ThresholdDrawer: React.FC<ThresholdDrawerProps> = ({
  isOpen,
  onClose,
  currentRoom,
  onNavigate,
}) => {
  // Ordered from lowest altitude (Temple Gates) to highest (Summit Sanctuary)
  const mountainPath: { type: RoomType | 'SUMMIT'; label: string; desc: string; altitude: string; icon: string }[] = [
    { type: 'GATES', label: 'Temple Gates', desc: 'Orientation and Arrival', altitude: '2,100m', icon: '⛩️' },
    { type: 'COURTYARD', label: 'Valley of Arrival', desc: 'Central Open Air Hub', altitude: '2,250m', icon: '🏔️' },
    { type: 'LIBRARY', label: 'Archive of Lineage', desc: 'The Vault of Teachings', altitude: '2,400m', icon: '📚' },
    { type: 'GODDESS_CHAMBERS', label: 'Eight Goddess Chambers', desc: 'Chambers of the Eight', altitude: '2,650m', icon: '🔱' },
    { type: 'REFLECTION_POOL', label: 'Reflection Pool', desc: 'Sacred Journal & Writing', altitude: '2,800m', icon: '🌊' },
    { type: 'JOURNEY', label: 'Moon Observatory', desc: 'Hours in Stillness & Pathway', altitude: '3,100m', icon: '🌙' },
    { type: 'RETREAT', label: 'Pilgrim\'s Hall', desc: 'Himalayan Readiness Checklist', altitude: '3,400m', icon: '🏛️' },
    { type: 'FIRE_CIRCLE', label: 'The Fire Circle', desc: 'Hearth of Daily Practice', altitude: '3,600m', icon: '🔥' },
    { type: 'SUMMIT', label: 'Summit Sanctuary', desc: 'Silent Teacher Stewardship', altitude: '4,000m', icon: '🏔️' },
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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-b from-[#141011] to-[#090707] border-l border-[#D8C5B0]/15 p-6 md:p-8 z-50 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#E27A3F] animate-[spin_10s_linear_infinite]" />
                  <span className="font-sans font-bold text-xs tracking-[0.24em] text-transform: uppercase text-[#E27A3F]">
                    THE ASCENT PATH
                  </span>
                </div>
                <button
                  id="close-threshold-btn"
                  onClick={onClose}
                  className="p-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-serif text-2xl text-[#F6EFE7]">Where are you on the mountain?</h3>
                <p className="font-serif italic text-sm text-[#8b949e] mt-1.5 leading-relaxed">
                  The sanctuary is a continuous journey ascending into deeper stillness. Step into any unlocked altitude container.
                </p>
              </div>

              {/* Vertical Ascent Path */}
              <div className="relative pl-6 flex flex-col gap-4">
                {/* Connecting mountain ridge line */}
                <div className="absolute left-[13px] top-4 bottom-12 w-[1px] bg-gradient-to-b from-white/10 via-[#E27A3F]/30 to-white/5" />

                {mountainPath.map((node) => {
                  const isSummit = node.type === 'SUMMIT';
                  const isActive = currentRoom === node.type;

                  return (
                    <div key={node.label} className="relative flex items-start gap-4">
                      {/* Altitude Node Dot */}
                      <div className="absolute left-[-21px] top-1.5 flex items-center justify-center">
                        {isActive ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-[#E27A3F] border border-white/20 shadow-[0_0_12px_#E27A3F]" />
                        ) : isSummit ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#6b5f52] border border-white/5" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1c1414] border border-[#D8C5B0]/30 hover:border-[#E27A3F]/50 transition-colors" />
                        )}
                      </div>

                      {/* Map Location Card */}
                      <button
                        id={`nav-room-${node.type.toLowerCase()}`}
                        disabled={isSummit}
                        onClick={() => {
                          if (!isSummit) {
                            onNavigate(node.type as RoomType);
                            onClose();
                          }
                        }}
                        className={`flex-1 p-3.5 rounded-xl border text-left transition-all relative flex justify-between items-center ${
                          isActive
                            ? 'border-[#E27A3F] bg-[#4a1f24]/10 text-[#F6EFE7] shadow-[0_0_15px_rgba(226,122,63,0.05)]'
                            : isSummit
                            ? 'border-white/5 bg-black/40 text-[#6b5f52] opacity-65 cursor-not-allowed'
                            : 'border-[#D8C5B0]/5 hover:border-[#D8C5B0]/20 bg-white/[0.01] hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg opacity-85 select-none">{node.icon}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif text-md text-[#F6EFE7]">{node.label}</span>
                              <span className="font-sans text-[8px] tracking-wider text-[#8a7c6d] bg-white/5 px-1.5 py-0.5 rounded">
                                {node.altitude}
                              </span>
                            </div>
                            <span className="font-sans text-[10px] text-[#8b949e] mt-1 block">
                              {node.desc}
                            </span>
                          </div>
                        </div>

                        {isSummit ? (
                          <Lock className="w-3.5 h-3.5 text-[#524446]" />
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
              <span className="font-sans font-semibold text-[8px] tracking-[0.24em] text-[#6b5f52] uppercase block">
                The Mountain remembers every step
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
