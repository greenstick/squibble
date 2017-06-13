var app 		= require('express')(),
	server 		= require('http').Server(app),
	config 		= require('./config/config'),
	glob 		= require('glob'),
	mongoose 	= require('mongoose'),
	wss 		= require('socket.io')(server);
	
// Connect to MongoDB using Mongoose Middleware
mongoose.connect(config.db);

// Database Connection Error Handling
var db 			= mongoose.connection;
	db.on('error', function () {
		throw new Error('Unable to connect to database: ' + config.db);
	});

// Include Mongoose Data Models
var models 		= glob.sync(config.root + '/app/models/*.js');
	models.forEach(function (model) {
		require(model);
	});

// Include Web Socket Handlers
var sockets = require(config.root + '/app/controllers/socket.js')(wss);

// Require Express Middleware & Listen
require('./config/express')(app, config);
app.listen(config.port);
server.listen(config.wssPort);