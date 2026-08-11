import type {
  VaultAccessLevel,
  VaultKnowledgeMaturity,
  VaultMediaType,
  VaultPublishingStatus,
} from "../types/vault";

export const VAULT_LIBRARY_TABLE_NAME = "Library Assets";

export const VAULT_DEFAULT_ACCESS_LEVEL: VaultAccessLevel = "Seeker";
export const VAULT_DEFAULT_PUBLISHING_STATUS: VaultPublishingStatus =
  "Needs Review";
export const VAULT_DEFAULT_KNOWLEDGE_MATURITY: VaultKnowledgeMaturity =
  "Raw Recording";

export const VAULT_KNOWLEDGE_MATURITY_STAGES: readonly VaultKnowledgeMaturity[] =
  [
    "Raw Recording",
    "Transcript Generated",
    "Transcript Reviewed",
    "Doctrine Extracted",
    "Media Tagged",
    "Library Ready",
    "Sheetal Approved",
    "Published",
    "Repurposed Complete",
  ];

export const VAULT_MEDIA_EXTENSION_MAP: Readonly<Record<string, VaultMediaType>> =
  {
    pdf: "PDF",
    mp3: "Audio",
    m4a: "Audio",
    wav: "Audio",
    mp4: "Video",
    mov: "Video",
    jpg: "Image",
    jpeg: "Image",
    png: "Image",
    webp: "Image",
    doc: "Document",
    docx: "Document",
    txt: "Document",
    md: "Document",
    ppt: "Slide Deck",
    pptx: "Slide Deck",
  };

export const VAULT_FOLDER_HINTS = {
  practices: ["practice", "practices", "somatic", "breath"],
  ceremony: ["ceremony", "ritual", "moon"],
  retreat: ["retreat", "bali", "himalaya", "preparation"],
  goddess: ["goddess", "kali", "lakshmi", "saraswati", "durga"],
  transcript: ["transcript", "recording", "notes"],
} as const;
