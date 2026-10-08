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

   ── DELIVERY IS IMMEDIATE (Major's decision, 6 October, Option A) ──────────
   The Waterfall access now rides in "Seeker sequence 1 — welcome reply", which
   triggers on record creation, so the practice arrives with Sheetal's welcome
   as soon as a Guided Path submission saves. "Seeker sequence 2 — day three"
   refers back to the practice and no longer delivers it, so nobody is sent the
   same link twice.

   Rationale on the record: Sheetal described the practice as the reward for
   completing the path, and a three-day gap weakened both the promise and the
   lead-generation purpose.

   Timing is asserted in exactly two strings below — `waterfallDeliveryWindow`
   and `waterfallConfirmationBody`. If the automation ever moves again, those
   are the only two to revisit.

   ── NO NUMERICAL CLAIMS ABOUT THE PATH ─────────────────────────────────────
   Nothing here states how many questions the Guided Path contains. The brief
   said seven, the build has four, and rather than add three artificial
   questions or print a number that will age badly, the count is simply not
   claimed. "A short Guided Path" stays true as the experience evolves.
   Do not reintroduce a count. */

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

/* How the path is described. No count, by decision — see the header. */
export const waterfallPathShape =
  "A short Guided Path. There are no right answers.";

/* Delivery is immediate, carried by Seeker sequence 1 on record creation. */
export const waterfallDeliveryWindow =
  "It arrives by email as soon as you finish.";

/* §4 completion state. "Check your inbox" is now literally true: the practice
   is sent by Seeker sequence 1 on record creation. It still does not expose the
   protected Vimeo URL, which §4 forbids. */
export const waterfallConfirmationTitle =
  "Your Shakti Waterfall practice is on its way";

export const waterfallConfirmationBody =
  "Check your inbox — it arrives with Sheetal's welcome note. This is an invitation to soften, feel, receive, and return to what is already alive within you.";

/* §4 requires a recovery instruction for non-delivery. Her own address, which
   is already the reply-to on every automated email, so nothing new is exposed.
   The window is short because delivery is immediate: if it has not arrived in
   minutes something is wrong, and she should not wait a week to be told that. */
export const waterfallSupportLine =
  "If it has not arrived within a few minutes, check your spam folder, then write to sheetalkandola@gmail.com and it will be sent to you directly.";

/* The note beside the email field. Major's wording, 6 October: it names the
   exchange and the private alternative in one line, without blocking anyone. */
export const waterfallEmailPrompt =
  "Enter your email to receive Shakti Waterfall, or continue privately without email.";
