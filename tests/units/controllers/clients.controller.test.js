'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../data/clients.data.test').data;

var clientsController;
var key;
var client;
var collection = 'CLIENTS';

describe('UNIT TEST clients.controller', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    clientsController = require("../../../lib/controllers/clients.controller");
    mongo.connect(config, function (err, db) {
      if (err) {
        console.log('ERROR initializing MongoDB: ' + err);
      } else {
        app.db = db;
      }
      done();
    });
  });

  after(function(done) {
    for(key in data){
      app.db.collection(collection).remove(data[key],function(err,data){});
    }
    app.stop();
    done();
  });

  it('clientsController must exists', function() {
    var result = clientsController;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['getClients','getClient','postClient','putClient','deleteClient']);
  });

  describe('mongo', function() {

    it('getClients', function(done) {
      clientsController.getClients(function(err,data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getClient data '+key, function(done) {
        clientsController.getClient(data[key], function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postClient data '+key, function(done) {
        client = {
          id : data[key]
        };
        clientsController.postClient(client, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putClient data '+key, function(done) {
        client = {
          id : data[key]
        };
        clientsController.putClient(client, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deleteClient data '+key, function(done) {
        client = {
          id : data[key]
        };
        clientsController.deleteClient(client, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
