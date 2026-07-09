import { useState } from "react";
import {
  NAV_TARGETS,
  SECTION_ANCHORS,
  SHALA_PATH,
} from "../constants/navigation";
import { SCROLLED_NAV_THRESHOLD } from "../constants/animation";
import { portalCopy } from "../data/portalCopy";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useScrollState } from "../hooks/useScrollState";
import { RitualService } from "../services/RitualService";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollState(SCROLLED_NAV_THRESHOLD);

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () =>
    setIsMenuOpen((isOpen) =>
      RitualService.closeSanctuaryMenu({ isMenuOpen: isOpen }).isMenuOpen,
    );

  return (
    <>
      <nav className={`site-nav ${isScrolled ? "scrolled" : ""}`}>
        <a className="nav-logo" href={SECTION_ANCHORS.hero} onClick={closeMenu}>
          SHAKTI PORTAL
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          {portalCopy.nav.map((item) => (
            <a href={NAV_TARGETS[item]} key={item}>
              {item}
            </a>
          ))}
        </div>
        <a className="nav-start" href={SHALA_PATH}>
          Start
        </a>
        <button
          className={`menu-button ${isMenuOpen ? "active" : ""}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() =>
            setIsMenuOpen((isOpen) =>
              RitualService.toggleSanctuaryMenu({ isMenuOpen: isOpen })
                .isMenuOpen,
            )
          }
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        {portalCopy.nav.map((item) => (
          <a
            className="mobile-link"
            href={NAV_TARGETS[item]}
            key={item}
            onClick={closeMenu}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}
