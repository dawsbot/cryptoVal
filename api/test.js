var api = require('./sochain');

api.getAddressInfo('BTC', '17x23dNjXJLzGMev6R63uyRhMWP1VHawKc', function(response) {
  console.log('response is btc? ' + (response.status === 'success'));
});
api.getAddressInfo('LTC', '17x23dNjXJLzGMev6R63uyRhMWP1VHawKc', function(response) {
  console.log('response is ltc? ' + (response.status === 'success'));
});
