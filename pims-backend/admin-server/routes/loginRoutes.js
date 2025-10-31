const express = require('express');
const router = express.Router();
const userModel = require('../model/login');

// ---------------------- LOGIN ROUTE ----------------------
router.post('/login', async (req, res) => {
  console.log('🔹 Received /login body:', req.body);

  const { username, password } = req.body || {};

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Success
    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        userId: user.userId,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ---------------------- REGISTER ROUTE (Users Only) ----------------------
router.post('/register', async (req, res) => {
  console.log('🔹 Received /register body:', req.body);

  const { username, password, email, phone } = req.body || {};

  // Validation
  if (!username || !password || !email || !phone) {
    return res.status(400).json({ message: 'Username, password, email, and phone are required' });
  }

  try {
    // Prevent registration with "admin" username
    if (username.toLowerCase() === 'admin') {
      return res.status(403).json({ message: 'Cannot register as admin' });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }, { phone }]
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username, email, or phone already taken' });
    }

    // Count existing users for ID
    const userCount = await userModel.countDocuments();

    // Create new user (always role: user)
    const newUser = new userModel({
      userId: userCount + 1,
      username,
      password,
      email,
      phone,
      role: 'user'
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
