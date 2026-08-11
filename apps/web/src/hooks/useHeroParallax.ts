import { useEffect } from "react";
import type { RefObject } from "react";
import {
  HERO_PARALLAX_LIMIT_MULTIPLIER,
  HERO_PARALLAX_OFFSET_MULTIPLIER,
  HERO_PARALLAX_SCALE,
} from "../constants/animation";

export function useHeroParallax(visualRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) {
        return;
      }

      window.requestAnimationFrame(() => {
        if (
          visualRef.current &&
          window.scrollY < window.innerHeight * HERO_PARALLAX_LIMIT_MULTIPLIER
        ) {
          visualRef.current.style.transform = `translateY(${
            window.scrollY * HERO_PARALLAX_OFFSET_MULTIPLIER
          }px) scale(${HERO_PARALLAX_SCALE})`;
        }
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visualRef]);
}
