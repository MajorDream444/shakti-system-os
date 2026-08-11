import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, History, Sprout, Sun } from 'lucide-react';
import { SeekerState } from '../types';
import { playResonantBell } from '../lib/audio';

interface EnvironmentalRitualProps {
  roomId: 'GATES' | 'FIRE_CIRCLE';
  seekerState?: SeekerState;
  onOfferIntention: (intention: string) => void;
}

export const EnvironmentalRitual: React.FC<EnvironmentalRitualProps> = ({
  roomId,
  seekerState,
  onOfferIntention,
}) => {
  const [intention, setIntention] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const intentions = seekerState?.dailyIntentions || [];
  const growthLevel = seekerState?.ritualGrowthLevel || 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intention.trim()) return;

    setIsSubmitting(true);
    playResonantBell();

    setTimeout(() => {
      onOfferIntention(intention.trim());
      setIntention('');
      setIsSubmitting(false);
    }, 1200);
  };

  // Provide atmospheric descriptive lines based on room & level
  const getGrowthFeedback = () => {
    if (roomId === 'GATES') {
      if (growthLevel <= 1) return 'The ancient archway is bare and silent, waiting for your breath.';
      if (growthLevel <= 3) return 'Fresh emerald ivy leaves are unfurling tenderly along the lower basalt pillars.';
      if (growthLevel <= 6) return 'Wild mountain jasmine has crept halfway up the gate, releasing a faint midnight fragrance.';
      if (growthLevel <= 9) return 'Thick flowering vines drape gracefully over the arch. White blossoms shiver in the cold breeze.';
      return 'The Shala Gates are in full, radiant bloom. Golden petals dust the stone steps with celestial light.';
    } else {
      if (growthLevel <= 1) return 'The Hearth is quiet; the logs rest cold and undisturbed.';
      if (growthLevel <= 3) return 'A delicate, warm amber pulse rises from the central ash bed.';
      if (growthLevel <= 6) return 'Sweet cedarwood fire cracks rhythmically, throwing long, playful shadows.';
      if (growthLevel <= 9) return 'The sacred embers glow in a profound sapphire-and-gold hue, hovering like miniature stars.';
      return 'The Fire Circle burns with ancient firelight, casting an eye-safe emerald-gold aura over the high ridge.';
    }
  };

  return (
    <div className="w-full max-w-md border border-[#D8C5B0]/10 rounded-3xl bg-black/50 backdrop-blur-md p-6 relative overflow-hidden z-20">
      {/* Background Soft Glow */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#E27A3F]/5 filter blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {roomId === 'GATES' ? (
            <Sprout className="w-4 h-4 text-[#7fa39c]" />
          ) : (
            <Sun className="w-4 h-4 text-[#E27A3F]" />
          )}
          <span className="font-sans font-bold text-[9px] tracking-[0.22em] text-[#E27A3F] uppercase">
            {roomId === 'GATES' ? 'Archway Growth Ritual' : 'Hearth Flame Ritual'}
          </span>
        </div>

        {intentions.length > 0 && (
          <button
            id={`toggle-ritual-history-${roomId.toLowerCase()}`}
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 font-sans text-[9px] text-[#8a7c6d] hover:text-[#F6EFE7] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <History className="w-3 h-3" />
            {showHistory ? 'Offer Intent' : `Echos (${intentions.length})`}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showHistory ? (
          <motion.div
            key="ritual-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-lg text-[#F6EFE7] mb-2">
              {roomId === 'GATES'
                ? 'Sow an Intention at the Arch'
                : 'Feed the Hearth with Sincerity'}
            </h3>
            <p className="font-sans text-xs text-[#8a7c6d] leading-relaxed mb-4">
              Your written aspirations shape the mountain sanctuary. Every whisper transforms the physical space, nourishing living growth or heightening sacred embers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  id={`ritual-intent-input-${roomId.toLowerCase()}`}
                  type="text"
                  maxLength={120}
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  placeholder="e.g., Cultivating patience with myself..."
                  className="w-full px-4 py-3 bg-white/[0.02] border border-[#D8C5B0]/15 rounded-xl font-sans text-xs text-[#F6EFE7] placeholder-[#6b5f52] focus:outline-none focus:border-[#E27A3F]/50 transition-colors"
                  disabled={isSubmitting}
                />
                <span className="absolute right-3 top-3.5 font-mono text-[8px] text-[#6b5f52] select-none">
                  {120 - intention.length}
                </span>
              </div>

              <button
                id={`ritual-submit-btn-${roomId.toLowerCase()}`}
                type="submit"
                disabled={isSubmitting || !intention.trim()}
                className="w-full py-2.5 bg-gradient-to-r from-[#C35A2E]/80 to-[#E27A3F]/80 hover:from-[#C35A2E] hover:to-[#E27A3F] disabled:from-white/5 disabled:to-white/5 disabled:text-[#6b5f52] text-white font-sans font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_0_12px_rgba(226,122,63,0.1)] hover:scale-[1.01] cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" /> Whispering...
                  </span>
                ) : (
                  'Resonate Intention'
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/5 flex gap-3 items-start">
              <span className="text-lg leading-none">🏔️</span>
              <div>
                <span className="font-sans font-bold text-[8px] text-[#E27A3F] tracking-widest block uppercase mb-1">
                  CURRENT RESPONSE · LEVEL {growthLevel}
                </span>
                <p className="font-serif italic text-xs text-[#D8C5B0] leading-relaxed">
                  "{getGrowthFeedback()}"
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ritual-history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h3 className="font-serif text-lg text-[#F6EFE7] mb-1">Whispers of the Past</h3>
              <p className="font-sans text-[10px] text-[#8a7c6d] uppercase tracking-wider">
                Intention Lineage kept by the winds
              </p>
            </div>

            <div className="max-h-48 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-white/5">
              {intentions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-white/5 bg-white/[0.01]"
                >
                  <p className="font-serif italic text-xs text-[#D8C5B0]">
                    "{item}"
                  </p>
                  <span className="font-sans text-[8px] text-[#6b5f52] block mt-1 uppercase tracking-widest">
                    Ritual offering #{intentions.length - idx}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowHistory(false)}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-[#D8C5B0] font-sans font-semibold text-[9px] tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
            >
              Back to Ritual Form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
