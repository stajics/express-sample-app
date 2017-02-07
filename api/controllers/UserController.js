const passport = require('passport');
const User = require('mongoose').model('User');

const signup = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save().then((user) => {
    res.ok(user);
  })
  .catch(err => next(err));
};

const login = (req, res) => {
  passport.authenticate('local-login', (err, token, user) => {
    if (err) return res.unauthorized(err);
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
