'use strict';

/**
 * Module dependencies.
 */
var app = require('./lib/app');
var config = require('./config/env');

var server = app.start(process.env.PORT || config.server.port || 3000);
