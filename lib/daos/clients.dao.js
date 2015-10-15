'use strict';

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

function getClients(db, callback) {
    db.collection(collection).find().toArray(function(err, docs) {
        if(err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, docs);
        }
    });
}

function getClient(db, id, callback) {
    var query = {'_id' : id};
    db.collection(collection).findOne(query, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, doc);
        }
    });
}

function postClient(db, client, callback) {
    var options = {};
    db.collection(collection).save(client, options, function(err, doc) {
        callback(null, doc);
    });
}

function putClient(db, client, callback) {
    var options = {};
    db.collection(collection).insert(client, options, function(err, doc) {
        callback(null, doc);
    });
}

function deleteClient(db, client, callback) {
    var options = {};
    db.collection(collection).remove(client, options, function(err, doc) {
        callback(null, doc);
    });
}
