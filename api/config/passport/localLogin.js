const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const secrets = require('../secrets');
const errors = require('../errors');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}, (email, password, next) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };
  User.findOne({ email: userData.email }).then((user) => {
    if (_.isEmpty(user)) {
      return next(errors.badCredentials());
    }

    user.comparePassword(userData.password).then((isMatch) => {
      if (!isMatch) {
        return next(errors.badCredentials());
      }
      const payload = {
        sub: user._id, // eslint-disable-line
        timestamp: new Date().getTime(),
      };

      const token = jwt.sign(payload, secrets.jwtSecret, { expiresIn: '5000d' });

      user = user.toObject();
      delete user.password;
      return next(null, token, user);
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
});
