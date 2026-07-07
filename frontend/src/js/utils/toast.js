/**
 * toast.js
 * Lightweight toast notification.
 * Depends on #toast and #toastMsg elements in index.html.
 */

let _toastTimer = null;

/**
 * Display a transient toast message.
 * @param {string} msg - The text to show.
 * @param {number} [duration=3000] - How long (ms) before the toast hides.
 */
export function showToast(msg, duration = 3000) {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}
