/**
 * checklist.js
 * Smart packing checklist with progress tracking and custom items.
 */

import { checklistData }          from '../data/checklist.js';
import { lsGet, lsSet }           from '../utils/storage.js';
import { openModal, closeModalDirect } from '../utils/modal.js';
import { showToast }              from '../utils/toast.js';

let currentChecklistType = 'general';
let checkedItems  = lsGet('wanderlust_checklist',     {});
let customItems   = lsGet('wanderlust_custom_items',  {});

export function loadChecklist(type, btn) {
  currentChecklistType = type;

  document.querySelectorAll('.type-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const data = checklistData[type];
  if (!data) return;

  const container = document.getElementById('checklistContainer');
  if (!container) return;

  container.innerHTML = Object.entries(data).map(([cat, items]) => `
    <div class="checklist-category">
      <div class="checklist-cat-header">${cat}</div>
      <div class="checklist-items">
        ${items.map((item) => renderCheckItem(item, type)).join('')}
        ${(customItems[type] || []).filter((ci) => ci.cat === cat).map((ci) => renderCheckItem(ci, type, true)).join('')}
      </div>
    </div>`).join('');

  updateProgress(data);
}

function renderCheckItem(item, type, isCustom = false) {
  const key     = `${type}_${item.id}`;
  const checked = checkedItems[key];
  return `
    <label class="checklist-item ${checked ? 'checked' : ''} priority-${item.priority}">
      <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleCheckItem('${key}', this)">
      <span class="checklist-label">${item.label}</span>
      <span class="checklist-priority ${item.priority}">${item.priority}</span>
      ${isCustom ? `<button class="checklist-remove" onclick="removeCustomItem('${item.id}')">✕</button>` : ''}
    </label>`;
}

export function toggleCheckItem(key, checkbox) {
  if (checkbox.checked) {
    checkedItems[key] = true;
    checkbox.closest('.checklist-item')?.classList.add('checked');
  } else {
    delete checkedItems[key];
    checkbox.closest('.checklist-item')?.classList.remove('checked');
  }
  lsSet('wanderlust_checklist', checkedItems);
  updateProgress(checklistData[currentChecklistType]);
}

function updateProgress(data) {
  let total = 0, done = 0;
  Object.values(data).forEach((items) => {
    items.forEach((item) => {
      total++;
      if (checkedItems[`${currentChecklistType}_${item.id}`]) done++;
    });
  });

  (customItems[currentChecklistType] || []).forEach((ci) => {
    total++;
    if (checkedItems[`${currentChecklistType}_${ci.id}`]) done++;
  });

  const pct = total ? Math.round((done / total) * 100) : 0;
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = `${pct}% packed (${done}/${total})`;
  if (pct === 100) showToast('🎉 All packed! Ready to travel!');
}

export function resetChecklist() {
  const data = checklistData[currentChecklistType];
  if (!data) return;
  Object.values(data).forEach((items) =>
    items.forEach((item) => delete checkedItems[`${currentChecklistType}_${item.id}`])
  );
  (customItems[currentChecklistType] || []).forEach((ci) =>
    delete checkedItems[`${currentChecklistType}_${ci.id}`]
  );
  lsSet('wanderlust_checklist', checkedItems);
  loadChecklist(currentChecklistType, null);
  showToast('Checklist reset!');
}

export function addCustomItem() {
  openModal('customItemModal');
}

export function saveCustomItem() {
  const name = document.getElementById('customItemName')?.value.trim();
  const cat  = document.getElementById('customItemCat')?.value;
  if (!name) { showToast('Please enter an item name'); return; }

  if (!customItems[currentChecklistType]) customItems[currentChecklistType] = [];
  const id = 'custom_' + Date.now();
  customItems[currentChecklistType].push({ id, label: name, cat, priority: 'optional' });

  lsSet('wanderlust_custom_items', customItems);
  closeModalDirect('customItemModal');
  const nameEl = document.getElementById('customItemName');
  if (nameEl) nameEl.value = '';

  loadChecklist(currentChecklistType, null);
  showToast(`"${name}" added to your checklist!`);
}

export function removeCustomItem(id) {
  if (!customItems[currentChecklistType]) return;
  customItems[currentChecklistType] = customItems[currentChecklistType].filter((ci) => ci.id !== id);
  lsSet('wanderlust_custom_items', customItems);
  loadChecklist(currentChecklistType, null);
}
