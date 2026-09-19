import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LivingPortal, PortalMotionControl } from "./LivingPortal";
import waterfall from "../shala/assets/images/waterfall-nature-v2-img-5327.jpg";
import { portalCopy } from "../data/portalCopy";
import { pathwayDoorways, type LivingDoorway } from "../data/livingDoorways";
import { KnowledgeChamber } from "./KnowledgeChamber";

export function Pathway() {
  const [activeChamber, setActiveChamber] = useState<LivingDoorway | null>(null);
  const [motionPaused, setMotionPaused] = useState(false);

  return (
    <section className={`section pathway pathway--living ${motionPaused ? 'portals-paused' : ''}`} id="pathway">
      <img className="pathway-water-environment" src={waterfall} alt="" aria-hidden="true" loading="lazy" />
      <div className="container">
        <div className="section-heading">
          <p className="label">{portalCopy.pathway.label}</p>
          <h2>{portalCopy.pathway.headline}</h2>
          <p>{portalCopy.pathway.copy}</p>
          <PortalMotionControl paused={motionPaused} onToggle={() => setMotionPaused(!motionPaused)} />
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
              <LivingPortal variant={index} />

              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <ArrowRight className="portal-arrow" aria-hidden="true" />
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
