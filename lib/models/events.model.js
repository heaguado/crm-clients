'use strict';

var collection = 'EVENTS';

module.exports = {
    mongo : {
        getEvents : getEvents,
        getEvent : getEvent,
        postEvent : postEvent,
        putEvent : putEvent,
        deleteEvent : deleteEvent
    }
}

function getEvents(db, callback) {
    db.collection(collection).find().toArray(function(err, docs) {
        callback(err, docs);
    });
}

function getEvent(db, id, callback) {
    var query = {'_id' : id};
    db.collection(collection).findOne(query, function(err, doc) {
        callback(err, doc);
    });
}

function postEvent(db, event, callback) {
    var options = {};
    db.collection(collection).save(event, options, function(err, doc) {
      if(!err && doc===1) {
        callback(err, event);
      } else {
        callback(err, doc);
      }
    });
}

function putEvent(db, event, callback) {
    var options = {};
    db.collection(collection).insert(event, options, function(err, doc) {
        callback(err, doc);
    });
}

function deleteEvent(db, event, callback) {
    var options = {};
    db.collection(collection).remove(event, options, function(err, doc) {
      if(!err && doc===1) {
        callback(err, event);
      } else {
        callback(err, doc);
      }
    });
}
