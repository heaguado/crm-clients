'use strict';

var collection = 'PLACES';

module.exports = {
    mongo : {
        getPlaces : getPlaces,
        getPlace : getPlace,
        postPlace : postPlace,
        putPlace : putPlace,
        deletePlace : deletePlace
    }
}

function getPlaces(db, callback) {
    db.collection(collection).find().toArray(function(err, docs) {
       callback(err, docs);
    });
}

function getPlace(db, id, callback) {
    var query = {'_id' : id};
    db.collection(collection).findOne(query, function(err, doc) {
        callback(err, doc);
    });
}

function postPlace(db, place, callback) {
    var options = {};
    db.collection(collection).save(place, options, function(err, doc) {
      if(!err && doc===1) {
        callback(err, place);
      } else {
        callback(err, doc);
      }
    });
}

function putPlace(db, place, callback) {
    var options = {};
    db.collection(collection).insert(place, options, function(err, doc) {
        callback(err, doc);
    });
}

function deletePlace(db, place, callback) {
    var options = {};
    db.collection(collection).remove(place, options, function(err, doc) {
      if(!err && doc===1) {
        callback(err, place);
      } else {
        callback(err, doc);
      }
    });
}
