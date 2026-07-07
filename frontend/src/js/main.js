/**
 * main.js
 * Application entry point — imports all modules, wires up globals,
 * and bootstraps the app on DOMContentLoaded.
 *
 * Global functions (called from inline HTML onclick attributes) are
 * assigned to window.* so they survive bundling.
 */

/* ─── Utils ─────────────────────────────────────────────────────── */
import { initScrollAnimations, observeReveal } from './utils/animations.js';
import { openModal, closeModalDirect, closeModal } from './utils/modal.js';
import { showToast }      from './utils/toast.js';
import { ssGet, ssSet }   from './utils/storage.js';

/* ─── Modules ────────────────────────────────────────────────────── */
import { initNavbar, toggleMobileMenu, closeMobileMenu } from './modules/navbar.js';
import { initAuth, openAuthModal, switchAuthTab, handleLogin, handleSignup, logout, toggleUserMenu, closeUserMenu, checkPasswordStrength } from './modules/auth.js';
import { getWeather }     from './modules/weather.js';
import { calculateBudget, autoFillBudget, convertCurrency, swapCurrencies, renderDailySpending, checkRealityCost } from './modules/budget.js';
import { generateItinerary, saveToItinerary, prefillItinerary } from './modules/itinerary.js';
import { renderFestivals, showFestivals } from './modules/festivals.js';
import { initQuiz, quizAnswer } from './modules/quiz.js';
import { loadScamData, loadEmergencyData, loadConnectivity, loadTransport, loadCrowdData } from './modules/safety.js';
import { loadChecklist, toggleCheckItem, resetChecklist, addCustomItem, saveCustomItem, removeCustomItem } from './modules/checklist.js';
import { toggleBookmark, updateBookmarkCount, showBookmarks } from './modules/bookmarks.js';

/* ─── Data ───────────────────────────────────────────────────────── */
import { destinations }  from './data/destinations.js';
import { hiddenGems, missSpots } from './data/hidden-gems.js';

/* ─── Expose globals (required by inline HTML handlers) ─────────── */
Object.assign(window, {
  toggleMobileMenu, closeMobileMenu,
  openAuthModal, switchAuthTab, handleLogin, handleSignup, logout,
  toggleUserMenu, closeUserMenu, checkPasswordStrength,
  openModal, closeModal, closeModalDirect,
  showToast,
  getWeather,
  calculateBudget, autoFillBudget, convertCurrency, swapCurrencies, checkRealityCost,
  generateItinerary, saveToItinerary, prefillItinerary,
  showFestivals,
  initQuiz, quizAnswer,
  loadScamData, loadEmergencyData, loadConnectivity, loadTransport, loadCrowdData,
  loadChecklist, toggleCheckItem, resetChecklist, addCustomItem, saveCustomItem, removeCustomItem,
  toggleBookmark, showBookmarks,
  showDestDetail, toggleBookmark, prefillBudget,
  generateDestination, filterMissSpots, filterBuddies,
  renderDestinations, searchDestinations, selectSuggestion, hideSuggestions, showSuggestions,
  loadFoodBudget, loadSunTimes, loadInstaSpots,
  setReminder, closeReminder, renderMonthPicks,
});

/* ─── Destination Explorer ───────────────────────────────────────── */
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function setCurrentMonth() {
  const month = new Date().getMonth() + 1;
  const el = document.getElementById('currentMonthName');
  if (el) el.textContent = monthNames[month - 1];
}

function renderMonthPicks() {
  const month = new Date().getMonth() + 1;
  const picks = destinations.filter((d) => d.months.includes(month)).slice(0, 6);
  const grid  = document.getElementById('monthGrid');
  if (!grid) return;

  if (!picks.length) {
    grid.innerHTML = '<p style="text-align:center;color:var(--text-lt)">No specific picks for this month — browse all destinations below!</p>';
    return;
  }
  grid.innerHTML = picks.map((d) => `
    <div class="month-card reveal" onclick="showDestDetail(${d.id})">
      <div class="month-card-img"><img src="${d.img}" alt="${d.name}" loading="lazy"></div>
      <div class="month-card-info">
        <div class="month-card-name">${d.name}</div>
        <div class="month-card-country">${d.country}</div>
        <div class="month-card-budget">${d.budget}</div>
      </div>
    </div>`).join('');
  observeReveal();
}

