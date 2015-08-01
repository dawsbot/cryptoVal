var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var async = require('async');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };

var mongodbUri = process.env.MONGOLAB_URI;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

//wait for connection to open
conn.once('open', function() {
  console.log('Connection successfully opened');

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

  var User = mongoose.model('User', userSchema);

  var me = new User({ phone: 123456789 });
  console.log('my phone number: ' + me.phone);

  function findUser() {
    User.find({ phone: me.phone }, function (err, response) {
      if (err) {
        console.log('error happened in user.find');
      }
      else {
        console.log('len: ' + response.length);
        console.log('response: ' + response);

        if (response.length === '0') {
          console.log('entered if');
          me.save( function(saveErr) {
            if (saveErr) {
              console.log('save error');
            }
            console.log('person saved successfully');
          });
        }
        else {
          //TODO: increment apiCallsMade
          console.log('person already exists');
        }
      }
    });
  }
  findUser();
});
