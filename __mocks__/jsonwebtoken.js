module.exports = {
  sign: () => 'token',
  verify: (token, secret, cb) => {
    if (token === 'badToken') return cb('Bad Token');
    cb(null, { sub: '589b5b4aa79dff2f7fe6659d' });
  },
};
