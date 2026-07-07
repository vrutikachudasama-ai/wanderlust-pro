/**
 * bookmarks.js
 * Save / unsave destinations and display bookmarks modal.
 */

import { destinations }   from '../data/destinations.js';
import { lsGet, lsSet }   from '../utils/storage.js';
import { openModal }      from '../utils/modal.js';
import { showToast }      from '../utils/toast.js';

let bookmarks = lsGet('wanderlust_bookmarks', []);

export function getBookmarks() { return bookmarks; }

export function toggleBookmark(event, id) {
  event.stopPropagation();
  const idx = bookmarks.indexOf(id);

  if (idx > -1) {
    bookmarks.splice(idx, 1);
    showToast('Removed from saved places');
  } else {
    bookmarks.push(id);
    showToast('Place saved! ❤️');
  }

  lsSet('wanderlust_bookmarks', bookmarks);
  updateBookmarkCount();

  const btn = event.currentTarget || event.target.closest('.dest-card-bookmark');
  if (btn) {
    const saved = bookmarks.includes(id);
    btn.className = `dest-card-bookmark ${saved ? 'saved' : ''}`;
    btn.textContent = saved ? '🔖' : '🤍';
  }
}

export function updateBookmarkCount() {
  const el = document.getElementById('bookmarkCount');
  if (el) el.textContent = bookmarks.length;
}

export function showBookmarks() {
  const list = document.getElementById('bookmarksList');
  if (!list) return;

  if (!bookmarks.length) {
    list.innerHTML = `
      <div class="no-bookmarks">
        <div class="no-bookmarks-icon">🤍</div>
        <p>No saved places yet.</p>
        <p style="font-size:0.82rem;margin-top:6px;color:var(--text-lt)">Browse destinations and tap the heart to save places!</p>
      </div>`;
  } else {
    const saved = bookmarks.map((id) => destinations.find((d) => d.id === id)).filter(Boolean);
    list.innerHTML = saved.map((d) => `
      <div class="bookmark-item" onclick="closeModalDirect('bookmarksModal'); showDestDetail(${d.id})">
        <div class="bookmark-item-img"><img src="${d.img}" alt="${d.name}" loading="lazy"></div>
        <div class="bookmark-item-info">
          <div class="bookmark-item-name">${d.name}</div>
          <div class="bookmark-item-country">📍 ${d.country}</div>
          <div class="bookmark-item-budget">${d.budget}</div>
        </div>
        <button class="bookmark-remove" onclick="event.stopPropagation(); toggleBookmark(event, ${d.id}); showBookmarks()">✕</button>
      </div>`).join('');
  }

  openModal('bookmarksModal');
}
