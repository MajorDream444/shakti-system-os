import { useState } from 'react';
import { motion } from 'motion/react';
import KaliSigil from '../KaliSigil';

const LONGINGS = [
  "rhythm", "grounding", "sensual embodiment", "shadow integration",
  "emotional clarity", "devotional fire", "community", "sovereignty",
  "retreat readiness", "body trust", "sacred structure", "deeper transformation"
];

export default function Reflection({ onNext }: { onNext: (longings: string[], text: string) => void }) {
  const [selectedLongings, setSelectedLongings] = useState<string[]>([]);
  const [text, setText] = useState('');

  const toggleLonging = (longing: string) => {
    setSelectedLongings(prev =>
      prev.includes(longing)
        ? prev.filter(l => l !== longing)
        : [...prev, longing]
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4">
      {/* Brand Devotional Anchor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="mb-6"
      >
        <KaliSigil className="w-8 h-8" glow={true} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-light mb-4 serif text-stone-100 italic">
          What are you longing to return to?
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3.5 mb-14 max-w-xl">
        {LONGINGS.map((longing, i) => (
          <motion.button
            key={longing}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.8 }}
            onClick={() => toggleLonging(longing)}
            className={`px-5 py-2.5 rounded-full border transition-all duration-700 text-xs tracking-[0.1em] lowercase cursor-pointer ${
              selectedLongings.includes(longing)
                ? 'bg-red-950/30 border-red-800 text-red-200 shadow-[0_0_15px_rgba(157,23,29,0.3)]'
                : 'bg-stone-900/10 border-ash/5 text-ash/50 hover:border-ash/20 hover:text-stone-300'
            }`}
          >
            {longing}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full mb-12 max-w-lg"
      >
        <p className="text-center text-ash/40 mb-6 font-light italic text-sm serif">
          In a few words, what has brought you here?
        </p>
        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="A sentence is enough. Let it be honest."
            className="w-full h-36 bg-stone-950/40 border border-ash/10 group-hover:border-ash/15 focus:border-red-800 rounded-sm p-4 text-ash placeholder:text-ash/15 outline-none transition-all duration-700 resize-none text-sm font-light leading-relaxed backdrop-blur-[2px] shadow-[inset_0_4px_25px_rgba(0,0,0,0.8)]"
          />
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={() => onNext(selectedLongings, text)}
        className="px-14 py-4 bg-transparent border border-burgundy/30 hover:border-red-800 hover:bg-red-950/[0.03] transition-all duration-700 tracking-[0.2em] uppercase text-xs font-semibold rounded-sm text-ash/90 hover:text-red-200 cursor-pointer"
      >
        Continue
      </motion.button>
    </div>
  );
}
