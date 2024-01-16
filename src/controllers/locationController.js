const Location = require('../models/Location');

// Get all locations
exports.getAllLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        next(error);
    }
};

// Add a new location
exports.addLocation = async (req, res, next) => {
    try {
        const { name, latitude, longitude } = req.body;
        const newLocation = new Location({ name, latitude, longitude });
        const savedLocation = await newLocation.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        next(error);
    }
};

// Get a specific location by ID
exports.getLocationById = async (req, res, next) => {
    try {
        const location = await Location.findById(req.params.location_id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        next(error);
    }
};

// Update a location by ID
exports.updateLocationById = async (req, res, next) => {
    try {
        const { name, latitude, longitude } = req.body;
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.location_id,
            { name, latitude, longitude },
            { new: true }
        );
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(updatedLocation);
    } catch (error) {
        next(error);
    }
};

// Delete a location by ID
exports.deleteLocationById = async (req, res, next) => {
    try {
        const deletedLocation = await Location.findByIdAndRemove(req.params.location_id);
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        next(error);
    }
};
