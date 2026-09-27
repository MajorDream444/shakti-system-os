import { useState, type CSSProperties } from "react";
import { portalCopy } from "../data/portalCopy";
import { knowledgeDoorways, methodDoorway, type LivingDoorway } from "../data/livingDoorways";
import { KnowledgeChamber } from "./KnowledgeChamber";
import { portalImages } from "./PortalImageSlots";
import { LivingForm } from "./LivingPortal";
import { SacredGlyph, type GlyphName } from "./SacredGlyph";

const methodRhythm = [
  "Listen to the body",
  "Meet the shadow",
  "Return to practice",
  "Choose the next doorway",
];

/* The five pillars.

   Two names each, and the split is the point. The crystal carries ONE word —
   the call, in her vocabulary, with the alliteration intact. The full
   published pillar name waits inside the chamber, once someone has chosen to
   enter.

   Founder direction, 2026-09-27: "On those floating crystals it should just
   say Shadow. Then when they enter, the next page can say Shadow & Inner
   Work. Shakti. Shadow. Somatics. Sensuality. Sovereignty. Keep that
   alliteration. We want the front page clean — people don't have much time."

   This replaced a CSS problem with an editorial answer. Two-word titles were
   being wrapped, shrunk and width-capped to keep them inside the teardrops;
   one word needs none of that.

   The full names and their glosses are the founder's own published wording,
   taken from her team's carousel and recorded in
   docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md. "Somatic Experiencing" is the
   correct term and must not drift toward "somatic breathwork", which is not
   her modality. */
const fivePillars = [
  {
    id: "shakti",
    glyph: "yantra" as GlyphName,
    short: "Shakti",
    full: "Shakti Embodiment",
    meaning: "Meet the Goddess through movement, breath and embodied practice.",
  },
  {
    id: "shadow",
    glyph: "spiral" as GlyphName,
    short: "Shadow",
    full: "Shadow & Inner Work",
    meaning:
      "Explore the patterns shaping how you love, protect and express yourself.",
  },
  {
    id: "somatics",
    glyph: "waves" as GlyphName,
    short: "Somatics",
    full: "Somatic Experiencing",
    meaning: "Listen to sensation. Create space for feeling.",
  },
  {
    id: "sensuality",
    glyph: "lotus" as GlyphName,
    short: "Sensuality",
    full: "Sensuality & Eros",
    meaning: "Reconnect with pleasure, senses and desire.",
  },
  {
    id: "sovereignty",
    glyph: "sun" as GlyphName,
    short: "Sovereignty",
    full: "Sovereignty & Power",
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
          {fivePillars.map((pillar, index) => {
            /* Matched by id, not by position: the published pillar order puts
               Somatic Experiencing before Sensuality & Eros, while
               knowledgeDoorways is the other way round. Indexing would have
               opened the wrong chamber on two of the five. */
            const base = knowledgeDoorways.find((entry) => entry.id === pillar.id);
            /* The chamber is where the full name belongs — it is the "next
               page" the founder described, so it carries the published
               pillar name rather than the one-word call on the crystal. */
            const doorway = base ? { ...base, title: pillar.full } : undefined;

            return (
              <article key={pillar.id}>
                <button
                  className="pillar-portal"
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => doorway && setActiveChamber(doorway)}
                  disabled={!doorway}
                >
                  <LivingForm variant={index} />

                  <SacredGlyph name={pillar.glyph} className="pillar-glyph" />
                  <h3>{pillar.short}</h3>
                  <p>{pillar.meaning}</p>
                  <span className="pillar-portal-cue" aria-hidden="true">
                    Enter
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
      <KnowledgeChamber
        chamber={activeChamber}
        onClose={() => setActiveChamber(null)}
      />
    </section>
  );
}
