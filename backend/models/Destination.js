const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Destination', DestinationSchema);
