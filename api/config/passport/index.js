const passport = require('passport');

const localLoginStrategy = require('./localLogin');

passport.use('local-login', localLoginStrategy);
