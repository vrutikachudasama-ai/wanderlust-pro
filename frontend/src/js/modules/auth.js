/**
 * auth.js
 * Client-side authentication module (demo-grade, localStorage backed).
 *
 * Production note: Replace with JWT / OAuth flow via POST /api/auth/login
 * and POST /api/auth/register. Never store passwords client-side in production.
 */

import { lsGet, lsSet, ssGet, ssSet } from '../utils/storage.js';
import { openModal, closeModalDirect } from '../utils/modal.js';
import { showToast } from '../utils/toast.js';

/** Simple hash (demo only — NOT cryptographically safe). */
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

export function initAuth() {
  const session    = ssGet('wl_session');
  const remembered = lsGet('wl_session');
  const user = session || remembered;
  if (user) applyLoggedInState(user);
}

export function openAuthModal(tab = 'login') {
  switchAuthTab(tab);
  clearAuthErrors();
  openModal('authModal');
}

export function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('loginTab')?.classList.toggle('active', isLogin);
  document.getElementById('signupTab')?.classList.toggle('active', !isLogin);

  const loginForm  = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  if (loginForm)  { loginForm.style.display  = isLogin ? 'flex' : 'none'; loginForm.style.flexDirection  = 'column'; }
  if (signupForm) { signupForm.style.display = isLogin ? 'none' : 'flex'; signupForm.style.flexDirection = 'column'; }
  clearAuthErrors();
}

export function handleSignup(e) {
  e.preventDefault();
  const first   = document.getElementById('signupFirst')?.value.trim();
  const last    = document.getElementById('signupLast')?.value.trim();
  const email   = document.getElementById('signupEmail')?.value.trim().toLowerCase();
  const pw      = document.getElementById('signupPassword')?.value;
  const confirm = document.getElementById('signupConfirm')?.value;

  if (!first || !last)    return showAuthError('signupError', 'Please enter your full name.');
  if (pw.length < 6)      return showAuthError('signupError', 'Password must be at least 6 characters.');
  if (pw !== confirm)     return showAuthError('signupError', "Passwords don't match — please try again.");

  const users = lsGet('wl_users', {});
  if (users[email])       return showAuthError('signupError', 'An account with this email already exists.');

  users[email] = { first, last, email, pw: simpleHash(pw), joined: new Date().toISOString() };
  lsSet('wl_users', users);

  const user = { first, last, email, joined: users[email].joined };
  loginUser(user, false);
  showToast(`Welcome to Wanderlust, ${first}! 🌍`);
  closeModalDirect('authModal');
}

export function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
  const pw    = document.getElementById('loginPassword')?.value;
  const remember = document.getElementById('rememberMe')?.checked;

  const users = lsGet('wl_users', {});
  const user  = users[email];
  if (!user || user.pw !== simpleHash(pw)) {
    return showAuthError('loginError', 'Invalid email or password. Please try again.');
  }

  const profile = { first: user.first, last: user.last, email: user.email, joined: user.joined };
  loginUser(profile, remember);
  showToast(`Welcome back, ${user.first}! 🌍`);
  closeModalDirect('authModal');
}

function loginUser(user, remember) {
  ssSet('wl_session', user);
  if (remember) lsSet('wl_session', user);
  applyLoggedInState(user);
}

function applyLoggedInState(user) {
  document.getElementById('authBtn')?.setAttribute('style', 'display:none');
  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) {
    profileBtn.style.display = 'flex';
    const initEl = document.getElementById('userInitials');
    if (initEl) initEl.textContent = (user.first[0] + (user.last?.[0] || '')).toUpperCase();
  }
  const nameEl = document.getElementById('profileName');
  if (nameEl) nameEl.textContent = `${user.first} ${user.last}`;
  const emailEl = document.getElementById('profileEmail');
  if (emailEl) emailEl.textContent = user.email;
}

export function logout() {
  sessionStorage.removeItem('wl_session');
  localStorage.removeItem('wl_session');
  location.reload();
}

export function toggleUserMenu() {
  document.getElementById('userDropdown')?.classList.toggle('open');
}

export function closeUserMenu() {
  document.getElementById('userDropdown')?.classList.remove('open');
}

export function checkPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8)          score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12)         score++;

  const levels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
  const lvl    = levels[Math.max(0, Math.min(score - 1, 4))];
  const color  = colors[Math.max(0, Math.min(score - 1, 4))];

  const bar  = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');
  if (bar)  { bar.style.width = `${(score / 5) * 100}%`; bar.style.background = color; }
  if (text) { text.textContent = lvl; text.style.color = color; }
}

function showAuthError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
}

function clearAuthErrors() {
  ['loginError', 'signupError'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    el.classList.remove('show');
  });
}
