import { useEffect, useState } from "react";
import { RitualService } from "../services/RitualService";
import type { Ember } from "../types/ritual";

export function useEmbers() {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEmbers(RitualService.createEmbers());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return embers;
}
