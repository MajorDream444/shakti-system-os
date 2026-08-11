import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomType, SeekerState } from '../types';
import { ShieldCheck, ArrowLeft, Calendar, MapPin, DollarSign, Award } from 'lucide-react';
import { SANCTUARY_LANDMARKS } from '../data';
import { PrayerLamp } from './PrayerLamp';

interface RetreatRoomProps {
  onNavigate: (room: RoomType) => void;
  seekerState?: SeekerState;
  onToggleLamp?: (roomId: string) => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export const RetreatRoom: React.FC<RetreatRoomProps> = ({
  onNavigate,
  seekerState,
  onToggleLamp,
}) => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 'body', label: 'Body — daily practice held consistently', checked: true },
    { id: 'system', label: 'Nervous system — stabled and steadier', checked: true },
    { id: 'intention', label: 'Intention — named and committed', checked: false },
    { id: 'logistics', label: 'Logistics — travel and rest arrangements finalized', checked: false },
  ]);

  const [bookingActive, setBookingActive] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1 = Info/Form, 2 = Completed
  const [formData, setBookingData] = useState({ name: '', diet: 'organic_veg', experience: 'intermediate' });

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const doneCount = items.filter((item) => item.checked).length;
  const progressPercent = (doneCount / items.length) * 100;
  const isReadyForBooking = progressPercent >= 50;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep(2);
  };

  return (
    <motion.div
      id="retreat-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative w-full min-h-screen text-[#F6EFE7] p-6 md:p-12 flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Immersive Pilgrim's Hall Background Underlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          src={SANCTUARY_LANDMARKS.RETREAT}
          alt="Pilgrim's Hall"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, warm clay-terracotta gradient mask */}
        <div className="absolute inset-0 bg-radial-gradient(130% 70% at 50% 100%, rgba(23, 16, 15, 0.85) 0%, rgba(11, 8, 8, 0.96) 60%, #050505 100%)" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Background Soft Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none filter blur-3xl opacity-40 bg-gradient-to-tr from-[#E27A3F]/5 to-transparent z-0" />

      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10">
        <button
          id="retreat-back-sanctuary"
          onClick={() => onNavigate('COURTYARD')}
          className="flex items-center gap-2 font-sans font-semibold text-xs tracking-[0.16em] text-transform: uppercase text-[#D8C5B0] hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Sanctuary
        </button>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#E27A3F]" />
          <span className="font-sans font-semibold text-xs tracking-[0.24em] text-transform: uppercase text-[#E27A3F]">
            RETREAT THRESHOLD
          </span>
        </div>
      </div>

      {/* Main Focus: October retreat container */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8 z-10 flex flex-col gap-8">
        <div>
          <span className="font-sans font-semibold text-[10px] tracking-[0.28em] text-transform: uppercase text-[#B27A52]">
            THE THRESHOLD · HIMALAYA
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F6EFE7] mt-3">
            Retreat Readiness
          </h2>
          <p className="font-serif italic text-lg text-[#C8B7A5] mt-2">
            Himalaya · October. You are gathering. Let us prepare the container.
          </p>
        </div>

        {/* Progress Vessel & Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
          <div className="flex flex-col items-center justify-center gap-4 py-6 border border-[#D8C5B0]/10 rounded-2xl bg-white/[0.01]">
            <div className="relative w-16 h-24 border border-[#D8C5B0]/20 rounded-b-[32px] rounded-t-none overflow-hidden">
              <div
                style={{ height: `${progressPercent}%` }}
                className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#C35A2E] to-[#E27A3F] transition-all duration-700"
              />
            </div>
            <div className="font-sans text-[11px] text-[#8a7c6d] uppercase tracking-[0.18em]">
              Readiness Vessel — {Math.round(progressPercent)}%
            </div>
          </div>

          <div className="border border-[#E27A3F]/20 rounded-2xl bg-[#4A1F24]/10 p-6 flex flex-col justify-center items-center text-center">
            <h4 className="font-serif text-lg text-[#F6EFE7]">October Pilgrimage</h4>
            <p className="font-sans text-[11px] text-[#8a7c6d] mt-1">
              {isReadyForBooking
                ? 'Your container is stable. You can now request passage.'
                : 'Complete at least 50% of the milestones to unlock booking.'}
            </p>
            <button
              onClick={() => setBookingActive(true)}
              disabled={!isReadyForBooking}
              className={`mt-4 px-6 py-2 rounded-full font-sans font-semibold text-[11px] tracking-widest uppercase transition-all duration-300 ${
                isReadyForBooking
                  ? 'bg-[#E27A3F] hover:bg-[#C35A2E] text-white shadow-[0_0_15px_rgba(226,122,63,0.3)] hover:scale-105 cursor-pointer'
                  : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
              }`}
            >
              Secure My Passage
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              id={`retreat-item-${item.id}`}
              onClick={() => handleToggle(item.id)}
              className="w-full flex items-center gap-4 p-4.5 rounded-xl border border-[#D8C5B0]/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all text-left cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  item.checked
                    ? 'bg-[#E27A3F] border-[#E27A3F] shadow-[0_0_10px_#E27A3F]'
                    : 'border-[#6b5f52] bg-transparent'
                }`}
              >
                {item.checked && <span className="text-[#090707] text-[10px] font-bold">✓</span>}
              </div>
              <span className={`font-serif text-lg ${item.checked ? 'text-[#F6EFE7]' : 'text-[#C8B7A5]'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* RITUAL RETREAT BOOKING OVERLAY (HIGH-TICKET MONETIZATION CONVERSION) */}
      <AnimatePresence>
        {bookingActive && (
          <div className="fixed inset-0 bg-[#090707]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl w-full bg-[#120E0F] border border-[#D8C5B0]/15 rounded-3xl p-6 md:p-8 relative"
            >
              {/* Close button */}
              <button
                onClick={() => { setBookingActive(false); setBookingStep(1); }}
                className="absolute top-6 right-6 text-[#8a7c6d] hover:text-[#F6EFE7] font-sans text-xs tracking-widest uppercase cursor-pointer"
              >
                Close
              </button>

              {bookingStep === 1 ? (
                <form onSubmit={handleConfirmBooking} className="flex flex-col gap-5">
                  <div className="text-center">
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#E27A3F]">High-Ticket Pilgrimage</span>
                    <h3 className="font-serif text-3xl text-[#F6EFE7] mt-1.5">Request Sacred Passage</h3>
                    <p className="font-serif italic text-sm text-[#8a7c6d] mt-1">
                      Himalayan Sanctuary container — October 14 to 28, 2026.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center py-4 border-y border-white/5 my-2">
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.01]">
                      <Calendar className="w-5 h-5 text-[#E27A3F]" />
                      <span className="font-sans text-[10px] text-[#8a7c6d] uppercase">Timeline</span>
                      <span className="font-serif text-sm text-[#F6EFE7]">Oct 14 - 28</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.01]">
                      <MapPin className="w-5 h-5 text-[#E27A3F]" />
                      <span className="font-sans text-[10px] text-[#8a7c6d] uppercase">Location</span>
                      <span className="font-serif text-sm text-[#F6EFE7]">Kedar Valley</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.01]">
                      <DollarSign className="w-5 h-5 text-[#E27A3F]" />
                      <span className="font-sans text-[10px] text-[#8a7c6d] uppercase">Milestone Offering</span>
                      <span className="font-serif text-sm text-[#F6EFE7]">$2,500 deposit</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] tracking-wide uppercase text-[#8a7c6d]">Name in Practice</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setBookingData({...formData, name: e.target.value})}
                        placeholder="e.g. Seeker Ishan"
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-[#E27A3F] rounded-xl px-4 py-3 font-serif text-lg text-[#F6EFE7] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[11px] tracking-wide uppercase text-[#8a7c6d]">Nourishment Preference</label>
                        <select
                          value={formData.diet}
                          onChange={(e) => setBookingData({...formData, diet: e.target.value})}
                          className="w-full bg-[#120E0F] border border-white/10 focus:border-[#E27A3F] rounded-xl px-4 py-3 font-serif text-md text-[#F6EFE7] outline-none"
                        >
                          <option value="organic_veg">Organic Ayurvedic Vegetarian</option>
                          <option value="satvic">Pure Satvic (No Alliums)</option>
                          <option value="simple">Minimalist Broths &amp; Grains</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[11px] tracking-wide uppercase text-[#8a7c6d]">Prior Stillness Experience</label>
                        <select
                          value={formData.experience}
                          onChange={(e) => setBookingData({...formData, experience: e.target.value})}
                          className="w-full bg-[#120E0F] border border-white/10 focus:border-[#E27A3F] rounded-xl px-4 py-3 font-serif text-md text-[#F6EFE7] outline-none"
                        >
                          <option value="beginner">Entering first Year of Stillness</option>
                          <option value="intermediate">1-3 Years committed practice</option>
                          <option value="advanced">3+ Years lineage / silent retreats</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#C35A2E] to-[#E27A3F] text-white font-sans font-semibold text-xs tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(226,122,63,0.3)] transition-all hover:scale-[1.02]"
                    >
                      Complete Your Offering ($2,500)
                    </button>
                    <span className="text-center font-sans text-[9px] text-[#6b5f52] uppercase tracking-wider block">
                      Stewardship offering reserve, managed securely via Stripe
                    </span>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center gap-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#E27A3F]/20 filter blur-xl scale-125" />
                    <Award className="w-16 h-16 text-[#E27A3F] relative z-10 animate-bounce" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#F6EFE7] mt-4">Passage Requested</h3>
                  <p className="font-sans text-xs text-[#8a7c6d] max-w-sm">
                    Namaste, <strong className="text-[#F6EFE7]">{formData.name}</strong>. Your physical retreat container deposit has been logged into the temple ledger.
                  </p>
                  <div className="border border-white/5 rounded-2xl p-4 bg-white/[0.01] max-w-sm w-full text-left mt-2">
                    <span className="font-sans text-[9px] tracking-widest text-[#E27A3F] block uppercase mb-1">Next Step</span>
                    <span className="font-sans text-xs text-[#C8B7A5]">
                      A master guide will summon you for a direct dialogue to align your body-mind readiness before confirming the Himalayan gate pass.
                    </span>
                  </div>
                  <button
                    onClick={() => { setBookingActive(false); setBookingStep(1); }}
                    className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-sans font-semibold text-[10px] tracking-widest uppercase rounded-full transition-all"
                  >
                    Return to Shala
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Prayer Lamp Widget */}
      <div className="absolute right-6 bottom-6 z-20 md:right-12 md:bottom-12">
        {onToggleLamp && (
          <PrayerLamp
            roomId="RETREAT"
            isLit={seekerState?.litLamps?.includes('RETREAT') || false}
            onToggle={onToggleLamp}
          />
        )}
      </div>

      {/* Footer message */}
      <div className="w-full text-center z-10 mt-auto pt-4 border-t border-[#D8C5B0]/5">
        <span className="font-sans font-semibold text-[9px] tracking-[0.18em] text-transform: uppercase text-[#6b5f52]">
          we gather as initiates · we walk as seekers
        </span>
      </div>
    </motion.div>
  );
};

export default RetreatRoom;
