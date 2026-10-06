/* Shakti Waterfall — the free practice offered in exchange for completing the
   Guided Path.

   SOURCE: docs/canonical/SHAKTI-WATERFALL-LEAD-PATH-2026-10-06.md §3.
   The body copy below is Sheetal's own, supplied after the 6 October call.
   Editorial changes are limited to punctuation and spacing. Do not rewrite it
   silently — §3 names that as a boundary.

   NAMING, per §2 of the brief:
     public label          Free Embodiment Practice
     practice title        Shakti Waterfall
     full operational name Shakti Waterfall Embodiment Practice
   It is a PRACTICE, never a "course", until Sheetal says otherwise.

   ── DELIVERY TIMING IS A LIVE CONSTRAINT ───────────────────────────────────
   The Waterfall link does not go out on completion. It is carried by the
   Airtable automation "Seeker sequence 2 — day three, the doorway", which runs
   daily at 09:00 WITA over seekers whose Sequence Step = 1 and whose last
   sequence email was 3+ days ago. Seeker sequence 1 fires immediately on
   completion and carries no link.

   So a woman who finishes the path today receives the practice in about three
   days, not in her inbox now.

   Every line below is therefore written to be TRUE UNDER THE CURRENT SYSTEM.
   If the automation is later changed to deliver immediately, `deliveryWindow`
   and `confirmationBody` are the two strings to revisit — nothing else here
   asserts timing. */

export const WATERFALL_LABEL = "Free Embodiment Practice";
export const WATERFALL_TITLE = "Shakti Waterfall";
export const WATERFALL_FULL_TITLE = "Shakti Waterfall Embodiment Practice";

/* Sheetal's verbatim description, §3. The source had "inside out.Returning";
   the missing space is restored and the fragment kept for cadence, exactly as
   the brief's "Editorial restraint" note directs. */
export const waterfallBody = [
  "Shakti Waterfall is a fluid, sensual embodiment practice rooted in somatic awareness, Tantra, breath, and feminine embodiment. Through touch, breath, movement, sensation, and intentional presence, we awaken the body's innate intelligence and create space to soften, feel, receive, and move energy.",
  "This is an invitation to resource yourself through the body, regulate the nervous system, release what has been held, and reconnect with the deeper currents of your feminine being.",
  "You will be guided to anchor into your feminine intelligence, awaken your life force, cultivate sensual awareness, and inhabit your sovereignty from the inside out. Returning to what is already alive within you.",
];

export const waterfallTagline =
  "A Tantric somatic practice to return to your Shakti, your body, and yourself.";

export const waterfallClosing = "Let the body become the temple.";
export const waterfallCallToPresence = "Come home to your Shakti.";

/* The exchange, stated once and identically wherever it appears. §4 requires
   the promise to be repeated beside the email field rather than stated only at
   the start, so this is shared rather than retyped. */
export const waterfallExchange =
  "Complete the short Guided Path and receive Shakti Waterfall, a free Tantric somatic embodiment practice, by email.";

/* What the Guided Path actually contains.

   THE BRIEF SAYS "seven reflective questions". THE BUILD DOES NOT HAVE SEVEN.
   BeginApp renders eight stations, of which a visitor answers four: three
   choice questions (current state, pace, support) and one written reflection.
   The other four are arrival, orientation, the path reveal and the handoff.

   Writing "seven questions" on the page would be a false statement about the
   product, so this says what is there. Raised for Sheetal to resolve: either
   the copy stays accurate at four, or three questions are added to match what
   she described. Until she rules, accuracy wins. */
export const waterfallPathShape =
  "Four short reflections. There are no right answers.";

/* §4 asks for the delivery window to be stated honestly rather than implied.
   Tied to the day-three automation described at the top of this file. */
export const waterfallDeliveryWindow =
  "It arrives by email within a few days, after Sheetal's welcome note.";

/* §4 completion state. Deliberately does NOT say "check your inbox now" — that
   would be false under the current rhythm. It also does not expose the
   protected Vimeo URL, which §4 forbids. */
export const waterfallConfirmationTitle =
  "Your Shakti Waterfall practice is on its way";

export const waterfallConfirmationBody =
  "It arrives by email within the next few days, after Sheetal's welcome note. This is an invitation to soften, feel, receive, and return to what is already alive within you.";

/* §4 requires a recovery instruction for non-delivery. Her own address, which
   is already the reply-to on every automated email, so nothing new is exposed. */
export const waterfallSupportLine =
  "If it has not reached you within a week, check your spam folder, then write to sheetalkandola@gmail.com and it will be sent to you directly.";
