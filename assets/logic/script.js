var timer = 90;
var runningTimer;
var score = 0;
var username = "";
var qNumber;
var finalScore=0;
var MAX_HIGH_SCORES = 7;

var startButton = document.getElementById("startButton");
var qContainer = document.getElementById("questionsContainer");
var qElement = document.getElementById("question");
var answerButtons = document.getElementById("answers");
var countdown = document.getElementById("timerArea");
var scoreArea = document.getElementById("scoreArea");
var imageArea = document.getElementById("image01");

var highScoresButton = document.getElementById("showScoresButton");

//LocalStorage Objects
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//

startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);


alert('Hello Potter Heads!');
alert('this website for you!');
alert('you should have 4 at least to win!')
alert('Let\'s go!');
var fsc=0;
function startGame() {
  startButton.classList.add("hide");
  scoreArea.classList.add("hide");
  imageArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  imageArea.innerHTML="";
  startClock();
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}

function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
	  finalScore++;
	  fsc=finalScore;

	  
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function startClock() {
  countdown.innerHTML = "Time Remaining: " + timer;
  if (timer <= 0) {
    gameOver();
  } else {
    timer -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}


function selectAnswer(e) {
  var selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timer = timer - 10;
	finalScore--;
	fsc=finalScore;
	
    console.log(timer);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}


function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "Finished";
  clearQuestion();
  showResults();
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  timer = 90;
  score = 0;
}

function showResults() {
  //inalScore = timer;
 
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  imageArea.classList.remove("hide");
 scoreArea.innerHTML = `<h5 style="color:white;"> Your score is ${finalScore}!</h5><div id="init"><span style="color:white;">Name:</span> <input type="text" style="color:black;" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  if(finalScore >=5){
  imageArea.innerHTML=`<img src="./assets/images/right.gif">`;
  finalScore=0;
  }
   else if(finalScore < 5){
  imageArea.innerHTML=`<img src="./assets/images/wrong.gif">`;
  finalScore=0;}

  
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function() {
    saveButton.disabled = !username.value;
  });
}


function submitScores(e) {
  var score = {
    score: fsc,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);
//store the scores as json file on local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}

function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");

  scoreArea.innerHTML = `<h2 style="color:white;">High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
  var highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="scoresList" style="color:white;">${score.name} - ${score.score}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}


function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h3 style='color:white;'>Scores have been Cleared</h3>";
  document.getElementById("clearScores").classList.add("hide");
}

var questions = [
  {
    question: "What quidditch position does Harry play?",
    answers: [
      { text: "chaser", correct: false },
      { text: "seeker", correct: true },
      { text: "keeper", correct: false },
      { text: "Beater", correct: false }
    ]
  },
  {
    question: "Where do students board the Hogwarts Express?",
    answers: [
      { text: "Platform 8", correct: false },
      { text: "The Body Section", correct: false },
      { text: "Platform 7 1/2", correct: false },
      { text: "Platform 9 3/4", correct: true }
	  ]
    
  },
  {
    question: "Who is the Headmaster?",
    answers: [
      { text: "Hagrid", correct: false },
      { text: "Mad-Eye Moody", correct: false },
	  { text: "Dumbledore", correct: true },
	  { text: "Voldemort", correct: false }


		  
    ]
  },
  {
    question: 'what is professor McGonagall\'s Animagus?',
    answers: [
      { text: 'Eagle', correct: false },
      { text: 'Horse', correct: false },
      { text: 'Owl', correct: false },
      { text: 'Cat', correct: true }
    ]
  },
  {
    question: "who was the potion\'s professor?",
    answers: [
      { text: "Sevrus Snape", correct: true },
      { text: "Lupin", correct: false },
      { text: "Flitwick", correct: false },
      { text: "Trelawney", correct: false }
    ]
  },
 
  {
    question: "Name Harry Potter's parents.",
    answers: [
      { text: "Lili & James Potter", correct: true },
      { text: "Jini & James Potter", correct: false },
      { text: "Ron & Harmony Potter", correct: false },
      { text: "Snape & Lili Potter", correct: false }
    ]
  },
  {
    question: "Which famous rugby player was Hagrid actor Robbie Coltrane's stunt double?",
    answers: [
      { text: "Hagrid", correct: false },
      { text: "Lucius Malfoy", correct: false },
      { text: "Severius Snape", correct: false },
      { text: "Martin Bayfield", correct: true }
    ]
  },
  {
    question: "Name Ron Weasley\'s pet rat",
    answers: [
      { text: "Molly", correct: false },
      { text: "squesis", correct: false },
      { text: "Scabbers", correct: true },
      { text: "Fred", correct: false }
    ]
  }
];
