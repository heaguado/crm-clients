'use strict';

var expect = require('chai').expect;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../../data/events.data.test').data;

var eventsModel;
var key;
var client;
var collection = 'EVENTS';

describe('UNIT TEST events.model', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    eventsModel = require("../../../lib/models/events.model");
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

  it('eventsModel must exists', function () {
    var result = eventsModel;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['mongo']);
  });

  describe('mongo', function() {

    it('getEvents', function (done) {
      eventsModel.mongo.getEvents(app.db, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getEvent data '+key, function (done) {
        eventsModel.mongo.getEvent(app.db, data[key], function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postEvent data '+key, function (done) {
        client = {
          id : data[key]
        };
        eventsModel.mongo.postEvent(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putEvent data '+key, function (done) {
        client = {
          id : data[key]
        };
        eventsModel.mongo.putEvent(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deleteEvent data '+key, function (done) {
        client = {
          id : data[key]
        };
        eventsModel.mongo.deleteEvent(app.db, client, function (err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
