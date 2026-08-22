import { useState } from "react";
import { portalCopy } from "../data/portalCopy";
import { pathwayDoorways, type LivingDoorway } from "../data/livingDoorways";
import { KnowledgeChamber } from "./KnowledgeChamber";

export function Pathway() {
  const [activeChamber, setActiveChamber] = useState<LivingDoorway | null>(null);

  return (
    <section className="section pathway" id="pathway">
      <div className="container">
        <div className="section-heading">
          <p className="label">{portalCopy.pathway.label}</p>
          <h2>{portalCopy.pathway.headline}</h2>
          <p>{portalCopy.pathway.copy}</p>
        </div>
        <div className="pathway-grid">
          {portalCopy.pathway.steps.map((step, index) => {
            const chamber = pathwayDoorways[index];

            return (
            <button
              className="pathway-card"
              key={step.title}
              type="button"
              onClick={() => setActiveChamber(chamber)}
              aria-label={`Open ${step.title} doorway`}
            >
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </button>
            );
          })}
        </div>
      </div>
      <KnowledgeChamber
        chamber={activeChamber}
        chambers={pathwayDoorways}
        onClose={() => setActiveChamber(null)}
        onSelect={setActiveChamber}
      />
    </section>
  );
}
