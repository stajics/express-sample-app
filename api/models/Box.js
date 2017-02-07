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
