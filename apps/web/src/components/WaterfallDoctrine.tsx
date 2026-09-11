import { portalImages } from "./PortalImageSlots";

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
        <figure className="waterfall-portrait">
          <img
            src={portalImages.founderWaterfall}
            alt="Sheetal Kandola smiling near a waterfall"
            loading="lazy"
          />
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
