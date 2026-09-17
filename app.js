/**
 * Weatherly — Premium Weather App
 * Complete frontend with mock data, graphs, date selector, search, themes, AQI, suggestions
 */

'use strict';

/* ================================================================
   MOCK WEATHER DATA
   ================================================================ */

const WEATHER_CONDITIONS = {
  CLEAR:   { label: 'Clear Sky',       icon: '☀️',  bg: 'clear-day',  particles: 'clear'  },
  PCLOUDY: { label: 'Partly Cloudy',   icon: '⛅',  bg: 'cloudy',     particles: 'clear'  },
  CLOUDY:  { label: 'Cloudy',          icon: '☁️',  bg: 'cloudy',     particles: 'none'   },
  RAIN:    { label: 'Rainy',           icon: '🌧️', bg: 'rain',       particles: 'rain'   },
  DRIZZ:   { label: 'Drizzle',         icon: '🌦️', bg: 'rain',       particles: 'rain'   },
  STORM:   { label: 'Thunderstorm',    icon: '⛈️', bg: 'storm',      particles: 'rain'   },
  SNOW:    { label: 'Snowy',           icon: '❄️',  bg: 'snow',       particles: 'snow'   },
  FOG:     { label: 'Foggy',           icon: '🌫️', bg: 'fog',        particles: 'none'   },
  HAZE:    { label: 'Hazy',            icon: '🌁',  bg: 'fog',        particles: 'none'   },
  WINDY:   { label: 'Windy',           icon: '💨',  bg: 'cloudy',     particles: 'clear'  },
};

