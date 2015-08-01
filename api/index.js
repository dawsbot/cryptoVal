var blockchain = require('./blockchain');

module.exports = function(app) {
  app.post('/getbtc', blockchain.getBTCInWallet);

};
