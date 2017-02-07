const mongoose = require('mongoose');
const secrets = require('./secrets');

mongoose.Promise = global.Promise;
mongoose.connect(`${secrets.dbUrl}/${secrets.dbName}`);
