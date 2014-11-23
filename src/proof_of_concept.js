"use strict";

var cars = {
    sitroen:  0,
    hundai:   0,
    mersedes: 0,
};

var questions = [{
    text: "Are you like boolshit?",
    answers: [{
        text:   "Yeah! I like it!",
        points: {
            sitroen:  20,
            hundai:   10,
            mersedes: 0,
        }
    }, {
        text: "Sometimes I like shit, sometimes I like bulls",
        points: {
            sitroen:  10,
            hundai:   0,
            mersedes: 10,
        }
    }, {
        text: "No!",
        points: {
            sitroen:  -5,
            hundai:   0,
            mersedes: 10,
        }
    }]
}, {
    text: "How about putin?",
    answers: [{
        text: "Lalalalalalalala!",
        points: {
            sitroen:  0,
            hundai:   10,
            mersedes: 10,
        }
    }, {
        text: "Huilo!",
        points: {
            sitroen:  0,
            hundai:   10,
            mersedes: 15,
        }
    }, {
        text: "President of the world!",
        points: {
            sitroen:  40,
            hundai:   0,
            mersedes: 0,
        }
    }, {
        text: "WTF?",
        points: {
            sitroen:  0,
            hundai:   0,
            mersedes: 0,
        }
    }]
}, {
    text: "How mach 9000+1?",
    answers: [{
        text: "9001",
        points: {
            sitroen:  0,
            hundai:   0,
            mersedes: 0,
        }
    }, {
        text: "Over 9000!",
        points: {
            sitroen:  0,
            hundai:   10,
            mersedes: 0,
        }
    }]
}];

for (var i = 0; i < questions.length; i++) {
    var question = questions[i];

    var answerIndex = parseInt( prompt([
        question.text,
        "Ansvers:",
        question.answers.map(function(answer) { return answer.text }).join('\n')
    ].join('\n')) ) -1;

    var points = question.answers[answerIndex].points;
    for ( var car in points ) {
        cars[ car ] += points[ car ];
    }
}

console.log("You car is:", cars );