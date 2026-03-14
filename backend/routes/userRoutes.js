const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserProfile, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// User profile route
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
