const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Routes for weather operations
router.get('/weather/:location_id', weatherController.getWeatherByLocation);
router.get('/history/:location_id', weatherController.getHistoricalWeather);

module.exports = router;
