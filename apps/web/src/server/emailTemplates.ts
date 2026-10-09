/* Customer-facing email bodies, server-side.

   These are the SAME founder-written emails that sit in the Airtable
   automations. They are reproduced here because Resend now carries them; the
   Airtable copies stay in place until Resend is proven, after which the native
   customer sends are switched off so the two can never both fire.

   THE COPY IS SHEETAL'S. Welcome text is hers from SSSEMAILS_27Sep_SK; the
   Durga buyer email is hers from DWDEMAIL_27Sep_SK. Do not reword silently.
   The only agent-written sentence in this file is the one-line introduction to
   the Waterfall inside the welcome, which is flagged where it appears.

   DUPLICATE SAFETY. Right now there is no duplicate risk at all: the native
   Airtable action physically cannot reach a non-collaborator, proven 6 October.
   That is why Resend can be switched on before the native actions are removed —
   the old path is already incapable of sending to a customer. */

export const WATERFALL_VIMEO_URL = "https://vimeo.com/1231792529";
export const WATERFALL_VIMEO_PASSWORD = "Shakti108!";

/* The opt-out line, in Sheetal's own words, lifted verbatim from her day-three
   email so the voice does not drift between messages. Required on nurture
   mail; omitted from transactional mail, which someone has just asked for. */
export const OPT_OUT_LINE =
  'And if you\'d rather not hear from me again, you can simply reply "No, thank you," and I\'ll honor that too.';

export type SeekerWelcomeInput = {
  firstName?: string;
};

/* Seeker welcome + Shakti Waterfall, delivered immediately on a successful
   Guided Path submission. Her welcome copy, with the practice inside it. */
export function buildSeekerWelcomeEmail(input: SeekerWelcomeInput) {
  const greeting = input.firstName?.trim()
    ? `Welcome to Sri Shakti Shala, ${input.firstName.trim()} Devi G.`
    : "Welcome to Sri Shakti Shala, Devi G.";

  const text = `${greeting}

I am soul grateful to have you here.

And I want to congratulate you for taking this next step to honor the rising of the feminine and choose to center womb consciousness.

You've arrived. Now, take a moment to simply arrive, land, and settle.

There is nothing you need to rush into.

We move slowly, with intention.
Shakti does not rush.
Shakti magnetizes and allows.

So for now, allow yourself to receive.


YOUR PRACTICE: SHAKTI WATERFALL

This is yours, as promised, for walking the path with me.

I created this short practice as an invitation to come out of the mind and back into the body. To feel your Shakti. To move. To soften where you are holding. To remember the body as a portal into the sacred.

You don't need to know anything about tantra, yoga, or embodiment to practice.

Simply give yourself a few quiet minutes, press play, and let your body lead.

Watch here: ${WATERFALL_VIMEO_URL}
Password: ${WATERFALL_VIMEO_PASSWORD}


I'll come back to you shortly with the next steps and practicalities for your journey.

And if there is anything you need, anything you feel I should know, or anything you'd like to share with me, please reach out. I read every email personally, myself.

I'm so glad you're here.

Jai Ma

In devotion,
Sheetal`;

  return {
    subject: "Welcome to Sri Shakti Shala — your Shakti Waterfall practice is inside",
    text,
  };
}

export type BuyerWelcomeOffering =
  | "dancing-with-durga"
  | "shakti-embodiment"
  | "shala-membership";

export type BuyerWelcomeInput = {
  firstName?: string;
  offering: BuyerWelcomeOffering;
};

/* Buyer welcome, one body per offering, mirroring the four branches of the
   Airtable "Buyer welcome — on payment" automation. Returns null for an
   unrecognised offering so the caller flags the row for a human rather than
   improvising an email nobody wrote — the same behaviour as that automation's
   "Other" branch. */
