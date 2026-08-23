import { aboutSheetalCopy } from "../data/offerings";
import { FounderPresence } from "./FounderPresence";
import { PageShell } from "./PageShell";

export function AboutSheetalPage() {
  return (
    <PageShell className="about-sheetal-page">
      <section className="public-hero about-hero">
        <div className="container about-hero-intro">
          <p className="label">{aboutSheetalCopy.label}</p>
          <h1>{aboutSheetalCopy.title}</h1>
          <p>{aboutSheetalCopy.body}</p>
          <div className="hero-actions">
            {aboutSheetalCopy.links.map((link, index) => (
              <a
                className={`button ${index === 0 ? "button-primary" : "button-secondary"}`}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <FounderPresence />
      <section className="section source-boundary" aria-labelledby="source-boundary-title">
        <div className="container section-copy">
          <p className="label">Source Boundary</p>
          <h2 id="source-boundary-title">Trust grows through precision.</h2>
          <p>{aboutSheetalCopy.bodyTwo}</p>
        </div>
      </section>
    </PageShell>
  );
}
