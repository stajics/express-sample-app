const _ = require('lodash');
const winston = require('winston');
const util = require('util');

module.exports = (req, res) => (errors) => {
  res.status(401);
  winston.error({
    date: new Date(),
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    authorization: req.headers.authorization,
    errors: util.inspect(errors),
  });
  if (_.isObject(errors)) {
    errors = [errors];
  }
  res.json({ errors });
};
