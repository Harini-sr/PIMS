// const Issue = require("../models/issueModel");



// exports.createIssue = async (req, res) => {
//   try {
//     const { name, email, date, issueType, description, location } = req.body;

//     if (!name || !email || !date || !issueType || !description || !location) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newIssue = new Issue({ name, email, date, issueType, description, location });
//     const savedIssue = await newIssue.save();
//     res.status(201).json(savedIssue);
//   } catch (err) {
//     console.error("Error creating issue:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getUserIssues = async (req, res) => {
//   try {
//     const issues = await Issue.find({ email: req.params.email }).sort({ createdAt: -1 });
//     res.json(issues);
//   } catch (err) {
//     console.error("Error fetching issues:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getIssueById = async (req, res) => {
//   try {
//     const issue = await Issue.findById(req.params.id);
//     if (!issue) return res.status(404).json({ error: "Issue not found" });
//     res.json(issue);
//   } catch (err) {
//     console.error("Error fetching issue:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const Issue = require('../models/issueModel');
const mongoose = require('mongoose');

exports.createIssue = async (req, res) => {
  try {
    const { userId, name, email, date, issueType, description, location } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Valid userId is required' });
    }

    const newIssue = new Issue({
      userId,
      name,
      email,
      date,
      issueType,
      description,
      location,
    });

    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    console.error('Create Issue Error:', error);
    res.status(500).json({ error: 'Server error while creating issue' });
  }
};

exports.getUserIssues = async (req, res) => {
  try {
    const userId = req.query.user_id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Valid user_id query parameter is required' });
    }

    const issues = await Issue.find({ userId });
    res.json(issues);
  } catch (error) {
    console.error('Get User Issues Error:', error);
    res.status(500).json({ error: 'Server error while fetching user issues' });
  }
};

exports.getIssueById = async (req, res) => {
  try {
    const issueId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
      return res.status(400).json({ error: 'Invalid issue ID' });
    }

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    console.error('Get Issue By ID Error:', error);
    res.status(500).json({ error: 'Server error while fetching issue' });
  }
};
