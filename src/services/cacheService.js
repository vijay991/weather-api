const NodeCache = require('node-cache');
const cache = new NodeCache();

// Cache key prefix for weather data
const WEATHER_CACHE_PREFIX = 'weather';

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

module.exports = {
    setWeather,
    getWeather,
};
