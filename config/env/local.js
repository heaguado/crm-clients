"use strict";

module.exports = {
    environment: process.env.NODE_ENV || "dev",
    server: {
        port: process.env.PORT || 3000,
        host: "localhost:3000",
        redirectFrom: ""
    },
    mongo: {
        hosts: process.env.MONGO_HOSTS || 'localhost:27017',
        db: process.env.MONGO_DB || 'crmclients',
        uri: 'mongodb://' + process.env.MONGO_HOSTS || 'localhost:27017' + '/' + process.env.MONGO_DB || 'crmclients',
        options: {}
    }
};
