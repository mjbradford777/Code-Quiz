let questions = [ 
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: 'Which of the following statements is true?',
        choices: ['Arrays can contain objects, but objects cannot contain other objects', 'Both arrays and objects can contain objects', 'Objects can contain other objects, but arrays cannot contain objects', 'Neither arrays nor objects can contain objects'],
        answer: 'Both arrays and objects can contain objects'
    },
    {
        title: 'In JavaScript, a function stored as a property in an object is called a:',
        choices: ['Method', 'Callback', 'Reference', 'Pointer'],
        answer: 'Method'
    },
    {
        title: 'Which of the following is not a built-in JavaScript function:',
        choices: ['parseInt', 'parseFloat', 'escape', 'read'],
        answer: 'read'
    }
]

let main = document.getElementById('main');
let content = document.getElementById('content');
let title = document.getElementById('quiz-title');
let instr = document.getElementById('instructions');
let btn = document.getElementById('start-button');
let time = document.getElementById('time');
let highScoreTrigger = document.getElementById('high-scores');
let modalBody = document.getElementById('modal-body');
let clear = document.getElementById('clear');
let h2;
let btns;
let newElement;
let correct;
let questionCounter;
let seconds;
let retry;
let score;
let form;
let initials;
let highScores = [];
let highScoreInitials = [];
let storedHighScores;
let storedInitials;
let localInitials = [];
let localScores = [];

const init = () => {
    storedHighScores = JSON.parse(localStorage.getItem("localScores"));
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
    storedInitials = JSON.parse(localStorage.getItem("localInitials"));
    if (storedInitials !== null) {
        highScoreInitials = storedInitials;
    }
    console.log(highScores);
    console.log(highScoreInitials);
}

const timer = () => {
    if (!isNaN(seconds)){
        time.textContent = seconds;
        seconds--;
        if (seconds < 0) {
            clearInterval(timerStart);
        }
        console.log(seconds);
    }
}

let timerStart = setInterval(timer, 1000);

const timerPause = () => {
    clearInterval(timerStart);
}

const startQuiz = () => {
    title.style.display = 'none';
    instr.style.display = 'none';
    btn.style.display = 'none';
    questionCounter = 0;
    newElement = document.createElement('h2');
    newElement.textContent = questions[questionCounter].title;
    newElement.id = questionCounter;
    content.appendChild(newElement);
    questions[questionCounter].choices.forEach(function(choice) {
        newElement = document.createElement('button');
        newElement.textContent = choice;
        newElement.setAttribute('class', 'btn btn-success btn-block');
        newElement.id = choice;
        content.appendChild(newElement);
    })
    seconds = 75;
    timerStart;
};

