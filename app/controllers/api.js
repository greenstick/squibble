var express         = require('express'),
    filesystem      = require('fs'),
    mongoose        = require('mongoose'),
    api             = express.Router(),
    // Set Front End Libraries to Include as Needed
    jquery          = 'lib/jquery/dist/jquery.min.js',
    knockout        = 'lib/knockout.js/knockout.js',
    d3              = 'lib/d3/d3.min.js',
    io              = 'lib/socket.io-client/socket.io.js';

/*
Set Router
*/

module.exports = function (app) {

    app.use('/api', api);
    
};

/*
Custom API Middleware
*/

/*
router.use(function (req, res, next) {
    console.log("Method:", req.method);
    console.log("Request Body:", req.body);
    next();
});
*/

api.get("/", function (req, res, next) {
    res.json({
        "router"    : "/api",
        "root"      : "/",
        "method"    : "GET",
        "datetime"  : new Date()
    });
});

api.post("/", function (req, res, next) {
    res.json({
        "router"    : "/api",
        "root"      : "/",
        "method"    : "POST",
        "datetime"  : new Date()
    });
});

/*
API Get Handles
*/

api.get('/login', function (req, res, next) {
    res.json({
        "router"    : "/api",
        "root"      : "/login",
        "method"    : "GET",
        "datetime"  : new Date()
    });
});

api.get('/logout', function (req, res, next) {
    res.json({
        "router"    : "/api",
        "root"      : "/logout",
        "method"    : "GET",
        "datetime"  : new Date()
    });
});

/*
API Post Handles
*/

api.post('/login', function (req, res, next) {
    res.json({
        "router"    : "/api",
        "root"      : "/login",
        "method"    : "PST",
        "datetime"  : new Date()
    });
});

api.post('/logout', function (req, res, next) {
    res.json({
        "router"    : "/api",
        "root"      : "logout",
        "method"    : "POST",
        "datetime"  : new Date()
    });
});