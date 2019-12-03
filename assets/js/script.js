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
let h2;
let btns;
let newElement;
let correct;
let questionCounter;
let seconds;
let retry;

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
        newElement = document.createElement('h2');
        newElement.textContent = 'Good job!';
        newElement.id = 'good';
        content.appendChild(newElement);
        newElement = document.createElement('p');
        newElement.textContent = `Your score is ${time.innerHTML}`;
        newElement.id = 'score-display';
        content.appendChild(newElement);
        newElement = document.createElement('button');
        newElement.textContent = 'Retry';
        newElement.setAttribute('class', 'btn btn-success btn-block');
        newElement.id = 'retry';
        content.appendChild(newElement);
        questionCounter = 0;
        retry = document.getElementById('retry');
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

btn.onclick = startQuiz;
document.onclick = checkAnswer;