const Location = require('../models/Location');
const { ErrorHandler } = require('../middleware/errorMiddleware');
const { validateBody } = require('../lib/validation');
const { asyncHandler } = require('../lib/asyncHandler ')

const validationRules = {
    name: 'required',
    latitude: 'required|numeric',
    longitude: 'required|numeric',
};

// Get all locations
const getAllLocations = asyncHandler(async (req, res, next) => {
    const locations = await Location.find();
    res.json(locations);
})

// Add a new location
const addLocation = asyncHandler(async (req, res, next) => {
    validateBody(req.body, validationRules);
    const { name, latitude, longitude } = req.body;

    // Check if a location with the same name, latitude, and longitude already exists
    const existingLocation = await Location.findOne({ name, latitude, longitude });

    if (existingLocation) {
        throw new ErrorHandler({ message: 'Location with the same name, latitude, and longitude already exists', statusCode: 400 });
    }

    const newLocation = new Location({ name, latitude, longitude });
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
})

// Get a specific location by ID
const getLocationById = asyncHandler(async (req, res, next) => {
    const location = await Location.findById(req.params.location_id);
    if (!location) {
        throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
    }
    res.json(location);
})

// Update a location by ID
const updateLocationById = asyncHandler(async (req, res, next) => {
    validateBody(req.body, validationRules);
    const { name, latitude, longitude } = req.body;
    const updatedLocation = await Location.findByIdAndUpdate(
        req.params.location_id,
        { name, latitude, longitude },
        { new: true }
    );
    if (!updatedLocation) {
        throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
    }
    res.json(updatedLocation);
})

// Delete a location by ID
const deleteLocationById = asyncHandler(async (req, res, next) => {
    const deletedLocation = await Location.findOneAndDelete({ _id: req.params.location_id });
    if (!deletedLocation) {
        throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
    }
    res.json({ message: 'Location deleted successfully' });
})

module.exports = { getAllLocations, addLocation, getLocationById, updateLocationById, deleteLocationById }