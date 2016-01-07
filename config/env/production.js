"use strict";

module.exports = {
    environment: process.env.NODE_ENV || "prod",
    server: {
      port: process.env.PORT || 42175
    },
    mongo: {
      hosts: process.env.MONGO_HOSTS || 'heroku_69w913dx:q500jvei47on8858toau2puovb@ds039155.mongolab.com:39155',
      db: process.env.MONGO_DB || 'heroku_69w913dx',
      options: {},
      auth: {
        user: 'heaguado',
        pass: 'haguado22'
      }
    },
    secretKey: 'figuetuffueñof'
};
