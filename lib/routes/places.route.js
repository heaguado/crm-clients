'use strict';

/*
 * Module Dependencies
 */
var _ = require('lodash');
var async = require('async');

var app = require('../app');
var placesController = require('../controllers/places.controller');

module.exports = {
    loadRoutes : loadRoutes
}

function loadRoutes() {
    var url;

    getAll();
    getPlace();
    place();

    function getAll() {
        url = '/places';
        app.get(url, function(req, res) {
            placesController.getPlaces(done);

            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        });
        console.log('    - Registered URL '+url+' and METHOD GET ');


    }

    function getPlace() {
        url = '/place/:id';
        app.get(url, function(req, res) {
            placesController.getPlace(req.params.id,done);

            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        });
        console.log('    - Registered URL ' + url + ' and METHOD GET ');
    }

    function place() {
        url = '/place';
        app.route(url).put(function(req,res) {
            placesController.putPlace(req.body.place,done);
            console.log('    - Registered URL ' + url + ' and METHOD PUT ');
            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        }).post(function(req,res) {
            placesController.postPlace(req.body.place,done);
            console.log('    - Registered URL ' + url + ' and METHOD POST ');
            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        }).delete(function(req,res) {
            placesController.deletePlace(req.body.place,done);
            console.log('    - Registered URL ' + url + ' and METHOD DELETE ');
            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        });
    }
}