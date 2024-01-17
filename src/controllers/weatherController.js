const axios = require('axios');
const cacheService = require('../services/cacheService');
const { ErrorHandler } = require('../middleware/errorMiddleware');
const Location = require('../models/Location')
const BASE_URL = 'https://api.weatherapi.com/v1'

// Get the weather forecast for a specific location
exports.getWeatherByLocation = async (req, res, next) => {
    try {
        const locationId = req.params.location_id;

        // Check if weather data is in the cache
        const cachedWeather = cacheService.getWeather(locationId);
        if (cachedWeather) {
            console.log('Using cached weather data');
            return res.json(cachedWeather);
        }

        // Fetch real-time weather data from WeatherAPI.com
        const apiKey = process.env.WEATHER_API_API_KEY;
        const location = await Location.findById(req.params.location_id);
        if (!location) {
            throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
        }
        const { latitude, longitude } = location;

        const externalApiUrl = `${BASE_URL}/current.json?key=${apiKey}&q=${latitude},${longitude}`;

        const response = await axios.get(externalApiUrl);
        const weatherData = response.data;

        // Cache the weather data for future requests
        cacheService.setWeather(locationId, weatherData);

        res.json(weatherData);
    } catch (error) {
        next(new ErrorHandler(error));
    }
};

// Get historical weather data
exports.getHistoricalWeather = async (req, res, next) => {
    try {
        const locationId = req.params.location_id;
        const days = parseInt(req.query.days) || 7; // Default to 7 days if 'days' parameter is not provided

        // Check if historical weather data is in the cache
        const cachedHistoricalWeather = cacheService.getHistoricalWeather(locationId, days);
        if (cachedHistoricalWeather) {
            console.log('Using cached historical weather data');
            return res.json(cachedHistoricalWeather);
        }

        // Fetch historical weather data from WeatherAPI.com
        const apiKey = process.env.WEATHER_API_API_KEY;
        const location = await Location.findById(req.params.location_id);
        if (!location) {
            throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
        }
        const { latitude, longitude } = location;

        const externalApiUrl = `${BASE_URL}/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${getFormattedDate(days)}&end_dt=${getFormattedDate(1)}`;

        const response = await axios.get(externalApiUrl);
        const historicalWeatherData = response.data;

        // Cache the historical weather data for future requests
        cacheService.setHistoricalWeather(locationId, days, historicalWeatherData);

        res.json(historicalWeatherData);
    } catch (error) {
        next(new ErrorHandler(error));
    }
};

// Helper function to get the formatted date for the specified number of days ago
const getFormattedDate = (daysAgo) => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - daysAgo);

    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

