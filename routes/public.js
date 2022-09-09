const router = require('express').Router();
const { signUp, signIn } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');

router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);

module.exports = router;