const CITIES = {
  'Hyderabad': {
    country: 'India', flag: '🇮🇳',
    lat: 17.38, lon: 78.47,
    timezone: 'IST',
    sunrise: '06:12', sunset: '18:48',
    base: {
      temp: 32, feelsLike: 35, humidity: 68, windSpeed: 14, windDir: 'SW', windGusts: 22,
      uvIndex: 8, rainfall: 2.4, visibility: 9, dewPoint: 24, pressure: 1010,
      condition: 'PCLOUDY',
    },
    aqi: { value: 78, pm25: 32, pm10: 58, no2: 28, co: 0.8 },
    hourlyPattern: [26, 25, 25, 24, 25, 27, 29, 31, 33, 35, 36, 36, 35, 34, 33, 32, 31, 30, 29, 28, 28, 27, 27, 26],
    hourlyConditions: ['CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','RAIN','DRIZZ','DRIZZ','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR'],
    forecast: [
      { condition:'PCLOUDY', high:36, low:26, pop:20 },
      { condition:'RAIN',    high:32, low:24, pop:70 },
      { condition:'DRIZZ',   high:30, low:23, pop:55 },
      { condition:'PCLOUDY', high:31, low:24, pop:15 },
      { condition:'CLEAR',   high:34, low:25, pop:5  },
      { condition:'CLEAR',   high:35, low:26, pop:5  },
      { condition:'PCLOUDY', high:33, low:25, pop:20 },
    ],
  },
  'Mumbai': {
    country: 'India', flag: '🇮🇳',
    lat: 19.07, lon: 72.87,
    timezone: 'IST',
    sunrise: '06:22', sunset: '18:55',
    base: {
      temp: 30, feelsLike: 34, humidity: 82, windSpeed: 18, windDir: 'W', windGusts: 28,
      uvIndex: 7, rainfall: 8.6, visibility: 7, dewPoint: 27, pressure: 1008,
      condition: 'RAIN',
    },
    aqi: { value: 112, pm25: 52, pm10: 88, no2: 42, co: 1.2 },
    hourlyPattern: [27, 27, 26, 26, 27, 28, 29, 30, 30, 31, 31, 31, 30, 30, 29, 29, 29, 28, 28, 28, 27, 27, 27, 27],
    hourlyConditions: ['RAIN','RAIN','DRIZZ','DRIZZ','DRIZZ','RAIN','RAIN','CLOUDY','CLOUDY','PCLOUDY','RAIN','STORM','STORM','RAIN','RAIN','DRIZZ','DRIZZ','CLOUDY','CLOUDY','PCLOUDY','PCLOUDY','DRIZZ','RAIN','RAIN'],
    forecast: [
      { condition:'RAIN',   high:31, low:26, pop:85 },
      { condition:'STORM',  high:29, low:25, pop:90 },
      { condition:'RAIN',   high:30, low:25, pop:75 },
      { condition:'DRIZZ',  high:31, low:25, pop:50 },
      { condition:'PCLOUDY',high:32, low:26, pop:30 },
      { condition:'PCLOUDY',high:32, low:26, pop:20 },
      { condition:'CLOUDY', high:31, low:25, pop:35 },
    ],
  },
  'Delhi': {
    country: 'India', flag: '🇮🇳',
    lat: 28.61, lon: 77.21,
    timezone: 'IST',
    sunrise: '05:52', sunset: '19:18',
    base: {
      temp: 38, feelsLike: 42, humidity: 45, windSpeed: 12, windDir: 'NW', windGusts: 18,
      uvIndex: 10, rainfall: 0, visibility: 6, dewPoint: 22, pressure: 1005,
      condition: 'HAZE',
    },
    aqi: { value: 185, pm25: 92, pm10: 148, no2: 68, co: 2.1 },
    hourlyPattern: [30, 29, 28, 28, 29, 31, 34, 36, 38, 40, 41, 42, 42, 41, 40, 38, 36, 35, 33, 32, 31, 30, 30, 30],
    hourlyConditions: ['CLEAR','CLEAR','CLEAR','CLEAR','HAZE','HAZE','HAZE','HAZE','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','HAZE','HAZE','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR'],
    forecast: [
      { condition:'HAZE',   high:42, low:30, pop:5  },
      { condition:'CLEAR',  high:41, low:29, pop:5  },
      { condition:'PCLOUDY',high:39, low:28, pop:15 },
      { condition:'PCLOUDY',high:37, low:27, pop:25 },
      { condition:'RAIN',   high:35, low:26, pop:60 },
      { condition:'DRIZZ',  high:33, low:25, pop:45 },
      { condition:'CLEAR',  high:36, low:27, pop:10 },
    ],
  },
  'Bengaluru': {
    country: 'India', flag: '🇮🇳',
    lat: 12.97, lon: 77.59,
    timezone: 'IST',
    sunrise: '06:10', sunset: '18:32',
    base: {
      temp: 24, feelsLike: 25, humidity: 72, windSpeed: 10, windDir: 'SE', windGusts: 16,
      uvIndex: 6, rainfall: 1.2, visibility: 12, dewPoint: 18, pressure: 1015,
      condition: 'CLEAR',
    },
    aqi: { value: 52, pm25: 22, pm10: 38, no2: 18, co: 0.6 },
    hourlyPattern: [20, 19, 19, 18, 19, 20, 21, 22, 23, 24, 25, 26, 26, 26, 25, 24, 23, 23, 22, 22, 21, 21, 20, 20],
    hourlyConditions: ['CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','PCLOUDY','DRIZZ','DRIZZ','PCLOUDY','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR'],
    forecast: [
      { condition:'CLEAR',  high:26, low:18, pop:10 },
      { condition:'PCLOUDY',high:25, low:18, pop:20 },
      { condition:'DRIZZ',  high:24, low:17, pop:45 },
      { condition:'RAIN',   high:22, low:16, pop:65 },
      { condition:'PCLOUDY',high:24, low:17, pop:25 },
      { condition:'CLEAR',  high:26, low:18, pop:5  },
      { condition:'CLEAR',  high:27, low:18, pop:5  },
    ],
  },
  'Chennai': {
    country: 'India', flag: '🇮🇳',
    lat: 13.08, lon: 80.27,
    timezone: 'IST',
    sunrise: '05:58', sunset: '18:27',
    base: {
      temp: 35, feelsLike: 40, humidity: 78, windSpeed: 20, windDir: 'E', windGusts: 32,
      uvIndex: 9, rainfall: 0, visibility: 8, dewPoint: 28, pressure: 1006,
      condition: 'CLEAR',
    },
    aqi: { value: 68, pm25: 28, pm10: 48, no2: 22, co: 0.7 },
    hourlyPattern: [28, 27, 27, 27, 28, 29, 31, 33, 34, 36, 37, 37, 37, 36, 35, 34, 33, 32, 31, 30, 30, 29, 29, 28],
    hourlyConditions: ['CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR'],
    forecast: [
      { condition:'CLEAR',  high:37, low:27, pop:5  },
      { condition:'CLEAR',  high:38, low:28, pop:5  },
      { condition:'PCLOUDY',high:36, low:27, pop:15 },
      { condition:'DRIZZ',  high:33, low:26, pop:40 },
      { condition:'RAIN',   high:31, low:25, pop:70 },
      { condition:'DRIZZ',  high:32, low:25, pop:50 },
      { condition:'PCLOUDY',high:34, low:26, pop:20 },
    ],
  },
  'London': {
    country: 'United Kingdom', flag: '🇬🇧',
    lat: 51.51, lon: -0.12,
    timezone: 'BST',
    sunrise: '05:02', sunset: '20:48',
    base: {
      temp: 18, feelsLike: 16, humidity: 72, windSpeed: 22, windDir: 'W', windGusts: 34,
      uvIndex: 3, rainfall: 4.2, visibility: 11, dewPoint: 12, pressure: 1018,
      condition: 'PCLOUDY',
    },
    aqi: { value: 42, pm25: 16, pm10: 28, no2: 32, co: 0.5 },
    hourlyPattern: [13, 13, 12, 12, 13, 14, 15, 16, 17, 17, 18, 18, 18, 17, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13],
    hourlyConditions: ['CLOUDY','CLOUDY','DRIZZ','DRIZZ','RAIN','RAIN','PCLOUDY','PCLOUDY','CLEAR','CLEAR','PCLOUDY','PCLOUDY','CLOUDY','DRIZZ','DRIZZ','PCLOUDY','PCLOUDY','CLEAR','CLEAR','PCLOUDY','CLOUDY','CLOUDY','DRIZZ','DRIZZ'],
    forecast: [
      { condition:'PCLOUDY',high:18, low:12, pop:40 },
      { condition:'RAIN',   high:16, low:11, pop:75 },
      { condition:'DRIZZ',  high:15, low:10, pop:55 },
      { condition:'CLOUDY', high:17, low:11, pop:30 },
      { condition:'PCLOUDY',high:19, low:12, pop:20 },
      { condition:'CLEAR',  high:20, low:13, pop:10 },
      { condition:'PCLOUDY',high:19, low:12, pop:25 },
    ],
  },
  'New York': {
    country: 'United States', flag: '🇺🇸',
    lat: 40.71, lon: -74.00,
    timezone: 'EDT',
    sunrise: '05:58', sunset: '19:54',
    base: {
      temp: 26, feelsLike: 27, humidity: 58, windSpeed: 16, windDir: 'NE', windGusts: 24,
      uvIndex: 6, rainfall: 0, visibility: 16, dewPoint: 16, pressure: 1020,
      condition: 'CLEAR',
    },
    aqi: { value: 58, pm25: 24, pm10: 38, no2: 28, co: 0.6 },
    hourlyPattern: [19, 18, 18, 17, 18, 20, 22, 24, 25, 26, 27, 27, 27, 26, 26, 25, 24, 23, 22, 22, 21, 21, 20, 20],
    hourlyConditions: ['CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR'],
    forecast: [
      { condition:'CLEAR',  high:27, low:18, pop:5  },
      { condition:'PCLOUDY',high:26, low:17, pop:15 },
      { condition:'PCLOUDY',high:24, low:16, pop:30 },
      { condition:'RAIN',   high:22, low:15, pop:65 },
      { condition:'DRIZZ',  high:21, low:14, pop:50 },
      { condition:'PCLOUDY',high:23, low:15, pop:20 },
      { condition:'CLEAR',  high:25, low:16, pop:10 },
    ],
  },
  'Tokyo': {
    country: 'Japan', flag: '🇯🇵',
    lat: 35.68, lon: 139.69,
    timezone: 'JST',
    sunrise: '04:52', sunset: '18:42',
    base: {
      temp: 29, feelsLike: 31, humidity: 66, windSpeed: 12, windDir: 'S', windGusts: 18,
      uvIndex: 7, rainfall: 1.6, visibility: 14, dewPoint: 21, pressure: 1012,
      condition: 'PCLOUDY',
    },
    aqi: { value: 35, pm25: 14, pm10: 24, no2: 20, co: 0.4 },
    hourlyPattern: [24, 23, 23, 22, 23, 24, 25, 26, 27, 28, 29, 30, 30, 30, 29, 28, 28, 27, 26, 26, 25, 25, 24, 24],
    hourlyConditions: ['CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','CLEAR','CLEAR','CLEAR','PCLOUDY','PCLOUDY','CLEAR','CLEAR','PCLOUDY','DRIZZ','DRIZZ','PCLOUDY','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR','CLEAR'],
    forecast: [
      { condition:'PCLOUDY',high:30, low:22, pop:20 },
      { condition:'DRIZZ',  high:28, low:21, pop:50 },
      { condition:'RAIN',   high:27, low:20, pop:70 },
      { condition:'PCLOUDY',high:29, low:21, pop:30 },
      { condition:'CLEAR',  high:31, low:22, pop:5  },
      { condition:'CLEAR',  high:32, low:23, pop:5  },
      { condition:'PCLOUDY',high:30, low:22, pop:20 },
    ],
  },
};

