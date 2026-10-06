import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { PathType, PATH_RESULTS } from '../../types';
import type { BeginIntakeResponseInput, BeginCompleteResponse } from '../../../contracts/beginWriteContract';
import { BEGIN_CONSENT_VERSION } from '../../../contracts/beginWriteContract';
import { SHALA_PATH } from '../../../constants/navigation';
import { STORAGE_KEYS } from '../../../constants/storage';
import { PersistenceService } from '../../../services/PersistenceService';
import { BeginLocalFallbackService } from '../../../services/BeginLocalFallbackService';
import { BeginWriteClient } from '../../../services/BeginWriteClient';
import { trackAnonymousEventOnce } from '../../../services/AnonymousAnalytics';
import {
  waterfallConfirmationBody,
  waterfallConfirmationTitle,
  waterfallEmailPrompt,
  waterfallSupportLine,
} from '../../../data/waterfallCopy';

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
  saved: 'Your path has been saved. Sri Shakti Shala remains open for you.',
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
  const [requestFailed, setRequestFailed] = useState(false);
  /* The server's verdict on whether Resend actually accepted the welcome.
     Undefined until a response arrives, and treated as "do not promise". */
  const [waterfallSent, setWaterfallSent] = useState<boolean | undefined>(undefined);
  /* Distinguishes "Resend refused" from "nothing was attempted". The screen
     may only say Sheetal was alerted in the first case. */
  const [waterfallStatus, setWaterfallStatus] =
    useState<'sent' | 'failed' | 'skipped' | 'private' | undefined>(undefined);

  useEffect(() => {
    BeginLocalFallbackService.cleanupExpiredPendingBegin();
  }, []);

  const hasContact = Boolean(email.trim() || whatsapp.trim());
  const isCommunityIntent = new URLSearchParams(window.location.search).get('intent') === 'community';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isCommunityIntent) {
      trackAnonymousEventOnce('community_interest_submitted', beginSessionId);
    }

    setIsLoading(true);
    setRequestSaved(false);
    setRequestFailed(false);

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
        setWaterfallSent(beginResult.waterfallDelivered === true);
        setWaterfallStatus(beginResult.waterfallDeliveryStatus);
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

    if ((requestGuidance || isCommunityIntent) && beginResult?.status === 'saved' && hasContact) {
      const signalRequests = [
        ...(isCommunityIntent
          ? [{
              signalType: 'Support Request' as const,
              message: 'Dancing with Durga community interest submitted through Request details.',
              sourcePath: '/dancing-with-durga' as const,
              sourceNode: 'request-details' as const,
              idempotencyKey: `signal:${beginSessionId}:dwd-community`,
            }]
          : []),
        ...(requestGuidance
          ? [{
              signalType: 'Guide Request' as const,
              message: requestMessage,
              sourcePath: '/begin' as const,
              sourceNode: 'handoff' as const,
              idempotencyKey: `signal:${beginSessionId}:guide-request`,
            }]
          : []),
      ];

      const results = await Promise.allSettled(
        signalRequests.map((request) =>
          BeginWriteClient.requestSignal({
            beginSessionId,
            firstName: name,
            email,
            phone: whatsapp,
            consent: payload.consent,
            ...request,
            intakeRecordIds: beginResult?.intakeRecordIds,
          }),
        ),
      );
      const allSaved = results.every(
        (result) => result.status === 'fulfilled' && result.value.status === 'saved',
      );
      setRequestSaved(allSaved);
      setRequestFailed(!allSaved);
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  /* Whether to promise the practice.

     This is now the SERVER'S answer, not a guess. The handler sends through
     Resend before responding and reports whether Resend accepted the message,
     so the screen promises an inbox only when something is genuinely on its
     way. A saved record with a failed send reports false, and the woman is
     told the truth while Sheetal gets an alert to send it by hand.

     Undefined means an older server or no verdict — treated as "do not
     promise", because silence must never read as success. */
  const waterfallWillSend =
    saveTone === 'saved' && Boolean(email.trim()) && waterfallSent === true;

  /* She gave an address and we saved her, but the practice did not go out.
     Distinct from Hold Privately: something IS owed, and saying nothing would
     leave her waiting for an email that is not coming.

     Split into two, because only one of them has actually alerted Sheetal.
     Saying she has been told when she has not is the kind of small false
     reassurance that leaves a woman waiting for an email nobody knows to send. */
  const waterfallOwed =
    saveTone === 'saved' && Boolean(email.trim()) && waterfallSent === false;
  const sheetalWasAlerted = waterfallStatus === 'failed';

  return (
    <div className="begin-screen begin-enter-screen flex flex-col items-start max-w-2xl w-full px-0 text-left">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.0 }}
            className="w-full flex flex-col items-start"
          >
            <div className="mb-10">


              <p className="begin-kicker mb-4">Enter</p>
              <h2 className="begin-heading text-3xl md:text-5xl font-light mb-4 serif text-stone-100 italic">
                Would you like this doorway sent to you?
              </h2>
              <p className="begin-body text-base text-ash/[0.85] font-normal max-w-lg leading-relaxed">
                Receive your next step, or continue privately into Sri Shakti Shala.
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
                  className="w-full bg-stone-950/60 border border-ash/[0.25] hover:border-ash/40 focus:border-[#E9C77E] p-4.5 text-base text-ash placeholder:text-ash/[0.52] outline-none transition-all duration-500 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.72)] font-normal"
                />
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    aria-describedby="waterfall-delivery-note"
                    className="w-full bg-stone-950/60 border border-ash/[0.25] hover:border-ash/40 focus:border-[#E9C77E] p-4.5 text-base text-ash placeholder:text-ash/[0.52] outline-none transition-all duration-500 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.72)] font-normal"
                  />
                  {/* §4: "Repeat the delivery promise next to the email request.
                      Do not collect an email without explaining why it is
                      needed." The field stays optional — "Hold Privately" is a
                      real path Sheetal offers and forcing an address to see a
                      result would make the magnet a gate — so this states the
                      consequence rather than blocking the visitor. */}
                  <p
                    id="waterfall-delivery-note"
                    className="mt-2 text-base leading-relaxed text-ash/[0.68]"
                  >
                    {waterfallEmailPrompt}
                  </p>
                </div>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp (Optional)"
                  className="w-full bg-stone-950/60 border border-ash/[0.25] hover:border-ash/40 focus:border-[#E9C77E] p-4.5 text-base text-ash placeholder:text-ash/[0.52] outline-none transition-all duration-500 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.72)] font-normal"
                />
              </div>

              <label className="flex items-start gap-3 text-left text-base leading-relaxed text-ash/[0.82]">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-1 accent-red-800"
                />
                <span>
                  I am 18 or over, and I consent to share my Begin choices and
                  contact details so the team can remember this doorway with
                  care.{" "}
                  <a href="/important-information" target="_blank" rel="noopener noreferrer">
                    How your information is handled
                  </a>
                  .
                </span>
              </label>

              <label className="flex items-start gap-3 text-left text-base leading-relaxed text-ash/[0.82]">
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
                  className="w-full h-24 bg-stone-950/60 border border-ash/[0.25] hover:border-ash/40 focus:border-[#E9C77E] p-4 text-base text-ash placeholder:text-ash/[0.52] outline-none transition-all duration-500 rounded-sm shadow-[inset_0_4px_15px_rgba(0,0,0,0.72)] font-normal resize-none"
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
                  className={`w-full py-4.5 border font-bold tracking-[0.12em] uppercase text-base transition-all duration-500 rounded-sm cursor-pointer ${
                    (!name || isLoading)
                      ? 'border-ash/[0.12] text-ash/45 cursor-not-allowed bg-stone-950/25'
                      : 'border-[#E9C77E]/55 bg-[#4A1C22]/65 hover:border-[#E9C77E] text-[#F6EFE7] shadow-[0_4px_24px_rgba(233,199,126,0.16)]'
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
              className="w-full min-h-12 justify-center flex items-center gap-2 border border-[#8FB27A]/45 bg-[#0E1A13]/58 text-[#F6EFE7] hover:text-white hover:border-[#8FB27A]/80 transition-colors px-5 py-3 cursor-pointer rounded-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-base uppercase tracking-[0.1em] font-bold">Continue Without Sharing · Enter Sri Shakti Shala</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-start max-w-lg py-6"
          >
            <div className="relative mb-8 w-12 h-12 flex items-center justify-center rounded-full bg-red-950/20 border border-red-800/50">
              <div className="absolute inset-0 bg-red-800/5 rounded-full blur-md" />

            </div>

            {/* The confirmation branches on whether the practice can actually
                be sent. Saying "it is on its way" to a woman who left the email
                field blank, or whose write failed, would be a promise the
                system cannot keep — and the rule on this project is to never
                describe a capability as working when it is not. */}
            <h2 className="begin-heading text-3xl md:text-5xl font-light mb-6 serif text-stone-100 italic">
              {waterfallWillSend ? waterfallConfirmationTitle : 'Your path is held.'}
            </h2>

            <p className="text-base text-ash/[0.86] font-normal leading-relaxed mb-6">
              Thank you, <span className="text-red-400 font-medium">{name}</span>. {saveMessage || SAVE_COPY[saveTone]}
            </p>

            {waterfallWillSend ? (
              <>
                <p className="text-base text-ash/[0.86] font-normal leading-relaxed mb-4">
                  {waterfallConfirmationBody}
                </p>
                {/* §4 requires a stated recovery route if delivery fails. */}
                <p className="text-base text-ash/[0.62] font-normal leading-relaxed mb-8">
                  {waterfallSupportLine}
                </p>
              </>
            ) : waterfallOwed ? (
              <p className="text-base text-ash/[0.86] font-normal leading-relaxed mb-8">
                Your path is saved, but your{' '}
                <span className="text-[#F0C4D0]">Shakti Waterfall</span>{' '}
                practice could not be sent just now.{' '}
                {sheetalWasAlerted
                  ? 'Sheetal has been told and will send it to you directly. If you would rather not wait, write to sheetalkandola@gmail.com.'
                  : 'Please write to sheetalkandola@gmail.com and it will be sent to you straight away.'}
              </p>
            ) : (
              <p className="text-base text-ash/[0.68] font-normal leading-relaxed mb-8">
                You completed the path privately, so no email was sent. The
                free <span className="text-[#F0C4D0]">Shakti Waterfall</span>{' '}
                practice is delivered by email — you can ask for it any time by
                writing to sheetalkandola@gmail.com.
              </p>
            )}

            <p className="text-base text-ash/72 font-normal italic mb-10">
              {(requestGuidance || isCommunityIntent) && requestSaved
                ? 'Your request has been shared for human review.'
                : requestFailed
                  ? 'Your path was saved, but the request was not shared. Please try again or book a discovery call below.'
                : 'Carry this quiet flame with you.'}
            </p>

            <a
              href={SHALA_PATH}
              className="w-full mb-4 block text-center py-4 bg-[#4A1C22]/70 border border-[#E9C77E]/45 hover:border-[#E9C77E] text-[#F6EFE7] hover:text-white font-bold tracking-[0.12em] uppercase text-base transition-all duration-500 rounded-sm shadow-[0_4px_24px_rgba(233,199,126,0.16)]"
            >
              Enter Sri Shakti Shala
            </a>

            <a
              href="https://calendly.com/sheetalkandola/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-4 block text-center py-4 bg-stone-950/45 border border-ash/[0.28] hover:border-[#E5849B]/55 text-ash/[0.88] hover:text-[#F0C4D0] font-bold tracking-[0.12em] uppercase text-base transition-all duration-500 rounded-sm"
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
              className="w-full py-4.5 bg-stone-950/40 border border-ash/[0.24] hover:border-[#E5849B]/45 text-ash/[0.82] hover:text-[#F0C4D0] font-bold tracking-[0.12em] uppercase text-base transition-all duration-500 rounded-sm cursor-pointer"
            >
              Delete local journey
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-14 text-base text-ash/26 uppercase tracking-[0.25em] serif italic">
        somatic integration & classical tantra
      </p>
    </div>
  );
}
