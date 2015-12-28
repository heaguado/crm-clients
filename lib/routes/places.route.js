'use strict';

/*
 * Module Dependencies
 */
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
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
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
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        });
        console.log('    - Registered URL ' + url + ' and METHOD GET ');
    }

    function place() {
        url = '/place';
        app.route(url).put(function(req,res) {
            placesController.putPlace(req.body,done);
            function done(err,data) {
              if(err) {
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        }).post(function(req,res) {
            placesController.postPlace(req.body,done);
            function done(err,data) {
              if(err) {
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        }).delete(function(req,res) {
            placesController.deletePlace(req.body,done);
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
