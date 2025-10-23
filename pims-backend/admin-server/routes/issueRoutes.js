const express = require('express');
const Issue = require('../model/issue'); // Make sure the filename matches
const router = express.Router();

// GET all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single issue by ID
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new issue
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // debug: see what Postman sends

  // Basic validation
  if (!req.body || !req.body.name || !req.body.email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  const issue = new Issue({
    id:req.body.id,
    name: req.body.name,
    email: req.body.email,
    date: req.body.date || new Date(),
    issueType: req.body.issueType || 'Other', // default
    description: req.body.description || '',
    location: req.body.location || '',
    status: req.body.status || 'open' // default to open
  });

  try {
    const newIssue = await issue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an issue by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Issue not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an issue by ID
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
