const axios = require('axios');

// Fetch real-time weather data from WeatherAPI.com
const getWeatherData = async (locationId) => {
    try {
        const apiKey = process.env.WEATHER_API_API_KEY;
        const externalApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationId}`;

        const response = await axios.get(externalApiUrl);
        const weatherData = response.data;

        return weatherData;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getWeatherData,
};
