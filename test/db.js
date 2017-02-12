const User = require('mongoose').model('User');
const Box = require('mongoose').model('Box');

const init = () => {
  const newUser = new User({
    _id: '589b5b4aa79dff2f7fe6659d',
    email: 'test@test.com',
    password: 'password',
    firstName: 'name',
    lastName: 'lastname',
  });
  const newBox = new Box({
    _id: '589d95ea18d583282623b042',
    name: 'box1',
  });
  return Promise.all([
    newUser.save(),
    newBox.save(),
  ]);
};

const clear = () => {
  const clearTables = [];
  clearTables.push(User.remove({}, () => {}));
  clearTables.push(Box.remove({}, () => {}));
  return Promise.all(clearTables);
};

module.exports = {
  init,
  clear,
};
