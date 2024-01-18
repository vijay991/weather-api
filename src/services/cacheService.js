const NodeCache = require('node-cache');
const cache = new NodeCache();

const WEATHER_CACHE_PREFIX = 'weather';
const HISTORICAL_WEATHER_CACHE_PREFIX = 'historicalWeather';

// Set weather data in the cache
const setWeather = (locationId, weatherData) => {
    const cacheKey = `${WEATHER_CACHE_PREFIX}_${locationId}`;
    cache.set(cacheKey, weatherData);
};

// Get weather data from the cache
const getWeather = (locationId) => {
    const cacheKey = `${WEATHER_CACHE_PREFIX}_${locationId}`;
    return cache.get(cacheKey);
};

// Set historical weather data in the cache
const setHistoricalWeather = (locationId, days, historicalWeatherData) => {
    const cacheKey = `${HISTORICAL_WEATHER_CACHE_PREFIX}_${locationId}_${days}_days`;
    cache.set(cacheKey, historicalWeatherData);
};

// Get historical weather data from the cache
const getHistoricalWeather = (locationId, days) => {
    const cacheKey = `${HISTORICAL_WEATHER_CACHE_PREFIX}_${locationId}_${days}_days`;
    return cache.get(cacheKey);
};

module.exports = {
    setWeather,
    getWeather,
    setHistoricalWeather,
    getHistoricalWeather,
};
