const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
  networkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Network' }, // Optional if not saved
  source: { type: String, required: true },
  destination: { type: String, required: true },
  algorithm: { type: String, required: true },
  packetCount: { type: Number, required: true },
  stats: {
    sent: Number,
    delivered: Number,
    dropped: Number,
    averageDelay: String,
    hops: Number,
    deliveryRate: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Simulation', simulationSchema);
