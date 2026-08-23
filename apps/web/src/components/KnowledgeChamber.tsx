import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { LivingDoorway } from "../data/livingDoorways";

type KnowledgeChamberProps = {
  chamber: LivingDoorway | null;
  chambers?: LivingDoorway[];
  onClose: () => void;
  onSelect?: (chamber: LivingDoorway) => void;
};

const sectionLabels = [
  "Summary",
  "Deeper explanation",
  "Why it matters",
  "Example",
  "From Sheetal",
  "Connected to",
] as const;

export function KnowledgeChamber({
  chamber,
  chambers,
  onClose,
  onSelect,
}: KnowledgeChamberProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chamber) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chamber, onClose]);

  if (!chamber) return null;

  const currentIndex = chambers?.findIndex((item) => item.id === chamber.id) ?? -1;
  const next =
    chambers && currentIndex >= 0
      ? chambers[(currentIndex + 1) % chambers.length]
      : undefined;

  return createPortal(
    <div
      className={`knowledge-chamber-shell knowledge-chamber-shell-${chamber.id}`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`knowledge-chamber knowledge-chamber-${chamber.accent} knowledge-chamber-${chamber.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        tabIndex={-1}
      >
        <button
          className="chamber-close"
          type="button"
          onClick={onClose}
          aria-label={`Close ${chamber.title}`}
        >
          Close
        </button>

        <div className="chamber-hero">
          <p className="label">{chamber.symbol}</p>
          <h2 id={titleId}>{chamber.title}</h2>
          <p>{chamber.summary}</p>
        </div>

        <div className="chamber-visual" aria-hidden="true">
          <>
            <span className="chamber-symbol chamber-symbol-main" />
            <span className="chamber-symbol chamber-symbol-secondary" />
          </>
        </div>

        <div className="chamber-sections">
          <section>
            <span>{sectionLabels[1]}</span>
            <p>{chamber.deeper}</p>
          </section>
          <section>
            <span>{sectionLabels[2]}</span>
            <p>{chamber.why}</p>
          </section>
          <section>
            <span>{sectionLabels[3]}</span>
            <p>{chamber.example}</p>
          </section>
          <section>
            <span>{sectionLabels[4]}</span>
            <p>{chamber.fromSheetal}</p>
          </section>
          <section>
            <span>{sectionLabels[5]}</span>
            <div className="chamber-links" aria-label={`${chamber.title} connections`}>
              {chamber.connectedTo.map((connection) => (
                <i key={connection}>{connection}</i>
              ))}
            </div>
          </section>
        </div>

        <div className="chamber-actions">
          {next && onSelect ? (
            <button type="button" onClick={() => onSelect(next)}>
              {chamber.nextLabel}
            </button>
          ) : (
            <button type="button" onClick={onClose}>
              {chamber.nextLabel}
            </button>
          )}
          <button type="button" onClick={onClose}>
            Return to the portal
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
