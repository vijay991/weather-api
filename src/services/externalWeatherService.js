const axios = require('axios');
const { getFormattedDate } = require('../lib/dateformat');
const { ErrorHandler } = require('../middleware/errorMiddleware');
const BASE_URL = 'https://api.weatherapi.com/v1'

// Fetch real-time weather data from WeatherAPI.com
const getCurrentWeatherData = async (latitude, longitude) => {
    try {
        const apiKey = process.env.WEATHER_API_API_KEY;
        const externalApiUrl = `${BASE_URL}/current.json?key=${apiKey}&q=${latitude},${longitude}`;

        const response = await axios.get(externalApiUrl);
        const weatherData = response.data;
        return weatherData;
    } catch (error) {
        throw new ErrorHandler({ message: error.response?.data?.error?.message, statusCode: error.response?.status })
    }
};

// Fetch historical weather data from WeatherAPI.com
const getHistoricalWeatherData = async (latitude, longitude, days) => {
    try {
        const apiKey = process.env.WEATHER_API_API_KEY;
        const externalApiUrl = `${BASE_URL}/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${getFormattedDate(days)}&end_dt=${getFormattedDate(1)}`;

        const response = await axios.get(externalApiUrl);
        const historicalWeatherData = response.data;
        return historicalWeatherData;
    } catch (error) {
        throw new ErrorHandler({ message: error.response?.data?.error?.message, statusCode: error.response?.status })
    }
};

module.exports = {
    getCurrentWeatherData,
    getHistoricalWeatherData
};
