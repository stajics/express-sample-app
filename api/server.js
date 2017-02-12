const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const privateKey = fs.readFileSync('./ssl/server.key', 'utf8');
const certificate = fs.readFileSync('./ssl/server.cert', 'utf8');

require('./config');
require('./models');
require('./config/passport');
const router = require('./router');

// midleware
const responses = require('./responses');

const credentials = { key: privateKey, cert: certificate };
const app = express();

app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(responses);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

router(app);
// error handling
app.use((err, req, res, next) => { // eslint-disable-line
  if (err) res.serverError(err);
});

let httpServer;
let httpsServer;
let port;

switch (process.env.NODE_ENV) {
  case 'production':
    port = 80;
    httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port);
    console.log('Your server is running on', port);
    break;
  case 'test':
    port = 3001;
    break;
  default:
    port = 3000;
    httpServer = http.createServer(app);
    httpServer.listen(port);
    console.log('Your server is running on', port);
}

module.exports = app;
