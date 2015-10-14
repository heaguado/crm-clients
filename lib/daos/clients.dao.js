'use strict';

var app = require('../app');
var config = require('../../config/env');

var db = app.db;
var collection = 'CLIENTS';

module.exports = {
    mongo : {
        getClients : getClients,
        getClient : getClient,
        postClient : postClient,
        putClient : putClient,
        deleteClient : deleteClient
    }
}

function getClients(callback) {
    db.collection(collection).find().toArray(function(err, docs) {
        callback(null, docs);
    });
}

function getClient(id, callback) {
    var query = {_id : id};
    db.collection(collection).findOne(query, function(err, doc) {
        callback(null, doc);
    });
}

function postClient(client, callback) {
    db.collection(collection).update(query,function(err, doc) {
        callback(null, doc);
    });
}

function putClient(callback) {
    db.collection(collection).insert(query,function(err, docs) {
        callback(null, docs);
    });
}

function deleteClient(callback) {
    db.collection(collection).delete(query,function(err, docs) {
        callback(null, docs);
    });
}
