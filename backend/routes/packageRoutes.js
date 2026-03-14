const express = require('express');
const router = express.Router();
const { getPackages, getPackageById, addPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPackages)
  .post(protect, admin, addPackage);

router.route('/:id')
  .get(getPackageById)
  .put(protect, admin, updatePackage)
  .delete(protect, admin, deletePackage);

module.exports = router;
