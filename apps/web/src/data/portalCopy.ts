import { NAV_ITEMS } from "../constants/navigation";
import { philosophy, ritualCard, transitionQuote } from "./goddesses";
import { finalCta, pathway, practicePillars, readiness } from "./practices";
import { retreatVision } from "./retreats";

export const portalCopy = {
  nav: NAV_ITEMS,
  /* Approved by the founder 2026-09-25 (direction A).

     The name was the small eyebrow text while "Shakti Shadow & Somatics" was
     the headline, so the school was never the biggest thing on its own front
     page — her words: "Shakti Shala is here twice, it should be front and
     centre." The two are swapped: the name is the headline and the old
     headline became the descriptor line, the slot "School Of Feminine
     Embodied Awakening" occupies on the reference site she chose.

     Everything here has to answer what this is, who it is for, and where to
     go, without scrolling. */
  hero: {
    eyebrow: "A Living School of Shakti, Shadow & Somatics",
    headline: "Sri Shakti Shala",
    subheadline: "Is the goddess calling you?",
    body:
      "For women learning to trust the body, meet the shadow, and stop abandoning themselves. Held by Sheetal Kandola.",
    primaryCta: "Begin your path",
    secondaryCta: "Dancing with Durga",
    seasonalLine: "Navratri 2026 · 11–19 October",
  },
  philosophy,
  founder: {
    label: "MEET THE FOUNDER",
    name: "Sheetal Kandola",
    headline: "The sanctuary begins with the woman holding it.",
    body:
      "Sheetal Kandola is a Punjabi Indian woman raised in the Deep American South whose work braids lived cultural context with nervous-system literacy, Somatic Experiencing-informed practice, shadow work, psychology, embodied sensuality, movement, dance, and classical Shakta Tantra.",
    continuation:
      "Her work comes from living between worlds: Indian spiritual and devotional traditions, modern somatic and nervous-system practice, shadow work, and a life shaped by both Western and Indian contexts. It does not ask women to rise above grief, anger, fear, desire, or the body. It asks them to meet what is actually there.",
    credentials: [
      "Shakti Shadow & Somatics",
      "Nervous-system literacy",
      "Shadow integration",
      "Embodied sensuality and movement",
      "Classical Shakta Tantra",
    ],
  },
  ritualCard,
  pillars: practicePillars,
  transitionQuote,
  readiness,
  pathway,
  retreatVision,
  finalCta,
  footer: {
    title: "Sri Shakti Shala",
    guide: "Sheetal Kandola",
    method: "Shakti Shadow & Somatics",
    pathway: "Private Entry · Community · Retreats",
  },
};
