const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  const { packageId, travelDate, numberOfTravelers } = req.body;

  try {
    const booking = new Booking({
      userId: req.user._id,
      packageId,
      travelDate,
      numberOfTravelers
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('packageId', 'title price')
      .populate({
        path: 'packageId',
        populate: {
          path: 'destinationId',
          select: 'name country'
        }
      });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'id name email')
      .populate('packageId', 'id title price');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      // Allow cancellation only if booking belongs to user or if user is admin
      if (booking.userId.toString() === req.user._id.toString() || req.user.role === 'admin') {
        booking.status = 'cancelled';
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
      } else {
        res.status(401).json({ message: 'Not authorized to cancel this booking' });
      }
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