// All known city names for search suggestions
const CITY_KEYS = Object.keys(CITIES);

/* ================================================================
   APP STATE
   ================================================================ */
const state = {
  currentCity: 'Hyderabad',
  selectedDate: null,   // Date object
  dateOffset: 0,        // week offset from today
  theme: 'dark',
  loading: false,
  startDateOfWeek: null,
};

/* ================================================================
   DOM REFS
   ================================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const DOM = {
  app:          $('app'),
  loadingScreen:$('loading-screen'),
  bgOverlay:    $('bg-overlay'),
  particles:    $('particles'),
  citySearch:   $('city-search'),
  searchBtn:    $('search-btn'),
  searchSug:    $('search-suggestions'),
  locationBtn:  $('location-btn'),
  themeToggle:  $('theme-toggle'),
  themeIcon:    $('theme-icon'),
  errorBanner:  $('error-banner'),
  errorMsg:     $('error-message'),
  errorClose:   $('error-close'),
  currentCity:  $('current-city'),
  currentCountry:$('current-country'),
  currentDatetime:$('current-datetime'),
  currentIcon:  $('current-icon'),
  currentTemp:  $('current-temp'),
  feelsLike:    $('feels-like'),
  currentDesc:  $('current-desc'),
  tempHigh:     $('temp-high'),
  tempLow:      $('temp-low'),
  dateSelector: $('date-selector'),
  dateRangeLabel:$('date-range-label'),
  prevWeek:     $('prev-week'),
  nextWeek:     $('next-week'),
  suggestionsList:$('suggestions-list'),
  aqiNumber:    $('aqi-number'),
  aqiLabel:     $('aqi-label'),
  aqiFill:      $('aqi-fill'),
  aqiThumb:     $('aqi-thumb'),
  aqiPollutants:$('aqi-pollutants'),
  tempGraph:    $('temp-graph'),
  graphContainer:$('graph-container'),
  graphTooltip: $('graph-tooltip'),
  sunEmoji:     $('sun-emoji'),
  graphDateLabel:$('graph-date-label'),
  timeLabels:   $('time-labels'),
  hourlyStrip:  $('hourly-strip'),
  forecastList: $('forecast-list'),
  predictionGraph:$('prediction-graph'),
  predictionLabels:$('prediction-labels'),
  sunArc:       $('sun-arc'),
  sunriseTime:  $('sunrise-time'),
  sunsetTime:   $('sunset-time'),
  daylightHours:$('daylight-hours'),
  daylightFill: $('daylight-fill'),
  humidity:     $('humidity'),
  windSpeed:    $('wind-speed'),
  windDir:      $('wind-dir'),
  uvIndex:      $('uv-index'),
  rainfall:     $('rainfall'),
  visibility:   $('visibility'),
  dewPoint:     $('dew-point'),
  pressure:     $('pressure'),
  compassArrow: $('compass-arrow'),
  wsSped:       $('ws-speed'),
  wsGusts:      $('ws-gusts'),
  wsDir:        $('ws-dir'),
};

/* ================================================================
   UTILITIES
   ================================================================ */

function formatDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
function formatShortDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function formatTime(h, m = 0) {
  const period = h < 12 ? 'AM' : 'PM';
  const hh = h % 12 || 12;
  const mm = String(m).padStart(2, '0');
  return `${hh}:${mm} ${period}`;
}
function dayOffset(baseDate, offsetDays) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + offsetDays);
  return d;
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}
function clamp(v, mn, mx) { return Math.max(mn, Math.min(mx, v)); }

