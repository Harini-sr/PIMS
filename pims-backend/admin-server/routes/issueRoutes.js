const express = require('express');
const Issue = require('../model/issue');
const router = express.Router();
const Counter = require('../model/counterModel');
const userModel = require('../model/login');

// ✅ GET all issues (with pagination, search, and date filter)
router.get('/getIssue', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, date } = req.query;
    const filter = {};

    // 🔍 Search Filter
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { issueType: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
        { status: searchRegex },
      ];
    }

    // 📅 Date Filter (supports both yyyy-MM-dd and dd-MM-yyyy)
    if (date && date.trim() !== '') {
      const [year, month, day] = date.split('-');
      const altDate = `${day}-${month}-${year}`; // "17-10-2025"

      // merge with existing $or if search exists
      if (filter.$or) {
        filter.$and = [
          { $or: filter.$or },
          {
            $or: [
              { date: { $regex: new RegExp(date, 'i') } },
              { date: { $regex: new RegExp(altDate, 'i') } },
            ],
          },
        ];
        delete filter.$or;
      } else {
        filter.$or = [
          { date: { $regex: new RegExp(date, 'i') } },
          { date: { $regex: new RegExp(altDate, 'i') } },
        ];
      }
    }

    // 🧾 Fetch filtered + paginated issues
    const issues = await Issue.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Issue.countDocuments(filter);

    // 🧮 Summary counts (all-time)
    const completedComplaints = await Issue.countDocuments({ status: 'closed' });
    const inProgressComplaints = await Issue.countDocuments({ status: 'in-progress' });
    const openComplaints = await Issue.countDocuments({ status: 'open' });

    res.json({
      flag: 1,
      totalComplaints: total,
      completedComplaints,
      inProgressComplaints,
      openComplaints,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      issues,
    });
  } catch (err) {
    console.error('Error fetching issues:', err);
    res.status(500).json({ flag: 0, message: err.message });
  }
});

// ✅ GET single issue by ID
router.get('/getById/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Helper for auto-increment ID
async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

// ✅ CREATE a new issue
router.post('/', async (req, res) => {
  const { name, email, date, issueType, description, location, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  try {
    const nextSeq = await getNextSequence('issueId');
    const issue = new Issue({
      id: `id${nextSeq}`,
      name,
      email,
      date: date
        ? new Date(date).toISOString().split('T')[0] // store as yyyy-MM-dd
        : new Date().toISOString().split('T')[0],
      issueType: issueType || 'Other',
      description: description || '',
      location: location || '',
      status: status || 'open',
    });

    const savedIssue = await issue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ UPDATE issue
router.put('/:id', async (req, res) => {
  try {
    const updated = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Issue not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE issue
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Issue.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Issue not found' });
    res.json({ message: 'Issue deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
