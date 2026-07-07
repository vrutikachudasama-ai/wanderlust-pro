/**
 * authController.js
 * Auth endpoints — stub implementations ready for JWT / bcrypt wiring.
 *
 * To activate:
 *   npm install bcryptjs jsonwebtoken
 *   Add JWT_SECRET and JWT_EXPIRES_IN to .env
 */

// const bcrypt = require('bcryptjs');
// const jwt    = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // TODO: hash password, save to DB, issue JWT
    // const hash = await bcrypt.hash(password, 12);
    // const user = await User.create({ firstName, lastName, email, password: hash });
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({ message: 'Registration endpoint ready — connect a database to activate.' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // TODO: look up user, compare bcrypt hash, issue JWT
    res.status(200).json({ message: 'Login endpoint ready — connect a database to activate.' });
  } catch (err) {
    next(err);
  }
};

exports.logout = (_req, res) => {
  // For cookie-based sessions: res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

exports.getMe = (req, res) => {
  // req.user is set by the protect middleware after JWT verification
  res.json({ user: req.user || null });
};
