var User = require('../models/User');

/*
 * Get the user from the phone value, if they don't exist, createa  new user. Otherwise increment API calls
 * Set lastMessage either way
 *
 * @param {number} phone The phone number of the user
 * @returns {object|null} newUser The user if they exist, null otherwise
 */
exports.updateUser = function(phone, input, cb) {

  function create() {
    console.log('yo');
    var newUser = new User({
        phone: phone,
        lastMessage: input,
        apiCallsMade: 1
    });
    return newUser;
  }

  User.findOne({
    phone: phone
  }, function(err, user) {
    if (err) {
      throw new Error('could not query in userExists');
    }
    if (user) {//user already existed in database
      if (input === 'last') {
        console.log('\nLAST MESSAGE WAS LAST. last: ' + user.lastMessage);
        input = user.lastMessage;
      }
      user.apiCallsMade += 1;
      //TODO: only set lastmessage if it's a valid address
      user.lastMessage = input;
    }
    else { //Create new user
      console.log('else, creating new user ');
      user = create();
    }

    user.save( function(saveErr) {
      if (saveErr) {
        console.log('saveError saving to debugger: ' + saveErr);
      }
      else {
        cb(user);
      }
    });
  });

};
