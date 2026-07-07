/**
 * itinerary.js
 * Auto-generates day-by-day itineraries using destination-specific data
 * or a generic daily template as a fallback.
 */

import { destinationItineraries, defaultActivities } from '../data/itineraries.js';
import { showToast } from '../utils/toast.js';

export function generateItinerary() {
  const name      = document.getElementById('tripName')?.value || 'My Trip';
  const dest      = document.getElementById('itinDest')?.value || 'Destination';
  const days      = parseInt(document.getElementById('itinDays')?.value) || 0;
  const startDate = document.getElementById('startDate')?.value;

  if (!days || days < 1) { showToast('Please enter the number of days (1–30)'); return; }

  const wrap         = document.getElementById('itinDaysWrap');
  const start        = startDate ? new Date(startDate) : null;
  const specificDays = getDestinationItinerary(dest, days);
  const isSpecific   = !!(specificDays && specificDays.length);

  let html = `
    <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <div>
        <h3 style="font-family:var(--font-display);color:var(--navy);font-size:1.15rem">${name}</h3>
        <p style="font-size:0.82rem;color:var(--text-lt)">📍 ${dest} · ${days} day${days > 1 ? 's' : ''}</p>
        ${isSpecific ? '<span style="font-size:0.72rem;background:var(--tropical);color:#fff;padding:2px 10px;border-radius:20px;margin-left:8px">Destination-Specific Plan</span>' : ''}
      </div>
      <button class="itin-print-btn" onclick="window.print()">🖨️ Print</button>
    </div>`;

  for (let i = 1; i <= Math.min(days, 20); i++) {
    const dateLabel = start
      ? new Date(start.getTime() + (i - 1) * 86400000).toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' })
      : `Day ${i}`;

    const dayData = isSpecific && specificDays[i - 1] ? specificDays[i - 1] : null;

    html += `
      <div class="itin-day-card reveal">
        <div class="itin-day-header">
          <div class="itin-day-num">Day ${i}</div>
          <div class="itin-day-date">${dateLabel}</div>
          ${dayData ? `<div class="itin-day-title">${dayData.title}</div>` : ''}
        </div>
        <div class="itin-day-body">`;

    if (dayData) {
      if (dayData.morning)   html += `<div class="itin-slot"><div class="itin-slot-label">🌅 Morning</div><div class="itin-slot-text">${dayData.morning}</div></div>`;
      if (dayData.afternoon) html += `<div class="itin-slot"><div class="itin-slot-label">☀️ Afternoon</div><div class="itin-slot-text">${dayData.afternoon}</div></div>`;
      if (dayData.evening)   html += `<div class="itin-slot"><div class="itin-slot-label">🌙 Evening</div><div class="itin-slot-text">${dayData.evening}</div></div>`;
    } else {
      defaultActivities.forEach((slot) => {
        html += `<div class="itin-slot">
          <div class="itin-slot-label">${slot.time === 'Morning' ? '🌅' : slot.time === 'Afternoon' ? '☀️' : '🌙'} ${slot.time}</div>
          <ul class="itin-slot-list">${slot.items.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>`;
      });
    }

    html += `</div></div>`;
  }

  if (days > 20) {
    html += `<div class="itin-note">Showing first 20 days. Print this plan and continue with the same daily structure.</div>`;
  }

  if (wrap) {
    wrap.innerHTML = html;
    wrap.style.display = 'block';
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function getDestinationItinerary(destInput, days) {
  if (!destInput) return null;
  const key     = destInput.toLowerCase().trim();
  const entries = Object.entries(destinationItineraries);
  const exact   = entries.find(([k]) => k === key);
  if (exact)   return exact[1].slice(0, Math.min(days, exact[1].length));
  const partial = entries.find(([k]) => key.startsWith(k) || k.startsWith(key));
  if (partial) return partial[1].slice(0, Math.min(days, partial[1].length));
  return null;
}

export function saveToItinerary() {
  const dest = document.getElementById('budgetDest')?.value || 'My Trip';
  const days = document.getElementById('budgetDays')?.value || 7;
  const itinDest = document.getElementById('itinDest');
  const tripName = document.getElementById('tripName');
  const itinDays = document.getElementById('itinDays');
  if (itinDest) itinDest.value = dest;
  if (tripName) tripName.value = `My ${dest} Trip`;
  if (itinDays) itinDays.value = days;
  generateItinerary();
  document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' });
  showToast('Budget saved! Generating itinerary...');
}

export function prefillItinerary(destName) {
  const itinDest = document.getElementById('itinDest');
  const tripName = document.getElementById('tripName');
  if (itinDest) itinDest.value = destName;
  if (tripName) tripName.value = `My ${destName} Trip`;
  document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' });
}
