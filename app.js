var express = require('express');
var Chain = require('chain-node');
var validator = require('bitcoin-address');
var converter = require('satoshi-bitcoin');
var config = require('./config');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var twilio = require('twilio');
var sys = require('sys');

var chain = new Chain({
  keyId: config.chainApiKeyId,
  keySecret: config.chainApiKeySecret,
  blockChain: 'bitcoin'
});

var makeTwiml = function(req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml.message('That wallet contains ' + req + ' BTC');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

function getBTCInWallet(req, res) {
  var textBody = req.body.Body;
  if (validator.validate(textBody)) {
    chain.getAddress(textBody, function(err, response) {
      if (!err){
        makeTwiml(converter.toBitcoin(response[0].total.balance), res);
      }
      else {
        console.log('ERROR. Response: ' + response);
        console.log('textBody: ' + textBody);
      }
    });
  }
  else {
    makeTwiml('Not a valid BTC address. Please try again', res);
  }
}

app.post('/', function(req, res) {
  getBTCInWallet(req, res);
});

app.listen( config.port, function() {
       console.log('Express serving on port ' + config.port);
});
