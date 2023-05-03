const handleOauth = (req, res, next) => {
  res.send({ message: 'oauth handler' });
  next();
};

module.exports = { handleOauth };
