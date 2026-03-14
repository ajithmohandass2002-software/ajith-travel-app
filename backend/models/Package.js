const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  durationDays: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);
