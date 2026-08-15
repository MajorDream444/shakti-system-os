import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import KaliSigil from '../KaliSigil';
import { PathType, PATH_RESULTS } from '../../types';
import type { BeginIntakeResponseInput, BeginCompleteResponse } from '../../../contracts/beginWriteContract';
import { BEGIN_CONSENT_VERSION } from '../../../contracts/beginWriteContract';
import { SHALA_PATH } from '../../../constants/navigation';
import { STORAGE_KEYS } from '../../../constants/storage';
import { PersistenceService } from '../../../services/PersistenceService';
import { BeginLocalFallbackService } from '../../../services/BeginLocalFallbackService';
import { BeginWriteClient } from '../../../services/BeginWriteClient';

interface Props {
  beginSessionId: string;
  pathway: PathType;
  responses: BeginIntakeResponseInput[];
  onReset: () => void;
  onEnterShala: () => void;
}

type SaveTone = 'idle' | 'saved' | 'local' | 'error';

const SAVE_COPY: Record<SaveTone, string> = {
  idle: '',
  saved: 'Your path has been saved. Shakti Shala remains open for you.',
  local: 'Your path is held locally and has not been shared yet.',
  error: 'We could not save this right now, but you can continue privately.',
};

export default function Handoff({
  beginSessionId,
  pathway,
  responses,
  onReset,
  onEnterShala,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [requestGuidance, setRequestGuidance] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveTone, setSaveTone] = useState<SaveTone>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [requestSaved, setRequestSaved] = useState(false);

  useEffect(() => {
    BeginLocalFallbackService.cleanupExpiredPendingBegin();
  }, []);

  const hasContact = Boolean(email.trim() || whatsapp.trim());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setRequestSaved(false);

    const payload = {
      beginSessionId,
      firstName: name,
      email,
      phone: whatsapp,
      consent: {
        accepted: consentAccepted,
        version: BEGIN_CONSENT_VERSION,
        acceptedAt: consentAccepted ? new Date().toISOString() : undefined,
      } as const,
      responses,
      clientAssignedPathway: pathway,
      sourcePath: '/begin' as const,
      idempotencyKey: `begin:${beginSessionId}:${BEGIN_CONSENT_VERSION}`,
    };

    PersistenceService.write(STORAGE_KEYS.pathFirstName, name);
    PersistenceService.write(STORAGE_KEYS.pathPathway, pathway);
    PersistenceService.write(STORAGE_KEYS.shalaSeekerState, {
      name,
      accessLevel: 'Visitor',
      currentPathway: PATH_RESULTS[pathway].nextStep,
      lastActiveDate: new Date().toLocaleDateString(),
    });

    if (!consentAccepted || !hasContact) {
      BeginLocalFallbackService.retainPendingBegin(payload, pathway);
      setSaveTone('local');
      setSaveMessage(SAVE_COPY.local);
      setIsLoading(false);
      setIsSubmitted(true);
      return;
    }

    let beginResult: BeginCompleteResponse | null = null;

    try {
      beginResult = await BeginWriteClient.completeBegin(payload);

      if (beginResult.status === 'saved') {
        BeginLocalFallbackService.clearSensitivePendingBegin();
        setSaveTone('saved');
        setSaveMessage(SAVE_COPY.saved);
      } else {
        BeginLocalFallbackService.retainPendingBegin(payload, beginResult.assignedPathway);
        setSaveTone(beginResult.status === 'local_only' || beginResult.status === 'write_disabled' ? 'local' : 'error');
        setSaveMessage(
          beginResult.status === 'local_only' || beginResult.status === 'write_disabled'
            ? SAVE_COPY.local
            : SAVE_COPY.error,
        );
      }
    } catch {
      BeginLocalFallbackService.retainPendingBegin(payload, pathway);
      setSaveTone('error');
      setSaveMessage(SAVE_COPY.error);
    }

    if (requestGuidance && beginResult?.status === 'saved' && hasContact) {
      try {
        const signal = await BeginWriteClient.requestSignal({
          beginSessionId,
          firstName: name,
          email,
          phone: whatsapp,
          consent: payload.consent,
          signalType: 'Guide Request',
          message: requestMessage,
          sourcePath: '/begin',
          sourceNode: 'handoff',
          intakeRecordIds: beginResult.intakeRecordIds,
          idempotencyKey: `signal:${beginSessionId}:guide-request`,
        });

        setRequestSaved(signal.status === 'saved');
      } catch {
        setRequestSaved(false);
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
                Receive your next step, or continue privately into Shakti Shala.
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address (optional)"
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

              <label className="flex items-start gap-3 text-left text-xs leading-relaxed text-ash/55">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-1 accent-red-800"
                />
                <span>I consent to share my Begin choices and contact details so the team can remember this doorway with care.</span>
              </label>

              <label className="flex items-start gap-3 text-left text-xs leading-relaxed text-ash/55">
                <input
                  type="checkbox"
                  checked={requestGuidance}
                  onChange={(e) => setRequestGuidance(e.target.checked)}
                  className="mt-1 accent-red-800"
                />
                <span>I would like to request personal guidance.</span>
              </label>

              {requestGuidance && (
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Optional note for the team"
                  className="w-full h-24 bg-stone-950/45 border border-ash/10 hover:border-ash/15 focus:border-red-800 p-4 text-sm text-ash placeholder:text-ash/25 outline-none transition-all duration-700 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.85)] font-light resize-none"
                />
              )}

              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={!name || isLoading}
                  whileHover={{
                    scale: (!name || isLoading) ? 1 : 1.01,
                    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
                  }}
                  className={`w-full py-4.5 bg-stone-900/[0.25] border font-medium tracking-[0.2em] uppercase text-xs transition-all duration-700 rounded-sm cursor-pointer ${
                    (!name || isLoading)
                      ? 'border-ash/5 text-ash/30 cursor-not-allowed bg-transparent'
                      : 'border-red-800/40 hover:border-red-700 text-red-400 shadow-[0_4px_20px_rgba(157,23,29,0.12)]'
                  }`}
                >
                  {isLoading ? 'Holding your path...' : consentAccepted && hasContact ? 'Save My Path' : 'Hold Privately'}
                </motion.button>
              </div>
            </form>

            <motion.button
              onClick={onEnterShala}
              whileHover={{
                scale: 1.02,
                transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
              }}
              className="w-full min-h-12 justify-center flex items-center gap-2 border border-ember/40 bg-ember/10 text-ash hover:text-white hover:border-ember/70 transition-colors px-5 py-3 cursor-pointer rounded-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.18em]">Continue Without Sharing · Enter Shakti Shala</span>
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
              Thank you, <span className="text-red-400 font-medium">{name}</span>. {saveMessage || SAVE_COPY[saveTone]}
            </p>

            <p className="text-sm text-ash/45 font-light italic mb-10">
              {requestGuidance && requestSaved
                ? 'Your request has been shared for human review.'
                : 'Carry this quiet flame with you.'}
            </p>

            <a
              href={SHALA_PATH}
              className="w-full mb-4 block text-center py-4 bg-red-950/20 border border-red-800/50 hover:border-red-700 text-red-400 hover:text-red-300 font-medium tracking-[0.2em] uppercase text-xs transition-all duration-700 rounded-sm shadow-[0_4px_20px_rgba(157,23,29,0.1)]"
            >
              Enter Shakti Shala
            </a>

            <a
              href="https://calendly.com/sheetalkandola/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-4 block text-center py-4 bg-stone-900/[0.2] border border-ash/10 hover:border-red-800/40 text-ash/60 hover:text-red-400 font-medium tracking-[0.2em] uppercase text-xs transition-all duration-700 rounded-sm"
            >
              Book a Discovery Call with Sheetal
            </a>

            <motion.button
              onClick={() => {
                BeginLocalFallbackService.resetLocalJourney();
                onReset();
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
              }}
              className="w-full py-4.5 bg-stone-900/[0.2] border border-ash/10 hover:border-red-800/40 text-ash/60 hover:text-red-400 font-medium tracking-[0.2em] uppercase text-xs transition-all duration-700 rounded-sm cursor-pointer"
            >
              Delete local journey
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
