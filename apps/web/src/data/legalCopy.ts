/* Legal copy for Sri Shakti Shala.

   WRITTEN BY AN AGENT, NOT A LAWYER. This is a protective baseline, not
   legal advice, and it has not been reviewed by anyone qualified. It exists
   because the site was taking payments of up to $1,500 and collecting
   trauma-adjacent personal data with no terms, no privacy policy and no
   disclaimer of any kind. Something careful and honest is better than
   nothing; it is not a substitute for review.

   THE JURISDICTIONS ARE GENUINELY COMPLICATED and a lawyer should look at
   this before it is relied on. The business is registered in Alabama, the
   founder lives in Bali, a large part of the audience is in India, and
   anyone in the UK or EU who buys brings UK GDPR / GDPR with them.

   Three things here are load-bearing:

   1. THE DISCLAIMER. The site describes somatic work, trauma, shadow and
      nervous-system literacy, and the founder's own marketing says "as a
      therapist". Without an explicit statement that this is not medical or
      psychological treatment, that framing is the single largest exposure
      in the business.

   2. THE PRIVACY NOTICE. Begin collects name, email, phone, location and
      free text about what someone is moving through. That is personal data,
      some of it sensitive, and a notice is required rather than optional
      once an EU or UK resident buys.

   3. THE REFUND CLAUSE. Marked below — it is a commercial decision only
      Sheetal can make. What is written is deliberately conservative and
      commits her to very little. */

export const LEGAL_LAST_UPDATED = "1 October 2026";

export type LegalSection = {
  id: string;
  title: string;
  lede?: string;
  blocks: Array<{ heading?: string; body: string[] }>;
};

