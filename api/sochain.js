var rest = require('restler');

module.exports = {
  getAddressInfo: function(type, address, cb) {
    var getUrl = 'http://chain.so/api/v2/address/' + type + '/' + address;
    rest.get(getUrl).on('complete', function(result) {
      cb(result);
    });
  }
};
