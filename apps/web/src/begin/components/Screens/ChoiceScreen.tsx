import { useState } from 'react';
import { motion } from 'motion/react';
import { Choice, PathType } from '../../types';
import KaliSigil from '../KaliSigil';

interface Props {
  id: number;
  prompt: string;
  supportLine?: string;
  choices: Choice[];
  onSelect: (screenId: number, scores: Partial<Record<PathType, number>>, choiceId: string) => void;
}

export default function ChoiceScreen({ id, prompt, supportLine, choices, onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelection = (choiceId: string, scores: Partial<Record<PathType, number>>) => {
    if (selectedId) return;
    setSelectedId(choiceId);

    // Devotional pause - let the lamp light and warm up
    setTimeout(() => {
      onSelect(id, scores, choiceId);
      setSelectedId(null);
    }, 1100);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-light mb-4 leading-relaxed text-glow serif text-stone-100 italic">
          {prompt}
        </h2>
        {supportLine && (
          <p className="text-ash/40 italic text-sm md:text-base font-light font-sans tracking-wide">
            {supportLine}
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:px-12">
        {choices.map((choice, i) => {
          const isSelected = selectedId === choice.id;
          const isAnySelected = selectedId !== null;
          const isDimmed = isAnySelected && !isSelected;

          return (
            <motion.button
              key={choice.id}
              disabled={isAnySelected}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: isDimmed ? 0.25 : 1,
                y: 0,
                scale: isSelected ? 1.01 : 1
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: { delay: i * 0.08, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.8 }
              }}
              onClick={() => handleSelection(choice.id, choice.scores)}
              className={`group relative h-64 p-9 border transition-all duration-1000 text-left flex flex-col justify-end overflow-hidden backdrop-blur-[2px] rounded-t-[50%] md:rounded-t-[40%] cursor-pointer ${
                isSelected
                  ? 'border-amber-500/40 bg-stone-950 shadow-[inset_0_4px_40px_rgba(0,0,0,0.95),_0_20px_50px_rgba(217,85,6,0.18)]'
                  : 'border-ash/10 hover:border-amber-500/25 bg-stone-900/[0.12] hover:bg-stone-950/90 shadow-[inset_0_4px_30px_rgba(0,0,0,0.85),_0_10px_30px_-10px_rgba(0,0,0,0.9)]'
              }`}
            >
              {/* Layer 1: Stone shadow recess */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90" />

              {/* Layer 2: Warm burgundy/magenta drapery backdrop silk glow */}
              <div className={`absolute inset-0 bg-gradient-to-t from-burgundy/25 via-transparent to-transparent transition-all duration-1000 ${
                isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'
              }`} />

              {/* Layer 3: The Sanctuary Torch/Lamp warmth */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-32 bg-radial-gradient from-amber-600/20 via-burgundy/10 to-transparent blur-2xl transition-all duration-1000 ${
                isSelected ? 'opacity-100 scale-110' : 'opacity-25 group-hover:opacity-70'
              }`} />

              {/* Unique Flame Altar rising point */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-1000">
                {/* Hearth string / candlewick thread line */}
                <div className={`w-[0.5px] h-12 bg-gradient-to-b from-transparent transition-all duration-1000 ${
                  isSelected ? 'via-amber-500/40 to-ember' : 'via-ash/10 to-ash/30 group-hover:to-amber-500/40'
                }`} />

                {/* Derived Kali Sigil at the heart of the threshold portal */}
                <KaliSigil
                  className={`w-6 h-6 transition-all duration-1000 ${
                    isSelected ? 'opacity-100 scale-110' : 'opacity-40 group-hover:opacity-90'
                  }`}
                  glow={isSelected}
                />
              </div>

              {/* Fine tactile canvas noise overlay */}
              <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay" />

              {/* Interactive doorway text */}
              <p className={`relative z-10 text-center w-full px-5 mb-2 font-sans tracking-wide transition-all duration-1000 ${
                isSelected
                  ? 'text-amber-500 font-medium scale-[1.01] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                  : 'text-ash/75 group-hover:text-stone-100 font-light'
              }`}>
                {choice.text}
              </p>

              {/* Symmetrical framing geometry - bevel arches */}
              <div className={`absolute inset-0 border transition-all duration-1000 rounded-t-[50%] md:rounded-t-[40%] ${
                isSelected
                  ? 'border-amber-500/25'
                  : 'border-white/[0.015] group-hover:border-white/[0.04]'
              }`} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
