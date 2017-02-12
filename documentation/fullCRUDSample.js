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
    if (_.isEmpty(box)) return res.notFound();
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

// documentation
// paths
/api/boxes:
  get:
    security:
      - Bearer: []
    tags:
      - Box
    summary: Get all boxes.
    operationId: getBoxes
    description: "Requires logged in user."
    consumes:
      - application/json
    produces:
      - application/json
    responses:
      "200":
        description: All users.
        schema:
          $ref: "#/definitions/GetBoxesResponse"
  post:
    security:
      - Bearer: []
    tags:
      - Box
    summary: Create box.
    operationId: createBox
    description: "Requires logged in user."
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: body
        description: Attributes and values that will be created.
        required: true
        schema:
          $ref: "#/definitions/PostBoxesBody"
    responses:
      "200":
        description: All users.
        schema:
          $ref: "#/definitions/PostBoxesResponse"

/api/boxes/{id}:
  get:
    security:
      - Bearer: []
    tags:
      - Box
    summary: Get box.
    operationId: getBox
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: path
        name: id
        description: ID of the box
        required: true
        type: string
    responses:
      "200":
        description: All users.
        schema:
          $ref: "#/definitions/GetBoxesIdResponse"
  put:
    security:
      - Bearer: []
    tags:
      - Box
    summary: Update box.
    description: "Requires logged in user."
    operationId: updateBox
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: path
        name: id
        description: ID of the box that needs to be updated
        required: true
        type: string
      - in: body
        name: body
        description: Attributes and values that will be updated.
        required: true
        schema:
          $ref: "#/definitions/PutBoxesBody"
    responses:
      "200":
        description: User updated.
        schema:
          $ref: "#/definitions/PutBoxesResponse"

  delete:
    security:
      - Bearer: []
    tags:
      - Box
    summary: Delete box.
    description: "Requires logged in user."
    operationId: deleteBox
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: path
        name: id
        description: ID of the user that needs to be deleted.
        required: true
        type: string
    responses:
      "200":
        description: Box deleted.
        schema:
          $ref: "#/definitions/DeleteBoxesResponse"
//definitions
Box:
  type: object
  required:
    - _id
    - name
  properties:
    _id:
      type: string
    name:
      type: string
//models
Box:
  type: object
  required:
    - _id
    - name
  properties:
    _id:
      type: string
    name:
      type: string

//params
PostBoxesBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutBoxesBody:
  type: object
  properties:
    name:
      type: string

// response
GetBoxesResponse:
  type: array
  items:
    type: object
    $ref: "#/definitions/Box"

GetBoxesIdResponse:
  type: array
  items:
    type: object
    $ref: "#/definitions/Box"

PostBoxesResponse:
  type: array
  items:
    type: object
    $ref: "#/definitions/Box"

PutBoxesResponse:
  type: array
  items:
    type: object
    properties:
      n:
        type: string
      nModified:
        type: string
      ok:
        type: string

DeleteBoxesResponse:
  type: array
  items:
    type: object
    properties:
      n:
        type: string
      ok:
        type: string
