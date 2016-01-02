'use strict';

var expect = require('chai').expect;

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../../data/events.data.test').data;

var eventsController;
var key;
var event;
var collection = 'CLIENTS';

describe('UNIT TEST events.controller', function() {

  this.timeout(40000);

  before(function(done) {
    app.start(config.server.port);
    eventsController = require("../../../lib/controllers/events.controller");
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

  it('eventsController must exists', function() {
    var result = eventsController;
    expect(result).to.be.an('object');
    expect(result).to.include.keys(['getEvents','getEvent','postEvent','putEvent','deleteEvent']);
  });

  describe('mongo', function() {

    it('getEvents', function(done) {
      eventsController.getEvents(function(err, data) {
        expect(err).to.be.null;
        expect(data).to.be.string;
        done();
      });
    });

    for(key in data){
      it('getEvent data '+key, function(done) {
        eventsController.getEvent(data[key], function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('postEvent data '+key, function(done) {
        event = {
          id : data[key]
        };
        eventsController.postEvent(event, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('putEvent data '+key, function(done) {
        event = {
          id : data[key]
        };
        eventsController.putEvent(event, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }

    for(key in data){
      it('deleteEvent data '+key, function(done) {
        event = {
          id : data[key]
        };
        eventsController.deleteEvent(event, function(err, data) {
          expect(err).to.be.null;
          expect(data).to.be.string;
          done();
        });
      });
    }
  });

});
