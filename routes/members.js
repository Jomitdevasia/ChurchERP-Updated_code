const express = require('express');
const router = express.Router();
const { Member, Family } = require('../models');
const { v4: uuidv4 } = require('uuid');

function generateMemberId() {
  return 'M' + uuidv4().substring(0, 8).toUpperCase();
}

router.get('/', async (req, res) => {
  try {
    const members = await Member.findAll({ include: 'Family' });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id, { include: 'Family' });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const memberData = { ...req.body, member_id: generateMemberId() };
    const member = await Member.create(memberData);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    await member.update(req.body);
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    await member.destroy();
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;