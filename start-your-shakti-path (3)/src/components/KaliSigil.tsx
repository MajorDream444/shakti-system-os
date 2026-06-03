import { motion } from 'motion/react';

interface Props {
  className?: string;
  glow?: boolean;
}

export default function KaliSigil({ className = "w-6 h-6", glow = true }: Props) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <span className="absolute inset-0 bg-red-600/20 blur-sm rounded-full scale-125 animate-pulse" />
      )}
      <svg 
        viewBox="0 0 40 40" 
        className="w-full h-full text-stone-100 relative z-10"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fine gold-tinted third eye protective outer arc */}
        <path 
          d="M 8,20 C 14,14 26,14 32,20 C 26,26 14,26 8,20 Z" 
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="0.75" 
        />
        
        {/* Downward Yoni Triangle (primordial feminine energy) */}
        <polygon 
          points="13,16 27,16 20,29" 
          stroke="#ffffff" 
          strokeWidth="1"
          strokeLinejoin="round"
          strokeOpacity="0.85"
        />

        {/* Third Eye Flame inside Yoni */}
        <motion.path 
          d="M 20,13 C 21.5,15.5 21.5,19 20,21.5 C 18.5,19 18.5,15.5 20,13 Z" 
          fill="#e2b13c" 
          animate={{
            scaleY: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Crescent Moon pointing skyward cradling the fire */}
        <path 
          d="M 17,21.5 A 3,3 0 0,0 23,21.5 A 2,2 0 0,1 17,21.5" 
          fill="#ffffff" 
          opacity="0.9" 
        />

        {/* Crimson Bindi (seat of raw shakti) */}
        <circle 
          cx="20" 
          cy="22.5" 
          r="1.5" 
          fill="#9d171d" 
        />
      </svg>
    </div>
  );
}
