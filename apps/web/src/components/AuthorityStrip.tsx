import { useState } from "react";
import { portalCopy } from "../data/portalCopy";
import { knowledgeDoorways, type LivingDoorway } from "../data/livingDoorways";
import { KnowledgeChamber } from "./KnowledgeChamber";
import { LivingForm } from "./LivingPortal";
import { ArrowUpRight } from "lucide-react";

export function AuthorityStrip() {
  const [activeChamber, setActiveChamber] = useState<LivingDoorway | null>(null);

  return (
    <section className="authority-section" id="explore" aria-label="Explore this work">
      <div className="container authority-grid living-concepts">
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
            <LivingForm variant={index} />

            <h3>{pillar}</h3>
            <p>{chamber.summary}</p>
            <ArrowUpRight className="concept-arrow" aria-hidden="true" />
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
