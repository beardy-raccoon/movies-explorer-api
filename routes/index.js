const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const signoutRouter = require('./signout');
const publicRouter = require('./public');
const NotFoundError = require('../errors/not-found-error');
const { MESSAGE } = require('../utils/consts');

router.use(publicRouter);
router.use(auth, userRouter);
router.use(auth, movieRouter);
router.use(auth, signoutRouter);
router.use(auth, (req, res, next) => {
  next(new NotFoundError(MESSAGE.NOT_FOUND));
});

module.exports = router;
