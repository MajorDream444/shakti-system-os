export type ShaktiVisualAsset = {
  id: string;
  sourceFilename: string;
  source: "Founder Visual Source v2" | "Founder-supplied Sept. 15 review source" | "Founder-selected Sept. 18 site review";
  status: "APPROVED_CANDIDATE" | "FOUNDER_SUPPLIED_PRODUCTION_CANDIDATE" | "FOUNDER_SUPPLIED_PROVENANCE_REQUIRED" | "FOUNDER_SELECTED_PLACEMENT_APPROVED";
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
    id: "founder-waterfall-red-v2-img-4518",
    sourceFilename: "IMG_4518.HEIC / IMG_4518.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath: "apps/web/src/shala/assets/images/founder-waterfall-red-v2-img-4518.jpg",
    pages: ["/"],
    role: "Home arrival environment: Sheetal as the human anchor inside real waterfall, jungle, movement, and red devotional energy.",
    cropBehavior: "Full-bleed crop centered slightly low; preserve Sheetal's raised gesture, face and body while retaining visible waterfall and living jungle.",
    mobileBehavior: "Keep Sheetal's raised hand and body legible with water and foliage still establishing the environment; avoid a face-only crop.",
    altTextIntent: "Decorative environmental layer behind separately readable Home content.",
    replacementNotes: "Use once on Home for the arrival world. Do not repeat it in another prominent Home section without an approved narrative reason.",
  },
  {
    id: "founder-red-prayer-hands-sept18",
    sourceFilename: "IMG_3201.PNG",
    source: "Founder-selected Sept. 18 site review",
    status: "FOUNDER_SELECTED_PLACEMENT_APPROVED",
    derivativePath: "apps/web/src/shala/assets/images/founder-red-prayer-hands-sept18.jpg",
    pages: ["/"],
    role: "Home visual gallery welcoming founder portrait, replacing the rejected temporary portrait in that exact slot.",
    cropBehavior: "Preserve Sheetal's face, red veil, and prayer hands; adjust the crop within the existing gallery form rather than selecting another photograph.",
    mobileBehavior: "Keep the face and greeting visible in the single-column gallery crop.",
    altTextIntent: "Sheetal Kandola smiling in a red veil with her hands together in greeting.",
    replacementNotes: "Placement selected by Sheetal on Sept. 18. Final web-publication rights and full founder transcript remain to be attached to the release record.",
  },
  {
    id: "founder-supplied-red-waterfall-sept15",
    sourceFilename: "IbjmmIyD5RXQZA8_U6YI5mMx6NcrH-fg12C-ooYEBT2bX1zfm6v1zRTTV_Se6OMrxxw7Y9TTNf3cbf-j7lVXjIo2GdErBKer01rz9lgEoMs5EMqKgwUwAKzsYHLT4wsvjbwzxPfLV1trCVDbl7_U_tahNUBlhTJjrpPmygKDfDH1l-eJSUvv9pgFutNwXjdA.jpeg",
    source: "Founder-supplied Sept. 15 review source",
    status: "FOUNDER_SUPPLIED_PROVENANCE_REQUIRED",
    derivativePath: "apps/web/src/shala/assets/images/founder-supplied-red-waterfall-sept15.jpg",
    pages: ["/"],
    role: "Local-review Home world: water, red living nature, depth, and environmental arrival without repeating a founder portrait.",
    cropBehavior: "Full-bleed landscape crop; preserve the stepped waterfall and red canopy while keeping the central copy readable.",
    mobileBehavior: "Favor the waterfall terraces and red foliage; do not crop to a featureless patch of leaves.",
    altTextIntent: "Decorative environmental layer behind separately readable Home content.",
    replacementNotes: "Do not deploy or publish until provenance, rights, and founder placement acceptance are confirmed.",
  },
  {
    id: "founder-supplied-red-river-sept15",
    sourceFilename: "vMz4QrjL50suLL_BsCuEo94GvSKfwe6ShiRUcaS5SW3PSlcYPCNXdG1i3fskiHXRvqia3J8Sjd9NXfsKOdrVmED6VvlfQ1fsAD4KiPDb3eoS1m3pgQLYPYoZtKkU4-YQVLXCxYYFBB-fk51H7g8Mr9kRLCFUAHUhnG-g5RyKa0plBd3EGDbHjZjUGOuXgkEW.jpeg",
    source: "Founder-supplied Sept. 15 review source",
    status: "FOUNDER_SUPPLIED_PROVENANCE_REQUIRED",
    derivativePath: "apps/web/src/shala/assets/images/founder-supplied-red-river-sept15.jpg",
    pages: ["/begin"],
    role: "Local-review early Begin terrain: the river supplies direction, distance, scale, mist, and somewhere to go.",
    cropBehavior: "Keep the branching river visible through the forest; early stations use the landscape before later stations transition to the existing founder-library waterfall.",
    mobileBehavior: "Center the strongest river bend beneath the mist; verify the path remains legible at narrow crops.",
    altTextIntent: "Decorative journey environment behind separately readable Begin content.",
    replacementNotes: "Do not deploy or publish until provenance, rights, and founder placement acceptance are confirmed.",
  },
  {
    id: "founder-supplied-ocean-movement-sept15",
    sourceFilename: "WhatsApp Image 2026-09-15 at 14.11.58.jpeg",
    source: "Founder-supplied Sept. 15 review source",
    status: "FOUNDER_SUPPLIED_PRODUCTION_CANDIDATE",
    derivativePath: "apps/web/src/shala/assets/images/founder-supplied-ocean-movement-sept15.jpg",
    pages: ["/"],
    role: "Notice where energy flows: Sheetal, bodily direction, raised-arm movement, water, horizon, and spacious attention.",
    cropBehavior: "Editorial portrait crop; preserve Sheetal's full raised arm, ocean horizon, and enough open sky for scale.",
    mobileBehavior: "Use a tall crop that retains hand, face, ocean, and grounded stance.",
    altTextIntent: "Sheetal Kandola standing beside the ocean with one arm raised.",
    replacementNotes: "Founder supplied; final placement acceptance and publication rights confirmation remain required.",
  },
  {
    id: "begin-water-canopy-v2-img-4675",
    sourceFilename: "IMG_4675.heif / IMG_4675.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath: "apps/web/src/shala/assets/images/begin-water-canopy-v2-img-4675.jpg",
    pages: ["/begin"],
    role: "Local review candidate: continuous water, canopy and stone environment across Begin; not literal Himalayan terrain or approved sacred art.",
    cropBehavior: "Upper canopy/water crop. Full source includes Sheetal near the base; environment is the intended focus, not another founder portrait.",
    mobileBehavior: "Single 300px environmental opening; text on opaque reading surfaces. Never repeat as a foreground image.",
    altTextIntent: "Decorative environmental photograph behind separately readable journey content.",
    replacementNotes: "Founder placement acceptance and publication rights remain gated. New candidate selection does not resolve the Home hero or energy-flow replacement gates.",
  },
  {
    id: "founder-waterfall-v2-img-2359",
    sourceFilename: "IMG_2359.heif / IMG_2359.jpg",
    source: "Founder Visual Source v2",
    status: "APPROVED_CANDIDATE",
    derivativePath:
      "apps/web/src/shala/assets/images/founder-waterfall-v2-img-2359.jpg",
    pages: ["/", "/about-sheetal", "/offerings"],
    role:
      "Home: one foreground Shakti Waterfall placement only. Primary Waterfall doctrine anchor; not a hero background or energy-flow illustration.",
    cropBehavior: "Editorial cover crop; preserve Sheetal, falling water, and green context.",
    mobileBehavior: "Center Sheetal and waterfall; avoid tight face-only crop.",
    altTextIntent: "Sheetal Kandola smiling near a waterfall.",
    replacementNotes:
      "Retain the Home Shakti Waterfall placement. Hero background and Notice where energy flows require separately approved replacements; do not reuse this photograph there.",
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
      "Temple-context support image for Sri Shakti Shala as living sanctuary.",
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
    pages: ["/", "/offerings", "/begin"],
    role:
      "Waterfall/nature breathing-space image for flow, reflection, and threshold; Home pathway environment and non-sacred organic portal surfaces in Home and Begin pace choices.",
    cropBehavior: "Preserve waterfall and living green density.",
    mobileBehavior: "Use as atmospheric cover; avoid text directly over busy water detail.",
    altTextIntent: "Waterfall surrounded by green living nature.",
    replacementNotes:
      "Replace with founder-approved waterfall image if a calmer text-support crop is chosen.",
  },
];
