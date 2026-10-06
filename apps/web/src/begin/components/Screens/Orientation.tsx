import { motion } from 'motion/react';
import {
  WATERFALL_LABEL,
  WATERFALL_TITLE,
  waterfallDeliveryWindow,
  waterfallPathShape,
} from '../../../data/waterfallCopy';

export default function Orientation({ onNext }: { onNext: () => void }) {
  return (
    <div className="begin-screen flex flex-col items-start max-w-2xl">
      {/* Devotional Lineage Seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="mb-6 begin-small-seal"
      >

      </motion.div>

      <motion.h2
        className="begin-heading text-3xl md:text-5xl font-light mb-10 italic text-glow serif text-stone-100"
      >
        Not every woman enters through the same doorway.
      </motion.h2>

      <div className="space-y-5 mb-12 text-left max-w-xl">
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
            className="begin-listening-line text-base md:text-lg text-ash/85 font-light pl-4 border-l-2 border-red-800"
          >
            {text}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="begin-body text-base text-ash/70 mb-4 text-left leading-relaxed max-w-xl"
      >
        This experience helps you sense what kind of support may fit your current season — emotionally, practically, and energetically.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="text-base text-ash/45 mb-8 italic text-left"
      >
        There are no right answers. Only a clearer doorway.
      </motion.p>

      {/* The exchange, stated BEFORE the first question rather than sprung at
          the email field — SHAKTI-WATERFALL-LEAD-PATH-2026-10-06.md §4.

          Deliberately a quiet panel, not a banner. The brief rules out pop-ups,
          forced modals, countdowns and scarcity language, and the whole point
          of the practice is that it is a magnet rather than a funnel.

          The shape of the path and the delivery window are both named here so
          nobody discovers either one late. */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.95, duration: 1.2 }}
        className="w-full max-w-xl mb-12 p-5 rounded-sm border border-[#E9C77E]/25 bg-[#2A1216]/55 text-left"
        aria-label="What you receive for completing this path"
      >
        <p className="text-base font-semibold uppercase tracking-[0.2em] text-[#E9C77E] mb-2">
          {WATERFALL_LABEL}
        </p>
        <p className="begin-heading serif italic text-2xl md:text-3xl font-light text-stone-100 mb-3">
          {WATERFALL_TITLE}
        </p>
        <p className="text-base leading-relaxed text-ash/[0.88]">
          Complete this short Guided Path and receive{' '}
          <span className="text-[#F0C4D0]">Shakti Waterfall</span>, a free
          Tantric somatic embodiment practice, by email.
        </p>
        {/* No question count, by decision — the experience can change without
            making this line false. See waterfallCopy.ts. */}
        <p className="text-base leading-relaxed text-ash/[0.62] mt-2">
          {waterfallPathShape} {waterfallDeliveryWindow}
        </p>
      </motion.aside>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        onClick={onNext}
        className="begin-primary-action px-12 py-4 border border-burgundy/30 hover:border-ember/40 hover:bg-ember/[0.02] transition-all duration-700 tracking-[0.25em] uppercase text-base font-semibold rounded-sm cursor-pointer"
      >
        Continue
      </motion.button>
    </div>
  );
}
