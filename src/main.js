'use strict';

window.React = require('react');
window.$ = window.jQuery = require('jquery');

var AppFactory = require('./AppFactory');

$(document).ready(function(){
    var app = new AppFactory().create();
    app.run();

    window.app = app;
});
