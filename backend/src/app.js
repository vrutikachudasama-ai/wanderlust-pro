/**
 * app.js — Express application factory
 * Separated from server.js so the app can be imported in tests
 * without binding to a port.
 */

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');

const destinationRoutes = require('./routes/destinations');
const weatherRoutes     = require('./routes/weather');
const budgetRoutes      = require('./routes/budgets');
const authRoutes        = require('./routes/auth');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

/* ── Security headers ─────────────────────────────────────────────── */
app.use(helmet());

/* ── CORS ─────────────────────────────────────────────────────────── */
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

/* ── Request parsing ──────────────────────────────────────────────── */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

/* ── Logging ──────────────────────────────────────────────────────── */
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

/* ── Rate limiting ────────────────────────────────────────────────── */
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — please wait before trying again.' },
}));

/* ── Routes ───────────────────────────────────────────────────────── */
app.use('/api/destinations', destinationRoutes);
app.use('/api/weather',      weatherRoutes);
app.use('/api/budgets',      budgetRoutes);
app.use('/api/auth',         authRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }));

/* ── Error handling ───────────────────────────────────────────────── */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
