const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Routes for location operations
router.get('/', locationController.getAllLocations);
router.post('/', locationController.addLocation);
router.get('/:location_id', locationController.getLocationById);
router.put('/:location_id', locationController.updateLocationById);
router.delete('/:location_id', locationController.deleteLocationById);

module.exports = router;
