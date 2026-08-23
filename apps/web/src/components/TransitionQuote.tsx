import { portalCopy } from "../data/portalCopy";

export function TransitionQuote() {
  return (
    <section className="transition-quote" id="shadow">
      <div className="candlelight-field" aria-hidden="true" />
      <div className="quote-frame">
        <i />
        <p>{portalCopy.transitionQuote}</p>
        <i />
      </div>
    </section>
  );
}
