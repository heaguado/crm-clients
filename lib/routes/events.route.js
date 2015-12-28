'use strict';

/*
 * Module Dependencies
 */
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
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
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
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        });
        console.log('    - Registered URL ' + url + ' and METHOD GET ');
    }

    function event() {
        url = '/event';
        app.route(url).put(function(req,res) {
            eventsController.putEvent(req.body,done);
            function done(err,data) {
              if(err) {
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        }).post(function(req,res) {
            eventsController.postEvent(req.body,done);
            function done(err,data) {
              if(err) {
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        }).delete(function(req,res) {
            eventsController.deleteEvent(req.body,done);
            function done(err,data) {
              if(err) {
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        });
        console.log('    - Registered URL ' + url + ' and METHODS PUT, POST AND DELETE');
    }
}
