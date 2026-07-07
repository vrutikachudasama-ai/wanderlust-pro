/**
 * storage.js
 * Thin wrappers around localStorage / sessionStorage with JSON support.
 */

/** Read a JSON-serialised value from localStorage, returning fallback if absent. */
export function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** Write a value to localStorage as JSON. */
export function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Remove a key from localStorage. */
export function lsRemove(key) {
  localStorage.removeItem(key);
}

/** Read a JSON-serialised value from sessionStorage. */
export function ssGet(key, fallback = null) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** Write a value to sessionStorage as JSON. */
export function ssSet(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

/** Check whether a sessionStorage flag is set. */
export function ssHas(key) {
  return sessionStorage.getItem(key) !== null;
}
