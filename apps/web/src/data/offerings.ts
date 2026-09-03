import {
  ABOUT_SHEETAL_PATH,
  BEGIN_PATH,
  OFFERINGS_PATH,
  SHALA_PATH,
  TESTIMONIALS_PATH,
} from "../constants/navigation";
import { portalImages } from "../components/PortalImageSlots";

export type OfferCategory = {
  id: "begin-here" | "self-guided" | "circles" | "private-work" | "retreats";
  label: string;
  title: string;
  summary: string;
  includes: string[];
  nextStep: string;
  investment: string;
  accessState: "Open" | "Available to Request" | "Requires Preparation" | "By Invitation";
  href: string;
  cta: string;
  image: string;
};

export const offerCategories: OfferCategory[] = [
  {
    id: "begin-here",
    label: "Begin Here - Free",
    title: "Start Your Shakti Path",
    summary:
      "A private threshold that listens first, reflects your current doorway, and lets you enter Shakti Shala without pressure.",
    includes: [
      "Eight-station discernment journey",
      "Server-derived pathway when consent and contact are present",
      "Private local continuation when you choose not to share",
    ],
    nextStep: "Begin privately now.",
    investment: "Free",
    accessState: "Open",
    href: BEGIN_PATH,
    cta: "Start Your Shakti Path",
    image: portalImages.water,
  },
  {
    id: "self-guided",
    label: "Self-Guided",
    title: "Practice, teachings, and temple library resources",
    summary:
      "For seekers who want to orient through practice and approved teaching before requesting deeper human support.",
    includes: [
      "Open Shala rooms",
      "Temple Library orientation",
      "Practices released as Sheetal approves them",
    ],
    nextStep: "Enter the open sanctuary and begin with practice.",
    investment: "Published as each resource is released",
    accessState: "Open",
    href: SHALA_PATH,
    cta: "Enter Shakti Shala",
    image: portalImages.library,
  },
  {
    id: "circles",
    label: "Circles & Community",
    title: "Held rhythm with other women",
    summary:
      "For seekers who need witness, repetition, and shared practice before a deeper container is right.",
    includes: [
      "Community rhythm",
      "Group practice agreements",
      "Human-held entry when dates and capacity are confirmed",
    ],
    nextStep: "Request the next circle when a doorway is open.",
    investment: "Confirmed when the circle opens",
    accessState: "Available to Request",
    href: `${BEGIN_PATH}?intent=community`,
    cta: "Request Circle Information",
    image: portalImages.gates,
  },
  {
    id: "private-work",
    label: "Work With Sheetal",
    title: "Private work in 6-, 9-, or 12-session containers",
    summary:
      "For women ready for closer guidance with Sheetal inside Shakti Shadow & Somatics. Private work begins with a container and continuity over time.",
    includes: [
      "Fit conversation before commitment",
      "6-, 9-, or 12-session private pathways",
      "A shorter 3-session container only by exception when appropriate",
      "Pacing around nervous-system capacity",
      "Human discernment before any deeper doorway",
    ],
    nextStep: "Request a conversation. Payment is not completed by the browser in this release.",
    investment: "Confirmed before commitment",
    accessState: "Available to Request",
    href: `${BEGIN_PATH}?intent=guide`,
    cta: "Request Private Work",
    image: portalImages.founder,
  },
  {
    id: "retreats",
    label: "Retreats & Immersions",
    title: "Retreat as preparation, relationship, and readiness",
    summary:
      "For women drawn toward immersion, with readiness held through preparation and human review.",
    includes: [
      "Retreat interest without automatic approval",
      "Preparation before invitation",
      "Application path only when Sheetal's team opens it",
    ],
    nextStep: "Explore the retreat threshold and request the next conversation.",
    investment: "Application and deposit only after human review",
    accessState: "Requires Preparation",
    href: `${OFFERINGS_PATH}#retreats`,
    cta: "Explore Retreat Readiness",
    image: portalImages.retreat,
  },
];

export const receivingLadder = [
  {
    level: "Free orientation",
    doorway: "Begin privately and receive an honest first reflection.",
  },
  {
    level: "Practice and belonging",
    doorway: "Enter Shakti Shala for open teachings, practices, and sanctuary rhythm.",
  },
  {
    level: "Held support",
    doorway: "Request circles, community rhythm, or a private container when readiness is present.",
  },
  {
    level: "Deeper immersion",
    doorway: "Prepare for retreats and in-person work through human discernment.",
  },
];

export const offerPathways = [
  {
    title: "I know the doorway I want",
    body:
      "Go straight to the public offerings, read the access state, and choose the next human or self-guided step.",
    href: OFFERINGS_PATH,
    cta: "View Offerings",
  },
  {
    title: "Help me discern what is right",
    body:
      "Move through the private Begin threshold first. The system reflects a doorway without scoring or surveillance.",
    href: BEGIN_PATH,
    cta: "Start Your Shakti Path",
  },
];

export const aboutSheetalCopy = {
  title: "Sheetal Kandola",
  label: "The woman holding the sanctuary",
  body:
    "Sheetal Kandola is the founder of Shakti Shadow & Somatics and Shakti Shala. Her work bridges nervous-system literacy, Somatic Experiencing-informed practice, psychology, sensuality, shadow work, classical Shakta Tantra, and lived cultural context.",
  bodyTwo:
    "This public biography intentionally avoids unsupported credential claims. Training details that require source confirmation remain out of public launch copy until Sheetal or the team approves exact wording.",
  links: [
    { label: "Work With Sheetal", href: OFFERINGS_PATH },
    { label: "Begin Privately", href: BEGIN_PATH },
  ],
};

export const testimonialArchitecture = {
  title: "Transformation Evidence",
  label: "Stories require consent",
  body:
    "Client words will appear here only when publication approval, attribution, source, container context, date, and visibility have been recorded.",
  fields: [
    "quote",
    "attribution",
    "context or container",
    "optional image",
    "publication approval",
    "source",
    "date",
    "visibility",
  ],
  links: [
    { label: "Meet Sheetal", href: ABOUT_SHEETAL_PATH },
    { label: "View Offerings", href: OFFERINGS_PATH },
  ],
};

export const trustLinks = [
  { label: "About Sheetal", href: ABOUT_SHEETAL_PATH },
  { label: "Transformation Evidence", href: TESTIMONIALS_PATH },
  { label: "Enter Shakti Shala", href: SHALA_PATH },
];

export const paymentArchitectureStatus = [
  {
    item: "Public offer discovery",
    status: "EXTEND",
    note: "Now visible through nav, homepage gateway, and /offerings.",
  },
  {
    item: "Checkout/payment route",
    status: "DEFERRED",
    note: "No Stripe checkout or payment completion is implemented in Sprint 12F.",
  },
  {
    item: "Stripe public key placeholder",
    status: "PLACEHOLDER",
    note: "Existing environment placeholder remains unused by the public offer path.",
  },
  {
    item: "Payment approval",
    status: "HUMAN APPROVAL REQUIRED",
    note: "Prices, deposits, checkout copy, and processor activation require a dedicated approved sprint.",
  },
];
