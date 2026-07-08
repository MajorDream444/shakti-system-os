import { EMBER_COUNT } from "../constants/animation";
import type { Ember, SanctuaryUiState } from "../types/ritual";

export const RitualService = {
  openSanctuaryMenu(state: SanctuaryUiState): SanctuaryUiState {
    return { ...state, isMenuOpen: true };
  },

  closeSanctuaryMenu(state: SanctuaryUiState): SanctuaryUiState {
    return { ...state, isMenuOpen: false };
  },

  toggleSanctuaryMenu(state: SanctuaryUiState): SanctuaryUiState {
    return { ...state, isMenuOpen: !state.isMenuOpen };
  },

  createEmbers(count = EMBER_COUNT): Ember[] {
    return Array.from({ length: count }, (_, id) => ({
      id,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2.4}px`,
      duration: `${3 + Math.random() * 5}s`,
      delay: `${Math.random() * 4}s`,
    }));
  },
};
