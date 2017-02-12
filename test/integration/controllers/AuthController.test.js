const app = require('../../../api/server');
const request = require('supertest')(app);
const db = require('../../db');

beforeEach(() => db.clear().then(() => db.init()));

describe(':signup', () => {
  test('Should signup', (done) => {
    request
    .post('/auth/signup')
    .send({ email: 'test1@test.com', password: 'password', firstName: 'name', lastName: 'name' })
    .expect(200)
    .end((err, res) => {
      if (err) fail(err);
      delete res.body.user.password;
      delete res.body.user._id;
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should fail signup (no password)', (done) => {
    request
    .post('/auth/signup')
    .send({ email: 'test1@test.com', firstName: 'name', lastName: 'name' })
    .expect(400)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });
});

describe(':login', () => {
  test('Should login', (done) => {
    request
    .post('/auth/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should fail login (bad email)', (done) => {
    request
    .post('/auth/login')
    .send({ email: 'bad@test.com', password: 'password' })
    .expect(401)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should fail login (bad password)', (done) => {
    request
    .post('/auth/login')
    .send({ email: 'test@test.com', password: 'bad' })
    .expect(401)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });

  test('Should fail login (no email)', (done) => {
    request
    .post('/auth/login')
    .send({ password: 'password' })
    .expect(401)
    .end((err, res) => {
      if (err) fail(err);
      expect(res.body).toMatchSnapshot();
      done();
    });
  });
});
