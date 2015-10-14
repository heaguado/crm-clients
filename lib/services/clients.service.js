'use strict';

var clientsDao = require('../daos/clients.dao');

module.exports = {
    getClients : getClients,
    getClient : getClient,
}

function getClients(callback) {
    clientsDao.mongo.getClients(callback);
}

function getClient(id, callback) {
    clientsDao.mongo.getClient(id, callback);
}
