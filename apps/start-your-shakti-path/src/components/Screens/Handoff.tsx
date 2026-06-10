import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import KaliSigil from '../KaliSigil';
import { PathType, PATH_RESULTS } from '../../types';

// Paste your deployed Google Apps Script Web App URL here after deployment
const GOOGLE_SHEET_ENDPOINT = (import.meta as { env?: Record<string, string> }).env?.VITE_SHEET_ENDPOINT || '';

interface Props {
  pathway: PathType;
  longings: string[];
  reflection: string;
  onReset: () => void;
}

export default function Handoff({ pathway, longings, reflection, onReset }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsLoading(true);

    const params = new URLSearchParams(window.location.search);
    const payload = {
      type: 'site_handoff',
      name,
      email,
      whatsapp,
      pathwayKey: pathway,
      recommendedPathway: PATH_RESULTS[pathway].nextStep,
      longings,
      reflection,
      source: 'Start Your Shakti Path',
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    };

    localStorage.setItem('shakti_path_first_name', name);
    localStorage.setItem('shakti_path_email', email);
    localStorage.setItem('shakti_path_whatsapp', whatsapp);
    localStorage.setItem('shakti_path_pathway', pathway);
    localStorage.setItem('shakti_path_longings', longings.join(', '));
    localStorage.setItem('shakti_path_reflection', reflection);

    if (GOOGLE_SHEET_ENDPOINT) {
      try {
        await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Submission still shows success — data is in localStorage as backup
      }
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center max-w-lg w-full px-4 text-center">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.0 }}
            className="w-full flex flex-col items-center"
          >
            <div className="mb-12">
              <KaliSigil className="w-8 h-8 mx-auto mb-8 animate-pulse" glow={true} />

              <h2 className="text-2xl md:text-3xl font-light mb-4 serif text-stone-100 italic">
                Would you like this doorway sent to you?
              </h2>
              <p className="text-base text-ash/60 font-light max-w-sm mx-auto leading-relaxed">
                Receive your next step and continue into the Shakti path at your own pace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4 mb-10 max-w-md">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name"
                  className="w-full bg-stone-950/45 border border-ash/10 hover:border-ash/15 focus:border-red-800 p-4.5 text-sm text-ash placeholder:text-ash/25 outline-none transition-all duration-700 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.85)] font-light"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-stone-950/45 border border-ash/10 hover:border-ash/15 focus:border-red-800 p-4.5 text-sm text-ash placeholder:text-ash/25 outline-none transition-all duration-700 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.85)] font-light"
                />
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp (Optional)"
                  className="w-full bg-stone-950/45 border border-ash/10 hover:border-ash/15 focus:border-red-800 p-4.5 text-sm text-ash placeholder:text-ash/25 outline-none transition-all duration-700 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.85)] font-light"
                />
              </div>

              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={!name || !email || isLoading}
                  whileHover={{
                    scale: (!name || !email || isLoading) ? 1 : 1.01,
                    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
                  }}
                  className={`w-full py-4.5 bg-stone-900/[0.25] border font-medium tracking-[0.2em] uppercase text-xs transition-all duration-700 rounded-sm cursor-pointer ${
                    (!name || !email || isLoading)
                      ? 'border-ash/5 text-ash/30 cursor-not-allowed bg-transparent'
                      : 'border-red-800/40 hover:border-red-700 text-red-400 shadow-[0_4px_20px_rgba(157,23,29,0.12)]'
                  }`}
                >
                  {isLoading ? 'Holding your path...' : 'Send My Path'}
                </motion.button>
              </div>
            </form>

            <motion.button
              onClick={onReset}
              whileHover={{
                scale: 1.02,
                transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
              }}
              className="flex items-center gap-1.5 text-ash/35 hover:text-red-400 transition-colors py-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-[0.25em]">Continue Without Sharing</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center max-w-md py-6"
          >
            <div className="relative mb-8 w-12 h-12 flex items-center justify-center rounded-full bg-red-950/20 border border-red-800/50">
              <div className="absolute inset-0 bg-red-800/5 rounded-full blur-md" />
              <KaliSigil className="w-6 h-6" glow={true} />
            </div>

            <h2 className="text-3xl md:text-4xl font-light mb-6 serif text-stone-100 italic">
              Your path is held.
            </h2>

            <p className="text-base text-ash/70 font-light leading-relaxed mb-6">
              Thank you, <span className="text-red-400 font-medium">{name}</span>. We have recorded your alignment and will gently transmit these focus areas to <span className="text-stone-200 font-normal">{email}</span>.
            </p>

            <p className="text-sm text-ash/45 font-light italic mb-10">
              Carry this quiet flame with you. We will speak again soon.
            </p>

            <a
              href="https://calendly.com/sheetalkandola/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-4 block text-center py-4 bg-red-950/20 border border-red-800/50 hover:border-red-700 text-red-400 hover:text-red-300 font-medium tracking-[0.2em] uppercase text-xs transition-all duration-700 rounded-sm shadow-[0_4px_20px_rgba(157,23,29,0.1)]"
            >
              Book a Discovery Call with Sheetal
            </a>

            <motion.button
              onClick={onReset}
              whileHover={{
                scale: 1.01,
                transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
              }}
              className="w-full py-4.5 bg-stone-900/[0.2] border border-ash/10 hover:border-red-800/40 text-ash/60 hover:text-red-400 font-medium tracking-[0.2em] uppercase text-xs transition-all duration-700 rounded-sm cursor-pointer"
            >
              Begin over
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-20 text-[9px] text-ash/20 uppercase tracking-[0.25em] serif italic">
        somatic integration & classical tantra
      </p>
    </div>
  );
}
