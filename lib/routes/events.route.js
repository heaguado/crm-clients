'use strict';

/*
 * Module Dependencies
 */
var _ = require('lodash');
var async = require('async');

var app = require('../app');
var eventsController = require('../controllers/events.controller');

module.exports = {
    loadRoutes : loadRoutes
}

function loadRoutes() {
    var url;

    getAll();
    getEvent();
    event();

    function getAll() {
        url = '/events';
        app.get(url, function(req, res) {
            eventsController.getEvents(done);

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

    function getEvent() {
        url = '/event/:id';
        app.get(url, function(req, res) {
            eventsController.getEvent(req.params.id,done);

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

    function event() {
        url = '/event';
        app.route(url).put(function(req,res) {
            eventsController.putEvent(req.body.event,done);
            console.log('    - Registered URL ' + url + ' and METHOD PUT ');
            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        }).post(function(req,res) {
            eventsController.postEvent(req.body.event,done);
            console.log('    - Registered URL ' + url + ' and METHOD POST ');
            function done(err,data) {
                if(err) {
                    res.sendStatus(500).send('ERROR');
                } else {
                    res.sendStatus(200).send(data);
                }
            }
        }).delete(function(req,res) {
            eventsController.deleteEvent(req.body.event,done);
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
