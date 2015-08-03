var twilio = require('twilio');
var validator = require('bitcoin-address');
var controller = require('../controllers/users');
var sochain = require('../api/sochain');

module.exports = function(request, response){
  var phone = request.body.From || 1;
  var input = request.body.Body || 'last';

  controller.updateUser(phone, input, function(user) {
    var parsedMessage = user.lastMessage;

    var respond = function(message) {
      var twiml = new twilio.TwimlResponse();
      twiml.message(message);
      response.writeHead(200, {'Content-Type': 'text/xml'});
      response.end(twiml.toString());
    };

    //see if its a valid btc address
    if (validator.validate(parsedMessage) === true) {
      sochain.getAddressInfo('BTC', parsedMessage, function(blockchainResponse) {
        respond('That bitcoin wallet contains ' + blockchainResponse.data.balance + ' BTC');
      });
    }
    else {
      respond('\"' + parsedMessage + '\" is not a valid BTC address. Please try again');
    }
  });
};
