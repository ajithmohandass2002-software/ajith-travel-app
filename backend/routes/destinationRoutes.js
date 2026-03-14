const express = require('express');
const router = express.Router();
const { getDestinations, getDestinationById, addDestination, updateDestination, deleteDestination } = require('../controllers/destinationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDestinations)
  .post(protect, admin, addDestination);

router.route('/:id')
  .get(getDestinationById)
  .put(protect, admin, updateDestination)
  .delete(protect, admin, deleteDestination);

module.exports = router;
