'use strict';

/*
 * Module Dependencies
 */
var _ = require('lodash');
var async = require('async');

var app = require('../app');
var clientsService = require('../services/clients.service');

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
            clientsService.getClients(done);

            function done(err,data) {
                if(err) {
                    res.status(500).send('ERROR');
                } else {
                    res.status(200).send(data);
                }
            }
        });
        console.log('    - Registered URL '+url+' and METHOD GET ');


    }

    function getClient() {
        url = '/client/:id';
        app.get(url, function(req, res) {
            clientsService.getClient(req.params.id,done);

            function done(err,data) {
                if(err) {
                    res.status(500).send('ERROR');
                } else {
                    res.status(200).send(data);
                }
            }
        });
        console.log('    - Registered URL ' + url + ' and METHOD GET ');
    }

    function client() {
        url = '/client'
        app.route(url).put(function(req,res) {
            clientsService.putClient(req.params.client,callback);
            console.log('    - Registered URL ' + url + ' and METHOD PUT ');
            function done(err,data) {
                if(err) {
                    res.status(500).send('ERROR');
                } else {
                    res.status(200).send(data);
                }
            }
        }).post(function(req,res) {
            clientsService.postClient(req.params.client,callback);
            console.log('    - Registered URL ' + url + ' and METHOD POST ');
            function done(err,data) {
                if(err) {
                    res.status(500).send('ERROR');
                } else {
                    res.status(200).send(data);
                }
            }
        }).delete(function(req,res) {
            clientsService.deleteClient(req.params.client,callback);
            console.log('    - Registered URL ' + url + ' and METHOD DELETE ');
            function done(err,data) {
                if(err) {
                    res.status(500).send('ERROR');
                } else {
                    res.status(200).send(data);
                }
            }
        });
    }
}
