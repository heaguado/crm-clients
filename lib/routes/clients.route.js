'use strict';

/*
 * Module Dependencies
 */
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = require('../app');
var config = require('../../config/env');
var clientsController = require('../controllers/clients.controller');

module.exports = {
    loadRoutes : loadRoutes
}

function loadRoutes() {
    var url;

    getAll();
    getClient();
    client();

    function getAll() {
        url = '/clients';
        app.get(url, function(req, res) {
            clientsController.getClients(done);

            function done(err,data) {
                if(err) {
                  res.status(500).send({error: err});
                } else {
                  /*var token = jwt.sign(data, config.secretKey, {
                    expiresIn: 1440 // expires in 24 hours
                  });
                  data.token=token;*/
                  res.status(200).send(data);
                }
            }
        });
        console.log('    - Registered URL '+url+' and METHOD GET ');
    }

    function getClient() {
        url = '/client/:id';
        app.get(url, function(req, res) {
            clientsController.getClient(req.params.id,done);

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

    function client() {
        url = '/client';
        app.route(url).put(function(req,res) {
            clientsController.putClient(req.body.client,done);
            function done(err,data) {
              if(err) {
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        }).post(function(req,res) {
            clientsController.postClient(req.body.client,done);
            function done(err,data) {
              if(err) {
                res.status(500).send({error: err});
              } else {
                res.status(200).send(data);
              }
            }
        }).delete(function(req,res) {
            clientsController.deleteClient(req.body.client,done);
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
