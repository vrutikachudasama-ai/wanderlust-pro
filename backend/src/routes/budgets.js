/**
 * budgets.js — /api/budgets
 *
 * GET /api/budgets/:destination   → budget estimates for a destination
 * GET /api/budgets/fx-rates       → latest currency exchange rates
 */

const router     = require('express').Router();
const controller = require('../controllers/budgetController');

router.get('/fx-rates',      controller.getFxRates);
router.get('/:destination',  controller.getBudgetEstimates);

module.exports = router;
