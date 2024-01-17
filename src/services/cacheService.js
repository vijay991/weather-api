const NodeCache = require('node-cache');
const cache = new NodeCache();

// Cache key prefix for weather data
const WEATHER_CACHE_PREFIX = 'weather';

// Cache key prefix for historical weather data
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
    const cacheKey = getCacheKey(locationId, days);
    cache.set(cacheKey, historicalWeatherData);
};

// Get historical weather data from the cache
const getHistoricalWeather = (locationId, days) => {
    const cacheKey = getCacheKey(locationId, days);
    return cache.get(cacheKey);
};

// Helper function to generate a unique cache key for historical weather data
const getCacheKey = (locationId, days) => `${HISTORICAL_WEATHER_CACHE_PREFIX}_${locationId}_${days}_days`;

module.exports = {
    setWeather,
    getWeather,
    setHistoricalWeather,
    getHistoricalWeather,
};
