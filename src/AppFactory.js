'use strict';

var App    = require('./App');
var UI     = require('./UI.jsx');
var Pubsub = require('pubsub-js');

class AppFactory {
    create () {
        var app = new App({
            ui:     UI,
            pubsub: Pubsub,
        });

        return app;
    }
}

module.exports = AppFactory;