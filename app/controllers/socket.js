var mongoose        = require('mongoose'),
    filesystem      = require('fs');

module.exports = function (wss) {

    wss.of('/explore').on('connection', function (socket) {
            socket.on("initialize", function (interval) {
                var interval = typeof interval === 'number' ? interval : 25;
                if (interval < 1) {
                    socket.on("ready", function () {
                        if (crawler.status.active) {
                            socket.volatile.emit('data', crawler.status);
                        } else {
                            socket.disconnect();
                        }
                    });
                } else {
                    throttling = setInterval(function () {
                        socket.volatile.emit('data', crawler.status);
                    }, interval);
                }
            });
            socket.on("diconnect", function () {
                if (typeof throttling !== 'undefined') clearInterval(throttling);
            });
    });
};