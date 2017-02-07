const jwtSecret = process.env.LOVE_FEST_JWT_SECRET || 'jwtsecret';

module.exports = {
  jwtSecret,
};