// Vary weather data day-to-day (±offset from base, seeded by date)
function getDateSeed(date, cityKey) {
  const s = `${cityKey}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (Math.imul(1664525, s) + 1013904223) | 0;
    return (s >>> 0) / 0xffffffff;
  };
}
function getWeatherForDate(cityKey, date) {
  const city = CITIES[cityKey];
  if (!city) return null;
  const today = new Date();
  const diffDays = Math.round((date - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
  const forecastIdx = clamp(diffDays, 0, city.forecast.length - 1);
  const forecast = diffDays >= 0 && diffDays < city.forecast.length
    ? city.forecast[forecastIdx]
    : city.forecast[Math.abs(diffDays) % city.forecast.length];

  const seed = getDateSeed(date, cityKey);
  const rnd = seededRandom(seed);
  const tempOffset = (rnd() - 0.5) * 6;
  const humidityOffset = Math.round((rnd() - 0.5) * 20);

  const conditionKey = forecast.condition;
  const condition = WEATHER_CONDITIONS[conditionKey];

  // Build hourly data with day-specific variation
  const hourly = city.hourlyPattern.map((t, i) => {
    const condIdx = (i + Math.abs(seed) % 6) % city.hourlyConditions.length;
    return {
      hour: i,
      temp: Math.round(t + tempOffset + (rnd() - 0.5) * 3),
      condition: city.hourlyConditions[condIdx],
      icon: WEATHER_CONDITIONS[city.hourlyConditions[condIdx]].icon,
      rain: conditionKey === 'RAIN' || conditionKey === 'STORM'
        ? (rnd() * 8).toFixed(1)
        : conditionKey === 'DRIZZ' ? (rnd() * 2).toFixed(1) : '0',
    };
  });

  return {
    cityKey,
    country: city.country,
    flag: city.flag,
    conditionKey,
    condition,
    temp: Math.round(city.base.temp + tempOffset),
    feelsLike: Math.round(city.base.feelsLike + tempOffset),
    high: forecast.high,
    low: forecast.low,
    humidity: clamp(city.base.humidity + humidityOffset, 20, 99),
    windSpeed: city.base.windSpeed,
    windDir: city.base.windDir,
    windGusts: city.base.windGusts,
    uvIndex: city.base.uvIndex,
    rainfall: forecast.pop > 30 ? (rnd() * 12).toFixed(1) : '0',
    visibility: city.base.visibility,
    dewPoint: city.base.dewPoint,
    pressure: city.base.pressure,
    sunrise: city.sunrise,
    sunset: city.sunset,
    aqi: city.aqi,
    hourly,
    forecast: city.forecast,
  };
}

/* ================================================================
   CLOCK
   ================================================================ */
function startClock() {
  function tick() {
    const now = new Date();
    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' };
    DOM.currentDatetime.textContent = now.toLocaleString('en-US', opts);
  }
  tick();
  setInterval(tick, 1000);
}

/* ================================================================
   BACKGROUND & PARTICLES
   ================================================================ */
function setBackground(conditionKey) {
  const cond = WEATHER_CONDITIONS[conditionKey] || WEATHER_CONDITIONS.PCLOUDY;
  DOM.bgOverlay.className = 'bg-overlay ' + cond.bg;
  setParticles(cond.particles, conditionKey);
}

let particleInterval = null;
function setParticles(type, conditionKey) {
  clearInterval(particleInterval);
  DOM.particles.innerHTML = '';
  if (type === 'none') return;

  if (type === 'rain') {
    const count = conditionKey === 'STORM' ? 60 : conditionKey === 'RAIN' ? 40 : 20;
    for (let i = 0; i < count; i++) spawnRainDrop();
    return;
  }
  if (type === 'snow') {
    for (let i = 0; i < 25; i++) spawnSnowFlake();
    return;
  }
  if (type === 'clear') {
    for (let i = 0; i < 8; i++) spawnParticle();
    return;
  }
}

function spawnRainDrop() {
  const el = document.createElement('div');
  el.className = 'rain-drop';
  const h = 8 + Math.random() * 20;
  el.style.cssText = `
    left: ${Math.random() * 100}%;
    height: ${h}px;
    animation-duration: ${0.4 + Math.random() * 0.5}s;
    animation-delay: ${Math.random() * 2}s;
  `;
  DOM.particles.appendChild(el);
}
function spawnSnowFlake() {
  const el = document.createElement('div');
  el.className = 'snow-flake';
  el.textContent = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
  el.style.cssText = `
    left: ${Math.random() * 100}%;
    font-size: ${10 + Math.random() * 14}px;
    animation-duration: ${3 + Math.random() * 4}s;
    animation-delay: ${Math.random() * 5}s;
  `;
  DOM.particles.appendChild(el);
}
function spawnParticle() {
  const el = document.createElement('div');
  el.className = 'particle';
  const size = 3 + Math.random() * 5;
  el.style.cssText = `
    left: ${Math.random() * 100}%;
    top: ${60 + Math.random() * 40}%;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255,255,200,0.4);
    animation-duration: ${8 + Math.random() * 12}s;
    animation-delay: ${Math.random() * 8}s;
  `;
  DOM.particles.appendChild(el);
}

/* ================================================================
   THEME
   ================================================================ */
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  DOM.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('weatherly-theme', theme);
}
function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  // Re-render graphs so SVG colors update
  renderAll();
}

/* ================================================================
   CURRENT WEATHER DISPLAY
   ================================================================ */
function renderCurrentWeather(data) {
  DOM.currentCity.textContent = state.currentCity;
  DOM.currentCountry.textContent = `${data.flag} ${data.country}`;
  DOM.currentIcon.textContent = data.condition.icon;
  DOM.currentTemp.textContent = `${data.temp}°`;
  DOM.feelsLike.textContent = `${data.feelsLike}°`;
  DOM.currentDesc.textContent = data.condition.label;
  DOM.tempHigh.textContent = `${data.high}°`;
  DOM.tempLow.textContent = `${data.low}°`;
  setBackground(data.conditionKey);
}

/* ================================================================
   WEATHER DETAILS
   ================================================================ */
function renderDetails(data) {
  DOM.humidity.textContent   = `${data.humidity}%`;
  DOM.windSpeed.textContent  = `${data.windSpeed} km/h`;
  DOM.windDir.textContent    = data.windDir;
  DOM.uvIndex.textContent    = data.uvIndex;
  DOM.rainfall.textContent   = `${data.rainfall} mm`;
  DOM.visibility.textContent = `${data.visibility} km`;
  DOM.dewPoint.textContent   = `${data.dewPoint}°C`;
  DOM.pressure.textContent   = `${data.pressure} hPa`;
  // Wind card
  const wsSped = $('ws-speed');
  const wsGusts = $('ws-gusts');
  const wsDir = $('ws-dir');
  if (wsSped) wsSped.textContent = `${data.windSpeed} km/h`;
  if (wsGusts) wsGusts.textContent = `${data.windGusts} km/h`;
  if (wsDir) wsDir.textContent = data.windDir;
  rotateCompass(data.windDir);
}

const WIND_DIR_DEGREES = { N:0, NE:45, E:90, SE:135, S:180, SW:225, W:270, NW:315 };
function rotateCompass(dir) {
  const deg = WIND_DIR_DEGREES[dir] || 0;
  DOM.compassArrow.style.transform = `rotate(${deg}deg)`;
}

/* ================================================================
   AQI
   ================================================================ */
function renderAQI(aqi) {
  const val = aqi.value;
  DOM.aqiNumber.textContent = val;

  let label, cls;
  if (val <= 50)       { label = 'Good';      cls = 'aqi-good'; }
  else if (val <= 100) { label = 'Moderate';  cls = 'aqi-moderate'; }
  else if (val <= 200) { label = 'Poor';      cls = 'aqi-poor'; }
  else                 { label = 'Hazardous'; cls = 'aqi-hazardous'; }

  DOM.aqiLabel.textContent = label;
  DOM.aqiLabel.className = `aqi-label ${cls}`;

  const pct = clamp(val / 300, 0, 1) * 100;
  DOM.aqiThumb.style.left = pct + '%';

  DOM.aqiPollutants.innerHTML = `
    <div class="aqi-pollutant"><span>PM2.5</span><b>${aqi.pm25}</b></div>
    <div class="aqi-pollutant"><span>PM10</span><b>${aqi.pm10}</b></div>
    <div class="aqi-pollutant"><span>NO₂</span><b>${aqi.no2}</b></div>
    <div class="aqi-pollutant"><span>CO</span><b>${aqi.co}</b></div>
  `;
}

/* ================================================================
   SUGGESTIONS
   ================================================================ */
function renderSuggestions(data) {
  const { conditionKey, uvIndex, temp, windSpeed, humidity } = data;
  const suggestions = [];

  const needsUmbrella = ['RAIN','DRIZZ','STORM'].includes(conditionKey);
  suggestions.push({
    icon: '☂️', text: needsUmbrella ? 'Carry an umbrella — rain expected' : 'No umbrella needed today',
    badge: needsUmbrella ? 'Yes' : 'No',
    cls: needsUmbrella ? 'badge-yes' : 'badge-no'
  });

  const needsJacket = temp < 18 || (temp < 24 && windSpeed > 20);
  suggestions.push({
    icon: '🧥', text: needsJacket ? 'Wear a jacket — it\'s chilly' : 'Jacket not needed',
    badge: needsJacket ? 'Yes' : 'No',
    cls: needsJacket ? 'badge-yes' : 'badge-no'
  });

  const highUV = uvIndex >= 8;
  const modUV  = uvIndex >= 5;
  suggestions.push({
    icon: '🕶️', text: highUV ? 'High UV — wear sunscreen & sunglasses' : modUV ? 'Moderate UV — sunscreen recommended' : 'Low UV today',
    badge: highUV ? 'High UV' : modUV ? 'Moderate' : 'Low UV',
    cls: highUV ? 'badge-no' : modUV ? 'badge-maybe' : 'badge-yes'
  });

  const humid = humidity > 75;
  suggestions.push({
    icon: '💧', text: humid ? 'High humidity — stay hydrated' : 'Comfortable humidity levels',
    badge: humid ? 'Humid' : 'OK',
    cls: humid ? 'badge-maybe' : 'badge-yes'
  });

  if (['RAIN','STORM','DRIZZ'].includes(conditionKey)) {
    suggestions.push({ icon: '⚠️', text: 'Avoid outdoor activities if possible', badge: 'Warning', cls: 'badge-no' });
  } else if (conditionKey === 'CLEAR' && uvIndex < 7) {
    suggestions.push({ icon: '🏃', text: 'Great day for outdoor exercise!', badge: 'Go for it', cls: 'badge-yes' });
  } else if (conditionKey === 'SNOW') {
    suggestions.push({ icon: '🧣', text: 'Layer up — snow expected', badge: 'Cold', cls: 'badge-maybe' });
  }

  DOM.suggestionsList.innerHTML = suggestions.map(s => `
    <div class="suggestion-row fade-in">
      <span class="sug-icon">${s.icon}</span>
      <span class="sug-text">${s.text}</span>
      <span class="suggestion-badge ${s.cls}">${s.badge}</span>
    </div>
  `).join('');
}

/* ================================================================
   TEMPERATURE GRAPH (SVG curved line)
   ================================================================ */
function renderTempGraph(data) {
  const svg = DOM.tempGraph;
  const W = 800, H = 200;
  const padL = 40, padR = 20, padT = 28, padB = 16;

  const selectedHours = [0, 3, 6, 9, 12, 15, 18, 21];
  const points = selectedHours.map((h, i) => ({
    h,
    temp: data.hourly[h].temp,
    icon: data.hourly[h].icon,
    cond: WEATHER_CONDITIONS[data.hourly[h].condition].label,
    x: padL + (i / (selectedHours.length - 1)) * (W - padL - padR),
    rawY: 0,
  }));

  const temps = points.map(p => p.temp);
  const minTemp = Math.min(...temps) - 2;
  const maxTemp = Math.max(...temps) + 2;
  const tempRange = maxTemp - minTemp || 1;

  points.forEach(p => {
    p.rawY = padT + ((maxTemp - p.temp) / tempRange) * (H - padT - padB);
  });

  const peakIdx = temps.indexOf(Math.max(...temps));

  // Catmull-Rom to bezier curve
  function cardinalToCubic(pts) {
    const path = [];
    for (let i = 0; i < pts.length; i++) {
      if (i === 0) {
        path.push(`M ${pts[0].x.toFixed(1)},${pts[0].rawY.toFixed(1)}`);
      } else {
        const p0 = pts[i - 2] || pts[i - 1];
        const p1 = pts[i - 1];
        const p2 = pts[i];
        const p3 = pts[i + 1] || pts[i];
        const tension = 0.4;
        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.rawY + (p2.rawY - p0.rawY) * tension;
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.rawY - (p3.rawY - p1.rawY) * tension;
        path.push(`C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.rawY.toFixed(1)}`);
      }
    }
    return path.join(' ');
  }

  const linePath = cardinalToCubic(points);

  // Area path (closed)
  const areaPath = linePath +
    ` L ${points[points.length-1].x.toFixed(1)},${H}` +
    ` L ${points[0].x.toFixed(1)},${H} Z`;

  // Y-axis gridlines
  const numGrids = 4;
  let gridLines = '';
  let yLabels = '';
  for (let i = 0; i <= numGrids; i++) {
    const t = minTemp + (i / numGrids) * tempRange;
    const y = padT + ((maxTemp - t) / tempRange) * (H - padT - padB);
    gridLines += `<line class="graph-gridline" x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}"/>`;
    yLabels += `<text class="graph-ylabel" x="${padL - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end">${Math.round(t)}°</text>`;
  }

  // Dots and labels
  let dots = '';
  let labels = '';
  points.forEach((p, i) => {
    dots += `<circle class="graph-dot" cx="${p.x.toFixed(1)}" cy="${p.rawY.toFixed(1)}" r="5" data-i="${i}" data-hour="${p.h}" data-temp="${p.temp}" data-cond="${p.cond}"/>`;
    if (i !== peakIdx) {
      labels += `<text class="graph-label" x="${p.x.toFixed(1)}" y="${(p.rawY - 10).toFixed(1)}" text-anchor="middle">${p.temp}°</text>`;
    }
  });

  const isDark = state.theme === 'dark';

  svg.innerHTML = `
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="${isDark ? '#60a5fa' : '#2563eb'}"/>
        <stop offset="100%" stop-color="${isDark ? '#a78bfa' : '#7c3aed'}"/>
      </linearGradient>
      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stop-color="${isDark ? '#60a5fa' : '#3b82f6'}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${isDark ? '#60a5fa' : '#3b82f6'}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${gridLines}
    ${yLabels}
    <path class="graph-area" d="${areaPath}"/>
    <path class="graph-line" d="${linePath}"/>
    ${dots}
    ${labels}
  `;

  // Position ☀️ emoji on peak
  const peakPt = points[peakIdx];
  const containerRect = DOM.graphContainer.getBoundingClientRect();
  const svgEl = DOM.tempGraph;
  const svgRect = svgEl.getBoundingClientRect();
  // Use percentage-based positioning
  const pctX = (peakPt.x / W) * 100;
  const pctY = (peakPt.rawY / H) * 100;
  DOM.sunEmoji.style.left = pctX + '%';
  DOM.sunEmoji.style.top = `calc(${pctY}% - 10px)`;

  // Time labels below graph
  DOM.timeLabels.innerHTML = selectedHours.map(h => `
    <span class="time-label">${formatTime(h)}</span>
  `).join('');

  // Graph date label
  const sel = state.selectedDate;
  DOM.graphDateLabel.textContent = sel ? formatDate(sel) : 'Today';

  // Tooltip on dot hover
  svg.querySelectorAll('.graph-dot').forEach(dot => {
    dot.addEventListener('mouseenter', e => showGraphTooltip(e, dot));
    dot.addEventListener('mouseleave', () => { DOM.graphTooltip.classList.add('hidden'); });
    dot.addEventListener('mousemove', e => updateTooltipPos(e));
  });
}

