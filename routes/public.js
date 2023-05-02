const router = require('express').Router();
const oauthHandler = require('./oauth');
const { signUp, signIn } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');

router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);
router.get('/oauth', oauthHandler);

module.exports = router;
