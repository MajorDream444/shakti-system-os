import type {
  InitiationKeyRecord,
  LibraryAssetRecord,
  PracticeRecord,
} from "../types/backend";

export const mockLibraryAssets: LibraryAssetRecord[] = [
  {
    id: "mock-library-asset",
    assetId: "ASSET-TEST-001",
    title: "Test Vault Asset",
    description: "Mock library asset for read-only fallback.",
    driveUrl: "",
    sourceFolder: "04_TEMPLE_LIBRARY/01_PRACTICES",
    mediaType: "Document",
    fileType: "md",
    theme: ["test", "vault", "sample"],
    keywords: "test, vault, sample",
    goddessArchetype: "",
    moonPhase: "",
    practiceType: "Integration",
    accessLevel: "Seeker",
    publishingStatus: "Approved",
    confidentiality: "Internal",
    notes: "Approved mock fallback. Replace with approved Airtable record reads.",
  },
];

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
