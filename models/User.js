var mongoose = require('mongoose');

var userSchema = {
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  lastMessage: {
    type: String,
    required: true
  },
  apiCallsMade: {
    type: Number,
    required: true,
    default: 1
  }
};

module.exports = mongoose.model('User', userSchema);
