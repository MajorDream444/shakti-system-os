export type ShaktiVisualAsset = {
  id: string;
  sourceFilename: string;
  source: "Founder Visual Source v2";
  status: "APPROVED_CANDIDATE";
  derivativePath: string;
  pages: string[];
  role: string;
  cropBehavior: string;
  mobileBehavior: string;
  altTextIntent: string;
  replacementNotes: string;
};

export const shaktiVisualAssets: ShaktiVisualAsset[] = [
  {
    id: "founder-waterfall-v2-img-2359",
    sourceFilename: "IMG_2359.heif / IMG_2359.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath:
      "apps/web/src/shala/assets/images/founder-waterfall-v2-img-2359.jpg",
    pages: ["/", "/about-sheetal", "/offerings"],
    role:
      "Primary Waterfall doctrine and living-nature anchor; shows Sheetal in actual water/place rather than synthetic metaphor.",
    cropBehavior: "Editorial cover crop; preserve Sheetal, falling water, and green context.",
    mobileBehavior: "Center Sheetal and waterfall; avoid tight face-only crop.",
    altTextIntent: "Sheetal Kandola smiling near a waterfall.",
    replacementNotes:
      "Replace only with founder-approved water/waterfall photography carrying the same doctrine role.",
  },
  {
    id: "founder-portrait-v2-a3e7a30e",
    sourceFilename: "A3E7A30E-97EC-4489-894D-B030F5DA9855.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath:
      "apps/web/src/shala/assets/images/founder-portrait-v2-a3e7a30e.jpg",
    pages: ["/", "/about-sheetal", "/shala"],
    role:
      "Human founder anchor for trust, biography, and public method orientation.",
    cropBehavior: "Portrait crop; preserve bindi, face, and natural field context.",
    mobileBehavior: "Use a balanced portrait crop; do not over-zoom.",
    altTextIntent: "Sheetal Kandola in a green field with a flower in her hair.",
    replacementNotes:
      "Replace only with an approved founder portrait that remains human and not deity-coded.",
  },
  {
    id: "founder-red-veil-v2-img-2032",
    sourceFilename: "IMG_2032.heif / IMG_2032.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath:
      "apps/web/src/shala/assets/images/founder-red-veil-v2-img-2032.jpg",
    pages: ["/dancing-with-durga", "/shala"],
    role:
      "Durga-season founder presence; supports red/maroon/gold intensity while keeping Sheetal as facilitator, not deity.",
    cropBehavior: "Temple-world portrait crop; preserve red veil and face.",
    mobileBehavior: "Keep face and veil visible above the fold when used as a campaign anchor.",
    altTextIntent: "Sheetal Kandola wearing a red veil.",
    replacementNotes:
      "Replace if Sheetal provides a more specific Durga campaign founder portrait.",
  },
  {
    id: "founder-temple-v2-img-5130",
    sourceFilename: "IMG_5130.HEIC / IMG_5130.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath:
      "apps/web/src/shala/assets/images/founder-temple-v2-img-5130.jpg",
    pages: ["/", "/about-sheetal"],
    role:
      "Temple-context support image for Shri Shakti Shala as living sanctuary.",
    cropBehavior: "Preserve founder and temple/sacred context.",
    mobileBehavior: "Use as supporting context, not primary mobile hero.",
    altTextIntent: "Sheetal Kandola in a temple or sacred-context setting.",
    replacementNotes:
      "Replace with a clearer founder-approved temple/practice image if supplied.",
  },
  {
    id: "waterfall-nature-v2-img-5327",
    sourceFilename: "IMG_5327.HEIC / IMG_5327.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath:
      "apps/web/src/shala/assets/images/waterfall-nature-v2-img-5327.jpg",
    pages: ["/offerings", "/begin"],
    role:
      "Waterfall/nature breathing-space image for flow, reflection, and threshold.",
    cropBehavior: "Preserve waterfall and living green density.",
    mobileBehavior: "Use as atmospheric cover; avoid text directly over busy water detail.",
    altTextIntent: "Waterfall surrounded by green living nature.",
    replacementNotes:
      "Replace with founder-approved waterfall image if a calmer text-support crop is chosen.",
  },
];
