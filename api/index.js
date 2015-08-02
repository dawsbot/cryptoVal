var blockchain = require('../controllers/blockchain');

module.exports = function(app) {
  app.post('/getbtc', blockchain.getBTCInWallet);
};
