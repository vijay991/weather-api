const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');
const locationController = require('../controllers/locationController');

// Validation checks for adding a new location
const addLocationValidations = [
    body('name').notEmpty().withMessage('Name is required'),
    body('latitude').isNumeric().withMessage('Latitude must be a number'),
    body('longitude').isNumeric().withMessage('Longitude must be a number'),
];

// Routes for location operations
router.get('/', locationController.getAllLocations);
router.post('/', validate(addLocationValidations), locationController.addLocation);
router.get('/:location_id', locationController.getLocationById);
router.put('/:location_id', validate(addLocationValidations), locationController.updateLocationById);
router.delete('/:location_id', locationController.deleteLocationById);

module.exports = router;
