'use strict';

var expect = require('chai').expect;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../../data/clients.data.test').data;

var clientsModel;
var key;
var client;
var collection = 'CLIENTS';

describe('UNIT TEST clients.model', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    clientsModel = require("../../../lib/models/clients.model");
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

  it('clientsModel must exists', function () {
    var result = clientsModel;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['mongo']);
  });

  describe('mongo', function() {

    it('getClients', function (done) {
      clientsModel.mongo.getClients(app.db, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getClient data '+key, function (done) {
        clientsModel.mongo.getClient(app.db, data[key], function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postClient data '+key, function (done) {
        client = {
          id : data[key]
        };
        clientsModel.mongo.postClient(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putClient data '+key, function (done) {
        client = {
          id : data[key]
        };
        clientsModel.mongo.putClient(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deleteClient data '+key, function (done) {
        client = {
          id : data[key]
        };
        clientsModel.mongo.deleteClient(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
