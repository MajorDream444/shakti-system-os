import gatesImage from "../shala/assets/images/temple_gates_1783418503682.jpg";
import valleyImage from "../shala/assets/images/stillness_valley_1783418518708.jpg";
import libraryImage from "../shala/assets/images/temple_library_1783418534244.jpg";
import poolImage from "../shala/assets/images/reflection_pool_1783418551833.jpg";
import retreatImage from "../shala/assets/images/pilgrims_hall_1783418591416.jpg";
import founderImage from "../shala/assets/images/sheetal_founder_presence_2026-08.jpg";
import durgaFounderImage from "../shala/assets/images/sheetal_durga_field_2026-08-31.jpeg";
import founderPortraitV2 from "../shala/assets/images/founder-portrait-v2-a3e7a30e.jpg";
import founderRedVeilV2 from "../shala/assets/images/founder-red-veil-v2-img-2032.jpg";
import founderWaterfallV2 from "../shala/assets/images/founder-waterfall-v2-img-2359.jpg";
import founderWaterfallRedV2 from "../shala/assets/images/founder-waterfall-red-v2-img-4518.jpg";
import founderTempleV2 from "../shala/assets/images/founder-temple-v2-img-5130.jpg";
import waterfallNatureV2 from "../shala/assets/images/waterfall-nature-v2-img-5327.jpg";
import founderEditorialV2 from "../shala/assets/images/founder-editorial-v2-jul06198.jpg";
import founderSuppliedRedRiver from "../shala/assets/images/founder-supplied-red-river-sept15.jpg";
import founderSuppliedOceanMovement from "../shala/assets/images/founder-supplied-ocean-movement-sept15.jpg";
import founderRedPrayerHands from "../shala/assets/images/founder-red-prayer-hands-sept18.jpg";
import durgaApprovedArtwork from "../shala/assets/images/durga-approved-art-sept23.jpg";
import durgaNineFormsArtwork from "../shala/assets/images/durga-nine-forms-approved-sept23.jpg";
import founderHolySpring from "../shala/assets/images/founder-holy-spring-sept24.jpg";

export const portalImages = {
  founder: founderPortraitV2,
  founderWelcome: founderRedPrayerHands,
  durgaFounder: founderRedVeilV2,
  founderContext: founderTempleV2,
  founderEditorial: founderEditorialV2,
  founderWaterfall: founderWaterfallV2,
  founderWaterfallRed: founderWaterfallRedV2,
  waterfallNature: waterfallNatureV2,
  homeWorldCandidate: founderWaterfallRedV2,
  beginTerrainCandidate: founderSuppliedRedRiver,
  energyFlowCandidate: founderSuppliedOceanMovement,
  legacyFounder: founderImage,
  legacyDurgaFounder: durgaFounderImage,
  durgaApprovedArtwork,
  durgaNineFormsArtwork,
  founderHolySpring,
  gates: gatesImage,
  library: libraryImage,
  water: waterfallNatureV2,
  ascent: valleyImage,
  retreat: retreatImage,
  pool: poolImage,
} as const;

export function PortalImageGallery() {
  const images = [
    {
      src: portalImages.founderHolySpring,
      label: "Sheetal Kandola",
      caption: "devotion at the holy spring",
      alt: "Sheetal Kandola waist-deep in a Balinese holy spring in red, hands together in prayer before a golden lotus and carved shrine",
    },
    {
      src: portalImages.founderWelcome,
      label: "Sheetal Kandola",
      caption: "founder, practitioner, and guide",
      alt: "Sheetal Kandola smiling in a red veil with her hands together in greeting",
    },
    {
      src: portalImages.waterfallNature,
      label: "Shakti Waterfall",
      caption: "energy, flow, and direction",
    },
    {
      src: portalImages.gates,
      label: "Temple threshold",
      caption: "practice before deeper access",
    },
  ];

  return (
    <div className="portal-gallery" aria-label="Sri Shakti Shala visual atmosphere">
      {images.map((image) => (
        /* The caption used to sit inside the frame, which is clipped to an
           arch or an oval. At the caption's baseline the curve cuts across
           the text, so labels read as "...kti Waterfall" and "founder,
           practitioner" with the rest gone. The image now has its own
           clipped element and the caption sits below it, outside the shape. */
        <figure key={image.label} className="portal-gallery-frame">
          <div className="portal-gallery-media">
            <img src={image.src} alt={"alt" in image ? image.alt : ""} loading="eager" />
          </div>
          <figcaption>
            <span>{image.label}</span>
            <small>{image.caption}</small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