export function buildBuyerWelcomeEmail(input: BuyerWelcomeInput): { subject: string; text: string } | null {
  const name = input.firstName?.trim() ? ` ${input.firstName.trim()}` : "";

  if (input.offering === "dancing-with-durga") {
    return {
      subject: `Welcome,${name || ""} Devi G`.replace("Welcome, Devi G", "Welcome, Devi G"),
      text: `Welcome,${name} Devi G

You have made a powerful decision, not only for yourself, but for the collective rising feminine.

Congratulations on trusting yourself, and on trusting the power of Navratri.

I'm soul grateful you're here.


DANCING WITH DURGA DEVI: DEVOTION WITH A SPINE | OCTOBER 11-19

For these 9 nights, we'll journey together through the wisdom, stories, practices, and embodiment of Maa Durga.

We have 4 confirmed live gatherings:

October 11, 13, 15 & 17
7:30-9:30 PM IST

There will also be a possible bonus gathering on October 19, which will be confirmed closer to the time depending on the engagement and needs of the group. On the other nights, you'll receive practices to explore on your own, in your own space and time.


FOR NOW, BEGIN MAKING SPACE

You don't need to prepare everything yet.

For now, begin making space & time to meet Devi.

Choose a time each day, ideally around the same time, whether that's morning or evening, when you can step away from the noise of your day and simply sit, breathe, and connect.

Begin noticing:

Where and when will I sit?
Where will I create my altar?
What space in my home can become sacred?

You can begin gathering:

- A red cloth
- A red asana or cushion, if you have one
- The Durga Devi image for our journey, which you can save here: https://www.srishaktishala.com/email/durga-devi.jpg
- A small candle or diya
- Any sacred object that connects you to the Divine Feminine


YOUR LIVE GATHERING DETAILS

We have 4 confirmed live gatherings: October 11, 13, 15 & 17
7:30-9:30 PM IST

We'll use the same Zoom link for all 4 gatherings.

Zoom: https://us06web.zoom.us/j/88985464080?pwd=hrYZ5i1DVLyhDX2Et0tzHl9AgPcrRX.1

Add all gatherings to your Google Calendar:
https://calendar.app.google/1LuzGc6YpLJu4Crc9

I'll share more guidance on your altar, preparation, and practices as we get closer. For now, your only invitation is to begin creating the space, time, and intention to meet Devi each day.

9 nights. 9 forms of Devi. 1 invitation to remember the Shakti within you

With love and devotion,

Sheetal`,
    };
  }

  if (input.offering === "shakti-embodiment") {
    return {
      subject: `Welcome,${name} Devi G`,
      text: `Welcome,${name} Devi G

You have made a powerful decision, not only for yourself, but for the collective rising feminine.

Congratulations on trusting yourself.

I'm soul grateful you're here.


1:1 SHAKTI EMBODIMENT

This is private work. Your body, your pace, your questions — nothing shared with a group, nothing performed.


YOUR NEXT STEPS

1. Intake form. Please complete this slowly and honestly. There are no right answers. Simply allow yourself to reflect and share what feels true.
https://forms.gle/cam5Ewp8CoASEL6NA

2. Book your first session. Once you have completed the intake form, you can schedule here:
https://calendly.com/sheetalkandola/1-1-embodiment-session

I will also write to you personally in the next few days with your coaching agreement, and to ask what you'd like me to understand before we begin.

We move slowly, with intention.
Shakti does not rush.
Shakti magnetizes and allows.

So for now, allow yourself to receive.

If there is anything you need, anything you feel I should know, or anything you'd like to share with me before we meet, please reach out. I read every email personally, myself.

Jai Ma

In devotion,
Sheetal`,
    };
  }

  if (input.offering === "shala-membership") {
    return {
      subject: `Welcome to Sri Shakti Shala,${name} Devi G`,
      text: `${input.firstName?.trim() ? `${input.firstName.trim()} Devi G,` : "Devi G,"}

Welcome to Sri Shakti Shala

You've chosen to step into a space that is not only about your own becoming, but about the collective rising of the feminine.

A space to raise Shakti consciousness.
To raise the consciousness in the rooms we enter.
To use our voices.
To come together as sovereign Shaktis.
To practice, to be held, to be seen, and to be witnessed.

If you've already been part of my WhatsApp community, you've had a little taste of how we flow here. But Sri Shakti Shala is a deeper doorway.

This is a space to return to the body, deepen your practice, and cultivate an embodied relationship with Shakti alongside other women walking this path.

Inside the Shala, you'll receive:

- Embodiment and somatic practices
- Tantric sadhana and spiritual practice
- Reflections, teachings, and practices to weave into your daily life
- New Moon and Full Moon circles every fortnight
- A community of women practicing sovereignty, devotion, embodiment, and truth
- A space to be witnessed, supported, challenged, and celebrated

You don't have to arrive here perfected.

You don't have to know exactly where this path is taking you.

You simply have to be willing to show up, feel, practice, and listen.

This is our temple in motion.

And I'm so happy to welcome you through its doors.

I'm looking forward to practicing with you, witnessing you, and seeing what becomes possible when we gather as women who are willing to remember the Shakti already moving through us.

Welcome home, Devi G

JAI MAA

In devotion,
Sheetal`,
    };
  }

  return null;
}

