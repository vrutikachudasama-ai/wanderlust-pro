/**
 * quiz.js
 * Destination match quiz with nearest-match algorithm.
 */

import { quizQuestions, quizResults } from '../data/quiz.js';
import { sanitizeHTML } from '../utils/sanitize.js';

let quizAnswers = [];

export function initQuiz() {
  quizAnswers = [];
  renderQuizStep();
}

function renderQuizStep() {
  const step = quizAnswers.length;
  const el   = document.getElementById('quizContent');
  if (!el) return;

  if (step >= quizQuestions.length) {
    showQuizResult();
    return;
  }

  const q = quizQuestions[step];
  el.innerHTML = `
    <div class="quiz-q-num">Question ${step + 1} of ${quizQuestions.length}</div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">
      ${q.options.map((o, i) => `<button class="quiz-option" onclick="quizAnswer(${i})">${o}</button>`).join('')}
    </div>
    <div class="quiz-progress">
      ${quizQuestions.map((_, i) => `<div class="quiz-dot ${i < step ? 'done' : i === step ? 'active' : ''}"></div>`).join('')}
    </div>`;
}

export function quizAnswer(idx) {
  quizAnswers.push(idx);
  renderQuizStep();
}

function showQuizResult() {
  const result = quizResults.reduce((best, r) => {
    const score = r.a.filter((a, i) => a === quizAnswers[i]).length;
    return score > best.score ? { result: r, score } : best;
  }, { result: quizResults[0], score: -1 }).result;

  const el = document.getElementById('quizContent');
  if (!el) return;

  el.innerHTML = `
    <div class="quiz-result">
      <div style="font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold-light)">Your Perfect Destination</div>
      <div class="quiz-result-dest">${sanitizeHTML(result.dest)}</div>
      <div class="quiz-result-why">${sanitizeHTML(result.why)}</div>
      <div class="quiz-result-actions">
        <button class="quiz-restart-btn" onclick="initQuiz()">🔄 Try Again</button>
        <a href="#budget"    class="quiz-result-cta-btn">💰 Plan Budget</a>
        <a href="#itinerary" class="quiz-result-cta-btn">🗺️ Build Itinerary</a>
      </div>
    </div>`;
}
