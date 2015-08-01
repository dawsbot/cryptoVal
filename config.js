module.exports = {
  port: process.env.PORT || 3000,
  chainApiKeyId: process.env.CHAIN_API_KEY_ID,
  chainApiKeySecret: process.env.CHAIN_API_KEY_SECRET,
  mongoUrl: process.env.MONGOLAB_URI
};
