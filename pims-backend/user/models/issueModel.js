const mongoose = require("../db");

const issueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;