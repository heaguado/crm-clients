'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env/index');
var data = require('../../data/places.data.test').data;

var host    = 'http://localhost:8100';
var server = supertest(host);
var collection = 'PLACES';

describe('INTEGRATION TEST places.routes', function() {

  this.timeout(40000);

  before(function (done) {
    app.start(config.server.port);
    mongo.connect(config, function (err, db) {
      if (err) {
        logger.info('ERROR initializing MongoDB: ' + err);
      } else {
        app.db = db;
      }
      done();
    });
  });

  after(function (done) {
    for (var key in data) {
      app.db.collection(collection).remove(data[key], function (err, data) {
      });
    }
    app.stop();
    done();
  });

  for (var key in data) {
    it('Put place ' + key, function (done) {
      server
        .put('/place')
        .send(data[key])
        .expect("Content-type", /json/)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.string;
          assert.equal(res.status, 200);
          done();
        });
    });
  }

  for (var key in data) {
    it('Post place ' + key, function (done) {
      server
        .post('/place')
        .send(data[key])
        .expect("Content-type", /json/)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.string;
          assert.equal(res.status, 200);
          done();
        });
    });
  }

  it('Get places', function (done) {
    server
      .get('/places')
      .expect("Content-type", /json/)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.be.string;
        assert.equal(res.status, 200);
        done();
      });
  });

  for (var key in data) {
    it('Get place ' + key, function (done) {
      server
        .get('/place/' + data[key]._id)
        .expect("Content-type", /json/)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.string;
          assert.equal(res.status, 200);
          done();
        });
    });
  }

  for (var key in data) {
    it('Delete place ' + key, function (done) {
      server
        .delete('/place')
        .send(data[key])
        .expect("Content-type", /json/)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.string;
          assert.equal(res.status, 200);
          done();
        });
    });
  }

});

