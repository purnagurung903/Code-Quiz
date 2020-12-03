var body = document.body;
//create html page via DOM Methods

var myh4a = document.createElement("h4");
var myh4b = document.createElement("h4");
var myquiz = document.createElement("div");
var myh1 = document.createElement("h1");
var myh2 = document.createElement("h2");
//getting element by id
var myButton = document.getElementById("btn");


//set the text to relevent element
myh4a.textContent="View Highscore";
myh4b.textContent="Time:0";
myh1.textContent="Javascript Quiz Game";
myh2.textContent="Click Start button to Play";
//myButton.textContent="start";
//var myButton = document.createTextNode("Start!")

//append all of elements

body.appendChild(myh4a);
body.appendChild(myh4b);
body.appendChild(myquiz);
myquiz.appendChild(myh1);
myquiz.appendChild(myh2);
body.appendChild(myButton);



//style all of the element

myh4a.setAttribute("style", "margin: auto; width: 100%;text-align:left; color: blueviolet;");
//creating id in myh4b "timeleft"
myh4b.setAttribute("id", "timeLeft")
myh4b.setAttribute("style", "margin: auto;color: blueviolet; width: 100%;text-align:right;");
myh1.setAttribute("style", "margin: 40; width: 100%;text-align:center;");
//creating id in myh1 quizbody"
//myh2.setAttribute("id","quizBody")
//myh2.setAttribute("style", "margin: auto; padding:10px;font-size:25px width: 100%;text-align:center;");
myquiz.setAttribute("id","quizBody")
myquiz.setAttribute("style", "margin: auto; padding:10px;font-size:25px width: 100%;text-align:center;");

//array of the quiz ques and available answer choices and correct answers

var questions = [{
  title: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        choices: ["last( )", "put( )", "push( )", "pop( )"],
        answer: "push( )"
},
{
  title: "Which of the following function of String object combines the text of two strings and returns a new string?",
        choices: ["add( )", "concat( )", " merge( )", "append( )"],
        answer: "concat( )"
},
{
  title: "how do we alert in js?",
  choices:["alert()", "alert[]", "alert{}", "alert<>"],
  answer:"alert()"
},
{
  title: "how can you comment in js?",
  choices:["//", "<>", "!!", "()"],
  answer:"//"
},
{
  title:"Which of the following function of an array object adds one or more elements to the front of an array and returns the new length of the array?",
  choices: ["unshift( )", "sort( )", "splice( )", "toString( )"],
  answer: "unshift( )"

}
]

//setting the numerical variables for the functions score and timers

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;
//.start the countdown timer once user click the start button
 
 

function start(){
  timeLeft = 75;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  
  var timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft === 0) {
        clearInterval(timer);
        endGame(); 
    }
  }, 1000);

  next();
}

//stop the timer to end the game 
function endGame() {
  clearInterval(timer);

  var quizContent = `
  <h2>Game over!</h2>
  <h3>You got a ` + score +  ` /100!</h3>
  <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
  <input type="text" id="name" placeholder="First name"> 
  <button onclick="setScore()">Set score!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName",  document.getElementById('name').value);
  getScore();
}


function getScore() {
  var quizContent = `
  <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
  <h1>` + localStorage.getItem("highscore") + `</h1><br> 
  
  <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
  
  `;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName",  "");

  resetGame();
}

//reset the game 
function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
  <h1>
      JavaScript Quiz!
  </h1>
  <h3>
      Click to play!   
  </h3>
  <button onclick="start()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
  timeLeft -= 15; 
  next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
  score += 20;
  next();
}

//loops through the questions 
function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
      endGame();
      return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

  for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
      var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
      buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
      if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
          buttonCode = buttonCode.replace("[ANS]", "correct()");
      } else {
          buttonCode = buttonCode.replace("[ANS]", "incorrect()");
      }
      quizContent += buttonCode
  }


  document.getElementById("quizBody").innerHTML = quizContent;
}





