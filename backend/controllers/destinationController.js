const Destination = require('../models/Destination');

// @desc    Fetch all destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single destination
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (destination) {
      res.json(destination);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private/Admin
exports.addDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    const createdDestination = await destination.save();
    res.status(201).json(createdDestination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (destination) {
      Object.assign(destination, req.body);
      const updatedDestination = await destination.save();
      res.json(updatedDestination);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (destination) {
      await destination.deleteOne();
      res.json({ message: 'Destination removed' });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
