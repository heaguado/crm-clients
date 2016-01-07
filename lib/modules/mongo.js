'use strict';

/*
 * Module Dependencies
 */
var mongoClient = require('mongodb').MongoClient;

module.exports.connect = function (config,callback) {
    var mongoUrl = 'mongodb://' + config.mongo.hosts + '/' + config.mongo.db;
    console.log('    - Trying to connect to MongoDB on ' + mongoUrl);

    mongoClient.connect(mongoUrl, config.mongo.options, function (err, db) {
        if (db) {
            var events = ['error', 'timeout', 'parseError', 'open', 'fullsetup', 'all', 'reconnect'];

            for (var i = 0; i < events.length; i++) {
                db.on(events[i], function (err) {
                    console.log('DB connection ' + events[i] + ': ' + err);
                });
            }

            db.on('close', function (err) {
                if (err) {
                    console.log('DB connection not closed. ' + err);
                } else {
                    console.log('DB connection closed.');
                }
            });
        }

        if (err) {
          error('Error connecting to MongoDB', err);
        } else if (!err && config.mongo.cert) {
          db.authenticate(config.mongo.auth.user, config.mongo.auth.pass, config.mongo.auth.options, function (err, result) {
            if (err) {
              error("Error connecting to MongoDB", err);
            } else {
              success(db, "    - Connected and authorized to MongoDB", callback);
            }
          });
        } else
            success(db, '    - Connected to MongoDB', callback);
    });

    function error(msg, err) {
        console.error(msg, err);
        process.exit(0);
    }

    function success(db, msg, callback) {
        console.log(msg);
        if (callback)
            callback(null, db);
    }
}
