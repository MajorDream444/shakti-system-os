import { motion } from 'motion/react';

export default function Threshold({ onNext }: { onNext: () => void }) {
  return (
    <div className="begin-screen begin-arrival flex flex-col items-start max-w-2xl mt-[-2vh]">
      {/* Sacred Sanctuary Devotional Temple Entrance */}
      <div className="relative mb-6 md:mb-14 px-4 select-none">
        {/* Heavy Sanctuary Stone Archways Stack - Peering Into a Heated Devotional Chamber */}
        <div className="relative w-36 h-56 sm:w-44 sm:h-68 md:w-60 md:h-96 flex items-center justify-center">

          {/* Deep Ambient Room Red Silk / Burgundy Aura Spillover */}
          <div className="absolute inset-[-50px] bg-gradient-to-t from-burgundy/15 via-ember/[0.08] to-transparent rounded-t-full blur-3xl pointer-events-none" />
          <div className="absolute inset-[-20px] bg-gradient-to-r from-crimson/5 via-transparent to-burgundy/5 rounded-t-full blur-2xl pointer-events-none" />

          {/* Layer 1: Ancient Foundation Outer Masonry Arch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.8, ease: "easeOut" }}
            className="absolute inset-[-18px] border-t-[2px] border-x-[1px] border-burgundy/20 rounded-t-full shadow-[inset_0_4px_30px_rgba(0,0,0,0.9)] bg-[#0c0505]/40 pointer-events-none"
          />

          {/* Layer 2: Main Outer Stone Arch with Gold Line Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 2.4, ease: "easeOut" }}
            className="absolute inset-0 border-t-[3px] border-x-[1px] border-ash/15 rounded-t-full shadow-[0_10px_60px_rgba(0,0,0,0.95),_0_-20px_80px_-10px_rgba(180,20,30,0.22)] bg-[#120707]"
          />

          {/* Layer 3: Deep Interior Bevel Recess (Crimson Silk & Hearth Shadows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            className="absolute inset-6 border border-burgundy/25 rounded-t-full bg-black/80 shadow-[inset_0_12px_45px_rgba(0,0,0,0.98)]"
          />

          {/* Layer 4: Deep Cavern Flame Chamber (The Internal Shrine Chamber) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.8 }}
            className="absolute inset-10 rounded-t-full overflow-hidden bg-black border border-burgundy/10 shadow-[inset_0_15px_60px_rgba(0,0,0,1)]"
          >
            {/* The Heart of the Flame - Vertical Heat Diffusion and Living Embers */}
            <motion.div
              animate={{
                opacity: [0.6, 0.95, 0.6],
                scale: [0.97, 1.04, 0.97],
                y: [-4, 4, -4]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-3 bottom-0 top-[10%] bg-gradient-to-t from-ember/85 via-burgundy/65 to-transparent blur-xl"
            />

            {/* Glowing Golden Lamp point at the bottom center of the altar */}
            <motion.div
              animate={{
                scale: [0.85, 1.2, 0.85],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-14 h-14 bg-amber-500/40 rounded-full blur-md"
            />

            {/* Soft dust/smoke texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none mix-blend-overlay" />
          </motion.div>

          {/* Reserved for an exact, production-approved founder asset. */}

          {/* Slow candlelight reflection crossing the stone floor threshold */}
          <motion.div
            animate={{ opacity: [0.55, 0.8, 0.55] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[160%] h-24 bg-radial-gradient from-burgundy/40 via-ember/25 to-transparent blur-3xl pointer-events-none"
          />
        </div>

      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 1.1 }}
        className="begin-kicker"
      >
        The threshold
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="begin-heading text-3xl md:text-6xl font-light tracking-tight leading-tight mb-4 md:mb-7 text-glow text-stone-100 serif"
      >
        You have arrived at the foot of the mountain.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1.5 }}
        className="begin-body text-base md:text-lg text-ash/80 mb-3 md:mb-5 font-light leading-relaxed"
      >
        Before anything is asked of you, simply arrive. Let your breath find the ground beneath you. There is nowhere to rush toward.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.5 }}
        className="text-base md:text-base text-ash/55 mb-6 md:mb-12 italic"
      >
        Sri Shakti Shala opens through attention, not performance.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        onClick={onNext}
        className="begin-primary-action relative group px-14 py-4 bg-transparent border border-burgundy/30 hover:border-ember/50 transition-colors duration-700 overflow-hidden rounded-sm cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
      >
        <span className="relative z-10 text-ash/80 group-hover:text-ember transition-colors duration-500 tracking-[0.25em] font-medium text-base uppercase">
          Begin the Ascent
        </span>
        <div className="absolute inset-0 bg-ember/0 group-hover:bg-ember/[0.04] transition-colors duration-700" />
      </motion.button>
    </div>
  );
}
