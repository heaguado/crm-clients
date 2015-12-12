'use strict';

var app = require('../app');
var eventsModel = require('../models/events.model');

module.exports = {
    getEvents : getEvents,
    getEvent : getEvent,
    postEvent : postEvent,
    putEvent : putEvent,
    deleteEvent : deleteEvent
}

function getEvents(callback) {
    eventsModel.mongo.getEvents(app.db, callback);
}

function getEvent(id, callback) {
    if(parseInt(id,10)) {
        eventsModel.mongo.getEvents(app.db, id, callback);
    } else {
        callback(new Error("El id introducido no es numérico."));
    }
}

function postEvent(event, callback) {
    eventsModel.mongo.postEvent(app.db, event, callback);
}

function putEvent(event, callback) {
    eventsModel.mongo.putEvent(app.db, event, callback);
}

function deleteEvent(event, callback) {
    eventsModel.mongo.deleteEvent(app.db, event, callback);
}
