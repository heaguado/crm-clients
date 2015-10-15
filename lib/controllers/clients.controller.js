'use strict';

var app = require('../app');
var clientsDao = require('../daos/clients.dao');

module.exports = {
    getClients : getClients,
    getClient : getClient,
    postClient : postClient,
    putClient : putClient,
    deleteClient : deleteClient
}

function getClients(callback) {
    clientsDao.mongo.getClients(app.db, callback);
}

function getClient(id, callback) {
    if(parseInt(id,10)) {
        clientsDao.mongo.getClient(app.db, id, callback);
    } else {
        callback(new Error("El id introducido no es numérico."));
    }
}

function postClient(client, callback) {
    clientsDao.mongo.postClient(app.db, client, callback);
}

function putClient(client, callback) {
    clientsDao.mongo.putClient(app.db, client, callback);
}

function deleteClient(client, callback) {
    clientsDao.mongo.deleteClient(app.db, client, callback);
}
