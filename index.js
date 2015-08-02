var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var config = require('./config');
var message = require('./routes/message');

var app = express();

var mongodbUri = process.env.MONGOLAB_URI;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, config.mongoOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//The only public API endpoint for Twilio to hit
app.post('/message', message);

app.listen( config.port, function() {
  console.log('Express serving on port ' + config.port);
});
