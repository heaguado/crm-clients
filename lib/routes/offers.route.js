'use strict';

/*
 * Module Dependencies
 */
var _ = require('lodash');
var async = require('async');

var app = require('../app');
var offersController = require('../controllers/offers.controller');

module.exports = {
    loadRoutes : loadRoutes
}

function loadRoutes() {
    var url;

    getAll();
    getOffer();
    offer();

    function getAll() {
        url = '/offers';
        app.get(url, function(req, res) {
            offersController.getOffers(done);

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

    function getOffer() {
        url = '/offer/:id';
        app.get(url, function(req, res) {
            offersController.getOffer(req.params.id,done);

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

    function offer() {
        url = '/offer';
        app.route(url).put(function(req,res) {
            offersController.putOffer(req.body.offer,done);
            console.log('    - Registered URL ' + url + ' and METHOD PUT ');
            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        }).post(function(req,res) {
            offersController.postOffer(req.body.offer,done);
            console.log('    - Registered URL ' + url + ' and METHOD POST ');
            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        }).delete(function(req,res) {
            offersController.deleteOffer(req.body.offer,done);
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
