import gatesImage from "../shala/assets/images/temple_gates_1783418503682.jpg";
import valleyImage from "../shala/assets/images/stillness_valley_1783418518708.jpg";
import libraryImage from "../shala/assets/images/temple_library_1783418534244.jpg";
import poolImage from "../shala/assets/images/reflection_pool_1783418551833.jpg";
import retreatImage from "../shala/assets/images/pilgrims_hall_1783418591416.jpg";
import founderImage from "../shala/assets/images/sheetal_founder_presence_2026-08.jpg";

export const portalImages = {
  hero: gatesImage,
  founder: founderImage,
  founderContext: valleyImage,
  library: libraryImage,
  water: poolImage,
  retreat: retreatImage,
} as const;

export function PortalImageGallery() {
  const images = [
    {
      src: portalImages.founder,
      label: "Sheetal's world",
      caption: "practice, lineage, and lived place",
    },
    {
      src: portalImages.water,
      label: "Reflection Pool",
      caption: "water, stillness, integration",
    },
    {
      src: portalImages.retreat,
      label: "Himalayan threshold",
      caption: "retreat as readiness, not rush",
    },
  ];

  return (
    <div className="portal-gallery" aria-label="Shakti Shala visual atmosphere">
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
