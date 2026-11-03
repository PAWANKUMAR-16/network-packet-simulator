const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['pc', 'router'], default: 'router' },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  label: { type: String }
});

const edgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  weight: { type: Number, default: 1 } // Cost for Dijkstra
});

const networkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for MVP
  nodes: [nodeSchema],
  edges: [edgeSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Network', networkSchema);
