import { motion } from 'motion/react';

export default function Threshold({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center max-w-lg w-full px-4 text-center">

      {/* ── Sigil ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-16 w-48 h-48 flex items-center justify-center select-none"
      >
        {/* Outermost ambient halo */}
        <motion.div
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-[-32px] rounded-full bg-radial-[at_50%_50%] from-burgundy/30 via-ember/10 to-transparent blur-3xl pointer-events-none"
        />

        {/* Pulsing inner glow pool */}
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute inset-4 rounded-full bg-radial-[at_50%_60%] from-ember/20 via-burgundy/10 to-transparent blur-2xl pointer-events-none"
        />

        {/* Main Sigil SVG */}
        <svg
          viewBox="0 0 120 120"
          className="relative z-10 w-40 h-40 filter drop-shadow-[0_0_20px_rgba(122,12,12,0.6)]"
        >
          {/* 8-petal blood lotus */}
          <g transform="translate(60,60)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <path
                  d="M 0 -46 C 10 -36 13 -16 0 0 C -13 -16 -10 -36 0 -46 Z"
                  fill="#7a0c0c"
                  stroke="#a61313"
                  strokeWidth="0.5"
                  strokeOpacity="0.6"
                />
              </g>
            ))}
          </g>

          {/* Inner black field */}
          <circle cx="60" cy="60" r="32" fill="#050303" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.85" />

          {/* Fine dashed ring */}
          <circle cx="60" cy="60" r="28.5" fill="none" stroke="#ffffff" strokeWidth="0.4" strokeDasharray="1.2 2.8" strokeOpacity="0.6" />

          {/* Downward Shakti triangle */}
          <motion.polygon
            points="43,47 77,47 60,74"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.1"
            strokeOpacity="0.9"
            animate={{ strokeOpacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Third-eye flame */}
          <motion.path
            d="M 60,40 C 63.5,45 63.5,52 60,57 C 56.5,52 56.5,45 60,40 Z"
            fill="none"
            stroke="#e2b13c"
            strokeWidth="0.9"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Golden bindu */}
          <circle cx="60" cy="48.5" r="1.4" fill="#e2b13c" opacity="0.9" />

          {/* Crescent */}
          <path d="M 57.5,45.5 A 2.5,2.5 0 0,0 62.5,45.5 A 1.8,1.8 0 0,1 57.5,45.5" fill="#ffffff" opacity="0.8" />

          {/* Crimson bindu — center of the triangle */}
          <circle cx="60" cy="59" r="2.2" fill="#9d171d" stroke="#ffffff" strokeWidth="0.35" strokeOpacity="0.9" />
        </svg>

        {/* Rising sparks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              y: [0, -110 - i * 12],
              x: [(i - 2.5) * 6, (i - 2.5) * 22],
              opacity: [0, 0.7, 0],
              scale: [0.3, 1, 0],
            }}
            transition={{
              duration: 6 + i * 1.4,
              repeat: Infinity,
              delay: i * 1.6 + 1,
              ease: 'easeOut',
            }}
            className="absolute bottom-6 left-1/2 w-[3px] h-[3px] rounded-full bg-ember pointer-events-none"
            style={{ marginLeft: '-1.5px' }}
          />
        ))}
      </motion.div>

      {/* ── Wordmark ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.5 }}
        className="text-[10px] uppercase tracking-[0.45em] text-ash/30 mb-8 serif italic"
      >
        Sheetal Kandola Somatics
      </motion.p>

      {/* ── Headline ── */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-[2.15rem] md:text-5xl font-light leading-[1.25] tracking-tight mb-7 text-stone-100 serif italic text-glow"
      >
        Find the doorway<br className="hidden md:block" /> your body already knows.
      </motion.h1>

      {/* ── Sub-copy ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 1.5 }}
        className="text-[0.9375rem] text-ash/65 font-light leading-relaxed max-w-sm mb-4"
      >
        A quiet discernment experience rooted in Shakta Tantra, somatic shadow work, and nervous-system care.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.65, duration: 1.5 }}
        className="text-xs text-ash/35 italic mb-12"
      >
        You do not need to know where to begin.
      </motion.p>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.015, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }}
          className="relative group px-16 py-4 bg-transparent border border-burgundy/35 hover:border-ember/55 transition-all duration-700 rounded-sm cursor-pointer overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
        >
          <span className="relative z-10 text-ash/75 group-hover:text-ember transition-colors duration-500 tracking-[0.28em] font-medium text-[11px] uppercase">
            Enter the Threshold
          </span>
          <div className="absolute inset-0 bg-ember/0 group-hover:bg-ember/[0.04] transition-colors duration-700" />
        </motion.button>

        <p className="text-[9px] uppercase tracking-[0.3em] text-ash/20 serif">
          eight screens · no login · no paywall
        </p>
      </motion.div>

    </div>
  );
}
