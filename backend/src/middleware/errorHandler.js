/**
 * errorHandler.js — Centralised error middleware
 */

function notFound(req, res, next) {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

function errorHandler(err, _req, res, _next) {
  const status  = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Internal server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${status}] ${err.message}`);
    if (err.stack) console.error(err.stack);
  }

  res.status(status).json({ error: message });
}

module.exports = { notFound, errorHandler };