function showGraphTooltip(e, dot) {
  const hour = parseInt(dot.dataset.hour);
  const temp = dot.dataset.temp;
  const cond = dot.dataset.cond;
  DOM.graphTooltip.innerHTML = `
    <div class="tooltip-time">${formatTime(hour)}</div>
    <div class="tooltip-temp">${temp}°C</div>
    <div class="tooltip-cond">${cond}</div>
  `;
  DOM.graphTooltip.classList.remove('hidden');
  updateTooltipPos(e);
}
function updateTooltipPos(e) {
  const container = DOM.graphContainer;
  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left + 14;
  let y = e.clientY - rect.top - 30;
  const tipW = 130, tipH = 70;
  if (x + tipW > rect.width) x = e.clientX - rect.left - tipW - 8;
  if (y < 0) y = 4;
  DOM.graphTooltip.style.left = x + 'px';
  DOM.graphTooltip.style.top  = y + 'px';
}

/* ================================================================
   HOURLY STRIP
   ================================================================ */
function renderHourlyStrip(data) {
  const now = new Date();
  const currentHour = state.selectedDate && !isSameDay(state.selectedDate, now) ? -1 : now.getHours();

  DOM.hourlyStrip.innerHTML = data.hourly.map((h, i) => {
    const active = i === currentHour ? 'active-hour' : '';
    const rainShow = parseFloat(h.rain) > 0 ? `<span class="hourly-rain">💧${h.rain}mm</span>` : '';
    return `
      <div class="hourly-item ${active}" data-hour="${i}">
        <span class="hourly-time">${formatTime(i)}</span>
        <span class="hourly-icon">${h.icon}</span>
        <span class="hourly-temp">${h.temp}°</span>
        ${rainShow}
      </div>
    `;
  }).join('');

  // Scroll active into view
  const activeEl = DOM.hourlyStrip.querySelector('.active-hour');
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

/* ================================================================
   7-DAY FORECAST
   ================================================================ */
function renderForecast(data) {
  const today = new Date();
  const globalMin = Math.min(...data.forecast.map(d => d.low));
  const globalMax = Math.max(...data.forecast.map(d => d.high));
  const range = globalMax - globalMin || 1;

  DOM.forecastList.innerHTML = data.forecast.map((day, i) => {
    const d = dayOffset(today, i);
    const dow = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const cond = WEATHER_CONDITIONS[day.condition];
    const fillPct = ((day.high - globalMin) / range) * 100;
    const leftPct = ((day.low - globalMin) / range) * 100;
    const width = fillPct - leftPct;
    const isSel = state.selectedDate && isSameDay(d, state.selectedDate);

    return `
      <div class="forecast-item ${isSel ? 'active-day' : ''}" data-forecast-idx="${i}" role="button" tabindex="0">
        <span class="forecast-dow">${dow}</span>
        <span class="forecast-icon">${cond.icon}</span>
        <span class="forecast-desc">${cond.label}</span>
        <span class="forecast-pop">${day.pop > 0 ? '💧' + day.pop + '%' : ''}</span>
        <div class="forecast-bar-wrap">
          <span class="forecast-lo">${day.low}°</span>
          <div class="forecast-bar">
            <div class="forecast-bar-fill" style="margin-left:${leftPct.toFixed(0)}%;width:${Math.max(width,12).toFixed(0)}%"></div>
          </div>
          <span class="forecast-hi">${day.high}°</span>
        </div>
      </div>
    `;
  }).join('');

  // Click forecast row → jump to that date
  DOM.forecastList.querySelectorAll('.forecast-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.forecastIdx);
      const d = dayOffset(today, idx);
      selectDate(d);
    });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') el.click(); });
  });
}

