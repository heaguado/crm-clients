'use strict';

var app = require('../app');
var eventsModel = require('../models/events.model');

module.exports = {
    getEventss : getEventss,
    getEvents : getEvents,
    postEvents : postEvents,
    putEvents : putEvents,
    deleteEvents : deleteEvents
}

function getEventss(callback) {
    eventsModel.mongo.getEventss(app.db, callback);
}

function getEvents(id, callback) {
    if(parseInt(id,10)) {
        eventsModel.mongo.getEvents(app.db, id, callback);
    } else {
        callback(new Error("El id introducido no es numérico."));
    }
}

function postEvents(event, callback) {
    eventsModel.mongo.postEvents(app.db, event, callback);
}

function putEvents(event, callback) {
    eventsModel.mongo.putEvents(app.db, event, callback);
}

function deleteEvents(event, callback) {
    eventsModel.mongo.deleteEvents(app.db, event, callback);
}
