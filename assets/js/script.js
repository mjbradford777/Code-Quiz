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
let newElement;
let questionCounter;

const startQuiz = () => {
    title.style.display = 'none';
    instr.style.display = 'none';
    btn.style.display = 'none';
    newElement = document.createElement('h2');
    newElement.textContent = questions[0].title;
    content.appendChild(newElement);
    questions[0].choices.forEach(function(choice) {
        newElement = document.createElement('button');
        newElement.textContent = `${questions[0].choices.indexOf(choice) + 1}. ${choice}`;
        newElement.setAttribute('class', 'btn btn-success btn-block');
        content.appendChild(newElement);
    })
};

btn.onclick = startQuiz;