/* ================================================================
   PREDICTION GRAPH (7-day trend)
   ================================================================ */
function renderPredictionGraph(data) {
  const svg = DOM.predictionGraph;
  const W = 800, H = 160;
  const padL = 30, padR = 20, padT = 24, padB = 20;

  const today = new Date();
  const points = data.forecast.map((day, i) => ({
    hi: day.high, lo: day.low,
    label: i === 0 ? 'Today' : dayOffset(today, i).toLocaleDateString('en-US', { weekday: 'short' }),
    x: padL + (i / (data.forecast.length - 1)) * (W - padL - padR),
  }));

  const allHi = points.map(p => p.hi);
  const allLo = points.map(p => p.lo);
  const minT = Math.min(...allLo) - 2;
  const maxT = Math.max(...allHi) + 2;
  const range = maxT - minT || 1;

  const toY = t => padT + ((maxT - t) / range) * (H - padT - padB);

  points.forEach(p => {
    p.hiY = toY(p.hi);
    p.loY = toY(p.lo);
  });

  // Hi line path
  function smoothPath(pts, key) {
    let d = `M ${pts[0].x.toFixed(1)},${pts[0][key].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const cpx1 = pts[i-1].x + (pts[i].x - pts[i-1].x) * 0.4;
      const cpx2 = pts[i].x - (pts[i].x - pts[i-1].x) * 0.4;
      d += ` C ${cpx1.toFixed(1)},${pts[i-1][key].toFixed(1)} ${cpx2.toFixed(1)},${pts[i][key].toFixed(1)} ${pts[i].x.toFixed(1)},${pts[i][key].toFixed(1)}`;
    }
    return d;
  }

  const hiPath = smoothPath(points, 'hiY');
  const loPath = smoothPath(points, 'loY');

  // Band area (hi to lo)
  const loReverse = [...points].reverse();
  const bandPath = hiPath +
    ` L ${loReverse[0].x.toFixed(1)},${loReverse[0].loY.toFixed(1)}` +
    loReverse.slice(1).map(p => ` L ${p.x.toFixed(1)},${p.loY.toFixed(1)}`).join('') +
    ' Z';

  const isDark = state.theme === 'dark';
  const hiColor = isDark ? '#f97316' : '#ea580c';
  const loColor = isDark ? '#60a5fa' : '#2563eb';

  let hiDots = '', loDots = '', hiLabels = '', loLabels = '';
  points.forEach((p, i) => {
    hiDots   += `<circle class="pred-dot" cx="${p.x.toFixed(1)}" cy="${p.hiY.toFixed(1)}" r="4" fill="${hiColor}"/>`;
    loDots   += `<circle class="pred-dot" cx="${p.x.toFixed(1)}" cy="${p.loY.toFixed(1)}" r="4" fill="${loColor}"/>`;
    hiLabels += `<text class="pred-temp-label" x="${p.x.toFixed(1)}" y="${(p.hiY - 6).toFixed(1)}" text-anchor="middle" fill="${hiColor}">${p.hi}°</text>`;
    loLabels += `<text class="pred-temp-label" x="${p.x.toFixed(1)}" y="${(p.loY + 14).toFixed(1)}" text-anchor="middle" fill="${loColor}">${p.lo}°</text>`;
  });

  svg.innerHTML = `
    <defs>
      <linearGradient id="predGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="${hiColor}"/>
        <stop offset="100%" stop-color="${hiColor}" stop-opacity="0.7"/>
      </linearGradient>
      <linearGradient id="predAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${hiColor}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${loColor}" stop-opacity="0.2"/>
      </linearGradient>
    </defs>
    <path d="${bandPath}" fill="url(#predAreaGradient)" opacity="0.35"/>
    <path class="pred-line" d="${hiPath}" stroke="${hiColor}" fill="none" stroke-width="2.5"/>
    <path class="pred-line" d="${loPath}" stroke="${loColor}" fill="none" stroke-width="2"/>
    ${hiDots}${loDots}
    ${hiLabels}${loLabels}
  `;

  DOM.predictionLabels.innerHTML = points.map(p =>
    `<span class="pred-day-label">${p.label}</span>`
  ).join('');
}

/* ================================================================
   SUN ARC
   ================================================================ */
function renderSunArc(data) {
  const svg = DOM.sunArc;

  // Parse 24-hour time string like "06:12" or "18:48"
  const parseTime = s => {
    const parts = s.split(':').map(Number);
    return parts[0] * 60 + (parts[1] || 0);
  };

  const risetMin  = parseTime(data.sunrise);
  const setMin    = parseTime(data.sunset);
  const nowMin    = new Date().getHours() * 60 + new Date().getMinutes();
  const totalDay  = setMin - risetMin;
  const progress  = clamp((nowMin - risetMin) / totalDay, 0, 1);

  // Daylight calculation
  const dlHours = Math.floor(totalDay / 60);
  const dlMins  = totalDay % 60;
  DOM.daylightHours.textContent = `${dlHours}h ${dlMins}m`;
  DOM.daylightFill.style.width = ((totalDay / 720) * 100).toFixed(0) + '%';

  // Convert 24h "HH:MM" to "H:MM AM/PM"
  const to12h = s => {
    const [hh, mm] = s.split(':').map(Number);
    const period = hh < 12 ? 'AM' : 'PM';
    const h12 = hh % 12 || 12;
    return `${h12}:${String(mm).padStart(2,'0')} ${period}`;
  };
  DOM.sunriseTime.textContent = to12h(data.sunrise);
  DOM.sunsetTime.textContent  = to12h(data.sunset);

  // Draw arc
  const cx = 150, cy = 100, rx = 120, ry = 80;
  const toXY = a => ({
    x: cx + rx * Math.cos(Math.PI + a * Math.PI),
    y: cy + ry * Math.sin(Math.PI + a * Math.PI) * -1,
  });

  const start = toXY(0);
  const end   = toXY(1);

  const isDark = state.theme === 'dark';

  svg.innerHTML = `
    <defs>
      <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#f59e0b"/>
        <stop offset="50%"  stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#f97316"/>
      </linearGradient>
    </defs>
    <!-- Horizon line -->
    <line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}" stroke-width="1"/>
    <!-- Arc glow -->
    <path d="M ${start.x.toFixed(1)},${start.y.toFixed(1)} A ${rx} ${ry} 0 0 1 ${end.x.toFixed(1)},${end.y.toFixed(1)}"
          class="arc-glow"/>
    <!-- Arc path -->
    <path d="M ${start.x.toFixed(1)},${start.y.toFixed(1)} A ${rx} ${ry} 0 0 1 ${end.x.toFixed(1)},${end.y.toFixed(1)}"
          class="arc-path"/>
    <!-- Horizon labels -->
    <text x="${(start.x - 6).toFixed(1)}" y="${(cy + 16).toFixed(1)}" class="arc-label" text-anchor="middle">${data.sunrise}</text>
    <text x="${(end.x + 6).toFixed(1)}" y="${(cy + 16).toFixed(1)}" class="arc-label" text-anchor="middle">${data.sunset}</text>
    <!-- Sun position -->
    ${progress > 0 && progress < 1 ? (() => {
      const sp = toXY(progress);
      return `<text x="${sp.x.toFixed(1)}" y="${(sp.y - 4).toFixed(1)}" text-anchor="middle" font-size="18" class="sun-position-emoji">☀️</text>`;
    })() : ''}
  `;
}

/* ================================================================
   DATE SELECTOR
   ================================================================ */
function buildDateSelector() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() + state.dateOffset * 7);

  state.startDateOfWeek = weekStart;

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(dayOffset(weekStart, i));
  }

  DOM.dateRangeLabel.textContent = `${formatShortDate(days[0])} – ${formatShortDate(days[6])}`;

  DOM.dateSelector.innerHTML = days.map((d, i) => {
    const isToday = isSameDay(d, today);
    const isSel   = state.selectedDate && isSameDay(d, state.selectedDate);
    const cityData = CITIES[state.currentCity];
    const fIdx = Math.min(i, (cityData?.forecast?.length || 7) - 1);
    // Get forecast for this date
    const wd = getWeatherForDate(state.currentCity, d);
    const icon = wd ? wd.condition.icon : '🌤️';
    const temp = wd ? wd.high : '';

    return `
      <div class="date-item ${isToday ? 'today' : ''} ${isSel ? 'active' : ''}"
           data-date="${d.toISOString()}" role="button" tabindex="0"
           title="${formatDate(d)}">
        <span class="date-day-name">${d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
        <span class="date-day">${d.getDate()}</span>
        <span class="date-icon">${icon}</span>
        <span class="date-temp">${temp}°</span>
      </div>
    `;
  }).join('');

  DOM.dateSelector.querySelectorAll('.date-item').forEach(el => {
    el.addEventListener('click', () => {
      const d = new Date(el.dataset.date);
      selectDate(d);
    });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') el.click(); });
  });
}

function selectDate(date) {
  state.selectedDate = date;
  buildDateSelector();
  renderAll();
}

/* ================================================================
   SEARCH
   ================================================================ */
function showSearchSuggestions(query) {
  if (!query.trim()) { DOM.searchSug.classList.add('hidden'); return; }
  const q = query.toLowerCase();
  const matches = CITY_KEYS.filter(c => c.toLowerCase().includes(q)).slice(0, 6);
  if (!matches.length) { DOM.searchSug.classList.add('hidden'); return; }
  DOM.searchSug.innerHTML = matches.map(c => {
    const city = CITIES[c];
    return `<div class="suggestion-item" data-city="${c}">
      <span class="sug-flag">${city.flag}</span>
      <span>${c}, ${city.country}</span>
    </div>`;
  }).join('');
  DOM.searchSug.classList.remove('hidden');
  DOM.searchSug.querySelectorAll('.suggestion-item').forEach(el => {
    el.addEventListener('click', () => loadCity(el.dataset.city));
  });
}

function loadCity(cityName) {
  const key = CITY_KEYS.find(k => k.toLowerCase() === cityName.toLowerCase());
  if (!key) { showError(`"${cityName}" not found. Try: ${CITY_KEYS.join(', ')}`); return; }
  state.currentCity = key;
  DOM.citySearch.value = '';
  DOM.searchSug.classList.add('hidden');
  state.selectedDate = new Date();
  state.selectedDate.setHours(0, 0, 0, 0);
  renderAll();
  buildDateSelector();
}

function searchCity() {
  const q = DOM.citySearch.value.trim();
  if (!q) return;
  loadCity(q);
}

/* ================================================================
   ERROR
   ================================================================ */
function showError(msg) {
  DOM.errorMsg.textContent = msg;
  DOM.errorBanner.classList.remove('hidden');
  setTimeout(() => DOM.errorBanner.classList.add('hidden'), 5000);
}

/* ================================================================
   GEOLOCATION
   ================================================================ */
function useMyLocation() {
  if (!navigator.geolocation) { showError('Geolocation not supported by your browser.'); return; }
  DOM.locationBtn.innerHTML = `
    <svg width="16" height="16" class="spinning" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    Locating...
  `;
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lon } = pos.coords;
    // Find closest city
    let closest = CITY_KEYS[0], minDist = Infinity;
    CITY_KEYS.forEach(k => {
      const c = CITIES[k];
      const d = Math.sqrt((c.lat - lat) ** 2 + (c.lon - lon) ** 2);
      if (d < minDist) { minDist = d; closest = k; }
    });
    loadCity(closest);
    DOM.locationBtn.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
      My Location
    `;
  }, err => {
    showError('Could not get your location. Please search manually.');
    DOM.locationBtn.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
      My Location
    `;
  });
}

/* ================================================================
   RENDER ALL
   ================================================================ */
function renderAll() {
  const selDate = state.selectedDate || new Date();
  const data = getWeatherForDate(state.currentCity, selDate);
  if (!data) { showError('Weather data unavailable.'); return; }

  renderCurrentWeather(data);
  renderDetails(data);
  renderAQI(data.aqi);
  renderSuggestions(data);
  renderTempGraph(data);
  renderHourlyStrip(data);
  renderForecast(data);
  renderPredictionGraph(data);
  renderSunArc(data);
}

/* ================================================================
   LOADING SEQUENCE
   ================================================================ */
function startApp() {
  // Init state
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  state.selectedDate = today;

  // Restore theme
  const savedTheme = localStorage.getItem('weatherly-theme') || 'dark';
  applyTheme(savedTheme);

  // Render data
  buildDateSelector();
  renderAll();
  startClock();

  // Show app, hide loader
  setTimeout(() => {
    DOM.loadingScreen.classList.add('fade-out');
    DOM.app.classList.remove('hidden');
    DOM.app.style.animation = 'fade-in 0.5s ease both';
    setTimeout(() => DOM.loadingScreen.style.display = 'none', 700);
  }, 1900);
}

/* ================================================================
   EVENT LISTENERS
   ================================================================ */
function attachEvents() {
  // Search
  DOM.citySearch.addEventListener('input', e => showSearchSuggestions(e.target.value));
  DOM.citySearch.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchCity();
    if (e.key === 'Escape') DOM.searchSug.classList.add('hidden');
  });
  DOM.searchBtn.addEventListener('click', searchCity);

  // Hide suggestions on outside click
  document.addEventListener('click', e => {
    if (!DOM.citySearch.contains(e.target) && !DOM.searchSug.contains(e.target)) {
      DOM.searchSug.classList.add('hidden');
    }
  });

  // Location
  DOM.locationBtn.addEventListener('click', useMyLocation);

  // Theme
  DOM.themeToggle.addEventListener('click', toggleTheme);

  // Error close
  DOM.errorClose.addEventListener('click', () => DOM.errorBanner.classList.add('hidden'));

  // Date nav
  DOM.prevWeek.addEventListener('click', () => {
    state.dateOffset--;
    buildDateSelector();
  });
  DOM.nextWeek.addEventListener('click', () => {
    state.dateOffset++;
    buildDateSelector();
  });

  // Touch support for hourly strip (passive for perf)
  DOM.hourlyStrip.addEventListener('touchstart', () => {}, { passive: true });

  // Keyboard arrow nav on date selector
  DOM.dateSelector.addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight'].includes(e.key)) return;
    const focused = document.activeElement;
    const items = Array.from(DOM.dateSelector.querySelectorAll('.date-item'));
    const idx = items.indexOf(focused);
    if (idx < 0) return;
    const next = e.key === 'ArrowRight' ? items[idx + 1] : items[idx - 1];
    if (next) next.focus();
  });

  // Window resize: re-render graphs
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderTempGraph(getWeatherForDate(state.currentCity, state.selectedDate || new Date()));
      renderPredictionGraph(getWeatherForDate(state.currentCity, state.selectedDate || new Date()));
    }, 200);
  });

  // Periodic update every 60s (simulated refresh)
  setInterval(() => {
    renderAll();
  }, 60000);
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  attachEvents();
  startApp();
});