/* Internal failure alert to Sheetal. This goes through Resend too, because a
   send failure is exactly the moment we cannot rely on the thing that failed.
   It is addressed to her, contains no founder copy, and is deliberately blunt:
   it has to be actionable at a glance from a phone in the Himalayas. */
export function buildDeliveryFailureAlert(input: {
  seekerRecordId: string;
  recipient: string;
  firstName?: string;
  reason: string;
}) {
  return {
    subject: "ACTION NEEDED — a Shakti Waterfall email did not send",
    text: `A woman completed the Guided Path and her practice did not reach her.

Name:    ${input.firstName || "(not given)"}
Email:   ${input.recipient}
Record:  ${input.seekerRecordId}
Reason:  ${input.reason}

Her record is saved and her sequence has NOT been advanced, so nothing has been
lost and no later email will assume she already has the practice.

What to do: send her the Shakti Waterfall link directly, then reply to this
message so the delivery problem gets looked at.

Watch here: ${WATERFALL_VIMEO_URL}
Password: ${WATERFALL_VIMEO_PASSWORD}`,
  };
}


/* ── The follow-on notes ────────────────────────────────────────────────────
   Day three and day seven, Sheetal's own copy, carried by the cron runner.

   These were in Airtable until 9 October, where they could not reach a
   non-collaborator and so never sent once. Retiring them without rebuilding
   would have left every seeker with a welcome and then silence, which is
   worse than the old broken state because it looks finished.

   NEITHER CARRIES THE WATERFALL LINK. The practice is delivered by the
   welcome, immediately. Day three refers back to it; day seven assumes she
   has it. Putting the link here would send it twice. */

export type DayThreeInput = {
  /* From the Seekers row's formula fields: the pathway phrase and, for
     CIRCLE only, the trailing clause about the fortnightly rhythm. */
  pathwayPhrase?: string;
  pathwaySuffix?: string;
};

export function buildDayThreeEmail(input: DayThreeInput) {
  const doorway = input.pathwayPhrase?.trim();

  /* If the pathway formula is empty the sentence would read "the doorway
     that feels closest to you right now is ." — so that paragraph is dropped
     rather than sent broken. The rest of her letter stands on its own. */
  const doorwayParagraph = doorway
    ? `And based on your responses, the doorway that feels closest to where you are right now is ${doorway}${input.pathwaySuffix ?? ""}.

But this is an offering, not a verdict.
An invitation, not a compulsion.

You are your own Guru, and you are sovereign to feel into what is right for you.

So take your time. There is nothing you need to decide immediately.

`
    : "";

  return {
    subject: "The doorway closest to where you are",
    text: `Devi G,

Thank you so much for taking the initiative and the time to move through the beginning of this journey with me. I read each and every one of these personally, and I'm grateful for what you shared.

A few days ago I sent you your Shakti Waterfall practice, in my welcome note.

If you have already practised with it, you might take a moment to notice what softened. And if you have not yet found the time, it is still there waiting for you in that first email — give yourself a few quiet minutes, press play, and let your body lead.

${doorwayParagraph}I'll come back to you with more information and the next steps. And if, in the meantime, something has shifted, or you simply want to tell me more about where you are, just reply to this email. Everything comes directly to me.

${OPT_OUT_LINE}

Jai Ma.

In devotion,
Sheetal`,
  };
}

export function buildDaySevenEmail() {
  return {
    subject: "What is your body saying?",
    text: `Devi G,

A few days ago, you walked through the portal and received your free Shakti Waterfall Embodiment Practice.

I wanted to give you a little space before reaching out again.

If you've begun weaving the practice into your days, take a moment to notice:

What is changing in your relationship with your body?

Where do you feel more connected, more spacious, more alive?

What sensations, emotions, desires, or boundaries are becoming easier to notice?

And perhaps most importantly:

What happens when you slow down enough to listen?

You don't need to send me an answer.

You might journal about it, move with it, speak it aloud, create something from it, or simply let the question live in your body for a while.

This is the beginning of the practice: learning to listen to the wisdom already moving through you.

And if you feel called to continue walking this path with me, there are deeper doorways available through Sri Shakti Shala, including our circles, 1:1 work, and upcoming retreats and immersions.

You don't need to know which one is right for you yet.

Simply notice what your body says when you imagine going deeper.

If something is calling you, reply to this email and tell me what you're feeling drawn toward. I read these personally.

Until then, keep listening.

Keep feeling.

Keep returning to the body.

Shakti is not something you need to find.
It is something you learn to receive.

${OPT_OUT_LINE}

Jai Ma

In devotion,
Sheetal`,
  };
}
