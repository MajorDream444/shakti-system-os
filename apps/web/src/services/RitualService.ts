import { EMBER_COUNT } from "../constants/animation";
import type { SeekerState } from "../shala/types";
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

  completePractice(state: SeekerState, practiceId: string): SeekerState {
    const completedPractices = state.completedPractices.includes(practiceId)
      ? state.completedPractices
      : [...state.completedPractices, practiceId];

    return {
      ...state,
      hoursInStillness: Number((state.hoursInStillness + 0.25).toFixed(1)),
      completedPractices,
    };
  },

  saveJournalEntry(
    state: SeekerState,
    content: string,
    now = new Date(),
  ): SeekerState {
    return {
      ...state,
      hoursInStillness: Number((state.hoursInStillness + 0.5).toFixed(1)),
      journalEntries: [
        {
          id: `entry-${now.getTime()}`,
          date: now.toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          content,
        },
        ...state.journalEntries,
      ],
    };
  },

  toggleLamp(state: SeekerState, roomId: string): SeekerState {
    const litLamps = state.litLamps ?? [];

    return {
      ...state,
      litLamps: litLamps.includes(roomId)
        ? litLamps.filter((id) => id !== roomId)
        : [...litLamps, roomId],
    };
  },

  incrementPrayerFlags(state: SeekerState): SeekerState {
    return {
      ...state,
      prayerFlagsCount: (state.prayerFlagsCount ?? 0) + 1,
    };
  },
};
