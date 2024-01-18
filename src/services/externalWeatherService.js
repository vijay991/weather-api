const axios = require('axios');
const { getFormattedDate } = require('../lib/dateformat');
const apiKey = process.env.WEATHER_API_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1'


// Fetch real-time weather data from WeatherAPI.com
const getCurrentWeatherData = async (latitude, longitude) => {
    try {
        const externalApiUrl = `${BASE_URL}/current.json?key=${apiKey}&q=${latitude},${longitude}`;

        const response = await axios.get(externalApiUrl);
        const weatherData = response.data;

        return weatherData;
    } catch (error) {
        throw error;
    }
};

// Fetch historical weather data from WeatherAPI.com
const getHistoricalWeatherData = async (latitude, longitude, days) => {
    try {
        const externalApiUrl = `${BASE_URL}/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${getFormattedDate(days)}&end_dt=${getFormattedDate(1)}`;

        const response = await axios.get(externalApiUrl);
        const weatherData = response.data;
        return weatherData;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCurrentWeatherData,
    getHistoricalWeatherData
};
