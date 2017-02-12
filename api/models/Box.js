const mongoose = require('mongoose');

const Box = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Box name required'],
    unique: [true, 'Box name in use'],
  },
});

module.exports = mongoose.model('Box', Box);
