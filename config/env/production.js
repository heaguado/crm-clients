"use strict";

module.exports = {
    environment: process.env.NODE_ENV || "prod",
    server: {
        port: process.env.PORT || 7443
    },
    mongo: {
        hosts: process.env.MONGO_HOSTS || '',
        db: process.env.MONGO_DB || 'crmclients',
        options: {}
    },
    secretKey: 'figuetuffueñof'
};
