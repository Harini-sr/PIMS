const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/issues', userController.createIssue);
router.get('/issues', userController.getUserIssues);
router.get('/issue/:id', userController.getIssueById);

module.exports = router;
