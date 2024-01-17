const Location = require('../models/Location');
const { ErrorHandler } = require('../middleware/errorMiddleware');
const { validateBody } = require('../lib/validation');

const validationRules = {
    name: 'required',
    latitude: 'required|numeric',
    longitude: 'required|numeric',
};

// Get all locations
exports.getAllLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

// Add a new location
exports.addLocation = async (req, res, next) => {
    try {
        validateBody(req.body, validationRules);
        const { name, latitude, longitude } = req.body;
        const newLocation = new Location({ name, latitude, longitude });
        const savedLocation = await newLocation.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

// Get a specific location by ID
exports.getLocationById = async (req, res, next) => {
    try {
        const location = await Location.findById(req.params.location_id);
        if (!location) {
            throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
        }
        res.json(location);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

// Update a location by ID
exports.updateLocationById = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

// Delete a location by ID
exports.deleteLocationById = async (req, res, next) => {
    try {
        const deletedLocation = await Location.findOneAndDelete({ _id: req.params.location_id });
        if (!deletedLocation) {
            throw new ErrorHandler({ message: 'Location not found', statusCode: 404 });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        next(new ErrorHandler(error))
    }
};
