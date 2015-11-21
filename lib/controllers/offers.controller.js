'use strict';

var app = require('../app');
var offersModel = require('../models/offers.model');

module.exports = {
    getOffers : getOffers,
    getOffer : getOffer,
    postOffer : postOffer,
    putOffer : putOffer,
    deleteOffer : deleteOffer
}

function getOffers(callback) {
    offersModel.mongo.getOffers(app.db, callback);
}

function getOffer(id, callback) {
    if(parseInt(id,10)) {
        offersModel.mongo.getOffer(app.db, id, callback);
    } else {
        callback(new Error("El id introducido no es numérico."));
    }
}

function postOffer(offer, callback) {
    offersModel.mongo.postOffer(app.db, offer, callback);
}

function putOffer(offer, callback) {
    offersModel.mongo.putOffer(app.db, offer, callback);
}

function deleteOffer(offer, callback) {
    offersModel.mongo.deleteOffer(app.db, offer, callback);
}
