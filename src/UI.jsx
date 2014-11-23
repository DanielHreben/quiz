/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var _     = require('lodash');

require('./UI.less');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

var questions = require('./questions.json');

var cars = {
    citroen:  0,
    hyundai:   0,
    mercedes: 0,
};

var carName = {
    citroen: 'Citroen',
    hyundai: 'Hyundai',
    mercedes: 'Mercedes'
};

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

        for ( var car in points ) {
            cars[ car ] += points[ car ];
        }
        console.log(number,cars);
        this._getNextQuestion();
    },

    render() {
        console.log('currentQuestion',this.state.currentQuestion);
        var question = questions[this.state.currentQuestion];
        var isQuizFinished = this.state.currentQuestion == questions.length-1;

        var answersNode = question.answers.map( (answer,i) => <button className='btn btn-default' onClick={this._answerQuestion.bind(this,i)}>{answer.text}</button>);

        var questionNode = (
            <div className='question'>
                <h2>
                    {question.text}
                </h2>
                <div className='answers'>
                    {answersNode}
                </div>
            </div>
        );

        var max = _.max(cars);

        console.log('max', max );

        var maxObject = '';
        for (var key in cars) {
            if (cars[key] == max) maxObject = key;
        }

        var resultsNode = <h2>Your result is <u>{carName[maxObject]}</u></h2>;

        return (
            <div className="UI">
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Quiz</a>
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