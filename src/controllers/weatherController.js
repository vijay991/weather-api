const axios = require('axios');
const cacheService = require('../services/cacheService');

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
        const externalApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationId}`;

        const response = await axios.get(externalApiUrl);
        const weatherData = response.data;

        // Cache the weather data for future requests
        cacheService.setWeather(locationId, weatherData);

        res.json(weatherData);
    } catch (error) {
        next(error);
    }
};

// Get historical weather data
exports.getHistoricalWeather = async (req, res, next) => {
    try {
        // To fetch historical data from WeatherAPI.com, you may need a premium subscription
        // Please refer to WeatherAPI.com's documentation for historical data retrieval
        res.json({ message: 'Historical weather data endpoint - To be implemented for WeatherAPI.com' });
    } catch (error) {
        next(error);
    }
};
