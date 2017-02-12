const mongoose = require('mongoose');
const secrets = require('./secrets');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(`${secrets.dbUrl}/${secrets.testDbName}`);
} else {
  mongoose.connect(`${secrets.dbUrl}/${secrets.dbName}`);
}