function renderDestinations(cat) {
  const list = cat === 'all' ? destinations : destinations.filter((d) => d.cat === cat);
  const grid = document.getElementById('destinationsGrid');
  if (!grid) return;
  grid.innerHTML = list.map((d) => renderDestCard(d)).join('');
  observeReveal();
}

function renderDestCard(d) {
  const { getBookmarks } = window;
  const bookmarks = typeof getBookmarks === 'function' ? getBookmarks() : [];
  const saved     = bookmarks.includes(d.id);
  const stars     = '★'.repeat(Math.min(Math.round(d.rating), 5));
  const catLabel  = { beaches:'Beach', mountains:'Mountain', cafes:'Culture', weekend:'Weekend', hidden:'Hidden Gem', international:'International' }[d.cat] || d.cat;
  return `
    <div class="dest-card reveal" onclick="showDestDetail(${d.id})">
      <div class="dest-card-img">
        <img src="${d.img}" alt="${d.name}" loading="lazy">
        <div class="dest-card-cat">${catLabel}</div>
        <button class="dest-card-bookmark ${saved ? 'saved' : ''}" onclick="toggleBookmark(event, ${d.id})" title="${saved ? 'Remove bookmark' : 'Save place'}">${saved ? '🔖' : '🤍'}</button>
      </div>
      <div class="dest-card-info">
        <div class="dest-card-header">
          <div>
            <div class="dest-card-name">${d.name}</div>
            <div class="dest-card-country">📍 ${d.country}</div>
          </div>
          <div class="dest-card-rating">${stars} ${d.rating}</div>
        </div>
        <div class="dest-card-desc">${d.desc}</div>
        <div class="dest-card-tags">${d.tags.map((t) => `<span class="dest-tag">${t}</span>`).join('')}</div>
        <div class="dest-card-footer">
          <span class="dest-card-budget">From ${d.budget}</span>
          <span class="dest-card-views">👁 ${d.views} views</span>
        </div>
      </div>
    </div>`;
}

function showDestDetail(id) {
  const d = destinations.find((x) => x.id === id);
  if (!d) return;
  const { getBookmarks } = window;
  const bookmarks = typeof getBookmarks === 'function' ? getBookmarks() : [];
  const saved = bookmarks.includes(d.id);

  document.getElementById('destModalTitle').textContent = `${d.name}, ${d.country}`;
  document.getElementById('destModalBody').innerHTML = `
    <div class="dest-modal-hero">
      <img src="${d.img}" alt="${d.name}">
      <div class="dest-modal-overlay"></div>
      <div class="dest-modal-badge">${d.cat.toUpperCase()}</div>
    </div>
    <p style="font-size:0.9rem;color:var(--text-md);line-height:1.7;margin-bottom:16px">${d.desc}</p>
    <div class="dest-modal-grid">
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Budget (est.)</div><div class="dest-modal-stat-value">${d.budget}</div></div>
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Rating</div><div class="dest-modal-stat-value">⭐ ${d.rating} / 5</div></div>
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Weather</div><div class="dest-modal-stat-value">🌡️ ${d.weather}</div></div>
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Best For</div><div class="dest-modal-stat-value">${d.bestFor}</div></div>
    </div>
    <div class="dest-modal-highlights">
      <h4>Top Highlights</h4>
      <div class="highlight-list">${d.highlights.map((h) => `<span class="highlight-tag">✦ ${h}</span>`).join('')}</div>
    </div>
    <div class="dest-modal-actions">
      <button class="dest-modal-btn primary" onclick="toggleBookmark(event, ${d.id}); closeModalDirect('destModal')">${saved ? '🔖 Saved!' : '🤍 Save Place'}</button>
      <button class="dest-modal-btn secondary" onclick="prefillBudget('${d.name}')">💰 Plan Budget</button>
      <button class="dest-modal-btn secondary" onclick="prefillItinerary('${d.name}')">🗺️ Plan Trip</button>
    </div>`;

  openModal('destModal');
}

