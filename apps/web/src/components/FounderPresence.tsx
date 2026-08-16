import type { CSSProperties } from "react";
import { portalCopy } from "../data/portalCopy";
import { portalImages } from "./PortalImageSlots";

export function FounderPresence() {
  return (
    <section className="section founder-presence" id="founder">
      <div className="founder-aura" aria-hidden="true" />
      <div className="container founder-layout">
        <div className="founder-portrait reveal">
          <figure>
            <img src={portalImages.founder} alt="Sheetal Kandola in devotional presence" />
            <figcaption>
              <span>{portalCopy.founder.name}</span>
              <small>{portalCopy.founder.credentials[0]}</small>
            </figcaption>
          </figure>
          <div
            className="founder-context-image"
            style={{ "--context-image": `url(${portalImages.founderContext})` } as CSSProperties}
            aria-hidden="true"
          />
        </div>

        <div className="founder-copy reveal">
          <p className="label">{portalCopy.founder.label}</p>
          <h2>{portalCopy.founder.headline}</h2>
          <p className="founder-name">{portalCopy.founder.name}</p>
          <p>{portalCopy.founder.body}</p>
          <p>{portalCopy.founder.continuation}</p>
          <ul className="founder-credentials" aria-label="Sheetal's work includes">
            {portalCopy.founder.credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
