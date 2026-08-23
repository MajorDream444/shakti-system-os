import { testimonialArchitecture } from "../data/offerings";
import { PageShell } from "./PageShell";

export function TestimonialsPage() {
  return (
    <PageShell className="testimonials-page">
      <section className="public-hero testimonial-hero">
        <div className="container testimonial-layout">
          <div>
            <p className="label">{testimonialArchitecture.label}</p>
            <h1>{testimonialArchitecture.title}</h1>
            <p>{testimonialArchitecture.body}</p>
            <div className="hero-actions">
              {testimonialArchitecture.links.map((link, index) => (
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
          <div className="testimonial-field-card" aria-label="Testimonial publication fields">
            {testimonialArchitecture.fields.map((field) => (
              <span key={field}>{field}</span>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
