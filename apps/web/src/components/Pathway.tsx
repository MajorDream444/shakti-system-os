import { portalCopy } from "../data/portalCopy";

export function Pathway() {
  return (
    <section className="section pathway" id="pathway">
      <div className="container">
        <div className="section-heading">
          <p className="label">{portalCopy.pathway.label}</p>
          <h2>{portalCopy.pathway.headline}</h2>
          <p>{portalCopy.pathway.copy}</p>
        </div>
        <div className="pathway-grid">
          {portalCopy.pathway.steps.map((step, index) => (
            <article className="pathway-card" key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
