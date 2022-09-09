const router = require('express').Router();

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выполен выход' });
});

module.exports = router;
