/**
 * destinations.js — /api/destinations
 *
 * GET /api/destinations          → list all (with optional ?cat=beaches&month=6)
 * GET /api/destinations/:id      → single destination
 */

const router     = require('express').Router();
const controller = require('../controllers/destinationController');

router.get('/',    controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
