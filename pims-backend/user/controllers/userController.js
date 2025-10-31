

// // // Create a new issue
// const Issue = require('../models/issueModel');
//  const mongoose = require('mongoose');
//  const { v4: uuidv4 } = require('uuid'); // fallback for unique ID
// const Counter = require('../models/counterModel')
// async function getNextSequence(name) {
//   try {
//     const result = await Counter.findOneAndUpdate(
//       { _id: name },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );
//     return result.seq;
//   } catch (err) {
//     console.warn('Counter unavailable, using UUID fallback');
//     return null; // do not throw, just return null
//   }
// }
// exports.createIssue = async (req, res) => {
//   const { name, email, date, issueType, description, location, status } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: 'Name and Email are required' });
//   }

//   let uniqueId;

//   const nextSeq = await getNextSequence('issueId');
//   if (nextSeq) {
//     uniqueId = `id${nextSeq}`;
//   } else {
//     uniqueId = uuidv4(); // fallback
//   }

//   try {
//     const issue = new Issue({
//       id: uniqueId,
//       name,
//       email,
//       date: date ? new Date(date) : new Date(),
//       issueType: issueType || 'Other',
//       description: description || '',
//       location: location || '',
//       status: status || 'open'
//     });

//     const savedIssue = await issue.save();
//     res.status(201).json(savedIssue);
//   } catch (err) {
//     console.error('Create Issue Error:', err);
//     if (err.code === 11000) {
//       return res.status(400).json({ message: 'Duplicate issue ID' });
//     }
//     res.status(500).json({ message: 'Server error while creating issue' });
//   }
// };


// // GET single issue by MongoDB ObjectId
// exports.getIssueById = async (req, res) => {
//   try {
//     const issueId = req.params.id;

//     // If you are using the custom `id` field instead of MongoDB _id, remove this check
//     if (!mongoose.Types.ObjectId.isValid(issueId)) {
//       return res.status(400).json({ error: 'Invalid issue ID' });
//     }

//     const issue = await Issue.findById(issueId);
//     if (!issue) {
//       return res.status(404).json({ error: 'Issue not found' });
//     }

//     res.json(issue);
//   } catch (error) {
//     console.error('Get Issue By ID Error:', error);
//     res.status(500).json({ error: 'Server error while fetching issue' });
//   }
// };

// // GET all issues
// exports.getUserIssues = async (req, res) => {
//   try {
//     const issues = await Issue.find();
//     res.json(issues);
//   } catch (error) {
//     console.error('Get Issues Error:', error);
//     res.status(500).json({ error: 'Server error while fetching issues' });
//   }
// };







const Issue = require('../models/issueModel');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // fallback for unique ID
const Counter = require('../models/counterModel');

// Helper function to generate sequential IDs
async function getNextSequence(name) {
  try {
    const result = await Counter.findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return result.seq;
  } catch (err) {
    console.warn('Counter unavailable, using UUID fallback');
    return null; // fallback
  }
}

// Create a new issue
exports.createIssue = async (req, res) => {
  const { userId, name, email, date, issueType, description, location, status } = req.body;

  if (!userId || !name || !email) {
    return res.status(400).json({ message: 'UserId, Name and Email are required' });
  }

  let uniqueId;
  const nextSeq = await getNextSequence('issueId');
  if (nextSeq) {
    uniqueId = `id${nextSeq}`;
  } else {
    uniqueId = uuidv4(); // fallback
  }

  try {
    const issue = new Issue({
      id: uniqueId,
      userId,                   // link issue to user
      name,
      email,
      date: date ? new Date(date) : new Date(),
      issueType: issueType || 'Other',
      description: description || '',
      location: location || '',
      status: status || 'open'
    });

    const savedIssue = await issue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    console.error('Create Issue Error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate issue ID' });
    }
    res.status(500).json({ message: 'Server error while creating issue' });
  }
};

// GET single issue by MongoDB ObjectId
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


// GET all issues for a specific user
/* exports.getUserIssues = async (req, res) => {
  try {
    const userId = req.query.userId; // frontend should send ?userId=<id>

    if (!userId) {
      return res.status(400).json({ error: 'UserId query parameter is required' });
    }

    const issues = await Issue.find({ userId: userId });
    res.json(issues);
  } catch (error) {
    console.error('Get User Issues Error:', error);
    res.status(500).json({ error: 'Server error while fetching user issues' });
  }
}; */

// GET all issues for a specific user
exports.getUserIssues = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'UserId query parameter is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const issues = await Issue.find({ userId: userId }); // send ObjectId string
    res.json(issues);
  } catch (error) {
    console.error('Get User Issues Error:', error);
    res.status(500).json({ error: 'Server error while fetching user issues' });
  }
}