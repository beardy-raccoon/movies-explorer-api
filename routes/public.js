const router = require('express').Router();
const oauthRouter = require('./oauth');
const { signUp, signIn } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');

router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);
router.use('/oauth', oauthRouter);

module.exports = router;
