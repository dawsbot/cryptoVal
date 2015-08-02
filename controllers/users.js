var User = require('../models/User');

exports.create = function(cellNumber) {
  var newUser = new User({
      phone: cellNumber,
      apiCallsMade: 1
  });
  return newUser;
};

exports.incrementApiCallsMade = function(user) {
  user.apiCallsMade += 1;
  return user;
};

exports.write = function(user) {
  user.save( function(err) {
    if (err) {
      console.log('error saving to debugger: ' + err);
    }
    else {
      console.log('person saved successfully');
    }
  });
};

//TODO: Implement does exist
