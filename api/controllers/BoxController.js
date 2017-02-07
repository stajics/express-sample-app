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
