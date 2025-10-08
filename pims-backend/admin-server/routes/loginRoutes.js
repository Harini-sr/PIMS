const express = require('express');
const router = express.Router();
const userModel = require('../model/login');
 
 
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
 
  try {
    const user = await userModel.findOne({ username, password });
 
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
 
    // Send role in the response
    res.status(200).json({
      message: 'Login success',
      user: {
        _id: user._id,
        userId: user.userId,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
 
 
 
 
 
module.exports = router;
 
 
 