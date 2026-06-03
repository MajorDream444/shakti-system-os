import { motion } from 'motion/react';

export default function Threshold({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center max-w-xl mt-[-2vh]">
      {/* Sacred Sanctuary Devotional Temple Entrance */}
      <div className="relative mb-14 px-4 select-none">
        {/* Heavy Sanctuary Stone Archways Stack - Peering Into a Heated Devotional Chamber */}
        <div className="relative w-52 h-80 md:w-60 md:h-96 flex items-center justify-center">
          
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

          {/* The Sacred Shakti Sigil: Sheetal Kandola Brand-Energy Signature (Fierce circular mandala with blood-red outer lotus, white sacred linework, downward Kali Devi triangle, vertical third-eye flame, and crimson bindi) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 2.2, ease: "easeOut" }}
            className="absolute z-20 w-36 h-36 flex items-center justify-center pointer-events-none select-none"
          >
            <svg viewBox="0 0 120 120" className="w-full h-full text-stone-100 filter drop-shadow-[0_0_15px_rgba(122,12,12,0.7)]">
              {/* Rotated 8-petal ceremonial blood-red outer lotus form */}
              <g transform="translate(60,60)">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <g key={angle} transform={`rotate(${angle})`}>
                    <path 
                      d="M 0 -44 C 11 -35 14 -15 0 0 C -14 -15 -11 -35 0 -44 Z" 
                      fill="#7a0c0c" 
                      stroke="#a61313" 
                      strokeWidth="0.75" 
                      strokeOpacity="0.5" 
                    />
                  </g>
                ))}
              </g>

              {/* Black field inner core background */}
              <circle cx="60" cy="60" r="32" fill="#030303" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.9" />

              {/* Concentric rings of white sacred linework and ornamental micro-dots */}
              <circle cx="60" cy="60" r="29" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1.5 2.5" strokeOpacity="0.8" />
              <circle cx="60" cy="60" r="26" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.25" />

              {/* Downward pointing Devi/Shakti Yoni Triangle (Sacred Geometry) */}
              <motion.polygon 
                points="42,47 78,47 60,76" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.25"
                strokeOpacity="0.95"
                animate={{ 
                  strokeWidth: [1.25, 1.75, 1.25],
                  opacity: [0.85, 1, 0.85]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Third-Eye Flame of Kali (Vertical eye/flame loop) */}
              <motion.path 
                d="M 60,39 C 63,44 63,51 60,56 C 57,51 57,44 60,39 Z" 
                fill="none" 
                stroke="#e2b13c" 
                strokeWidth="1"
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [0.98, 1.04, 0.98]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Innermost Bindu of Infinite Creation */}
              <circle cx="60" cy="48" r="1.5" fill="#e2b13c" />

              {/* Crescent Moon pointing upward inside the forehead loop */}
              <path d="M 57,45 A 3,3 0 0,0 63,45 A 2.2,2.2 0 0,1 57,45" fill="#ffffff" opacity="0.85" />

              {/* Sacred Blood-Red/Crimson Bindu point placed centered lower inside the triangle */}
              <circle cx="60" cy="59" r="2.5" fill="#9d171d" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.95" />
            </svg>
          </motion.div>

          {/* Silt Dust/Ember spill reflection crossing the stone floor threshold */}
          <motion.div 
            animate={{ opacity: [0.55, 0.8, 0.55] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[160%] h-24 bg-radial-gradient from-burgundy/40 via-ember/25 to-transparent blur-3xl pointer-events-none"
          />
        </div>

        {/* Quiet, Cinematic Floating Sparks Rising From Behind */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [15, -130],
              x: [0, (i - 2) * 18],
              opacity: [0, 0.8, 0],
              scale: [0.4, 1.1, 0]
            }}
            transition={{
              duration: 7 + i * 2,
              repeat: Infinity,
              delay: i * 1.8,
              ease: "linear"
            }}
            className="absolute bottom-8 left-1/2 w-1.5 h-1.5 bg-ember/80 rounded-full blur-[0.4px] pointer-events-none"
          />
        ))}
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="text-3xl md:text-4xl font-light tracking-tight leading-relaxed mb-6 text-glow text-stone-100 serif"
      >
        Begin your Shakti path with structure your body can trust.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1.5 }}
        className="text-base text-ash/80 mb-5 font-light leading-relaxed px-4 md:px-8"
      >
        A calm first step into Sheetal Kandola’s work — rooted in Shakta Tantra, sensual somatics, shadow integration, and nervous-system literacy.
      </motion.p>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.5 }}
        className="text-xs text-ash/40 mb-11 italic"
      >
        You do not need to know exactly where to begin. We will move slowly.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        onClick={onNext}
        className="relative group px-14 py-4 bg-transparent border border-burgundy/30 hover:border-ember/50 transition-colors duration-700 overflow-hidden rounded-sm cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
      >
        <span className="relative z-10 text-ash/80 group-hover:text-ember transition-colors duration-500 tracking-[0.25em] font-medium text-xs uppercase">
          Enter the Threshold
        </span>
        <div className="absolute inset-0 bg-ember/0 group-hover:bg-ember/[0.04] transition-colors duration-700" />
      </motion.button>
    </div>
  );
}
