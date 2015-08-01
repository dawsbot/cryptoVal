var mongoose = require('mongoose');

var userSchema = {
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  apiCallsMade: {
    type: Number,
    required: true,
    default: 1
  }
};

module.export = mongoose.model('User', userSchema);
