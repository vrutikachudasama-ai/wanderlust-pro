/**
 * weather.js — /api/weather
 *
 * GET /api/weather?city=Paris
 * Proxies OpenWeatherMap so the API key stays server-side.
 */

const router     = require('express').Router();
const controller = require('../controllers/weatherController');

router.get('/', controller.getWeather);

module.exports = router;
