'use strict';

var collection = 'OFFERS';

module.exports = {
    mongo : {
        getOffers : getOffers,
        getOffer : getOffer,
        postOffer : postOffer,
        putOffer : putOffer,
        deleteOffer : deleteOffer
    }
}

function getOffers(db, callback) {
    db.collection(collection).find().toArray(function(err, docs) {
        callback(err, docs);
    });
}

function getOffer(db, id, callback) {
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

function postOffer(db, offer, callback) {
    var options = {};
    db.collection(collection).save(offer, options, function(err, doc) {
        callback(err, doc);
    });
}

function putOffer(db, offer, callback) {
    var options = {};
    db.collection(collection).insert(offer, options, function(err, doc) {
        callback(err, doc);
    });
}

function deleteOffer(db, offer, callback) {
    var options = {};
    db.collection(collection).remove(offer, options, function(err, doc) {
        callback(err, doc);
    });
}
