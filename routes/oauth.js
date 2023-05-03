const router = require('express').Router();
const { getAuthUrl, getAuthData } = require('../controllers/oauth');

router.get('/google', getAuthUrl);
router.get('google/redirect/:params', getAuthData);

module.exports = router;
