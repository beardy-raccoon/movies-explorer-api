const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserProfileValidation } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserProfileValidation, updateUser);

module.exports = router;
