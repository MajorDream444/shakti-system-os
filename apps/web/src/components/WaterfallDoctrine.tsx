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
        <figure className="waterfall-portrait energy-flow-portrait">
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
            The Waterfall is a way of seeing, not a formula. It gives language
            to how energy, awareness, capacity, nourishment, and sovereignty
            begin to relate in you.
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
