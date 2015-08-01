var express = require('express');
var config = require('./config');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./api')(app);

// var server = http.createServer(app);
app.listen( config.port, function() {
  console.log('Express serving on port ' + config.port);
});
