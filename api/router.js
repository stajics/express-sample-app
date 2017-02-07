const express = require('express');
const userController = require('./controllers/UserController');

module.exports = (app) => {
  const authRoutes = express.Router();

  authRoutes.post('/signup', userController.signup);
  authRoutes.post('/login', userController.login);

  app.use('/auth', authRoutes);
};
