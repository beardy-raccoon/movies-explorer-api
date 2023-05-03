const router = require('express').Router();
const { signUp, signIn } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');

router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);
router.get(
  '/oauth',
  (req, res) => res.send({ message: 'handling route /oauth' }),
);

module.exports = router;
