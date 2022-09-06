const { celebrate, Joi } = require('celebrate');

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email:
      Joi.string()
        .required()
        .email()
        .min(2)
        .max(30),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email:
      Joi.string()
        .required()
        .email()
        .min(2)
        .max(30),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .hex()
      .length(24),
  }),
});

const addMovieValidation = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().uri(),
      trailerLink: Joi.string().required().uri(),
      thumbnail: Joi.string().required().uri(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserProfileValidation,
  movieIdValidation,
  addMovieValidation,
};
