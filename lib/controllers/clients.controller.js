'use strict';

var app = require('../app');
var clientsModel = require('../models/clients.model');

module.exports = {
    getClients : getClients,
    getClient : getClient,
    postClient : postClient,
    putClient : putClient,
    deleteClient : deleteClient
}

function getClients(callback) {
    clientsModel.mongo.getClients(app.db, callback);
}

function getClient(id, callback) {
    clientsModel.mongo.getClient(app.db, id, callback);
}

function postClient(client, callback) {
    clientsModel.mongo.postClient(app.db, client, callback);
}

function putClient(client, callback) {
    clientsModel.mongo.putClient(app.db, client, callback);
}

function deleteClient(client, callback) {
    clientsModel.mongo.deleteClient(app.db, client, callback);
}
