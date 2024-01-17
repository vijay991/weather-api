const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const locationRoutes = require('./src/routes/locationRoutes');
const weatherRoutes = require('./src/routes/weatherRoutes');
const { errorMiddleware } = require('./src/middleware/errorMiddleware')
require('./config/db')

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// Rate limiting middleware to prevent abuse of the API
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use('/locations', locationRoutes);
app.use('/weather', weatherRoutes);
app.use(errorMiddleware)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
