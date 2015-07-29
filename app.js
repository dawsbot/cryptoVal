var express = require('express');
var Chain = require('chain-node');
var validator = require('bitcoin-address');
var converter = require('satoshi-bitcoin');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var twilio = require('twilio');
var sys = require('sys');

var chain = new Chain({
  keyId: process.env.CHAIN_API_KEY_ID,
  keySecret: process.env.CHAIN_API_KEY_SECRET,
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

app.set('port', (process.env.PORT || 3000));
app.listen( app.get('port'), function() {
       console.log('Express serving on port ' + app.get('port'));
});