export const legalSections: LegalSection[] = [
  {
    id: "nature-of-this-work",
    title: "The nature of this work",
    lede: "Please read this before booking anything. It matters more than the rest of this page.",
    blocks: [
      {
        body: [
          "Sri Shakti Shala offers education, practice and spiritual accompaniment. It is **not medical care, psychotherapy, psychiatric treatment, counselling, or a diagnosis of any kind**, and it is not a substitute for any of those things.",
          "Sheetal Kandola works as a facilitator and somatic practitioner. In these offerings she is **not acting as your doctor, licensed therapist, or mental-health professional**, whatever her training elsewhere. Nothing shared here is a clinical assessment, and no outcome is promised.",
        ],
      },
      {
        heading: "If you are in crisis",
        body: [
          "These practices are not emergency care. If you are in danger, or thinking of harming yourself, please contact your local emergency services or a crisis line now. Do not wait for a session.",
        ],
      },
      {
        heading: "Your body decides",
        body: [
          "This work touches the body, the breath, and material that can be tender — shadow, grief, anger, old patterns. Strong sensation or emotion can surface.",
          "You take part at your own discretion and remain responsible for your own wellbeing throughout. **You may stop, rest, step back, or leave at any moment, for any reason, without explanation.** Nothing is ever required of you.",
          "Please speak to your doctor or therapist first if you are pregnant, recovering from injury or surgery, living with a heart, neurological or respiratory condition, managing a psychiatric diagnosis, or currently in acute crisis. If you are already in treatment, we ask that you continue it. This work sits alongside professional care; it does not replace it.",
        ],
      },
      {
        heading: "What is not offered",
        body: [
          "No cure, no healing outcome, no result of any kind is promised. Nothing here diagnoses, treats, or prevents illness. What you receive from a practice is your own, and it cannot be guaranteed in advance.",
        ],
      },
    ],
  },
  {
    id: "terms",
    title: "Booking and payment",
    blocks: [
      {
        heading: "Who these offerings are for",
        body: [
          "Sri Shakti Shala's containers are **for women**. This is a deliberate boundary and part of what makes the spaces what they are. Booking is made on that basis.",
          "You must be 18 or over.",
        ],
      },
      {
        heading: "What you are buying",
        body: [
          "Each offering states what it includes on its own page — the number of live gatherings, the dates, and the times. Anything described as a bonus is exactly that: an addition Sheetal may offer, not part of what you have paid for.",
          "Live gatherings are held online unless stated otherwise. Dates and times are given in IST.",
          "If Sheetal must move or cancel a gathering, you will be told as early as possible and it will be rescheduled or made available in another form.",
        ],
      },
      {
        heading: "Payment",
        body: [
          "Payments are taken by **Stripe**. Card details are handled entirely by Stripe and are never seen or stored by Sri Shakti Shala.",
          "Prices are shown in the currency charged. Where a separate price is offered for Indian residents, it is offered in good faith for people resident in India.",
          "Recurring memberships continue until cancelled. A free trial, where offered, converts to a paid term at the end of the trial unless you cancel before it ends.",
        ],
      },
      {
        heading: "Refunds and cancellation",
        body: [
          "**[AWAITING SHEETAL'S DECISION — this clause is deliberately conservative and must be confirmed or replaced before it can be relied on.]**",
          "If something prevents you from taking part, write to Sheetal directly at sheetalkandola@gmail.com and it will be considered individually. Where a container has already begun, or where materials and access have already been given, a refund may not be possible.",
          "Nothing here affects any statutory right you have that cannot be set aside by agreement.",
        ],
      },
      {
        heading: "What is shared with you stays yours to keep private",
        body: [
          "Recordings, written material and practices shared inside a container are for your own use. Please do not copy, publish or resell them.",
          "What other women share in a group space is theirs. Please carry it with the same discretion you would want for your own.",
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "Your information",
    lede: "Plainly: what is collected, why, who else can see it, and how to have it removed.",
    blocks: [
      {
        heading: "What is collected, and only when you give it",
        body: [
          "**When you complete Begin:** your name, email, and optionally your phone number, location and timezone, together with your answers and anything you choose to write in your own words.",
          "**Optionally, your gender.** This is asked because several offerings are for women, and it is used for that. Answering is never required — *prefer not to say* is a complete answer and will not stop anyone from being replied to.",
          "**When you buy something:** your name and email, what you bought, the amount, and Stripe's reference for the payment. Card details never reach Sri Shakti Shala.",
          "Nothing is bought from third parties, and nothing is inferred about you that you have not told us.",
        ],
      },
      {
        heading: "What it is used for",
        body: [
          "To reply to you personally. To suggest the doorway that seems closest to where you are. To run the offering you have bought. To keep a record of what you have paid for.",
          "**Your information is never sold, rented, or given to anyone for their own marketing.**",
        ],
      },
      {
        heading: "Who else holds it",
        body: [
          "A small number of services, each of which holds it only to do a job: **Airtable** stores the records, **Stripe** takes payments, **Vercel** hosts the site, and **Google** carries email. Each has its own privacy terms.",
        ],
      },
      {
        heading: "What the website measures",
        body: [
          "The site uses **Vercel Analytics**, which counts page views and a short list of actions — such as a visit to Begin, or a click through to a payment page — so it is possible to see which parts of the site are useful.",
          "This is **cookieless**, it does not follow you to other websites, and it is not used to build a profile of you. Anything after the `?` in a web address is stripped before the view is recorded, so what you typed or chose is not captured. There is no advertising tracking of any kind on this site.",
        ],
      },
      {
        heading: "How long it is kept",
        body: [
          "Enquiry and seeker records are kept while there is a live relationship, and removed on request. Payment records are kept as long as tax and accounting rules require, which is normally several years.",
        ],
      },
      {
        heading: "What you can ask for",
        body: [
          "You can ask to see what is held about you, to have it corrected, to have it deleted, to receive a copy, or to stop hearing from us. **Write to sheetalkandola@gmail.com and it will be honoured.**",
          "To stop emails, you can simply reply to any of them saying so. There is no need to explain.",
          "If you are in the UK or the EU, you also have the right to complain to your data protection authority. If you are in India, the same applies under the Digital Personal Data Protection Act.",
        ],
      },
    ],
  },
];

export const legalFooterNote =
  "Sri Shakti Shala · srishaktishala.com · Questions about anything on this page: sheetalkandola@gmail.com";
