var util = require('util');
var async = require('async');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uriUtil = require('mongodb-uri');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };

var mongodbUri = process.env.MONGOLAB_URI;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  console.log('Connection successfully opened');
  // Wait for the database connection to establish, then start the app.
  var userSchema = {
    phone: Number
  };

  var User = mongoose.model('User', userSchema);

  var me = new User({ phone: 123456789 });
  console.log('my phone number: ' + me.phone);

  me.save( function(err) {
    if (err) {
      return console.err(err);
    }
    else {
      mongoose.connection.close();
    }
  });
});
