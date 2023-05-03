const bcrypt = require('bcrypt');
const User = require('../models/users');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const EmailExistError = require('../errors/email-exist-error');
const { MESSAGE } = require('../utils/consts');
const getToken = require('../utils/getToken');
require('dotenv').config();

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE.NOT_FOUND_USER);
      }
      res.send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(next);
};

const deleteUser = (req, res, next) => {
  const { _id } = req.user;
  User.findByIdAndDelete(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE.NOT_FOUND_USER);
      }
      res.send({
        data: {
          message: 'profile deleted',
        },
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((updUser) => {
      if (!updUser) {
        throw new NotFoundError(MESSAGE.NOT_FOUND_USER);
      }
      res.send({
        data: {
          _id: updUser._id,
          name: updUser.name,
          email: updUser.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.BAD_REQUEST));
      }
      if (err.code === 11000) {
        next(new EmailExistError(MESSAGE.EMAIL_EXIST));
      } else {
        next(err);
      }
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(MESSAGE.AUTH_FAILED);
      }
      return Promise.all([user, bcrypt.compare(password, user.password)]);
    })
    .then(([user, isLoggedIn]) => {
      if (!isLoggedIn) {
        throw new UnauthorizedError(MESSAGE.AUTH_FAILED);
      }
      getToken(res, user);
      res.send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(next);
};

const signUp = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => {
      getToken(res, newUser);
      res.status(201).send({
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.BAD_REQUEST));
      }
      if (err.code === 11000) {
        next(new EmailExistError(MESSAGE.EMAIL_EXIST));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  signIn,
  signUp,
};
