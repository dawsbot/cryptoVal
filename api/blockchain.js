var twilio = require('twilio');
var converter = require('satoshi-bitcoin');
var config = require('../config');
var Chain = require('chain-node');
var validator = require('bitcoin-address');

var chain = new Chain({
  keyId: config.chainApiKeyId,
  keySecret: config.chainApiKeySecret,
  blockChain: 'bitcoin'
});

var makeTwiml = function(req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml.message(req);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

exports.getBTCInWallet = function(req, res) {
  var textBody = req.body.Body;
  console.log('in btcwallet. text body: ' + textBody);

  //see if its a valid btc address
  if (validator.validate(textBody) === true) {
    chain.getAddress(textBody, function(err, response) {
      if (!err){
        console.log('calling satoshi-bitcoin.toBitcoin with value: ' + response[0].total.balance + '\nThat is of type: ' + typeof(response[0].total.balance));
        makeTwiml('That wallet contains ' + converter.toBitcoin(response[0].total.balance) + ' BTC', res);
      }
      else {
        console.log('ERROR. Response: ' + response);
        console.log('textBody: ' + textBody);
      }
    });
  }
  else {
    makeTwiml(req.body.Body + ' is not a valid BTC address. Please try again', res);
  }
};
