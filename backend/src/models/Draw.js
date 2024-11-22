const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
  organizerEmail: { type: String, required: true },
  organizerName: { type: String, required: true },
  description: { type: String, required: true },
  participants: [{ name: String, email: String, hasJoined: { type: Boolean, default: false } }],
  results: [{ from: String, to: String }],
  link: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Draw", drawSchema);


