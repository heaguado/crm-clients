'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../data/places.data.test').data;

var placesController;
var db;
var key;
var place;
var collection = 'CLIENTS';

describe('UNIT TEST places.controller', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    placesController = require("../../../lib/controllers/places.controller");
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

  it('placesController must exists', function () {
    var result = placesController;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['getPlaces','getPlace','postPlace','putPlace','deletePlace']);
  });

  describe('mongo', function() {

    it('getPlaces', function (done) {
      placesController.mongo.getPlaces(app.db, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getPlace data '+key, function (done) {
        placesController.mongo.getPlace(app.db, data[key], function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postPlace data '+key, function (done) {
        place = {
          id : data[key]
        };
        placesController.mongo.postPlace(app.db, place, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putPlace data '+key, function (done) {
        place = {
          id : data[key]
        };
        placesController.mongo.putPlace(app.db, place, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deletePlace data '+key, function (done) {
        place = {
          id : data[key]
        };
        placesController.mongo.deletePlace(app.db, place, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
