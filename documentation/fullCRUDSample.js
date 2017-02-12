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

// test/integration/controllers/BoxController.test.js
const app = require('../../../api/server');
const request = require('supertest')(app);
const db = require('../../db');

beforeEach(() => db.clear().then(() => db.init()));

describe(':create', () => {
  test('Should create box', (done) => {
    request
    .post('/api/boxes')
    .set('Authorization', 'token')
    .send({ name: 'box' })
    .expect(200)
    .end((err, res) => {
      if (err) fail(err);
      delete res.body._id;
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should get error (no box name)', (done) => {
    request
    .post('/api/boxes')
    .set('Authorization', 'token')
    .expect(400)
    .end((err, res) => {
      if (err) fail(err);
      delete res.body._id;
      expect(res.body).toMatchSnapshot();
      done();
    });
  });
});

describe(':read', () => {
  test('Should get boxes', (done) => {
    request
    .get('/api/boxes')
    .set('Authorization', 'token')
    .expect(200)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });
});

describe(':readOne', () => {
  test('Should get box', (done) => {
    request
    .get('/api/boxes/589d95ea18d583282623b042')
    .set('Authorization', 'token')
    .expect(200)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should get no box', (done) => {
    request
    .get('/api/boxes/589d95ea18')
    .set('Authorization', 'token')
    .expect(404)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });
});

describe(':update', () => {
  test('Should update box', (done) => {
    request
    .put('/api/boxes/589d95ea18d583282623b042')
    .set('Authorization', 'token')
    .send({ name: 'newName' })
    .expect(200)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should error on update box. (bad box id)', (done) => {
    request
    .put('/api/boxes/14214')
    .set('Authorization', 'token')
    .send({ name: 'newName' })
    .expect(500)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });
});

describe(':delete', () => {
  test('Should delete box', (done) => {
    request
    .delete('/api/boxes/589d95ea18d583282623b042')
    .set('Authorization', 'token')
    .expect(200)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should error on delete box. (bad box id)', (done) => {
    request
    .delete('/api/boxes/14214')
    .set('Authorization', 'token')
    .send({ name: 'newName' })
    .expect(400)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });
});
