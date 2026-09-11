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

export const portalImages = {
  hero: founderWaterfallV2,
  founder: founderPortraitV2,
  durgaFounder: founderRedVeilV2,
  founderContext: founderTempleV2,
  founderEditorial: founderEditorialV2,
  founderWaterfall: founderWaterfallV2,
  founderWaterfallRed: founderWaterfallRedV2,
  waterfallNature: waterfallNatureV2,
  legacyFounder: founderImage,
  legacyDurgaFounder: durgaFounderImage,
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
      src: portalImages.founderWaterfall,
      label: "Shakti Waterfall",
      caption: "energy, flow, and direction",
    },
    {
      src: portalImages.founder,
      label: "Sheetal Kandola",
      caption: "founder, practitioner, and guide",
    },
    {
      src: portalImages.founderContext,
      label: "Shri Shakti Shala",
      caption: "living school and sanctuary",
    },
    {
      src: portalImages.gates,
      label: "Temple threshold",
      caption: "practice before deeper access",
    },
  ];

  return (
    <div className="portal-gallery" aria-label="Shri Shakti Shala visual atmosphere">
      {images.map((image) => (
        <figure key={image.label} className="portal-gallery-frame">
          <img src={image.src} alt="" loading="eager" />
          <figcaption>
            <span>{image.label}</span>
            <small>{image.caption}</small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
