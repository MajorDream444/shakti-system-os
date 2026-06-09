import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import KaliSigil from '../KaliSigil';

interface Props {
  result: {
    headline: string;
    reflection: string;
    nextStep: string;
    primaryCTA: string;
    secondaryCTA: string;
  };
  onNext: () => void;
}

export default function PathReveal({ result, onNext }: Props) {
  return (
    <div className="flex flex-col items-center max-w-2xl px-4 text-center">
      {/* Devotional Lineage Seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="mb-6"
      >
        <KaliSigil className="w-8 h-8" glow={true} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="mb-10 relative w-full"
      >
        {/* Illuminated Symmetrical Current Beacon */}
        <div className="relative h-28 md:h-36 w-px mx-auto mb-10 overflow-hidden">
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-red-700 to-transparent shadow-[0_0_25px_rgba(185,28,28,0.7)]" 
          />
          <div className="absolute inset-0 bg-ash/10" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 text-glow serif text-stone-100 italic">
          {result.headline}
        </h2>
      </motion.div>

      {/* Recessed Cavernous stone niche */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-stone-950/70 border border-red-950/30 p-10 md:p-14 rounded-sm mb-14 backdrop-blur-md relative overflow-hidden group shadow-[inset_0_4px_35px_rgba(0,0,0,0.95),_0_25px_50px_-15px_rgba(0,0,0,0.95)] max-w-xl mx-auto"
      >
        {/* Warm deep red drapery background glow inside niche */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/15 via-transparent to-transparent opacity-80" />
        
        {/* Glowing Hearth Fire Spillover */}
        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-800/40 to-transparent shadow-[0_0_25px_rgba(157,23,29,0.45)]" />
        
        <p className="relative z-10 text-lg md:text-xl text-ash/80 font-light leading-relaxed mb-10 italic serif">
          {result.reflection}
        </p>
        
        <div className="flex flex-col items-center relative py-6 border-t border-ash/5">
          <div className="absolute inset-0 bg-burgundy/[0.015] blur-3xl rounded-full" />
          <span className="relative z-10 text-[9px] uppercase tracking-[0.4em] text-ash/30 mb-5 font-medium">Your Next Threshold</span>
          <h3 className="relative z-10 text-2xl md:text-3xl text-red-400 font-light tracking-wide text-glow">
            {result.nextStep}
          </h3>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.5 }}
        className="flex flex-col sm:flex-row gap-8 items-center"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ 
            scale: 1.01, 
            transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
          }}
          className="group relative flex items-center gap-4 px-12 py-5 bg-stone-900/[0.2] border border-red-950/40 hover:border-red-800 text-red-400 hover:text-stone transition-all duration-700 rounded-sm overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-red-950 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700" />
          <span className="relative z-10 tracking-[0.2em] uppercase text-xs font-semibold">
            {result.primaryCTA}
          </span>
          <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" />
        </motion.button>

        <motion.button
          onClick={onNext}
          whileHover={{
            scale: 1.02,
            transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
          }}
          className="group flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-ash/40 group-hover:text-ash/60 text-[10px] uppercase tracking-[0.2em] transition-colors duration-500">
            {result.secondaryCTA}
          </span>
          <div className="w-8 h-[0.5px] bg-ash/20 group-hover:w-16 group-hover:bg-ash/40 transition-all duration-700" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.5 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <p className="text-[9px] uppercase tracking-[0.3em] text-ash/25">or speak directly with Sheetal</p>
        <a
          href="https://calendly.com/sheetalkandola/discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.2em] text-ash/35 hover:text-ember transition-colors duration-700 border-b border-ash/10 hover:border-ember/40 pb-[1px]"
        >
          Book a Discovery Call
        </a>
      </motion.div>
    </div>
  );
}
