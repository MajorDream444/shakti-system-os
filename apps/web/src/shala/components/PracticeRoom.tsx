import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Practice } from '../types';
import { Play, Pause, RotateCcw, X } from 'lucide-react';

interface PracticeRoomProps {
  practice: Practice;
  onClose: () => void;
  onComplete: (practiceId: string) => void;
}

export const PracticeRoom: React.FC<PracticeRoomProps> = ({
  practice,
  onClose,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [inhaleState, setInhaleState] = useState<'Inhale' | 'Exhale' | 'Hold'>('Inhale');
  const [, setBreatheCount] = useState<number>(0);

  const durationSeconds = 12 * 60; // default to 12 minutes in seconds or adapt from duration string
  const durationMatch = practice.duration.match(/\d+/);
  const totalSeconds = durationMatch ? parseInt(durationMatch[0]) * 60 : durationSeconds;

  // Sound/Vibe player effect simulation
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => {
          if (prev >= totalSeconds) {
            clearInterval(timer!);
            onComplete(practice.id);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, totalSeconds, practice.id, onComplete]);

  // Breathing loop (9-second cycle: 4s inhale, 1s hold, 4s exhale)
  useEffect(() => {
    let breatheTimer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      breatheTimer = setInterval(() => {
        setBreatheCount((prev) => {
          const next = (prev + 1) % 9;
          if (next < 4) {
            setInhaleState('Inhale');
          } else if (next === 4) {
            setInhaleState('Hold');
          } else {
            setInhaleState('Exhale');
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (breatheTimer) clearInterval(breatheTimer);
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (secondsElapsed / totalSeconds) * 100;

  return (
    <motion.div
      id="practice-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 bg-[#070505] text-[#F6EFE7] z-40 flex flex-col justify-between p-6 md:p-12 select-none"
    >
      {/* Dynamic breathing back-glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#E27A3F]/5 to-transparent filter blur-3xl pointer-events-none" />

      {/* Top Header - extremely minimal */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="font-sans font-semibold text-[10px] tracking-[0.24em] text-transform: uppercase text-[#6b5f52]">
          DEPTH 04 · PRACTICE
        </span>
        <button
          id="exit-practice-btn"
          onClick={onClose}
          className="p-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition-colors text-white"
          title="Exit Practice Room"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Center Breathing Space */}
      <div className="max-w-md mx-auto w-full text-center my-auto flex flex-col items-center justify-center z-10">
        <span className="font-sans font-semibold text-xs tracking-[0.2em] text-transform: uppercase text-[#B27A52] opacity-80">
          {practice.category}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#F6EFE7] mt-3">
          {practice.title}
        </h2>

        {/* Breathing Orb */}
        <div className="relative w-72 h-72 my-10 flex items-center justify-center">
          {/* Breathing Aura */}
          <motion.div
            animate={{
              scale: inhaleState === 'Inhale' ? 1.15 : inhaleState === 'Hold' ? 1.15 : 0.9,
              opacity: inhaleState === 'Inhale' ? 0.7 : inhaleState === 'Hold' ? 0.8 : 0.4,
            }}
            transition={{ duration: inhaleState === 'Hold' ? 1 : 4, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E27A3F]/30 to-[#C35A2E]/10 filter blur-xl"
          />

          {/* Core Orb */}
          <motion.div
            animate={{
              scale: inhaleState === 'Inhale' ? 1.1 : inhaleState === 'Hold' ? 1.1 : 0.95,
            }}
            transition={{ duration: inhaleState === 'Hold' ? 1 : 4, ease: 'easeInOut' }}
            className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#6f3319] via-[#C35A2E] to-[#F0A06A] shadow-[0_0_40px_rgba(226,122,63,0.5)] flex flex-col items-center justify-center"
          >
            <span className="font-serif italic text-lg text-white/90 capitalize">{inhaleState}</span>
          </motion.div>
        </div>

        {/* Progress Bar & Timer */}
        <div className="w-full max-w-xs flex flex-col gap-2">
          <div className="flex justify-between text-xs font-mono text-[#6b5f52]">
            <span>{formatTime(secondsElapsed)}</span>
            <span>{formatTime(totalSeconds)}</span>
          </div>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-[#C35A2E] to-[#E27A3F] transition-all duration-300"
            />
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-6 mt-8">
          <button
            id="reset-practice-timer"
            onClick={() => setSecondsElapsed(0)}
            className="p-2 rounded-full border border-white/5 bg-white/[0.02] text-[#8a7c6d] hover:text-[#F6EFE7] hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            id="play-pause-practice-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#C35A2E] to-[#E27A3F] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-[0_0_20px_rgba(226,122,63,0.4)]"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
          </button>
        </div>
      </div>

      {/* Footer Instructions - extremely understated */}
      <div className="w-full text-center z-10 mt-auto">
        <span className="font-serif italic text-sm text-[#5c5145] tracking-wide">
          close your eyes · follow the breath
        </span>
      </div>
    </motion.div>
  );
};
