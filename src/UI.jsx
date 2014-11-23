/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var _     = require('lodash');

require('./UI.less');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

var questions    = require('./questions.json');
var resultsNames = require('./resultsNames.json');
var results      = {};

var UI = React.createClass({
    componentDidMount() {

    },

    getInitialState() {
        return {
            currentQuestion: 0
        };
    },

    _getNextQuestion() {
        if (this.state.currentQuestion < questions.length-1) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            });
        }
    },

    _answerQuestion(number) {
        var points = questions[this.state.currentQuestion].answers[number].points;

        for ( var result in points ) {
            if (results[ result ] === undefined) {
                results[ result ] = 0;
            }
            results[ result ] += points[ result ];
        }
        this._getNextQuestion();
    },

    render() {
        console.log('currentQuestion',this.state.currentQuestion);
        var question = questions[this.state.currentQuestion];
        var isQuizFinished = this.state.currentQuestion == questions.length-1;

        var answersNode = question.answers.map( (answer,i) => <button onClick={this._answerQuestion.bind(this,i)}>{answer.text}</button>);

        var questionNode = (
            <div className='question'>
                <div className='text'>
                    {question.text}
                </div>
                <div className='answers'>
                    {answersNode}
                </div>
            </div>
        );

        var topResults = Object.keys(results).sort(function(a, b) {
            if (results[a] > results[b]) return  1;
            if (results[a] < results[b]) return -1;
            return 0;
        });

        console.log('topResults', topResults );

        var resultsNode = resultsNames[ topResults[0] ];

        return (
            <div className="UI">
                {isQuizFinished ? resultsNode : questionNode}
            </div>
        );
    }
});

module.exports = UI;