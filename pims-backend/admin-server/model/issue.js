// model/Issue.js
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');


const IssueSchema = new mongoose.Schema({
  id: { type: String, default: () => nanoid(), unique: true },
  name: String,
  email: String,
  date: String,  
  issueType: String,
  description: String,
  location: String,
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' }
});

module.exports = mongoose.model('Issue', IssueSchema);
