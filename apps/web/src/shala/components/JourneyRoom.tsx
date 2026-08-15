import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mountain, ArrowLeft, ShieldCheck } from 'lucide-react';
import { RoomType, SeekerState } from '../types';
import { SANCTUARY_LANDMARKS } from '../data';
import { PrayerLamp } from './PrayerLamp';

interface JourneyRoomProps {
  onNavigate: (room: RoomType) => void;
  seekerState: SeekerState;
  onToggleLamp?: (roomId: string) => void;
}

const PATHWAY_STATES = [
  { state: 'Open', desc: 'available now' },
  { state: 'Available to Request', desc: 'shared with a human when you ask' },
  { state: 'Requires Preparation', desc: 'entered after steadier practice' },
  { state: 'By Invitation', desc: 'held through human discernment' },
];

export const JourneyRoom: React.FC<JourneyRoomProps> = ({
  onNavigate,
  seekerState,
  onToggleLamp,
}) => {
  const [isAscending, setIsAscending] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAscend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsAscending(false);
      }, 2500);
    }, 2000);
  };

  return (
    <motion.div
      id="journey-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative w-full min-h-screen text-[#F6EFE7] p-6 md:p-12 flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Immersive Moon Observatory Background Underlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          src={SANCTUARY_LANDMARKS.MOON_OBSERVATORY}
          alt="Moon Observatory"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, cool nocturnal indigo-gold mask */}
        <div className="absolute inset-0 bg-radial-gradient(130% 70% at 50% -6%, rgba(33, 28, 22, 0.8) 0%, rgba(13, 10, 8, 0.96) 55%, #050403 100%)" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-transparent to-transparent" />
      </div>

      {/* Background soft lighting */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[340px] rounded-full pointer-events-none filter blur-3xl opacity-50 bg-gradient-to-tr from-[#cdbfa8]/5 to-transparent z-0" />

      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10">
        <button
          id="journey-back-sanctuary"
          onClick={() => onNavigate('COURTYARD')}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase text-[#D8C5B0] hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Sanctuary
        </button>
        <div className="flex items-center gap-2">
          <Mountain className="w-4 h-4 text-[#cdbfa8]" />
          <span className="font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#cdbfa8]">
            PERSONAL JOURNEY
          </span>
        </div>
      </div>

      {/* Main Stats Area */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8 z-10 flex flex-col gap-10">
        <div>
          <span className="font-sans font-semibold text-[10px] tracking-[0.28em] text-transform: uppercase text-[#8a7f6b]">
            THE MOUNTAIN PATH · DEPTH 03
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F6EFE7] mt-3">
            Your Long Ascent
          </h2>
          <p className="font-serif italic text-lg text-[#C8B7A5] mt-2">
            Witnessing your devotion, one breath, one day, one season at a time.
          </p>
        </div>

        {/* Continuous Sanctuary Environmental Memories - Rather than dry metrics */}
        <div className="flex flex-col gap-6">
          <div className="border border-[#D8C5B0]/10 rounded-2xl p-6 bg-white/[0.005]">
            <span className="font-sans font-bold text-[9px] tracking-[0.24em] text-transform: uppercase text-[#E27A3F] block mb-4">
              Sanctuary Continuity &amp; Witnessed Growth
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-3">
                <span className="text-xl">🌲</span>
                <div>
                  <h4 className="font-serif text-[#F6EFE7] text-md">The Sacred Cedar Tree</h4>
                  <p className="font-sans text-xs text-[#8a7c6d] mt-1 leading-relaxed">
                    Planted at your initial arrival. Grown to a sturdy <strong className="text-[#D8C5B0]">{(seekerState.hoursInStillness * 0.05 + 1).toFixed(1)} meters</strong> sapling, breathing the fresh morning mist of the north mountain ridge.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">🪨</span>
                <div>
                  <h4 className="font-serif text-[#F6EFE7] text-md">The Stone Prayer Wall</h4>
                  <p className="font-sans text-xs text-[#8a7c6d] mt-1 leading-relaxed">
                    <strong className="text-[#D8C5B0]">{Math.floor(seekerState.hoursInStillness * 0.15 + 3)} intentions</strong> are now lovingly hand-carved upon the high slate of the monastery wall to be kissed by high winds.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">🏮</span>
                <div>
                  <h4 className="font-serif text-[#F6EFE7] text-md">The Western Lantern</h4>
                  <p className="font-sans text-xs text-[#8a7c6d] mt-1 leading-relaxed">
                    Your quiet dedication has kept the flame burning faithfully for <strong className="text-[#D8C5B0]">{Math.floor(seekerState.hoursInStillness / 40) + 1} full lunar cycles</strong> without failing once.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">🌸</span>
                <div>
                  <h4 className="font-serif text-[#F6EFE7] text-md">The Reflection Pool</h4>
                  <p className="font-sans text-xs text-[#8a7c6d] mt-1 leading-relaxed">
                    Holds <strong className="text-[#D8C5B0]">{seekerState.journalEntries.length} deep reflections</strong>. {seekerState.journalEntries.length >= 2 ? (
                      <span className="text-[#E27A3F] italic">A pale pink lotus flower has fully blossomed on the quiet water surface.</span>
                    ) : (
                      <span className="text-[#D8C5B0] italic">A delicate lotus bud rests near the shore, waiting for the next sunset.</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 text-center border border-[#E27A3F]/20 rounded-2xl bg-[#4A1F24]/10 flex flex-col justify-center items-center relative group overflow-hidden">
            <div className="font-serif text-xl text-[#F6EFE7] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E27A3F] animate-ping" />
              Current Pathway State
            </div>
            <div className="font-serif italic text-2xl text-[#E27A3F] mt-1.5">
              {seekerState.currentPathway}
            </div>
            <div className="font-sans text-[10px] text-[#8a7c6d] mt-1 tracking-wider uppercase">
              Open sanctuary continuity in this release
            </div>
            <button
              id="journey-ascend-initiation"
              onClick={() => setIsAscending(true)}
              className="mt-4 px-5 py-2 bg-[#E27A3F] hover:bg-[#C35A2E] text-white font-sans font-semibold text-[10px] tracking-widest text-transform: uppercase rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(226,122,63,0.3)] hover:scale-105 cursor-pointer animate-[pulse_4s_infinite]"
            >
              Request Human Guidance
            </button>
          </div>
        </div>

        {/* Access state progression */}
        <div className="border-t border-[#D8C5B0]/10 pt-6">
          <div className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-[#6b5f52] mb-4">
            Doorway States
          </div>
          <div className="flex flex-wrap gap-2">
            {PATHWAY_STATES.map((stage) => {
              const active = stage.state === 'Open';
              return (
                <div
                  key={stage.state}
                  className={`px-4 py-3 rounded-xl border flex flex-col gap-0.5 min-w-[120px] transition-all ${
                    active
                      ? 'border-[#E27A3F] bg-[#4A1F24]/20 text-[#F6EFE7] shadow-[0_0_15px_rgba(226,122,63,0.15)]'
                      : 'border-white/5 bg-white/[0.005] text-[#8a7c6d] opacity-50'
                  }`}
                >
                  <span className="font-serif text-md">{stage.state}</span>
                  <span className="font-sans text-[9px] tracking-wide uppercase opacity-80">{stage.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Pathway Node */}
        <div className="relative pl-6">
          <div className="absolute left-[5px] top-6 bottom-6 w-1px bg-gradient-to-b from-[#E27A3F] to-transparent" />

          <div className="relative mb-6">
            <div className="absolute left-[-26px] top-1 w-3 h-3 rounded-full bg-[#E27A3F] shadow-[0_0_12px_rgba(226,122,63,0.7)]" />
            <h3 className="font-serif text-2xl text-[#F6EFE7]">
              Now walking · {seekerState.currentPathway}
            </h3>
            <div className="font-sans text-xs text-[#8a7c6d] mt-1">
              Day {seekerState.pathwayDay} of {seekerState.pathwayTotalDays}
            </div>
            {/* Progress line */}
            <div className="flex items-center gap-4 mt-3 max-w-sm">
              <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(seekerState.pathwayDay / seekerState.pathwayTotalDays) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#C35A2E] to-[#E27A3F]"
                />
              </div>
            </div>
          </div>

          <div className="relative mb-6 opacity-60">
            <div className="absolute left-[-24px] top-1 w-2.5 h-2.5 rounded-full bg-[#8a7c6d]" />
            <h3 className="font-serif text-xl text-[#D8C5B0]">Began {seekerState.currentPathway}</h3>
            <div className="font-sans text-xs text-[#8a7c6d] mt-1">28 June</div>
          </div>

          <div className="relative opacity-40">
            <div className="absolute left-[-24px] top-1 w-2.5 h-2.5 rounded-full bg-[#8a7c6d]" />
            <h3 className="font-serif text-xl text-[#D8C5B0]">Entered the Vault</h3>
            <div className="font-sans text-xs text-[#8a7c6d] mt-1">Spring Equinox</div>
          </div>
        </div>
      </div>

      {/* Human-guidance request modal. No payment, initiation, or access grant is created here. */}
      <AnimatePresence>
        {isAscending && (
          <div className="fixed inset-0 bg-[#090707]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="max-w-3xl w-full bg-[#120E0F] border border-[#D8C5B0]/15 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => { if (!isProcessing) setIsAscending(false); }}
                className="absolute top-6 right-6 text-[#8a7c6d] hover:text-[#F6EFE7] font-sans text-xs tracking-widest uppercase cursor-pointer"
              >
                Close
              </button>

              <div className="text-center">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#E27A3F]">Human Review</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#F6EFE7] mt-2">Request a Protected Doorway</h3>
                <p className="font-serif italic text-sm text-[#8a7c6d] mt-1">
                  A human guide stewards protected containers, invitations, and retreat discernment.
                </p>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    className="relative"
                  >
                    <div className="absolute inset-0 rounded-full bg-[#E27A3F]/30 filter blur-xl scale-125" />
                    <ShieldCheck className="w-16 h-16 text-[#E27A3F] relative z-10" />
                  </motion.div>
                  <h4 className="font-serif text-2xl text-[#F6EFE7] mt-4">Request Noted Locally</h4>
                  <p className="font-sans text-xs text-[#8a7c6d] max-w-sm">
                    This visual prototype does not grant access or begin a formal review. Use the Begin pathway to share a request.
                  </p>
                </motion.div>
              ) : isProcessing ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-t-[#E27A3F] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <h4 className="font-serif text-xl text-[#F6EFE7]">Holding Request...</h4>
                  <p className="font-sans text-xs text-[#8a7c6d]">No credential or access grant is created from this room.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 mt-2">
                  <div className="flex flex-col gap-2">
                    {PATHWAY_STATES.map((stage) => (
                      <div
                        key={stage.state}
                        className="p-3 rounded-2xl border border-white/5 bg-white/[0.005] text-left"
                      >
                        <span className="font-serif text-lg text-[#F6EFE7]">{stage.state}</span>
                        <span className="font-sans text-[10px] tracking-wide uppercase text-[#8a7c6d] block mt-1">
                          {stage.desc}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border border-[#D8C5B0]/10 rounded-3xl p-5 bg-white/[0.005] flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-2xl text-[#F6EFE7]">Ask for a Guide</h4>
                      <p className="font-sans text-xs text-[#8a7c6d] mt-2 leading-relaxed">
                        This room can remember your orientation locally, but it cannot approve a doorway or create access. For this release, requests that need a person are made through the Begin pathway.
                      </p>

                      <div className="mt-5 border-t border-white/5 pt-4">
                        <span className="font-sans text-[9px] tracking-widest uppercase text-[#6b5f52] block mb-2">What stays protected</span>
                        <ul className="flex flex-col gap-1.5">
                          {['No access is granted here', 'No retreat readiness is decided here', 'No initiation is automated'].map((item) => (
                            <li key={item} className="font-sans text-[11px] text-[#C8B7A5] flex items-start gap-2">
                              <span className="text-[#E27A3F] mt-0.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-3">
                      <button
                        onClick={handleAscend}
                        className="w-full py-3 bg-gradient-to-r from-[#C35A2E] to-[#E27A3F] text-white font-sans font-semibold text-xs tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(226,122,63,0.3)] transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        Hold This Request Locally
                      </button>
                      <span className="text-center font-sans text-[9px] text-[#6b5f52] uppercase tracking-wider block">
                        Human discernment remains human
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Prayer Lamp Widget */}
      <div className="absolute right-6 bottom-6 z-20 md:right-12 md:bottom-12">
        {onToggleLamp && (
          <PrayerLamp
            roomId="JOURNEY"
            isLit={seekerState?.litLamps?.includes('JOURNEY') || false}
            onToggle={onToggleLamp}
          />
        )}
      </div>

      {/* Footer message */}
      <div className="w-full text-center z-10 mt-auto pt-4 border-t border-[#D8C5B0]/5">
        <span className="font-sans font-semibold text-[9px] tracking-[0.18em] text-transform: uppercase text-[#6b5f52]">
          the descent is an honor · the ascent is yours
        </span>
      </div>
    </motion.div>
  );
};

export default JourneyRoom;
