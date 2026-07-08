type PersistableValue = string | number | boolean | null | PersistableObject;
type PersistableObject =
  | PersistableValue[]
  | { [key: string]: PersistableValue | undefined };

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export const PersistenceService = {
  read<T>(key: string, fallback: T): T {
    if (!canUseStorage()) {
      return fallback;
    }

    try {
      const rawValue = window.localStorage.getItem(key);
      return rawValue === null ? fallback : (JSON.parse(rawValue) as T);
    } catch {
      return fallback;
    }
  },

  write<T extends PersistableValue>(key: string, value: T) {
    if (!canUseStorage()) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string) {
    if (!canUseStorage()) {
      return;
    }

    window.localStorage.removeItem(key);
  },
};
