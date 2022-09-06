const Movies = require('../models/movies');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { MESSAGE } = require('../utils/consts');

const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id } = req.user;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MESSAGE.NOT_FOUND_MOVIE);
      }
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError(MESSAGE.FORBIDDEN);
      }

      return movie.remove()
        .then(() => {
          res.status(200).send({ message: MESSAGE.MOVIE_DELETED });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MESSAGE.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
