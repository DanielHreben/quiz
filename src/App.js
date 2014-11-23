'use strict';

var React   = require('react');

class App {
    constructor (args) {
        this.pubsub = args.pubsub;
        this.ui = args.ui;
    }

    run () {
        console.info('Starting APP');
        this.renderUI();
    }

    renderComponent() {
        this.ui = this.ui({
            data: {}
        });
        this.ui = React.renderComponent( this.ui, document.getElementById('content') );
    }

    renderUI() {
        this.renderComponent();
    }
}

module.exports = App;