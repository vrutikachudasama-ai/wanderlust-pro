/**
 * budget.js
 * Budget calculator, currency converter, food budget predictor,
 * and travel cost reality checker.
 */

import { currencyRates, currencySymbols, dailySpendingSpots } from '../data/currency.js';
import { destinationEstimates, realityCosts, realityCompromises } from '../data/budget-estimates.js';
import { showToast } from '../utils/toast.js';

/* ─── Budget Calculator ─────────────────────────────────────────── */

export function calculateBudget() {
  const dest       = document.getElementById('budgetDest')?.value.trim() || 'Your Trip';
  const days       = parseInt(document.getElementById('budgetDays')?.value) || 0;
  const transport  = parseFloat(document.getElementById('transportBudget')?.value) || 0;
  const hotel      = parseFloat(document.getElementById('hotelBudget')?.value) || 0;
  const food       = parseFloat(document.getElementById('foodBudget')?.value) || 0;
  const activities = parseFloat(document.getElementById('activitiesBudget')?.value) || 0;
  const travelers  = parseInt(document.getElementById('numTravelers')?.value) || 1;
  const currency   = document.getElementById('currency')?.value || 'INR';

  if (!days) { showToast('Please enter the number of days'); return; }

  const sym  = currencySymbols[currency];
  const rate = currencyRates[currency];

  const transportTotal  = transport  * days * travelers;
  const hotelTotal      = hotel      * days;
  const foodTotal       = food       * days * travelers;
  const activitiesTotal = activities * days * travelers;
  const subtotal        = transportTotal + hotelTotal + foodTotal + activitiesTotal;
  const misc            = subtotal * 0.1;
  const grandTotal      = subtotal + misc;
  const perPerson       = grandTotal / travelers;

  const fmt = (n) => `${sym}${(n / rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  document.getElementById('resultDest').textContent      = dest;
  document.getElementById('resultDaysLabel').textContent = `${days} day${days > 1 ? 's' : ''} · ${travelers} traveler${travelers > 1 ? 's' : ''}`;
  document.getElementById('rTransport').textContent      = fmt(transportTotal);
  document.getElementById('rHotel').textContent          = fmt(hotelTotal);
  document.getElementById('rFood').textContent           = fmt(foodTotal);
  document.getElementById('rActivities').textContent     = fmt(activitiesTotal);
  document.getElementById('rMisc').textContent           = fmt(misc);
  document.getElementById('totalPerPerson').textContent  = fmt(perPerson);
  document.getElementById('totalCost').textContent       = fmt(grandTotal);
  document.getElementById('budgetTips').innerHTML        = getBudgetTips(grandTotal / rate, days, dest);

  const resultEl = document.getElementById('budgetResult');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getBudgetTips(total, days, dest) {
  const daily = total / days;
  let tips = '💡 <strong>Smart Travel Tips:</strong><br>';
  if (daily < 2000) tips += '✓ Great budget! Book accommodation in advance for better deals.<br>';
  else if (daily < 5000) tips += '✓ Mid-range budget — you can enjoy comfortable travel with local experiences.<br>';
  else tips += '✓ Generous budget — look for luxury stays and premium experiences!<br>';
  tips += '✓ Carry a mix of cash and cards for emergencies.<br>';
  tips += '✓ Save 10–15% extra for unexpected expenses.';
  return tips;
}

export function autoFillBudget(style) {
  const destInput = document.getElementById('budgetDest')?.value || '';
  const est = getDestinationEstimates(destInput);
  if (!est) { showToast('Destination not found. Enter values manually or try a listed destination.'); return; }

  const tier = est[style];
  if (!tier) return;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  set('hotelBudget',      tier.hotel);
  set('foodBudget',       tier.food);
  set('transportBudget',  tier.transport);
  set('activitiesBudget', tier.activities);

  const noteEl = document.getElementById('estimateNote');
  if (noteEl) {
    noteEl.style.display = 'flex';
    noteEl.innerHTML = `<span>📊</span><span>Realistic estimates for <strong>${est.name}</strong> — ${style === 'budget' ? 'Budget Backpacker' : style === 'mid' ? 'Mid-Range Comfort' : 'Luxury'} style. <em>These are estimates based on TripAdvisor, Numbeo & traveler data (2024-25). Actual costs may vary.</em></span>`;
  }
  showToast(`Estimates loaded for ${est.name} — adjust if needed!`);
}

function getDestinationEstimates(destInput) {
  if (!destInput) return null;
  const key     = destInput.toLowerCase().trim();
  const entries = Object.entries(destinationEstimates);
  const exact   = entries.find(([k]) => k === key);
  if (exact)   return { key: exact[0], ...exact[1] };
  const partial = entries.find(([k]) => key.startsWith(k) || k.startsWith(key));
  if (partial) return { key: partial[0], ...partial[1] };
  return null;
}

/* ─── Currency Converter ────────────────────────────────────────── */

const currencySymbolMap = currencySymbols;

export function convertCurrency() {
  const amount = parseFloat(document.getElementById('currencyAmount')?.value) || 0;
  const from   = document.getElementById('currencyFrom')?.value;
  const to     = document.getElementById('currencyTo')?.value;
  const el     = document.getElementById('currencyResultDisplay');
  if (!el) return;

  if (!amount) {
    el.innerHTML = '<p class="currency-placeholder-msg">Enter an amount above to see the conversion</p>';
    return;
  }

  const inINR  = amount * currencyRates[from];
  const result = inINR  / currencyRates[to];
  const rate   = currencyRates[from] / currencyRates[to];
  const sym    = currencySymbolMap;

  el.innerHTML = `
    <div class="currency-big-rate">${sym[from]}${amount.toLocaleString()} = ${sym[to]}${result.toLocaleString('en-IN', { maximumFractionDigits:2 })}</div>
    <div class="currency-rate-sub">1 ${from} = ${sym[to]}${rate.toFixed(4)} ${to}</div>
    <div class="currency-rate-note">Static indicative rates · Verify with your bank before travelling</div>`;

  renderDailySpending(to);
}

export function swapCurrencies() {
  const f = document.getElementById('currencyFrom');
  const t = document.getElementById('currencyTo');
  if (f && t) { [f.value, t.value] = [t.value, f.value]; }
  convertCurrency();
}

export function renderDailySpending(toCurrency) {
  const sym  = currencySymbolMap[toCurrency] || '₹';
  const rate = currencyRates['INR'] / currencyRates[toCurrency];
  const fmt  = (n) => sym + (n * rate).toFixed(toCurrency === 'JPY' ? 0 : 2);

  const el = document.getElementById('dailySpendingGrid');
  if (!el) return;
  el.innerHTML = dailySpendingSpots.map((s) => `
    <div class="daily-card">
      <div class="daily-card-dest">📍 ${s.dest}</div>
      <div class="daily-card-amt">${fmt(s.budget)}</div>
      <div class="daily-card-style">per day · mid-range</div>
    </div>`).join('');
}

/* ─── Reality Checker ───────────────────────────────────────────── */

export function checkRealityCost() {
  const dest   = document.getElementById('realityDest')?.value;
  const budget = parseFloat(document.getElementById('realityBudget')?.value) || 0;
  const days   = parseInt(document.getElementById('realityDays')?.value)     || 0;
  const style  = document.getElementById('realityStyle')?.value;

  if (!budget || !days) { showToast('Please enter your budget and number of days'); return; }

  const d          = realityCosts[dest];
  const dailyCost  = d[style];
  const totalNeeded = dailyCost * days;
  const ratio       = budget / totalNeeded;

  let verdict, verdictClass, verdictIcon;
  if (ratio >= 1.15)      { verdict = 'Yes, you can do it!';  verdictClass = 'yes';   verdictIcon = '✅'; }
  else if (ratio >= 0.85) { verdict = 'Tight — but possible!'; verdictClass = 'tight'; verdictIcon = '⚠️'; }
  else                    { verdict = 'Budget too low';        verdictClass = 'no';    verdictIcon = '❌'; }

  const el = document.getElementById('realityResult');
  el.style.display = 'block';
  el.innerHTML = `
    <div class="reality-verdict ${verdictClass}">
      <div class="reality-verdict-icon">${verdictIcon}</div>
      <div class="reality-verdict-title">${verdict}</div>
      <div class="reality-verdict-sub">For a ${days}-day ${style} trip to ${d.name}, you need approximately ₹${totalNeeded.toLocaleString('en-IN')}. Your budget: ₹${budget.toLocaleString('en-IN')}.</div>
    </div>
    <div class="reality-breakdown">
      <div class="reality-bk-row"><span>Estimated daily cost</span><strong>₹${dailyCost.toLocaleString('en-IN')}</strong></div>
      <div class="reality-bk-row"><span>Total for ${days} days</span><strong>₹${totalNeeded.toLocaleString('en-IN')}</strong></div>
      <div class="reality-bk-row"><span>Your budget</span><strong>₹${budget.toLocaleString('en-IN')}</strong></div>
      <div class="reality-bk-row"><span>Surplus / Deficit</span><strong style="color:${ratio>=1?'var(--tropical)':'var(--coral)'}">${ratio>=1?'+':'-'}₹${Math.abs(budget-totalNeeded).toLocaleString('en-IN')}</strong></div>
    </div>
    <div class="reality-compromise">
      <strong>What your budget covers (${style} style):</strong><br>
      ${realityCompromises[style].map((c) => `✓ ${c}`).join('<br>')}
    </div>`;
  el.scrollIntoView({ behavior:'smooth', block:'nearest' });
}
