import { portalCopy } from "../data/portalCopy";
import { useEmbers } from "../hooks/useEmbers";

export function TransitionQuote() {
  const embers = useEmbers();

  return (
    <section className="transition-quote" id="shadow">
      <div className="embers" aria-hidden="true">
        {embers.map((ember) => (
          <span
            className="ember"
            key={ember.id}
            style={{
              left: ember.left,
              top: ember.top,
              width: ember.size,
              height: ember.size,
              animationDuration: ember.duration,
              animationDelay: ember.delay,
            }}
          />
        ))}
      </div>
      <div className="quote-frame">
        <i />
        <p>{portalCopy.transitionQuote}</p>
        <i />
      </div>
    </section>
  );
}
