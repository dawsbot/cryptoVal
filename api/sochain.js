var rest = require('restler');
var async = require('async');

module.exports = {
  /*
   * Checks to see if inputted address matches any of networs.
   * If so, return the full API response from sochain's "address" endpoint
   */
  getCryptoType: function(address, masterCallback) {
    var btcUrl = 'https://chain.so/api/v2/address/BTC/' + address;
    var ltcUrl = 'https://chain.so/api/v2/address/LTC/' + address;
    var dogeUrl = 'https://chain.so/api/v2/address/DOGE/' + address;
    async.parallel([
      function(cb) {
        rest.get(btcUrl).on('complete', function(result) {
          cb(null, result);
        });
      },
      function(cb) {
        rest.get(ltcUrl).on('complete', function(result) {
          cb(null, result);
        });
      },
      function(cb) {
        rest.get(dogeUrl).on('complete', function(result) {
          cb(null, result);
        });
      }
    ], function (err, results) {
      var masterCalled = false;
      if (err !== null) {
        if (!masterCalled) {
          console.log('calling error in sochain');
          masterCalled = true;
          masterCallback('error');
        }
      }
      results.forEach( function(result) {
        if (result.status === 'success') {
          if (!masterCalled) {
            console.log('calling success in sochain');
            masterCalled = true;
            masterCallback(result);
          }
          return;
        }
      });
      if (!masterCalled) {
        console.log('calling none in sochain');
        masterCalled = true;
        masterCallback('none');
      }
    });
  }
};
