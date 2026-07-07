/**
 * currency.js
 * Single source of truth for all currency conversion data.
 * All rates are INR-based (1 INR = 1).
 *
 * Production note: Replace with GET /api/fx-rates for live rates.
 */

/** Exchange rates relative to 1 INR */
export const currencyRates = {
  INR: 1,
  USD: 83.5,
  EUR: 90.2,
  GBP: 105.8,
  AED: 22.7,
  JPY: 0.55,
  THB: 2.35,
  SGD: 61.4,
};

/** Currency display symbols */
export const currencySymbols = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
  JPY: '¥',
  THB: '฿',
  SGD: 'S$',
};

/** Daily spending reference spots (mid-range, INR base) */
export const dailySpendingSpots = [
  { dest: 'Goa',     budget: 2500 },
  { dest: 'Manali',  budget: 2000 },
  { dest: 'Bali',    budget: 3500 },
  { dest: 'Bangkok', budget: 4000 },
  { dest: 'Paris',   budget: 8500 },
  { dest: 'Tokyo',   budget: 7000 },
];