const advanceQuestion = () => {
    if (correct === false) {
        document.getElementById(`${questionCounter}-incorrect`).style.display = 'none';
        seconds -= 10;
    } else {
        document.getElementById(`${questionCounter}-correct`).style.display = 'none';
    }
    if (seconds < 0) {
        questionCounter = 4;
    }
    questionCounter++;
    if (questionCounter < 5) {
        timerStart = setInterval(timer, 1000);
        newElement = document.createElement('h2');
        newElement.textContent = questions[questionCounter].title;
        newElement.id = questionCounter;
        content.appendChild(newElement);
        questions[questionCounter].choices.forEach(function(choice) {
            newElement = document.createElement('button');
            newElement.textContent = choice;
            newElement.setAttribute('class', 'btn btn-success btn-block');
            newElement.id = choice;
            content.appendChild(newElement);
        })
    } else if (seconds >= 0) {
        time.textContent = seconds;
        score = seconds;
        newElement = document.createElement('h2');
        newElement.textContent = 'Good job!';
        newElement.id = 'good';
        content.appendChild(newElement);
        newElement = document.createElement('p');
        newElement.textContent = `Your score is ${time.innerHTML}`;
        newElement.id = 'score-display';
        content.appendChild(newElement);
        newElement = document.createElement('form');
        newElement.setAttribute('method', 'POST');
        newElement.id = 'score-form';
        content.appendChild(newElement);
        form = document.getElementById('score-form');
        newElement = document.createElement('label');
        newElement.setAttribute('for', 'initials');
        newElement.textContent = 'Your initials here:';
        form.appendChild(newElement);
        newElement = document.createElement('input');
        newElement.setAttribute('type', 'text');
        newElement.setAttribute('name', 'initials');
        newElement.id = 'initials';
        form.appendChild(newElement);
        initials = document.getElementById('initials');
        newElement = document.createElement('button');
        newElement.textContent = 'Retry';
        newElement.setAttribute('class', 'btn btn-success btn-block');
        newElement.id = 'retry';
        content.appendChild(newElement);
        questionCounter = 0;
        retry = document.getElementById('retry');
        form.onsubmit = addScore;
        retry.setAttribute("onclick","document.location.reload()") ;
    } else {
        newElement = document.createElement('h2');
        newElement.textContent = 'Too bad, you ran out of time. Try again!';
        newElement.id = 'fail';
        content.appendChild(newElement);
        newElement = document.createElement('button');
        newElement.textContent = 'Retry';
        newElement.setAttribute('class', 'btn btn-success btn-block');
        newElement.id = 'retry';
        content.appendChild(newElement);
        questionCounter = 0;
        retry = document.getElementById('retry');
        retry.setAttribute("onclick","document.location.reload()");
    }
    
}

const checkAnswer = (Event) => {
    if (questions[questionCounter].choices.indexOf(Event.target.id) == -1) {
        return;
    } else {
        if (Event.target.id === questions[questionCounter].answer) {
            newElement = document.createElement('h4');
            newElement.textContent = 'Correct!';
            newElement.id = `${questionCounter}-correct`;
            content.appendChild(newElement);
            correct = true;
        } else {
            newElement = document.createElement('h4');
            newElement.textContent = 'Incorrect';
            newElement.id = `${questionCounter}-incorrect`;
            content.appendChild(newElement);
            correct = false;
        }
        h2 = document.getElementById(questionCounter)
        h2.style.display = 'none';
        for (let i = 0; i < questions[questionCounter].choices.length; i++) {
            btns = document.getElementById(questions[questionCounter].choices[i]);
            btns.style.display = 'none';
        }
        console.log(seconds);

        timerPause();
        
        setTimeout(advanceQuestion, 1000);
    }
}

const addScore = (Event) => {
    Event.preventDefault();

    initialsToStore = initials.value.trim();
    if (initialsToStore === '') {
        return;
    }
    form.style.display = 'none';

    highScoreInitials.push(initialsToStore);
    highScores.push(score);

    localStorage.setItem("localInitials", JSON.stringify(highScoreInitials));
    localStorage.setItem("localScores", JSON.stringify(highScores));
}

const writeToModal = () => {
    if (highScoreInitials.length === 0) {
        return;
    } else {
        for (let i = 0; i < highScoreInitials.length; i++) {
            newElement = document.createElement('div');
            newElement.setAttribute('class', 'modal-divs');
            newElement.id = `modal-div-${i}`;
            modalBody.appendChild(newElement);
            newElement = document.createElement('p');
            newElement.textContent = `${highScoreInitials[i]} ${highScores[i]}`;
            document.getElementById(`modal-div-${i}`).appendChild(newElement);
        }
    }
}

const clearScores = () => {
    if (highScoreInitials.length === 0) {
        return;
    } else {
        highScoreInitials = [];
        highScores = [];
        localStorage.setItem("localInitials", JSON.stringify(highScoreInitials));
        localStorage.setItem("localScores", JSON.stringify(highScores));
        for (let i = 0; i < document.getElementsByClassName('modal-divs').length; i++) {
            document.getElementsByClassName('modal-divs')[i].style.display = 'none';
        }
    }
}

init();

btn.onclick = startQuiz;
document.onclick = checkAnswer;
highScoreTrigger.onclick = writeToModal;
clear.onclick = clearScores;