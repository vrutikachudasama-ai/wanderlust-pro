/**
 * destinationController.js
 * Serves destination data. Currently reads from the static JSON seed;
 * swap for a DB query (Destination.find()) when the database is wired up.
 */

const destinations = require('../database/seeds/destinations.json');

exports.getAll = (req, res) => {
  const { cat, month } = req.query;
  let results = [...destinations];

  if (cat && cat !== 'all') {
    results = results.filter((d) => d.cat === cat);
  }
  if (month) {
    const m = parseInt(month, 10);
    if (!isNaN(m)) results = results.filter((d) => d.months.includes(m));
  }

  res.json({ count: results.length, data: results });
};

exports.getById = (req, res) => {
  const id   = parseInt(req.params.id, 10);
  const dest = destinations.find((d) => d.id === id);
  if (!dest) return res.status(404).json({ error: 'Destination not found' });
  res.json(dest);
};
