const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email!',
    },
    required: [true, 'User email required'],
    unique: [true, 'Email in use'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'User password required'],
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, 'User first name required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'User last name required'],
    trim: true,
  },
},
  {
    strict: true,
  });

User.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

User.pre('save', function beforeSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash;

    return next();
  })
  .catch(err => next(err));
});

module.exports = mongoose.model('User', User);
