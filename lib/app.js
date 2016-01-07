'use strict';

/*
 * Module Dependencies
 */
var express = require('express');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var async = require('async');
var methodOverride = require('method-override');
var _ = require('lodash');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var expressJwt = require('express-jwt');

var mongo = require('./modules/mongo');
var config = require('../config/env');

/**
 * Application variable
 */
var app = module.exports = express();
var server;

/**
 * Starts the Application
 */
module.exports.start = function start(port, callback) {

    async.series([
        stepLog(' * Configuring Express... '), configureExpress,
        stepLog(' * Configuring Middlewares... '), configureMiddlewares,
        stepLog(' * Configuring Routes... '), configureRoutes,
        stepLog(' * Stating Server... '), startServer
    ], done);

    function done(err) {
        if (err) {
            console.error(path.basename(__filename) + ' - done - ' + err);
        }
        if (callback) {
            callback();
        }
    }

    function stepLog(text) {
        return function (callback) {
            console.log(path.basename(__filename) + ' - stepLog - ' + text);
            callback();
        }
    }

    function configureExpress(callback) {

        app.set('port', port);
        app.use(morgan('dev'));
        app.use(favicon(__dirname + '/../app/favicon.ico'));
        app.use(serveStatic(path.join(__dirname, '/../app')));
        app.use(serveStatic(path.join(__dirname, '/../bower_components')));
        app.use(methodOverride());
        app.use(bodyParser.json());       // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({extended:true}));   // to support URL-encoded bodies
        app.use(cors()); //to support cross-domain
        app.use(helmet());
        //app.use('/client', expressJwt({secret: config.secretKey}));

        // Express in Development Mode
        if ('dev' != app.get('prod')) {
            app.use(errorHandler());
        }
        console.log("Express has been configured.");
        callback();
    }

    function configureMiddlewares(callback) {

        mongo.connect(config, function(err,db) {
            if(err) {
                console.log('ERROR initializing MongoDB: '+err);
                callback(err);
            } else {
                app.db = db;
            }
        });

        console.log("Middlewares has been configured.");
        callback();
    }

    function configureRoutes(callback) {
        fs.readdir('./lib/routes', function (err, files) {
            if(err){
                console.error("No routes folder found ",err);
                process.exit(-1);
            }
            else{
                var isRoute = /(route)(\.js)$/;
                async.eachSeries(files, verifyFile, callback);
            }

            function verifyFile(file, callback){
                if(isRoute.test(file)){
                    var route = require('./routes/'+file);
                    route.loadRoutes();
                    if(callback) {
                        console.log("Routes has been configured.");
                        callback();
                    }
                }
                else{
                    console.log("Routes has been configured.");
                    callback();
                }
            }
        });
    }

    function startServer(callback) {

        server = require('http').createServer(app).listen(app.get('port'), serverStatus('HTTP'));

        function serverStatus(protocol) {
            return function (err, data) {
                if (callback)
                    callback(err, data);
                if (err) {
                    console.error(path.basename(__filename) + " - serverStatus - " + protocol + " Server failed at start. ", err);
                }
                else {
                    console.log(path.basename(__filename) + " - serverStatus - " + protocol + " Server listening on port " + app.get('port'));
                }
            }
        }
        console.log("Server has been configured.");
    }
}

/**
 * Stops the Application
 */
module.exports.stop = function stop(callback) {
    server.close(callback);
}
