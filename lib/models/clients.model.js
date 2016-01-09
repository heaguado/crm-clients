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
        var i;
        for(i=0;i<docs.length;i++) {
            docs[i].password = "********";
        }
        callback(err, docs);
    });
}

function getClient(db, id, callback) {
    var query = {'_id' : id};
    db.collection(collection).findOne(query, function(err, doc) {
        doc.password = "********";
        callback(err, doc);
    });
}

function postClient(db, client, callback) {
    var options = {new: true};
    db.collection(collection).save(client, options, function(err, doc) {
      if(!err && doc===1) {
        callback(err, client);
      } else {
        callback(err, doc);
      }
    });
}

function putClient(db, client, callback) {
    var options = {};
    db.collection(collection).insert(client, options, function(err, doc) {
        callback(err, doc);
    });
}

function deleteClient(db, client, callback) {
    var options = {};
    db.collection(collection).remove(client, options, function(err, doc) {
      if(!err && doc===1) {
        callback(err, client);
      } else {
        callback(err, doc);
      }
    });
}
