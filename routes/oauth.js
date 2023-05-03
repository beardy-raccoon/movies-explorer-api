const router = require('express').Router();
const { handleOauth } = require('../controllers/oauth');

router.get('/google', handleOauth);

module.exports = router;
