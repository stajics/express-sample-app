process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const jwtSecret = process.env.EXPRESS_SAMPLE_JWT_SECRET || 'jwtsecret';

const dbUrl = process.env.EXPRESS_SAMPLE_DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.EXPRESS_SAMPLE_DB_NAME || 'sample';
const testDbName = process.env.EXPRESS_SAMPLE_TEST_DB_NAME || 'test';

module.exports = {
  jwtSecret,
  dbUrl,
  dbName,
  testDbName,
};
