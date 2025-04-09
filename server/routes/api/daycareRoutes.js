// routes/daycareRoutes.js
const express = require('express');
const Daycare = require('../../models/Daycare');
const router = express.Router();

// Create a new daycare (POST)
router.post('/', async (req, res) => {
  try {
    const { name, location, services, contact } = req.body;
    const newDaycare = new Daycare({ name, location, services, contact });
    await newDaycare.save();
    res.status(201).json(newDaycare);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

// Get a single daycare by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const daycare = await Daycare.findById(req.params.id);
    if (!daycare) {
      return res.status(404).json({ message: 'Daycare not found' });
    }
    res.json(daycare);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update a daycare (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedDaycare = await Daycare.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDaycare) {
      return res.status(404).json({ message: 'Daycare not found' });
    }
    res.json(updatedDaycare);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a daycare (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedDaycare = await Daycare.findByIdAndDelete(req.params.id);
    if (!deletedDaycare) {
      return res.status(404).json({ message: 'Daycare not found' });
    }
    res.json({ message: 'Daycare deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
