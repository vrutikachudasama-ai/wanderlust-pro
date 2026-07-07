/**
 * auth.js — /api/auth
 *
 * POST /api/auth/register
 * POST /api/auth/login
 * POST /api/auth/logout
 * GET  /api/auth/me         (protected)
 */

const router     = require('express').Router();
const controller = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', controller.register);
router.post('/login',    controller.login);
router.post('/logout',   controller.logout);
router.get('/me',        protect, controller.getMe);

module.exports = router;
