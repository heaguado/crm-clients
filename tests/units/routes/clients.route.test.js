'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');

var app     = require('../../../lib/app');
var mongo = require('../../../lib/modules/mongo');
var config = require('../../../config/env');
var args = require('../data/clients').args;
var data = require('../data/clients.data.test').data;

var db;
var host    = 'http://localhost:8100';
var server = supertest(host);
var collection = 'CLIENTS';

describe('UNIT TEST clients.routes', function() {

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

  it('Get clients', function (done) {
    server
      .get('/clients')
      .expect("Content-type", /json/)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.be.string;
        assert.equal(res.status, 200);
        done();
      });
  });

  for (var arg in args) {
    it('Get client ' + arg, function (done) {
      server
        .get('/client/' + arg)
        .expect("Content-type", /json/)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.string;
          assert.equal(res.status, 200);
          done();
        });
    });
  }


  for (var arg in args) {
    it('Put client ' + arg, function (done) {
      server
        .put('client')
        .send(args[arg])
        .expect("Content-type", /json/)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.string;
          assert.equal(res.status, 200);
          done();
        });
    });
  }

  for (var arg in args) {
    it('Post client ' + arg, function (done) {
      server
        .post('client')
        .send(args[arg])
        .expect("Content-type", /json/)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.string;
          assert.equal(res.status, 200);
          done();
        });
    });
  }

  for (var arg in args) {
    it('Delete client ' + arg, function (done) {
      server
        .delete('client')
        .send(args[arg])
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

