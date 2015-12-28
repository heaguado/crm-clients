'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../data/offers.data.test').data;

var offersController;
var db;
var key;
var offer;
var collection = 'CLIENTS';

describe('UNIT TEST offers.controller', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    offersController = require("../../../lib/controllers/offers.controller");
    mongo.connect(config, function(err, db) {
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

  it('offersController must exists', function() {
    var result = offersController;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['getOffers','getOffer','postOffer','putOffer','deleteOffer']);
  });

  describe('mongo', function() {

    it('getOffers', function(done) {
      offersController.getOffers(function(err, data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getOffer data '+key, function(done) {
        offersController.getOffer(data[key], function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postOffer data '+key, function(done) {
        offer = {
          id : data[key]
        };
        offersController.postOffer(offer, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putOffer data '+key, function(done) {
        offer = {
          id : data[key]
        };
        offersController.putOffer(offer, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deleteOffer data '+key, function(done) {
        offer = {
          id : data[key]
        };
        offersController.deleteOffer(offer, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
