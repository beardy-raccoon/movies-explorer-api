const mongoose = require('mongoose');
const validator = require('validator');
const { MESSAGE } = require('../utils/consts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    reqiured: true,
  },
  director: {
    type: String,
    reqiured: true,
  },
  duration: {
    type: Number,
    reqiured: true,
  },
  year: {
    type: String,
    reqiured: true,
  },
  description: {
    type: String,
    reqiured: true,
  },
  image: {
    type: String,
    reqiured: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error(MESSAGE.BAD_LINK);
      }
    },
  },
  trailerLink: {
    type: String,
    reqiured: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error(MESSAGE.BAD_LINK);
      }
    },
  },
  thumbnail: {
    type: String,
    reqiured: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error(MESSAGE.BAD_LINK);
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    reqiured: true,
  },
  nameEN: {
    type: String,
    reqiured: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
