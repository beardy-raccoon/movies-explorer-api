const mongoose = require('mongoose');
const validator = require('validator');
const { MESSAGE } = require('../utils/consts');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error(MESSAGE.BAD_EMAIL);
      }
    },
  },
  password: {
    type: String,
    reqiured: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
