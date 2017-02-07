const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const secrets = require('../secrets');

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
      const error = new Error('Incorrect email');
      error.name = 'IncorrectCredentialsError';
      return next(error);
    }

    user.comparePassword(userData.password).then((isMatch) => {
      if (!isMatch) {
        const error = new Error('Incorrect password');
        error.name = 'IncorrectCredentialsError';
        return next(error);
      }
      const payload = {
        sub: user._id, // eslint-disable-line
        timestamp: new Date().getTime(),
      };

      const token = jwt.sign(payload, secrets.jwtSecret);

      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return next(null, token, userData);
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
});
