/**
 * sanitize.js
 * XSS-safe HTML escaping utility.
 * Uses the browser's DOM text-node escaping, not a regex.
 */

/**
 * Escapes a string so it is safe to inject into innerHTML.
 * @param {*} str - Value to escape (coerced to string).
 * @returns {string} HTML-safe escaped string.
 */
export function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}