function prefillBudget(name) {
  const el = document.getElementById('budgetDest');
  if (el) el.value = name;
  document.getElementById('budget')?.scrollIntoView({ behavior: 'smooth' });
}

function initCategoryTabs() {
  document.getElementById('categoryTabs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderDestinations(btn.dataset.cat);
  });
}

function searchDestinations() {
  const query = document.getElementById('searchDestination')?.value.trim().toLowerCase();
  const month = parseInt(document.getElementById('searchMonth')?.value);
  let results = [...destinations];
  if (query) results = results.filter((d) => d.name.toLowerCase().includes(query) || d.country.toLowerCase().includes(query) || d.tags.some((t) => t.toLowerCase().includes(query)));
  if (month) results = results.filter((d) => d.months.includes(month));
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
  document.querySelector('[data-cat="all"]')?.classList.add('active');
  const grid = document.getElementById('destinationsGrid');
  if (grid) {
    grid.innerHTML = results.length
      ? results.map((d) => renderDestCard(d)).join('')
      : `<div style="text-align:center;padding:60px;color:var(--text-lt);grid-column:1/-1"><div style="font-size:3rem;margin-bottom:12px">🔍</div><p>No destinations found. Try a different search!</p></div>`;
  }
  document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  observeReveal();
}

function showSuggestions() {
  const q   = document.getElementById('searchDestination')?.value.toLowerCase().trim();
  const box = document.getElementById('searchSuggestions');
  if (!box) return;
  if (!q) { box.classList.remove('open'); return; }
  const matches = destinations.filter((d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)).slice(0, 6);
  if (!matches.length) { box.classList.remove('open'); return; }
  box.innerHTML = matches.map((d) => `
    <div class="search-suggestion" onclick="selectSuggestion('${d.name}', ${d.id})">
      <span class="sug-icon">${{ beaches:'🏖️', mountains:'🏔️', cafes:'☕', weekend:'🌿', hidden:'💎', international:'✈️' }[d.cat]}</span>
      <span class="sug-name">${d.name}</span>
      <span class="sug-loc">${d.country}</span>
    </div>`).join('');
  box.classList.add('open');
}

function selectSuggestion(name, id) {
  const el = document.getElementById('searchDestination');
  if (el) el.value = name;
  hideSuggestions();
  showDestDetail(id);
}

function hideSuggestions() {
  document.getElementById('searchSuggestions')?.classList.remove('open');
}

/* ─── Hidden Gems ────────────────────────────────────────────────── */

function renderHiddenGems() {
  const grid = document.getElementById('hiddenGemsGrid');
  if (!grid) return;
  grid.innerHTML = hiddenGems.map((g) => `
    <div class="gem-card reveal">
      <div class="gem-icon">${g.icon}</div>
      <div class="gem-name">${g.name}</div>
      <div class="gem-loc">📍 ${g.loc} · <span class="gem-type">${g.type}</span></div>
      <div class="gem-desc">${g.desc}</div>
      <div class="gem-budget">💰 ${g.budget}</div>
      <div class="gem-tip">💡 ${g.tip}</div>
    </div>`).join('');
  observeReveal();
}

function filterMissSpots(cat, btn) {
  document.querySelectorAll('.miss-tab').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const list = cat === 'all' ? missSpots : missSpots.filter((s) => s.cat === cat);
  const grid = document.getElementById('missSpotsGrid');
  if (!grid) return;
  grid.innerHTML = list.map((s) => `
    <div class="miss-card reveal">
      <div class="miss-name">${s.name}</div>
      <div class="miss-loc">📍 ${s.loc}</div>
      <div class="miss-desc">${s.desc}</div>
      <div class="miss-tip">💡 ${s.tip}</div>
    </div>`).join('');
  observeReveal();
}

