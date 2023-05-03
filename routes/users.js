const router = require('express').Router();
const { getUser, updateUser, deleteUser } = require('../controllers/users');
const { updateUserProfileValidation } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserProfileValidation, updateUser);
router.delete('/users/me', deleteUser);

module.exports = router;
