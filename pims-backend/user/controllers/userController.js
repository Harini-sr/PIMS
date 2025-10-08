const Issue = require("../models/issueModel");



exports.createIssue = async (req, res) => {
  try {
    const { name, email, date, issueType, description, location } = req.body;

    if (!name || !email || !date || !issueType || !description || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newIssue = new Issue({ name, email, date, issueType, description, location });
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    console.error("Error creating issue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("Error fetching issues:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: "Issue not found" });
    res.json(issue);
  } catch (err) {
    console.error("Error fetching issue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};