const waterfallThread = [
  "Energy is already moving.",
  "Leakage becomes visible.",
  "Awareness and capacity increase.",
  "Energy can be directed.",
  "Nourishment becomes possible.",
  "Sovereignty deepens.",
];

export function WaterfallDoctrine() {
  return (
    <section className="section waterfall-doctrine" aria-labelledby="waterfall-doctrine-title">
      <div className="container waterfall-layout">
        <figure
          className="waterfall-portrait energy-flow-portrait"
          data-asset-status="FOUNDER_SUPPLIED_PRODUCTION_CANDIDATE"
          data-image-gate="founder-acceptance-and-rights-confirmation-required"
        >
          <img
            src={portalImages.energyFlowCandidate}
            alt="Sheetal Kandola standing beside the ocean with one arm raised."
            loading="lazy"
          />
          <figcaption>Body, water, attention, and movement.</figcaption>
        </figure>
        <div className="section-copy waterfall-copy">
          <p className="label">Shakti Waterfall</p>
          <h2 id="waterfall-doctrine-title">Notice where energy flows.</h2>
          <p>
            The Waterfall is held here as emergent founder doctrine, not a fixed
            formula. It gives language to the way energy, awareness, capacity,
            nourishment, and sovereignty can begin to relate.
          </p>
          <div className="waterfall-thread" aria-label="Waterfall doctrine thread">
            {waterfallThread.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { portalImages } from "./PortalImageSlots";
