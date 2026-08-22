import { useState, type CSSProperties } from "react";
import { portalCopy } from "../data/portalCopy";
import { methodDoorway, type LivingDoorway } from "../data/livingDoorways";
import { KnowledgeChamber } from "./KnowledgeChamber";
import { portalImages } from "./PortalImageSlots";

export function Philosophy() {
  const [activeChamber, setActiveChamber] = useState<LivingDoorway | null>(null);

  return (
    <section className="section philosophy" id="method">
      <div className="container philosophy-grid">
        <div className="section-copy reveal">
          <p className="label">{portalCopy.philosophy.label}</p>
          <h2>{portalCopy.philosophy.headline}</h2>
          {portalCopy.philosophy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div
          className="ritual-card gradient-shell reveal"
          style={{ "--ritual-image": `url(${portalImages.library})` } as CSSProperties}
        >
          <div className="ritual-orb" />
          <p className="ritual-kicker">{portalCopy.ritualCard.kicker}</p>
          <h3>{portalCopy.ritualCard.headline}</h3>
          <p>{portalCopy.ritualCard.body}</p>
          <button
            className="text-doorway"
            type="button"
            onClick={() => setActiveChamber(methodDoorway)}
          >
            Open the method
          </button>
        </div>
      </div>
      <KnowledgeChamber
        chamber={activeChamber}
        onClose={() => setActiveChamber(null)}
      />
    </section>
  );
}
