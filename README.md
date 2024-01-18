# Weather Forecast API

## Description

This project is a RESTful API that provides real-time weather forecasts based on geographical locations. It fetches data from an external weather service, allowing users to manage locations and retrieve weather information.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-api.git
   cd weather-api
   ```
2. Set up environment variables:
   - MONGODB_URI=your_mongodb_connection_string
   - WEATHER_API_API_KEY=your_weatherapi_api_key
2. Install packages & run project
   
  ```
    npm install
    npm run start
  ```

## API Endpoints
- GET /locations: Get all locations or add a new location.
- /locations/<location_id>: Get, update, or delete a specific location by ID.
- GET /weather/<location_id>: Get the weather forecast for a specific location.
- GET /history: Get historical data for the last 7, 15, or 30 days.

## Technical Details
- Node.js: The server is built with Node.js using Express.
- Database: MongoDB is used to store location data.
- External Service: Weather data is fetched from WeatherAPI.com.
- Caching: External API responses are cached to reduce calls.
- Rate limiting: prevent abuse of the API
