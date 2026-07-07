/**
 * auth.js — JWT authentication middleware
 * Protects routes that require a logged-in user.
 *
 * Usage:
 *   const { protect } = require('../middleware/auth');
 *   router.get('/profile', protect, profileController.getProfile);
 *
 * Current state: stub (no JWT library installed yet).
 * Install: npm install jsonwebtoken
 */

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorised — no token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // const jwt     = require('jsonwebtoken');
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorised — invalid or expired token.' });
  }
}

module.exports = { protect };
