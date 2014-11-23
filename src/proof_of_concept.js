"use strict";

var cars = {
    citroen:  0,
    hyundai:   0,
    mercedes: 0,
};

var questions = require('./questions.json');

for (var i = 0; i < questions.length; i++) {
    var question = questions[i];

    var answerIndex = parseInt( prompt([
        question.text,
        "Answers:",
        question.answers.map(function(answer) { return answer.text }).join('\n')
    ].join('\n')) ) -1;

    var points = question.answers[answerIndex].points;
    for ( var car in points ) {
        cars[ car ] += points[ car ];
    }
}

console.log("You car is:", cars );