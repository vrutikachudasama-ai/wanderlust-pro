/**
 * modal.js
 * Manages modal open/close state with a reference counter so nested modals
 * don't prematurely restore body scroll.
 */

let _openModalCount = 0;

/**
 * Open a modal by ID. Locks body scroll.
 * @param {string} id - The modal element's id attribute.
 */
export function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('active');
  _openModalCount++;
  document.body.style.overflow = 'hidden';
}

/**
 * Close a modal directly (ignores backdrop-click check).
 * Restores body scroll only when no modals remain open.
 * @param {string} id - The modal element's id attribute.
 */
export function closeModalDirect(id) {
  const el = document.getElementById(id);
  if (!el || !el.classList.contains('active')) return;
  el.classList.remove('active');
  _openModalCount = Math.max(0, _openModalCount - 1);
  if (_openModalCount === 0) document.body.style.overflow = '';
}

/**
 * Close a modal only when the click target is the backdrop (the modal root).
 * Pass this as the onclick handler on the modal wrapper element.
 * @param {string} id
 * @param {MouseEvent} event
 */
export function closeModal(id, event) {
  if (event && event.target !== document.getElementById(id)) return;
  closeModalDirect(id);
}
