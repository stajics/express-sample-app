require('../../../api/server');
const isAuthenticated = require('../../../api/middleware/isAuthenticated');
const db = require('../../db');

beforeEach(() => db.clear().then(() => db.init()));

const myMockUnauthorized = jest.fn(err => err);
const res = {};
res.unauthorized = myMockUnauthorized;

test('Should error (missing Authorization header)', (done) => {
  isAuthenticated({ headers: {} }, res);
  expect(myMockUnauthorized.mock.calls.length).toBe(1);
  done();
});

test('Should error (bad token)', (done) => {
  isAuthenticated({ headers: { authorization: 'Bearer badToken' } }, res);
  expect(myMockUnauthorized.mock.calls.length).toBe(2);
  done();
});
