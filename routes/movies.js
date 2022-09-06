const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { movieIdValidation, addMovieValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', addMovieValidation, addMovie);
router.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
