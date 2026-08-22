import { useState } from "react";
import { portalCopy } from "../data/portalCopy";
import { knowledgeDoorways, type LivingDoorway } from "../data/livingDoorways";
import { KnowledgeChamber } from "./KnowledgeChamber";

export function AuthorityStrip() {
  const [activeChamber, setActiveChamber] = useState<LivingDoorway | null>(null);

  return (
    <section className="authority-section" id="explore" aria-label="Explore this work">
      <div className="container authority-grid">
        {portalCopy.pillars.map((pillar, index) => {
          const chamber = knowledgeDoorways[index];

          return (
          <button
            className="authority-pillar"
            key={pillar}
            type="button"
            onClick={() => setActiveChamber(chamber)}
            aria-label={`Open ${pillar} knowledge chamber`}
          >
            <span>0{index + 1}</span>
            <h3>{pillar}</h3>
            <p>{chamber.summary}</p>
          </button>
          );
        })}
      </div>
      <KnowledgeChamber
        chamber={activeChamber}
        chambers={knowledgeDoorways}
        onClose={() => setActiveChamber(null)}
        onSelect={setActiveChamber}
      />
    </section>
  );
}
