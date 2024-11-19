const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  assignments: Map,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Draw', drawSchema);
