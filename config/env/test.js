"use strict";

module.exports = {
    environment: process.env.NODE_ENV || "test",
    server: {
        port: process.env.PORT || 8100,
        host: "localhost:8100",
        redirectFrom: ""
    },
    mongo: {
        hosts: process.env.MONGO_HOSTS || '127.0.0.1:27017',
        db: process.env.MONGO_DB || 'crmclients-test',
        options: {}
    }
};
