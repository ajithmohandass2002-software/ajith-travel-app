const Package = require('../models/Package');

// @desc    Fetch all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).populate('destinationId', 'name country');
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single package
// @route   GET /api/packages/:id
// @access  Public
exports.getPackageById = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id).populate('destinationId', 'name country');
    if (travelPackage) {
      res.json(travelPackage);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new package
// @route   POST /api/packages
// @access  Private/Admin
exports.addPackage = async (req, res) => {
  try {
    const travelPackage = new Package(req.body);
    const createdPackage = await travelPackage.save();
    res.status(201).json(createdPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private/Admin
exports.updatePackage = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);

    if (travelPackage) {
      Object.assign(travelPackage, req.body);
      const updatedPackage = await travelPackage.save();
      res.json(updatedPackage);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
exports.deletePackage = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);

    if (travelPackage) {
      await travelPackage.deleteOne();
      res.json({ message: 'Package removed' });
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
