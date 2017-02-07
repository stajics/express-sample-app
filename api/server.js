const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

require('./config');
require('./models');
require('./config/passport');
const router = require('./router');

// midleware
const responses = require('./responses');

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(responses);
app.use(passport.initialize());

router(app);

// error handling
app.use((err, req, res, next) => { // eslint-disable-line
  if (err) res.badRequest(err);
});

app.listen(port);
console.log('Your server is running on', port);
