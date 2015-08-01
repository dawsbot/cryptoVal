/* eslint no-unused-vars:0 */
var User = require('../models/User');

exports.create = function() {
  var newUser = new User({
    phone: 12345678,
    apiCallsMade: 1
  });
};
