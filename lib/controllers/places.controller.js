'use strict';

var app = require('../app');
var placesModel = require('../models/places.model');

module.exports = {
    getPlaces : getPlaces,
    getPlace : getPlace,
    postPlace : postPlace,
    putPlace : putPlace,
    deletePlace : deletePlace
}

function getPlaces(callback) {
    placesModel.mongo.getPlaces(app.db, callback);
}

function getPlace(id, callback) {
    placesModel.mongo.getPlace(app.db, id, callback);
}

function postPlace(place, callback) {
    placesModel.mongo.postPlace(app.db, place, callback);
}

function putPlace(place, callback) {
    placesModel.mongo.putPlace(app.db, place, callback);
}

function deletePlace(place, callback) {
    placesModel.mongo.deletePlace(app.db, place, callback);
}
