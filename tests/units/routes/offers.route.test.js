'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var data = require('../data/offers.data.test').data;

var db;
var host    = 'http://localhost:8100';
var server = supertest(host);
var collection = 'OFFERS';

describe('UNIT TEST offers.routes', function() {

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
    it('Put offer ' + key, function (done) {
      server
        .put('/offer')
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
    it('Post offer ' + key, function (done) {
      server
        .post('/offer')
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

  it('Get offers', function (done) {
    server
      .get('/offers')
      .expect("Content-type", /json/)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.be.string;
        assert.equal(res.status, 200);
        done();
      });
  });

  for (var key in data) {
    it('Get offer ' + key, function (done) {
      server
        .get('/offer/' + data[key]._id)
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
    it('Delete offer ' + key, function (done) {
      server
        .delete('/offer')
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