/* ─── Random Generator ───────────────────────────────────────────── */
import { generatorPool } from './data/quiz.js';

function generateDestination() {
  const d = generatorPool[Math.floor(Math.random() * generatorPool.length)];
  const el = document.getElementById('generatorResult');
  if (!el) return;
  el.innerHTML = `
    <div class="gen-card">
      <div class="gen-card-flag">${d.flag}</div>
      <div class="gen-card-name">${d.name}</div>
      <div class="gen-card-country">📍 ${d.country}</div>
      <div class="gen-card-grid">
        <div><div class="gen-stat-label">Budget (est.)</div><div class="gen-stat-val">${d.budget}/person</div></div>
        <div><div class="gen-stat-label">Best Time to Go</div><div class="gen-stat-val">${d.bestMonth}</div></div>
      </div>
      <div class="gen-why">${d.why}</div>
    </div>`;
}

/* ─── Travel Buddy ───────────────────────────────────────────────── */
const buddyProfiles = [
  { name:'Aarav Mehta',  type:'solo',       age:26, from:'Mumbai',    dest:'Backpacking Southeast Asia',       bio:'Software dev traveling SEA for 3 months. Looking for a travel buddy for Vietnam & Cambodia legs.', avatar:'#1a5276', initials:'AM' },
  { name:'Priya Sharma', type:'nomad',      age:29, from:'Bangalore', dest:'Bali & Tbilisi',                  bio:'UX designer working remotely. Moving between co-working hubs. Always down for sunrise hikes.',  avatar:'#1a6b47', initials:'PS' },
  { name:'David Chen',   type:'backpacker', age:24, from:'Singapore', dest:'India (Rajasthan → Ladakh)',       bio:'Recent grad on a gap year. Budget traveler, loves camping and off-the-beaten-path spots.',       avatar:'#7d3c98', initials:'DC' },
  { name:'Ananya Iyer',  type:'solo',       age:31, from:'Chennai',   dest:'Japan & South Korea',             bio:'Teacher on summer break. Big fan of street food, anime neighborhoods, and photography.',         avatar:'#c4955a', initials:'AI' },
  { name:'Marco Rossi',  type:'nomad',      age:33, from:'Italy',     dest:'Goa & Rishikesh',                 bio:'Freelance photographer based anywhere. Currently looking for a travel buddy for South India.',   avatar:'#d4704a', initials:'MR' },
  { name:'Kavya Nair',   type:'backpacker', age:22, from:'Kerala',    dest:'Spiti Valley & Zanskar',          bio:'Student on summer adventure. Strong hiker, done 5 Himalayan treks. Looking for trek partners.', avatar:'#1f6391', initials:'KN' },
  { name:'James Okafor', type:'nomad',      age:35, from:'London',    dest:'Tbilisi & Istanbul',              bio:'Tech writer traveling the Caucasus. Looking for a travel companion who loves food and architecture.', avatar:'#2e86c1', initials:'JO' },
  { name:'Riya Patel',   type:'solo',       age:28, from:'Ahmedabad', dest:'Sri Lanka solo trip',             bio:'First solo trip after years of dreaming. Looking for safety buddy for Southern Sri Lanka circuit.', avatar:'#a04000', initials:'RP' },
];

