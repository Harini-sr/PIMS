const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Public
router.post('/', feedbackController.submitFeedback);

// @route   GET /api/feedback
// @desc    Get all feedbacks (optionally filtered by issueId)
// @access  Public
router.get('/', feedbackController.getFeedbacks);

module.exports = router;
