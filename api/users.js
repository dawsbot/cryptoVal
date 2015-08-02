/* eslint no-unused-vars:0 */
var User = require('../models/User');

exports.create = function(newNumber) {
  var newUser = new User({
    phone: newNumber,
    apiCallsMade: 1
  });
};


