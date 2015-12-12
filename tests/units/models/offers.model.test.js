'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../data/offers.data.test').data;

var offersModel;
var db;
var key;
var client;
var collection = 'OFFERS';

describe('UNIT TEST offers.model', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    offersModel = require("../../../lib/models/offers.model");
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

  it('offersModel must exists', function () {
    var result = offersModel;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['mongo']);
  });

  describe('mongo', function() {

    it('getOffers', function (done) {
      offersModel.mongo.getOffers(app.db, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getOffer data '+key, function (done) {
        offersModel.mongo.getOffer(app.db, data[key], function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postOffer data '+key, function (done) {
        client = {
          id : data[key]
        };
        offersModel.mongo.postOffer(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putOffer data '+key, function (done) {
        client = {
          id : data[key]
        };
        offersModel.mongo.putOffer(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deleteOffer data '+key, function (done) {
        client = {
          id : data[key]
        };
        offersModel.mongo.deleteOffer(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
