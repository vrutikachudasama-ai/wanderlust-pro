/**
 * weather.js
 * OpenWeatherMap integration with demo-mode fallback.
 * API key lives here for demo. In production, proxy via GET /api/weather?city=...
 */

import { sanitizeHTML } from '../utils/sanitize.js';
import { showToast }     from '../utils/toast.js';

const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';

const DEMO_DATA = {
  bali:   { temp:29, feels:33, humidity:78, wind:14, desc:'Partly cloudy',   icon:'⛅' },
  paris:  { temp:17, feels:15, humidity:65, wind:22, desc:'Light rain',       icon:'🌦️' },
  goa:    { temp:31, feels:36, humidity:82, wind:18, desc:'Sunny and warm',   icon:'☀️' },
  manali: { temp:12, feels:8,  humidity:55, wind:30, desc:'Clear skies',      icon:'🌤️' },
  tokyo:  { temp:22, feels:21, humidity:60, wind:16, desc:'Sunny',            icon:'☀️' },
};

const ICON_MAP = {
  '01':'☀️', '02':'⛅', '03':'🌥️', '04':'☁️',
  '09':'🌧️', '10':'🌦️', '11':'⛈️', '13':'❄️', '50':'🌫️',
};

export async function getWeather() {
  const city = document.getElementById('weatherCity')?.value.trim();
  if (!city) { showToast('Please enter a city name'); return; }

  const resultEl = document.getElementById('weatherResult');
  resultEl.innerHTML = '<div class="weather-loading">🌐 Fetching live weather data...</div>';

  if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
    showDemoWeather(city, resultEl);
    return;
  }

  try {
    const r = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    if (!r.ok) throw new Error('City not found');
    renderWeather(await r.json(), resultEl);
  } catch {
    resultEl.innerHTML = `<div class="weather-error"><div style="font-size:2.5rem;margin-bottom:12px">🌫️</div><p>City not found or API error. Check your API key in weather.js.</p></div>`;
  }
}

function showDemoWeather(city, el) {
  const d = DEMO_DATA[city.toLowerCase()] ?? {
    temp:     Math.floor(Math.random() * 20) + 15,
    feels:    Math.floor(Math.random() * 20) + 13,
    humidity: Math.floor(Math.random() * 40) + 40,
    wind:     Math.floor(Math.random() * 30) + 10,
    desc:     'Clear skies',
    icon:     '🌤️',
  };
  renderWeatherData(city, d.icon, d.desc, d.temp, d.feels, d.humidity, d.wind, el, true);
}

function renderWeather(data, el) {
  const code = data.weather[0].icon.substring(0, 2);
  renderWeatherData(
    data.name,
    ICON_MAP[code] ?? '🌤️',
    data.weather[0].description,
    Math.round(data.main.temp),
    Math.round(data.main.feels_like),
    data.main.humidity,
    Math.round(data.wind.speed * 3.6),
    el,
    false
  );
}

function renderWeatherData(city, icon, desc, temp, feels, humidity, wind, el, isDemo) {
  const advice   = getWeatherAdvice(temp, desc);
  const safeCity = sanitizeHTML(city);
  const safeDesc = sanitizeHTML(desc);

  el.innerHTML = `
    <div class="weather-display">
      ${isDemo ? '<p style="text-align:center;font-size:0.75rem;color:var(--text-lt);margin-bottom:8px">Demo mode — add your OpenWeatherMap API key for live data</p>' : ''}
      <div class="weather-main">
        <div>
          <div class="weather-city-name">${safeCity}</div>
          <div class="weather-country">${safeDesc.charAt(0).toUpperCase() + safeDesc.slice(1)}</div>
        </div>
        <div class="weather-temp-block">
          <div class="weather-icon-emoji">${icon}</div>
          <div class="weather-temp">${temp}°C</div>
        </div>
      </div>
      <div class="weather-stats-grid">
        <div class="weather-stat-item"><div class="weather-stat-icon">🌡️</div><div><div class="weather-stat-label">Feels Like</div><div class="weather-stat-value">${feels}°C</div></div></div>
        <div class="weather-stat-item"><div class="weather-stat-icon">💧</div><div><div class="weather-stat-label">Humidity</div><div class="weather-stat-value">${humidity}%</div></div></div>
        <div class="weather-stat-item"><div class="weather-stat-icon">💨</div><div><div class="weather-stat-label">Wind Speed</div><div class="weather-stat-value">${wind} km/h</div></div></div>
        <div class="weather-stat-item"><div class="weather-stat-icon">👗</div><div><div class="weather-stat-label">Pack</div><div class="weather-stat-value">${temp < 15 ? 'Warm layers' : temp < 25 ? 'Light layers' : 'Light clothes'}</div></div></div>
      </div>
      <div class="weather-advice">💡 ${advice}</div>
    </div>`;
}

function getWeatherAdvice(temp, desc) {
  const d = desc.toLowerCase();
  if (d.includes('rain') || d.includes('drizzle')) return 'Rain expected — pack a waterproof jacket and an umbrella!';
  if (d.includes('snow'))    return 'Snow expected — bring heavy winter layers, boots, and gloves.';
  if (d.includes('thunder')) return 'Thunderstorms likely — consider indoor activities and avoid exposed areas.';
  if (temp > 35) return 'Very hot! Pack light breathable clothes, sunscreen SPF 50+, and stay hydrated.';
  if (temp > 28) return "Warm and sunny — perfect travel weather! Don't forget sunscreen and sunglasses.";
  if (temp > 20) return 'Comfortable temperatures — great for sightseeing. Light layers recommended.';
  if (temp > 12) return 'Cool weather — pack a warm jacket and comfortable layers.';
  return 'Cold temperatures — heavy winter clothing, thermal layers, and warm accessories essential.';
}