function filterBuddies(type, btn) {
  document.querySelectorAll('.buddy-tab').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const list = type === 'all' ? buddyProfiles : buddyProfiles.filter((b) => b.type === type);
  const typeLabels = { solo:'Solo Traveler', backpacker:'Backpacker', nomad:'Digital Nomad' };
  const grid = document.getElementById('buddyGrid');
  if (!grid) return;
  grid.innerHTML = list.map((b) => `
    <div class="buddy-card reveal">
      <div class="buddy-card-top">
        <div class="buddy-avatar" style="background:${b.avatar}">${b.initials}</div>
        <div>
          <div class="buddy-name">${b.name}</div>
          <div class="buddy-type-badge ${b.type}">${typeLabels[b.type]}</div>
        </div>
      </div>
      <div class="buddy-bio">${b.bio}</div>
      <div class="buddy-dest">✈ ${b.dest}</div>
      <div style="font-size:0.78rem;color:var(--text-lt);margin-top:4px">📍 From ${b.from} · Age ${b.age}</div>
      <button class="buddy-connect-btn" onclick="showToast('Connect feature coming soon! 😊')">Connect</button>
    </div>`).join('');
  observeReveal();
}

/* ─── Stubs for section-specific loaders (noop until data added) ─── */
function loadFoodBudget(style, btn) {
  document.querySelectorAll('.food-tab').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}
function loadSunTimes(city) { /* see app.js for full impl */ }
function loadInstaSpots(city) { /* see app.js for full impl */ }

/* ─── Reminder ───────────────────────────────────────────────────── */
function setReminder() {
  const messages = [
    'Have you packed your passport and ID?',
    "Don't forget your phone charger and power bank!",
    'Did you pack your medicines and first aid kit?',
    'Sunscreen is essential — have you packed it?',
    'Remember to carry cash and your travel cards!',
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  showReminder('Packing Reminder! 🧳', msg);
  showToast("Reminder set! We'll keep you on track.");
}

function autoShowReminder() {
  if (ssGet('wl_reminder_shown')) return;
  setTimeout(() => {
    ssSet('wl_reminder_shown', '1');
    showReminder('Welcome to Wanderlust! ✈️', 'Start by exploring destinations or calculating your trip budget.');
  }, 5000);
}

function showReminder(title, msg) {
  const titleEl = document.getElementById('reminderTitle');
  const msgEl   = document.getElementById('reminderMsg');
  const popup   = document.getElementById('reminderPopup');
  if (titleEl) titleEl.textContent = title;
  if (msgEl)   msgEl.textContent   = msg;
  if (popup)   popup.style.display = 'block';
  setTimeout(closeReminder, 7000);
}

function closeReminder() {
  const popup = document.getElementById('reminderPopup');
  if (popup) popup.style.display = 'none';
}

/* ─── Bootstrap ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAuth();
  updateBookmarkCount();
  initScrollAnimations();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-field')) hideSuggestions();
    if (!e.target.closest('.user-menu-wrap')) closeUserMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    ['bookmarksModal','destModal','authModal','profileModal','customItemModal'].forEach((id) => {
      const el = document.getElementById(id);
      if (el?.classList.contains('active')) closeModalDirect(id);
    });
    closeUserMenu();
    closeMobileMenu();
  });

  setCurrentMonth();
  renderMonthPicks();
  renderDestinations('all');
  renderHiddenGems();
  initCategoryTabs();
  autoShowReminder();
  renderFestivals();
  filterMissSpots('all', document.querySelector('.miss-tab'));
  initQuiz();
  filterBuddies('all', document.querySelector('.buddy-tab'));
  renderDailySpending('INR');
  convertCurrency();
  loadFoodBudget('street', document.querySelector('.food-tab'));
  loadCrowdData(document.querySelector('[data-dest]')?.dataset.dest || '');

  const activeBtn = document.querySelector('.type-btn.active');
  if (activeBtn) loadChecklist('general', activeBtn);
});

/* Expose remaining helpers used in HTML */
Object.assign(window, {
  renderDestinations, searchDestinations, showDestDetail,
  generateDestination, filterMissSpots, filterBuddies,
  renderMonthPicks, setReminder, closeReminder,
  showSuggestions, hideSuggestions, selectSuggestion,
  loadFoodBudget, loadSunTimes, loadInstaSpots,
  getBookmarks: () => import('./modules/bookmarks.js').then((m) => m.getBookmarks()),
});
