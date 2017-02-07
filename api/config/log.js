const winston = require('winston');
const path = require('path');

winston.level = 'debug';

if (process.env.NODE_ENV !== 'development') {
  winston.add(winston.transports.File, { filename: path.resolve('./logs/log.log') });
  winston.remove(winston.transports.Console);
}
