/* eslint-disable */
// models/Box.js
const mongoose = require('mongoose');

const Box = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Box name required'],
    unique: [true, 'Box name in use'],
    trim: true,
  },
},
  {
    strict: true,
  });

module.exports = mongoose.model('Box', Box);

//models/index.js
require('./Box');

// controllers/BoxController.js
const Box = require('mongoose').model('Box');
const _ = require('lodash');

const create = (req, res, next) => {
  const newBox = new Box(req.body);
  newBox.save().then((box) => {
    res.ok(box);
  })
  .catch(err => res.badRequest(err));
};

const read = (req, res, next) => {
  Box.find().then((boxes) => {
    res.ok(boxes);
  })
  .catch(err => next(err));
};

const readOne = (req, res, next) => {
  Box.findById(req.params.id).then((box) => {
    res.ok(box);
  })
  .catch(err => next(err));
};

const update = (req, res, next) => {
  const values = _.omit(req.body, ['_id']);
  Box.update({ _id: req.params.id }, values).then((box) => {
    res.ok(box);
  })
  .catch(err => next(err));
};

const destroy = (req, res, next) => {
  Box.remove({ _id: req.params.id }).then((box) => {
    res.ok(box);
  })
  .catch(err => next(err));
};

module.exports = {
  create,
  read,
  readOne,
  update,
  destroy,
};

// router.js
// setup auth routes as needed
apiRoutes.post('/boxes', boxController.create);
apiRoutes.get('/boxes', boxController.read);
apiRoutes.post('/boxes/:id', boxController.readOne);
apiRoutes.put('/boxes/:id', boxController.update);
apiRoutes.delete('/boxes/:id', boxController.destroy);
