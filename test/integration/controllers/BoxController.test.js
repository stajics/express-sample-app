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
