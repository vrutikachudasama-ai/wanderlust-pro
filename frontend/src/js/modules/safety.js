/**
 * safety.js
 * Renders scam alerts, emergency numbers, connectivity guides,
 * local transport, crowd predictor, and cultural etiquette.
 */

import { scamData, emergencyData, connectivityData, transportData, crowdData } from '../data/safety.js';
import { observeReveal } from '../utils/animations.js';

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* ─── Scam Alerts ───────────────────────────────────────────────── */

export function loadScamData(dest) {
  const el = document.getElementById('scamResult');
  if (!el) return;
  if (!dest) { el.innerHTML = ''; return; }

  const d = scamData[dest];
  if (!d) return;

  el.innerHTML = `
    <div class="scam-safety-header">
      <div>
        <div class="scam-dest-name">${d.name}</div>
        <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);margin-top:4px">Review before you travel</p>
      </div>
      <div class="scam-score-wrap">
        <div class="scam-score-circle ${d.scoreClass}">${d.safetyScore}</div>
        <div class="scam-score-label">Safety Score</div>
      </div>
    </div>
    <div class="scam-result-wrap">
      <div class="scam-card">
        <h4>⚠️ Common Scams</h4>
        <ul class="scam-list">${d.scams.map((s) => `<li>${s}</li>`).join('')}</ul>
      </div>
      <div class="scam-card">
        <h4>🚫 Areas to Avoid</h4>
        <ul class="scam-list scam-avoid-list" style="margin-bottom:20px">${d.avoid.map((a) => `<li>${a}</li>`).join('')}</ul>
        <h4>📞 Emergency Numbers</h4>
        <div class="emergency-nums">${d.emergency.map(([s, n]) => `<div class="emg-num-row"><span>${s}</span><strong>${n}</strong></div>`).join('')}</div>
      </div>
    </div>`;
}

/* ─── Emergency Toolkit ─────────────────────────────────────────── */

export function loadEmergencyData(country) {
  const el = document.getElementById('emergencyResult');
  if (!el) return;
  if (!country) { el.innerHTML = ''; return; }

  const d = emergencyData[country];
  if (!d) return;

  el.innerHTML = `
    <div class="emergency-grid">
      <div class="emergency-card police">
        <div class="emergency-card-icon">🚔</div>
        <div class="emergency-card-title">Police</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Emergency</span><span class="emg-number">${d.police.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.police.detail}</div>
        </div>
      </div>
      <div class="emergency-card medical">
        <div class="emergency-card-icon">🚑</div>
        <div class="emergency-card-title">Ambulance & Medical</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Emergency</span><span class="emg-number">${d.ambulance.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.ambulance.detail}</div>
        </div>
      </div>
      <div class="emergency-card tourist">
        <div class="emergency-card-icon">🎒</div>
        <div class="emergency-card-title">Tourist Helpline</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Helpline</span><span class="emg-number">${d.tourist.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.tourist.detail}</div>
        </div>
      </div>
      <div class="emergency-card embassy">
        <div class="emergency-card-icon">🏛️</div>
        <div class="emergency-card-title">Embassy Information</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Contact</span><span class="emg-number" style="font-size:0.82rem">${d.embassy.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.embassy.detail}</div>
        </div>
      </div>
    </div>
    <div class="emergency-note">💡 <strong>Safety Tip for ${d.country}:</strong> ${d.tip}</div>`;
}

/* ─── Connectivity Guide ────────────────────────────────────────── */

export function loadConnectivity(country) {
  const el = document.getElementById('connectResult');
  if (!el) return;
  if (!country) { el.innerHTML = ''; return; }

  const d = connectivityData[country];
  if (!d) return;

  el.innerHTML = `
    <div class="connect-grid">
      <div class="connect-card">
        <h4>📱 Best SIM Cards</h4>
        ${d.sims.map((s) => `<div class="connect-item"><span class="connect-item-icon">SIM</span><div><div style="font-weight:600;color:var(--navy)">${s.name}</div><div style="font-size:0.78rem;color:var(--text-lt)">${s.note}</div></div></div>`).join('')}
      </div>
      <div class="connect-card">
        <h4>📡 eSIM Providers</h4>
        ${d.esims.map((e) => `<div class="connect-item"><span class="connect-item-icon">eSIM</span><div><div style="font-weight:600;color:var(--navy)">${e.name}</div><div style="font-size:0.78rem;color:var(--text-lt)">${e.note}</div></div></div>`).join('')}
      </div>
      <div class="connect-card">
        <h4>🌐 Internet Speeds & WiFi</h4>
        <div class="connect-item"><span class="connect-item-icon">⚡</span><div><div style="font-weight:600;color:var(--navy)">Avg Speed</div><div style="font-size:0.82rem;color:var(--text-md)">${d.speed}</div></div></div>
        <div class="connect-item"><span class="connect-item-icon">📶</span><div><div style="font-weight:600;color:var(--navy)">Public WiFi</div><div style="font-size:0.82rem;color:var(--text-md)">${d.wifi}</div></div></div>
        <div style="margin-top:14px;background:var(--gold-pale);border-radius:var(--radius-m);padding:12px;font-size:0.82rem;color:var(--text-md);line-height:1.6">💡 <strong>Pro Tip:</strong> ${d.tip}</div>
      </div>
    </div>`;
}

/* ─── Local Transport ───────────────────────────────────────────── */

export function loadTransport(city) {
  const el = document.getElementById('transportResult');
  if (!el) return;
  if (!city) { el.innerHTML = ''; return; }

  const d = transportData[city];
  if (!d) return;

  el.innerHTML = `<div class="transport-grid">${d.options.map((o) => `
    <div class="transport-card">
      <div class="transport-card-icon">${o.icon}</div>
      <div class="transport-card-name">${o.name}</div>
      <div class="transport-avail ${o.avail}">${o.avail === 'yes' ? '✓ Available' : o.avail === 'limited' ? '⚠ Limited' : '✗ Not Available'}</div>
      <div class="transport-detail">${o.detail}</div>
      <div class="transport-cost">💰 ${o.cost}</div>
    </div>`).join('')}</div>`;
}

/* ─── Crowd Predictor ───────────────────────────────────────────── */

export function loadCrowdData(dest) {
  const el = document.getElementById('crowdGrid');
  if (!el) return;
  if (!dest) { el.innerHTML = ''; return; }

  const data = crowdData[dest];
  if (!data) return;

  const labels = {
    1: { cls:'low',  emoji:'🟢', label:'Low Crowd'     },
    2: { cls:'mid',  emoji:'🟡', label:'Moderate'      },
    3: { cls:'high', emoji:'🔴', label:'Very Crowded'  },
  };

  el.innerHTML = data.map((level, i) => {
    const l = labels[level];
    return `<div class="crowd-month-card ${l.cls}"><div class="crowd-month-name">${monthNames[i].slice(0, 3)}</div><div class="crowd-indicator">${l.emoji}</div><div class="crowd-level-label">${l.label}</div></div>`;
  }).join('') +
  `<div style="grid-column:1/-1;display:flex;gap:20px;justify-content:center;margin-top:12px;font-size:0.82rem;color:var(--text-md)">
    <span>🟢 Low — Best time to go</span><span>🟡 Moderate — Book in advance</span><span>🔴 Peak — Crowded & expensive</span>
  </div>`;
}
