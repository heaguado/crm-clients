'use strict';

var expect = require('chai').expect;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../../data/places.data.test').data;

var placesModel;
var key;
var client;
var collection = 'PLACES';

describe('UNIT TEST places.model', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    placesModel = require("../../../lib/models/places.model");
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

  it('placesModel must exists', function () {
    var result = placesModel;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['mongo']);
  });

  describe('mongo', function() {

    it('getPlaces', function (done) {
      placesModel.mongo.getPlaces(app.db, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getPlace data '+key, function (done) {
        placesModel.mongo.getPlace(app.db, data[key], function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postPlace data '+key, function (done) {
        client = {
          id : data[key]
        };
        placesModel.mongo.postPlace(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putPlace data '+key, function (done) {
        client = {
          id : data[key]
        };
        placesModel.mongo.putPlace(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deletePlace data '+key, function (done) {
        client = {
          id : data[key]
        };
        placesModel.mongo.deletePlace(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
