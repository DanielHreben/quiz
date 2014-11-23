/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

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
            currentQuestion: 1
        };
    },

    _getNextQuestion() {
        if (this.state.currentQuestion < questions.length) {
            this.setState({
                currentQuestion: this.state.currentQuestion+1
            });
        }
    },

    _answerQuestion(number) {
        var points = questions[this.state.currentQuestion-1].answers[number].points;

        for ( var result in points ) {
            if (results[ result ] === undefined) {
                results[ result ] = 0;
            }
            results[ result ] += points[ result ];
        }
        this._getNextQuestion();
    },

    _startNewQuiz() {
        this.setState({
            currentQuestion: 1
        });
    },

    render() {
        var question = questions[this.state.currentQuestion-1];
        var isQuizFinished = this.state.currentQuestion == questions.length;

        var answersNode = question.answers.map( (answer,i) => <button className='btn btn-default btn-lg btn-block' onClick={this._answerQuestion.bind(this,i)}>{answer.text}</button>);

        var questionNode = (
            <div className='question'>
                <h2>{this.state.currentQuestion}. {question.text}</h2>
                {answersNode}
            </div>
        );

        var topResults = Object.keys(results).sort(function(a, b) {
            if (results[a] > results[b]) return  1;
            if (results[a] < results[b]) return -1;
            return 0;
        });

        var resultsNode = <h2>Your result is <u>{resultsNames[ topResults[0] ]}</u></h2>;

        return (
            <div className="UI">
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Quiz</a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a onClick={this._startNewQuiz}>Start</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="jumbotron">
                        {isQuizFinished ? resultsNode : questionNode}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UI;