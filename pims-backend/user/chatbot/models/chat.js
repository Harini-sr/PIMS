const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  message: String,
  response: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', ChatSchema);
