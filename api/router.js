// const express = require('express');
const userController = require('./controllers/UserController');
const socialController = require('./controllers/SocialController');

module.exports = (app) => {
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
};
