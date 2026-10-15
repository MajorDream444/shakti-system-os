import type { LibraryAssetRecord } from "../types/backend";

const sharedReviewFields: Omit<LibraryAssetRecord, "id" | "assetId" | "title" | "sourceFolder" | "moonPhase" | "practiceType"> = {
  description: "",
  driveUrl: "",
  mediaType: "",
  fileType: "",
  theme: [],
  keywords: "",
  goddessArchetype: "",
  accessLevel: "",
  contentEntitlement: "Needs Review",
  publishingStatus: "Needs Review",
  knowledgeMaturity: "Library Ready",
  confidentiality: "Private",
  usageRights: "",
  rightsHolder: "",
  rightsStatus: "Needs Review",
  provenanceSource: "Canonical operational checkpoint",
  provenanceReference: "SRI-SHAKTI-SHALA-OPERATIONAL-CHECKPOINT-2026-09-22",
  publicationApprovedBy: "",
  publicationApprovedAt: "",
  applicationSafeReference: "",
  deliveryStatus: "Held for founder approval",
  notes: "Mapping fixture only. Never publish or use as a production fallback.",
};

export const vaultLibraryReviewFixtures: LibraryAssetRecord[] = [
  { ...sharedReviewFields, id: "review-full-moon", assetId: "ASSET-FULL-MOON-PHILOSOPHY", title: "Full Moon philosophy", sourceFolder: "05_MOON_RHYTHM", moonPhase: "Full Moon", practiceType: "Moon Rhythm" },
  { ...sharedReviewFields, id: "review-shakti-sankalpa", assetId: "ASSET-SHAKTI-SANKALPA-AUDIO-001", title: "Shakti Sankalpa and the 40 Day Path", sourceFolder: "03_AUDIO_REFLECTIONS", moonPhase: "", practiceType: "Audio Reflection" },
  { ...sharedReviewFields, id: "review-vow", assetId: "ASSET-VOW-BENEATH-PATH-001", title: "The Vow Beneath the Path", sourceFolder: "03_AUDIO_REFLECTIONS", moonPhase: "", practiceType: "Audio Reflection" },
];
