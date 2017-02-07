const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const secrets = require('../config/secrets');
const errors = require('../config/errors');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.unauthorized(errors.noAuthHeader());
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, secrets.jwtSecret, (err, decode) => {
    if (err) {
      return res.unauthorized(errors.invalidToken());
    }

    const userId = decode.sub;

    User.findById(userId, (err, user) => {
      if (err || !user) { return res.unauthorized(errors.invalidToken()); }
      req.user = user;
      return next();
    });
  });
};
