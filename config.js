module.exports = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGOLAB_URI,

  //MongoLab specific options
  mongoOptions: {
    server: {
      socketOptions: {
          keepAlive: 1, connectTimeoutMS: 30000
      }
    },
    replset: {
        socketOptions:
        { keepAlive: 1, connectTimeoutMS: 30000
        }
    }
  }};
