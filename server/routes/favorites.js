const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// GET all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single favorite by Pokemon ID
router.get('/:pokemonId', async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ pokemonId: req.params.pokemonId });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add new favorite
router.post('/', async (req, res) => {
  const favorite = new Favorite({
    pokemonId: req.body.pokemonId,
    name: req.body.name,
    types: req.body.types,
    sprite: req.body.sprite,
    note: req.body.note
  });

  try {
    const newFavorite = await favorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update favorite note
router.put('/:pokemonId', async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndUpdate(
      { pokemonId: req.params.pokemonId },
      { note: req.body.note },
      { new: true }
    );
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE favorite
router.delete('/:pokemonId', async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({ pokemonId: req.params.pokemonId });
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;