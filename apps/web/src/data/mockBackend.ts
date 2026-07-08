import type {
  InitiationKeyRecord,
  PracticeRecord,
} from "../types/backend";

export const mockPractices: PracticeRecord[] = [
  {
    id: "mock-practice-grounding",
    practiceId: "PRAC-GROUNDING-001",
    title: "Grounding with the Earth",
    shortDescription: "Mock practice record for read-only fallback.",
    duration: "10 min",
    practiceType: "Grounding",
    associatedGoddess: "",
    associatedMoonPhase: "",
    accessLevel: "Seeker",
    audioUrl: "",
    videoUrl: "",
    worksheetUrl: "",
    status: "Approved",
    notes: "Mock fallback. Replace with Airtable read once secure backend is active.",
  },
];

export const mockInitiationKeys: InitiationKeyRecord[] = [
  {
    id: "mock-key-seeker",
    keyId: "KEY-SEEKER-001",
    keyName: "Seeker Key",
    accessLevelGranted: "Seeker",
    offeringAmount: 0,
    paymentType: "Free",
    physicalObjectIncluded: false,
    description: "Mock initiation key record for read-only fallback.",
    eligibilityNotes: "",
    stripeProductId: "",
    stripePriceId: "",
    active: true,
    notes: "Mock fallback. Do not use as payment or access source of truth.",
  },
];
