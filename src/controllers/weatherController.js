const cacheService = require('../services/cacheService');
const { ErrorHandler } = require('../middleware/errorMiddleware');
const Location = require('../models/Location')
const { getCurrentWeatherData, getHistoricalWeatherData } = require('../services/externalWeatherService')
const { asyncHandler } = require('../lib/asyncHandler ')

// Get the weather forecast for a specific location
const getWeatherByLocation = asyncHandler(async (req, res, next) => {
    const locationId = req.params.location_id;

    // Check if weather data is in the cache
    const cachedWeather = cacheService.getWeather(locationId);
    if (cachedWeather) {
        console.log('Using cached weather data');
        return res.json(cachedWeather);
    }

    // Fetch real-time weather data from WeatherAPI.com
    const location = await Location.findById(req.params.location_id);
    if (!location) {
        throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
    }
    const { latitude, longitude } = location;
    const weatherData = await getCurrentWeatherData(latitude, longitude)

    // Cache the weather data for future requests
    cacheService.setWeather(locationId, weatherData);

    res.json(weatherData);
})

// Get historical weather data
const getHistoricalWeather = asyncHandler(async (req, res, next) => {
    const locationId = req.params.location_id;
    const days = parseInt(req.query.days) || 7; // Default to 7 days if 'days' parameter is not provided

    // Check if historical weather data is in the cache
    const cachedHistoricalWeather = cacheService.getHistoricalWeather(locationId, days);
    if (cachedHistoricalWeather) {
        console.log('Using cached historical weather data');
        return res.json(cachedHistoricalWeather);
    }

    // Fetch historical weather data from WeatherAPI.com
    const location = await Location.findById(req.params.location_id);
    if (!location) {
        throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
    }
    const { latitude, longitude } = location;
    const historicalWeatherData = await getHistoricalWeatherData(latitude, longitude, days)

    // Cache the historical weather data for future requests
    cacheService.setHistoricalWeather(locationId, days, historicalWeatherData);

    res.json(historicalWeatherData);
})

module.exports = { getWeatherByLocation, getHistoricalWeather }