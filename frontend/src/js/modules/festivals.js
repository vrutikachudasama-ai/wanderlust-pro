/**
 * festivals.js
 * Festival calendar rendering and month-tab switching.
 */

import { festivalsData } from '../data/festivals.js';
import { observeReveal } from '../utils/animations.js';

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let currentFestivalMonth = new Date().getMonth() + 1;

export function renderFestivals() {
  const tabs = document.getElementById('festivalMonthTabs');
  if (!tabs) return;

  tabs.innerHTML = monthNames
    .map((m, i) => `<button class="festival-month-btn ${i + 1 === currentFestivalMonth ? 'active' : ''}" onclick="showFestivals(${i + 1}, this)">${m.slice(0, 3)}</button>`)
    .join('');

  showFestivals(currentFestivalMonth, tabs.querySelector('.active'));
}

export function showFestivals(month, btn) {
  currentFestivalMonth = month;
  document.querySelectorAll('.festival-month-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const list = festivalsData[month] || [];
  const grid = document.getElementById('festivalsGrid');
  if (!grid) return;

  grid.innerHTML = list.map((f) => `
    <div class="festival-card reveal">
      <div class="festival-name">${f.name}</div>
      <div class="festival-location">📍 ${f.loc}</div>
      <div class="festival-desc">${f.desc}</div>
      <div class="festival-meta">
        <span class="festival-dates">📅 ${f.dates}</span>
        <span class="festival-type-badge">${f.type}</span>
      </div>
    </div>`).join('');

  observeReveal();
}
