import { motion } from 'motion/react';
import KaliSigil from '../KaliSigil';

export default function Orientation({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center max-w-xl">
      {/* Devotional Lineage Seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="mb-6"
      >
        <KaliSigil className="w-8 h-8" glow={true} />
      </motion.div>

      <motion.h2
        className="text-2xl md:text-3xl font-light mb-12 italic text-glow serif text-stone-100"
      >
        Not every woman enters through the same doorway.
      </motion.h2>

      <div className="space-y-6 mb-12 text-left max-w-lg">
        {[
          "Some women need rhythm.",
          "Some need personal support.",
          "Some are ready for deeper shadow and somatic work.",
          "Some feel called toward retreat, but need to discern readiness with care."
        ].map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (i * 0.2), duration: 1, ease: 'easeOut' }}
            className="text-base text-ash/85 font-light pl-4 border-l-2 border-red-800"
          >
            {text}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="text-base text-ash/70 mb-4 text-center leading-relaxed max-w-md"
      >
        This experience helps you sense what kind of support may fit your current season — emotionally, practically, and energetically.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="text-xs text-ash/40 mb-12 italic text-center"
      >
        There are no right answers. Only a clearer doorway.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        onClick={onNext}
        className="px-12 py-4 border border-burgundy/30 hover:border-ember/40 hover:bg-ember/[0.02] transition-all duration-700 tracking-[0.25em] uppercase text-xs font-semibold rounded-sm cursor-pointer"
      >
        Continue
      </motion.button>
    </div>
  );
}
