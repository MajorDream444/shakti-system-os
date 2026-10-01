import { Nav } from "./Nav";
import { Footer } from "./Footer";
import {
  LEGAL_LAST_UPDATED,
  legalFooterNote,
  legalSections,
} from "../data/legalCopy";

/* Renders **bold** inline, because the copy is written as prose with emphasis
   rather than as markup. Nothing here accepts user input, so there is no
   injection surface — the source is a checked-in constant. */
function withEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

/* One page, three sections, in the order that matters to a reader rather than
   the order a lawyer would file them: what this work IS before what it costs,
   and what it costs before what happens to your data.

   Deliberately plain. Her audience skews older and includes women reading in
   a second language; dense legal prose would technically discharge the duty
   while communicating nothing. */
export function LegalPage() {
  return (
    <>
      <Nav />
      <main className="app-shell legal-page">
        <section className="section">
          <div className="container legal-shell">
            <header className="legal-header">
              <p className="label">Please read</p>
              <h1>Important information</h1>
              <p className="legal-lede">
                This covers what this work is and is not, what you are buying,
                and what happens to anything you tell us. It is written to be
                read, not skimmed past.
              </p>
              <p className="legal-updated">Last updated {LEGAL_LAST_UPDATED}</p>
            </header>

            <nav className="legal-contents" aria-label="On this page">
              {legalSections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </nav>

            {legalSections.map((section) => (
              <section className="legal-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.lede && <p className="legal-section-lede">{section.lede}</p>}
                {section.blocks.map((block, blockIndex) => (
                  <div className="legal-block" key={block.heading ?? blockIndex}>
                    {block.heading && <h3>{block.heading}</h3>}
                    {block.body.map((paragraph) => (
                      <p key={paragraph}>{withEmphasis(paragraph)}</p>
                    ))}
                  </div>
                ))}
              </section>
            ))}

            <p className="legal-foot">{legalFooterNote}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
