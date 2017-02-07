const User = require('mongoose').model('User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const errors = require('../config/errors');

const signup = (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then((user) => {
    const payload = {
      sub: user._id,
      timestamp: new Date().getTime(),
    };
    const token = jwt.sign(payload, secrets.jwtSecret, { expiresIn: '5000d' });
    res.ok({
      token,
      user,
    });
  })
  .catch(err => res.badRequest(err));
};

const login = (req, res) => {
  passport.authenticate('local-login', (err, token, user) => {
    if (err) return res.unauthorized(err);
    if (!token) return res.unauthorized(errors.missingCredentials());
    res.ok({
      token,
      user,
    });
  })(req, res);
};

module.exports = {
  signup,
  login,
};
