const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new issue
router.post('/issues', userController.createIssue);

// Get issues by user_id (query param)
router.get('/issues', userController.getUserIssues);

// Get single issue by issue id
router.get('/issue/:id', userController.getIssueById);

module.exports = router;
