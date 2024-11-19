const express = require('express');
const User = require('../models/User');
const Draw = require('../models/Draw');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { creatorId, participants } = req.body;
  try {
    const participantUsers = await User.find({ email: { $in: participants } });
    const draw = new Draw({
      creator: creatorId,
      participants: participantUsers.map(u => u._id),
    });
    await draw.save();
    res.json({ drawId: draw._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create draw' });
  }
});

router.post('/join', async (req, res) => {
  const { drawId, userId } = req.body;
  try {
    const draw = await Draw.findById(drawId);
    if (!draw) {
      return res.status(404).json({ error: 'Draw not found' });
    }
    if (!draw.participants.includes(userId)) {
      draw.participants.push(userId);
      await draw.save();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join draw' });
  }
});

router.post('/assign', async (req, res) => {
  const { drawId } = req.body;
  try {
    const draw = await Draw.findById(drawId).populate('participants');
    if (!draw) {
      return res.status(404).json({ error: 'Draw not found' });
    }
    const participants = draw.participants;
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const assignments = new Map();
    for (let i = 0; i < participants.length; i++) {
      assignments.set(
        participants[i]._id.toString(),
        shuffled[(i + 1) % participants.length]._id.toString()
      );
    }
    draw.assignments = assignments;
    draw.status = 'completed';
    await draw.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign secret santas' });
  }
});

router.get('/:drawId/result/:userId', async (req, res) => {
  const { drawId, userId } = req.params;
  try {
    const draw = await Draw.findById(drawId);
    if (!draw || draw.status !== 'completed') {
      return res.status(404).json({ error: 'Draw not found or not completed' });
    }
    const assignedTo = draw.assignments.get(userId);
    if (!assignedTo) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    const assignedUser = await User.findById(assignedTo);
    res.json({ assignedTo: assignedUser?.name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get draw result' });
  }
});

module.exports = router;
