/**
 * budgetController.js
 * Budget estimates and exchange rates endpoints.
 */

const estimates = require('../database/seeds/budget-estimates.json');

const FX_RATES = {
  INR: 1, USD: 83.5, EUR: 90.2, GBP: 105.8,
  AED: 22.7, JPY: 0.55, THB: 2.35, SGD: 61.4,
};

exports.getFxRates = (_req, res) => {
  res.json({
    base: 'INR',
    updatedAt: new Date().toISOString(),
    note: 'Static indicative rates. Integrate a live FX API (Open Exchange Rates / Fixer.io) for production.',
    rates: FX_RATES,
  });
};

exports.getBudgetEstimates = (req, res) => {
  const key  = req.params.destination.toLowerCase().trim();
  const data = estimates[key];
  if (!data) return res.status(404).json({ error: `No estimates found for "${req.params.destination}"` });
  res.json(data);
};
