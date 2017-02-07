const express = require('express');
// controllers
const boxController = require('./controllers/BoxController');
const authController = require('./controllers/AuthController');
// middleware
const isAuthenticated = require('./middleware/isAuthenticated');

module.exports = (app) => {
  const authRoutes = express.Router();
  const apiRoutes = express.Router();

  authRoutes.post('/signup', authController.signup);
  authRoutes.post('/login', authController.login);

  apiRoutes.post('/boxes', boxController.create);
  apiRoutes.get('/boxes', boxController.read);
  apiRoutes.post('/boxes/:id', boxController.readOne);
  apiRoutes.put('/boxes/:id', boxController.update);
  apiRoutes.delete('/boxes/:id', boxController.destroy);

  app.use('/auth', authRoutes);
  app.use('/api', isAuthenticated, apiRoutes);
};
