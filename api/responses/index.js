const ok = require('./ok');
const badRequest = require('./badRequest');
const serverError = require('./serverError');
const unauthorized = require('./unauthorized');

module.exports = (req, res, next) => {
  res.ok = ok(req, res);
  res.badRequest = badRequest(req, res);
  res.serverError = serverError(req, res);
  res.unauthorized = unauthorized(req, res);
  next();
};
