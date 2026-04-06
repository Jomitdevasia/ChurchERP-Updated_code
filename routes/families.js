const express = require('express');
const router = express.Router();
const { Family } = require('../models');

router.get('/', async (req, res) => {
  try {
    const families = await Family.findAll();
    res.json(families);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const family = await Family.findByPk(req.params.id, { include: ['Members'] });
    if (!family) return res.status(404).json({ error: 'Family not found' });
    res.json(family);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const family = await Family.create(req.body);
    res.status(201).json(family);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const family = await Family.findByPk(req.params.id);
    if (!family) return res.status(404).json({ error: 'Family not found' });
    await family.update(req.body);
    res.json(family);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const family = await Family.findByPk(req.params.id);
    if (!family) return res.status(404).json({ error: 'Family not found' });
    await family.destroy();
    res.json({ message: 'Family deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;