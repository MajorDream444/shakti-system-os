import { useState, type CSSProperties } from "react";
import { portalCopy } from "../data/portalCopy";
import { methodDoorway, type LivingDoorway } from "../data/livingDoorways";
import { KnowledgeChamber } from "./KnowledgeChamber";
import { portalImages } from "./PortalImageSlots";
import { LivingForm } from "./LivingPortal";

const methodRhythm = [
  "Listen to the body",
  "Meet the shadow",
  "Return to practice",
  "Choose the next doorway",
];

/* The five pillars, in the founder's own published wording.

   These names and glosses are taken verbatim from the Dancing with Durga
   carousel her social team published, and are recorded in
   docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md. They replace one-word
   paraphrases the build had invented ("Shakti", "Shadow", "Somatics"), which
   said roughly the same thing in words she does not use.

   Two are worth not "tidying" later. "Somatic Experiencing" is the correct
   term and must not drift to "somatic breathwork", which is not her modality.
   "Sovereignty & Power" stays because it is a published pillar name, even
   though the word is rare in her everyday writing. */
const fivePillars = [
  {
    name: "Shakti Embodiment",
    meaning: "Meet the Goddess through movement, breath and embodied practice.",
  },
  {
    name: "Shadow & Inner Work",
    meaning:
      "Explore the patterns shaping how you love, protect and express yourself.",
  },
  {
    name: "Somatic Experiencing",
    meaning: "Listen to sensation. Create space for feeling.",
  },
  {
    name: "Sensuality & Eros",
    meaning: "Reconnect with pleasure, senses and desire.",
  },
  {
    name: "Sovereignty & Power",
    meaning:
      "Become a safe space for yourself. Honour your boundaries. Live your dharma.",
  },
];

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
          <ol className="method-rhythm" aria-label="How Sheetal works">
            {methodRhythm.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
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
        <div className="five-pillar-constellation living-concepts" aria-label="Five pillars of Shakti Shadow and Somatics">
          {fivePillars.map((pillar, index) => (
            <article key={pillar.name}>
              <LivingForm variant={index} />

              <h3>{pillar.name}</h3>
              <p>{pillar.meaning}</p>
            </article>
          ))}
        </div>
      </div>
      <KnowledgeChamber
        chamber={activeChamber}
        onClose={() => setActiveChamber(null)}
      />
    </section>
  );
}
