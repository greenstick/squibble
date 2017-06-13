var path                = require('path'),
    rootPath            = path.normalize(__dirname + '/..'),
    env                 = process.env.NODE_ENV || 'development';

var config = {
    development : {
        root        : rootPath,
        app         : {
            name        : 'operation-inform'
        },
        port        : process.env.PORT || 3000,
        wssPort     : process.env.WSSPORT || 4000,
        db          : 'mongodb://localhost/omics-application-development'
    },

    test        : {
        root        : rootPath,
        app         : {
            name        : 'operation-inform'
        },
        port        : process.env.PORT || 3000,
        wssPort     : process.env.WSSPORT || 4000,
        db          : 'mongodb://localhost/omics-application-test'
    },

    production  : {
        root        : rootPath,
        app         : {
            name        : 'operation-inform'
        },
        port        : process.env.PORT || 5000,
        wssPort     : process.env.WSSPORT || 4000,
        db          : 'mongodb://localhost/omics-application-production'
    }
};

module.exports = config[env];
