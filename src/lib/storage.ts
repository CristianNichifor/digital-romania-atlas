// localStorage throws in private windows and when site data is blocked; the
// atlas then simply forgets preferences instead of failing to render.

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable: keep the value for this session only.
  }
}
