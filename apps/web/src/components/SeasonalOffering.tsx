import { DANCING_WITH_DURGA_PATH } from "../constants/navigation";
import { dancingWithDurga } from "../data/dancingWithDurga";
import { portalImages } from "./PortalImageSlots";

/* The season's open container, on the home page.

   Added 2026-09-26 for the Guided Path homepage. The home page previously
   named Dancing with Durga only in the hero's second door and in the seasonal
   line — a visitor who scrolled past the first screen never saw the one thing
   that is actually open and bookable right now.

   Deliberately not permanent furniture. The founder's direction is that
   seasonal containers rotate, so this band takes its content from
   data/dancingWithDurga.ts and should be re-pointed, not rebuilt, when
   Navratri closes on 19 October. */
export function SeasonalOffering() {
  return (
    <section className="section seasonal-offering" aria-labelledby="seasonal-offering-title">
      <div className="container seasonal-offering-grid">
        <figure className="seasonal-offering-art">
          <img
            src={portalImages.durgaApprovedArtwork}
            alt="Devotional artwork of Maa Durga seated with her lion"
            loading="lazy"
          />
        </figure>

        <div className="seasonal-offering-copy">
          <p className="label">Open now · Navratri 2026</p>
          <h2 id="seasonal-offering-title">Dancing with Durga</h2>
          <p className="seasonal-offering-lede">
            {dancingWithDurga.subtitle}. Four live gatherings and five practice
            nights, 11–19 October, {dancingWithDurga.timing}.
          </p>
          <p className="seasonal-offering-essence">
            For women learning to say no without apologising, feel anger without
            being consumed, and stand in power without abandoning tenderness.
          </p>

          <div className="seasonal-offering-actions">
            {dancingWithDurga.paymentOptions.map((option) => (
              <a
                key={option.id}
                className="seasonal-offering-price"
                href={option.href}
              >
                <span className="seasonal-offering-price-label">{option.label}</span>
                <strong>{option.price}</strong>
              </a>
            ))}
          </div>

          <a className="seasonal-offering-more" href={DANCING_WITH_DURGA_PATH}>
            See all nine nights
          </a>
        </div>
      </div>
    </section>
  );
}
