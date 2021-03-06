const quizContainer = document.getElementById('quizContainer');
const resultsContainer = document.getElementById('results');
const finButton = document.getElementById('finButton');
let time = 20;
let inervalId;
var clockRunning = false;
const questionsArray = [                    //Questions-objects in the form of an aray!
    {
        question: 'Which dog is the State Dog of Texas?',
        answers: {                  // sub properties of questionsArray.answers
            a: "German Shepherd",
            b: "Blue Lacy",
            c: "Pitbull",
            d: "Plott Hound",
        },
        correctAnswer: 'b' //the correct answer subproperty
    },
    {
        question: 'The basketball pup in Air Bud was a:',
        answers: {
            a: "Golden retriever",
            b: "Tibetan Mastiff",
            c: "Black Mouth Cur",
            d: "Great Dane",
        },
        correctAnswer: 'a'
    },
    {
        question: "A dog's sense of smell is X times more powerful than that of a human",
        answers: {
            a: "10",
            b: "100",
            c: "1000",
            d: "10000",
        },
        correctAnswer: 'd'
    },
    {
        question: 'What breed of dog has webbed feet?',
        answers: {
            a: "The Newfoundland",
            b: "Shetland Sheepdogs",
            c: "Neopolitan Mastiffs",
            d: "Collies",
        },
        correctAnswer: 'a'
    },
    {
        question: 'Puppies stop growing between x-j months',
        answers: {
            a: "2-4",
            b: "8-11",
            c: "12-24",
            d: "44-62",
        },
        correctAnswer: 'c'
    },
];
console.log('hi'); //check to see if things are running //sho the 

function gameDisplay() { //This is the function that runs a loop thru every Q 
    let output = []; //establishes array for the Qs
    questionsArray.forEach((currentQuestion, questionNumber) => { //for each Q
        const answers = []; //answer array
        for (var letter in currentQuestion.answers) {
            answers.push( //makin lil HTML buttons
                `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
        }
        output.push( //pushin buttons to the answers
            `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
        );
    }
    );
    document.getElementById('quizContainer').innerHTML = (output.join()); //Pushes the whole quiz to the quiz div 

}
let count;
function gameFin() { //displays results div instead of quiz div, 
    answerContainers = quizContainer.querySelectorAll('.answers');
    correctAnswers = 0;
    questionsArray.forEach((currentQuestion, questionNumber) => { //arrow function to loop thru the Qs

        answerContainer = answerContainers[questionNumber]; //grab that correct question
        selector = `input[name=question${questionNumber}]:checked`; //dis selects the checked answers
        userAnswer = (answerContainer.querySelector(selector) || {}).value; //the or value stops unanswered questions from triggering anything
        if (userAnswer === currentQuestion.correctAnswer) { //if the answer is correc
            console.log('helo');
            correctAnswers++; //increment yo
        }

    });
    resultsContainer.innerHTML = `${correctAnswers} out of ${questionsArray.length}`;
    clockStop(); //printing the results to the results div (:
};

function timerClock() {
    time--;
    console.log(time);
    $('#timerDiv').text('Time left: ' + time);
    if (time === 0) {
        gameFin();
    }
}
function clockStart() {
    if (!clockRunning) { //if clock not running 
        intervalId = setInterval(timerClock, 1000); //runs timerClock every second to decrement the time var
        clockRunning = true; //now it is (:
        timerClock();
    }
}
function clockStop() {
    clearInterval(intervalId);
    clockRunning = false;
}
$('#start').on('click', function () {
    gameDisplay();
    clockStart()
    $('#startDiv').text('');

});
$('#finButton').on('click', function () {
    gameFin();
    time = 0;
    $('#timerDiv').text('Time left: ' + time);

});