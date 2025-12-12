const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  pokemonId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  types: [{
    type: String
  }],
  sprite: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Favorite', favoriteSchema);