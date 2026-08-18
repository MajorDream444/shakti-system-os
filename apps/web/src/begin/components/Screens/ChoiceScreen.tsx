import { useState } from 'react';
import { motion } from 'motion/react';
import { Choice, PathType } from '../../types';
import KaliSigil from '../KaliSigil';

interface Props {
  id: number;
  prompt: string;
  supportLine?: string;
  choices: Choice[];
  selectedChoiceId?: string;
  onSelect: (screenId: number, scores: Partial<Record<PathType, number>>, choiceId: string) => void;
}

export default function ChoiceScreen({ id, prompt, supportLine, choices, selectedChoiceId, onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(selectedChoiceId ?? null);

  const handleSelection = (choiceId: string, scores: Partial<Record<PathType, number>>) => {
    if (selectedId) {
      if (selectedChoiceId === choiceId) {
        onSelect(id, {}, choiceId);
      }
      return;
    }
    setSelectedId(choiceId);

    // Devotional pause - let the lamp light and warm up
    setTimeout(() => {
      onSelect(id, scores, choiceId);
      setSelectedId(null);
    }, 1100);
  };

  return (
    <div className="begin-screen begin-choice-screen flex flex-col items-start w-full max-w-4xl px-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-left"
      >
        <h2 className="begin-heading text-3xl md:text-5xl font-light mb-4 leading-tight text-glow serif text-stone-100 italic">
          {prompt}
        </h2>
        {supportLine && (
          <p className="begin-body text-ash/58 italic text-sm md:text-base font-light font-sans tracking-wide max-w-xl">
            {supportLine}
          </p>
        )}
      </motion.div>

      <div className="begin-choice-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
        {choices.map((choice, i) => {
          const isSelected = selectedId === choice.id;
          const isAnySelected = selectedId !== null;
          const isDimmed = isAnySelected && !isSelected;

          return (
            <motion.button
              key={choice.id}
              disabled={isAnySelected && choice.id !== selectedId}
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
              aria-pressed={isSelected}
              className={`begin-choice group relative min-h-28 md:min-h-40 p-6 md:p-7 border transition-all duration-1000 text-left flex flex-col justify-end overflow-hidden backdrop-blur-[2px] cursor-pointer ${
                isSelected
                  ? 'begin-choice--selected'
                  : 'begin-choice--idle'
              }`}
            >
              {/* Layer 1: Stone shadow recess — kept below the contrast floor so the
                  card stays visibly a card. See SHAKTI-COLOR-DOCTRINE.md §5. */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-70" />

              {/* Layer 2: Warm burgundy/magenta drapery backdrop silk glow */}
              <div className={`absolute inset-0 bg-gradient-to-t from-burgundy/25 via-transparent to-transparent transition-all duration-1000 ${
                isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'
              }`} />

              {/* Layer 3: The Sanctuary Torch/Lamp warmth */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-32 bg-radial-gradient from-amber-600/20 via-burgundy/10 to-transparent blur-2xl transition-all duration-1000 ${
                isSelected ? 'opacity-100 scale-110' : 'opacity-25 group-hover:opacity-70'
              }`} />

              {/* Unique Flame Altar rising point */}
              <div className="begin-choice-orb absolute top-6 right-6 flex flex-col items-center gap-1.5 transition-all duration-1000">
                {/* Hearth string / candlewick thread line */}
                <div className={`w-[0.5px] h-8 bg-gradient-to-b from-transparent transition-all duration-1000 ${
                  isSelected ? 'via-amber-500/40 to-ember' : 'via-ash/10 to-ash/30 group-hover:to-amber-500/40'
                }`} />

                {/* Derived Kali Sigil at the heart of the threshold portal */}
                <KaliSigil
                  className={`w-5 h-5 transition-all duration-1000 ${
                    isSelected ? 'opacity-100 scale-110' : 'opacity-40 group-hover:opacity-90'
                  }`}
                  glow={isSelected}
                />
              </div>

              {/* Fine tactile canvas noise overlay */}
              <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay" />

              {/* Interactive doorway text */}
              <p className={`relative z-10 text-left w-full pr-10 mb-0 font-sans text-base md:text-lg leading-relaxed tracking-wide transition-all duration-1000 ${
                isSelected
                  ? 'text-amber-500 font-medium scale-[1.01] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                  : 'text-ash/90 group-hover:text-stone-100 font-light'
              }`}>
                {choice.text}
              </p>

              {/* Symmetrical framing geometry - bevel arches */}
              <div className={`absolute inset-0 border transition-all duration-1000 ${
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
