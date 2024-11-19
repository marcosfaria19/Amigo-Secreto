const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    const { name, email, sub: googleId } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, googleId });
      await user.save();
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

module.exports = router;
