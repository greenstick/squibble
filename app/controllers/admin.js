var express         = require('express'),
    filesystem      = require('fs'),
    mongoose        = require('mongoose'),
    router          = express.Router(),
    // Set Front End Libraries to Include
    react           = 'lib/react/react.min.js',
    jquery          = 'lib/jquery/dist/jquery.min.js',
    knockout        = 'lib/knockout.js/knockout.js',
    d3              = 'lib/d3/d3.min.js',
    sockets         = 'lib/socket.io-client/socket.io.js',
    isotope         = 'lib/isotope/dist/isotope.pkgd.min.js',
    // Set Front End Application Scripts to Include
    administration  = 'js/administration.js',
    application     = 'js/application.js',
    portfolio       = 'js/portfolio.js',
    train           = 'js/train.js',
    explore         = 'js/explore.js'
    piece           = 'js/piece.js',
    layer           = 'js/layer.js';

/*
Set Router
*/

module.exports = function (app) {

    app.use('/admin', router);

};

/*
Custom Router Middleware
*/

/*
router.use(function (req, res, next) {
    console.log("Method:", req.method);
    console.log("Request Body:", req.body);
    next();
});
*/

// Administration Route
router.get('/', function (req, res, next) {
    res.render('admin', {
        title       : 'Administration Panel',
        css         : 'adminstration.css',
        libs        : [jquery, knockout, io],
        js          : [administration]
    });
});

// Login Route
router.get('/login', function (req, res, next) {
    res.render('login', {
        title       : 'Log In',
        css         : 'authentication.css',
        libs        : [jquery],
        js          : []
    });
});

// Login Route
router.get('/logout', function (req, res, next) {
    res.render('Log Out', {
        title       : 'Log Out',
        css         : 'authentication.css',
        libs        : [jquery],
        js          : []
    });
});
