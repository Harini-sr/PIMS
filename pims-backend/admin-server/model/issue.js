// model/Issue.js
const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  name: String,
  id:String,
  email: String,
  date: String,  // "dd-mm-yyyy" format
  issueType: {
    type: String,
    enum: ['Water', 'Electricity', 'Sanitation', 'Road', 'Other']  // dropdown options
  },
  description: String,
  location: String,
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' }
});

module.exports = mongoose.model('Issue', IssueSchema);
