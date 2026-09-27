import { commerceOffers } from "./commerce";

export const dancingWithDurga = {
  path: "/dancing-with-durga",
  title: "Dancing with Maa Durga Devi: Devotion with a Spine",
  /* Goddess names carry Maa. Founder convention: it is her own address for
     the goddess, 87 times across 102 of her posts, and her campaign copy says
     "Maa Durga" unprompted. The campaign line is the one exception — it is a
     three-beat chant on the initial D, and "Maa Durga. Devotion. Dharma."
     breaks the cadence that makes it work. Flag if she wants it changed. */
  campaignLine: "Durga. Devotion. Dharma.",
  subtitle: "A Nine-Night Navratri Sadhana Through the Navadurgas",
  /* Founder's own campaign copy, supplied 2026-09-27. Written for the previous
     design and still accurate, so it is carried over rather than rewritten.
     "Maa" and "Devi" are her natural address for the goddess — see the
     devotional vocabulary in SHAKTI-CANONICAL-VOCABULARY.md. */
  energyHeading: "Rooted in Earth. Held by Maa Durga and her nine forms.",
  energy:
    "A space for fierce devotion, embodied power, and the courage to meet yourself fully. Through mantra, movement, meditation and the wisdom of Durga Devi, we explore the Warrior Mother Goddess who holds us and reminds us we have a right to claim our space, discern who earns our softness, and honour our desires.",
  audience: "Women-only",
  format: "Four live gatherings plus five practice nights",
  timing: "7:30-9:30 PM IST",
  liveGatheringCount: 4,
  practiceNightCount: 5,
  paymentOptions: commerceOffers.dancingWithDurga,
  cta: "Request details",
  boundary:
    "Choose the payment option that applies to you. You will continue to Sri Shakti Shala's secure payment page.",
  founderRole:
    "Sheetal Kandola holds this container as practitioner and facilitator. Maa Durga remains the devotional center.",
  teachingEmphasis:
    "When the male gods could not defeat the asura, the Divine Feminine was called forth. Their powers converged as Shakti, Durga took form, and she defeated what they could not.",
  lotusSword:
    "The lotus without the sword can become passivity. The sword without the lotus can become destruction.",
  essence: [
    "Feel fear and stay.",
    "Trust the body.",
    "Say no without apologizing.",
    "Feel anger without being consumed.",
    "Protect what is sacred.",
    "Stand in power without abandoning tenderness.",
  ],
  practices: [
    "myth",
    "mantra",
    "devotion",
    "movement",
    "dance",
    "somatic embodiment",
  ],
  teachingSequence: ["fear", "boundaries", "anger"] as const,
  ritualGates: [
    {
      date: "October 11",
      goddess: "Maa Shailaputri",
      gate: "Earth: I Am Here",
      themes: "Grounding, safety, trust, fear, belonging, the root, and opening sankalpa.",
    },
    {
      date: "October 13",
      goddess: "Maa Brahmacharini and Maa Chandraghanta",
      gate: "Devotion with a Spine",
      themes: "Tapas, courage, inner authority, voice, boundaries, and the sacred no.",
    },
    {
      date: "October 15",
      goddess: "Maa Kushmanda and Maa Skandamata",
      gate: "Yoni: My Body Is Mine",
      themes:
        "Water, flow, sensuality, creative life force, bodily sovereignty, fierce inner mother, and trauma-aware yoni sthana exploration.",
    },
    {
      date: "October 17",
      goddess: "Maa Katyayani and Maa Kalaratri",
      gate: "Fire: My No Is Sacred",
      themes: "Warrior power, sacred rage, protection, boundaries, the Kali current, sound, movement, and warrior dance.",
    },
    {
      date: "October 19",
      goddess: "Maa Mahagauri and Maa Siddhidatri",
      gate: "Unity: My Power Serves Life",
      themes: "Purification, love, sisterhood, integration, wholeness, dharma, and closing blessing.",
    },
  ],
  access: [
    "One fully gifted scholarship",
    "Two supported-price places",
    "Temporary community / Sri Shakti Shala space during the journey",
    "Two months of recording and material access for non-members after the container",
    "Sri Shakti Shala continuation through invitation, simple application, human discernment, and paid membership",
  ],
  gateElements: ["earth", "flame", "water", "fire", "gold"] as const,
};
