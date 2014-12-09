/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

require('./UI.less');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

var questions    = require('./data/questions.json');
var answersDescription = require('./data/answers.json');
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
        if (this.state.currentQuestion <= questions.length) {
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

        results = {};
    },

    render() {
        var isQuizFinished = this.state.currentQuestion > questions.length;

        var answersNode  = '';
        var questionNode = '';
        var resultsNode  = '';
        var introductionNode = '';

        if (isQuizFinished) {
            var topResults = Object.keys(results).sort(function(a, b) {
                if (results[a] > results[b]) return -1;
                if (results[a] < results[b]) return 1;
                return 0;
            });
            var topResultDescriprion = answersDescription[ topResults[0] ];

            resultsNode = (
                <div>
                    <h2> Ваш оптимальний автомобіль -  <u>{topResultDescriprion.name}</u></h2>
                    <img src={'static/img/' + topResultDescriprion.img} height="200" />
                </div>
            );
        } else {
            var question = questions[this.state.currentQuestion-1];

            answersNode = question.answers.map( (answer, i) =>
                <button className='btn btn-default btn-lg btn-block'
                onClick={this._answerQuestion.bind(this, i)}>{answer.text}
                <br />
                {answer.img ? <img src={'static/img/' + answer.img} height="200" /> : '' }
                </button>
            );

            introductionNode = (
                <div className='introduction'>
                    <h2>{question.introduction ? question.introduction : '' }</h2>
                </div>
            );

            questionNode = (
                <div className='question'>
                    {introductionNode}
                    <h2>{this.state.currentQuestion}. {question.text}</h2>
                    {question.img ? <img src={'static/img/' + question.img} height="200" /> : '' }
                    {answersNode}
                </div>
            );
        }

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