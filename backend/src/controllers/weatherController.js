/**
 * weatherController.js
 * Proxies OpenWeatherMap so the API key never reaches the client.
 */

exports.getWeather = async (req, res, next) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'city query parameter is required' });

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Weather API key not configured on server' });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const r   = await fetch(url);

    if (!r.ok) {
      const code = r.status;
      return res.status(code === 404 ? 404 : 502).json({ error: code === 404 ? 'City not found' : 'Upstream weather API error' });
    }

    const data = await r.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
