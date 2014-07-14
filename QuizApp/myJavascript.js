//Shuffle function curtiousy of google. <3
function shuffle(o) { //v1.0 Shuffle (Only shuffles questions atm.)
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var quiz = [{
    "question": "What is part of a database that holds only one type of information?",
    "choices": ["Report", "Record", "Field","File"],
    "correct": "Field"
    //A record is a row in a database whereas a field is a column. So a column holds only one type of info like name.
}, {
    "question": "'OS' computer abbreviation usually means ?",
    "choices": ["Order of Significance", "Open Software", "Operating System","Optical Sensor"],
    "correct": "Operating System"
    //It is a platform to execute any program, with6out Operating System we cannot run any software.
}, {
    "question": "'.MOV' extension refers usually to what kind of file?",
    "choices": ["Image File", "Movie File", "Audio File","MC Office Document"],
    "correct": "Movie File"
    //There are several type movie file format as , .mpeg, .mov,.avi,.3gp,.mp4, etc
}, {
    "question": "The most common format for a home video recorder is VHS. VHS stands for...?",
    "choices": ["Video Home System", "Very high speed", "Video horizontal standard", "Voltage house standard"],
    "correct": "Video Home System"
    //VHS originally stood for Vertical Helical Scan, but now means Video Home System.
}, {
    "question": "'.INI' extension refers usually to what kind of file?",
    "choices": ["Image File", "System File", "Hypertext File","Image Color Matching Profile File"],
    "correct": "System File"
    //.INI files are a format in which OS and system files are stored, that are required to boot up your computer.
}];
//--------------------------------------------------------------------------------------------------------//
//Shuffle Area
newArray = shuffle(quiz,choices);
//--------------------------------------------------------------------------------------------------------//

    // define elements
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");
//--------------------------------------------------------------------------------------------------------//
// progress bar creation here

//--------------------------------------------------------------------------------------------------------//
    // initiates vars
var currentQuestion = 0,
  score = 0,
  askingQuestion = true;
   
    // shortcut for document.getElementById
function $(id) { 
    return document.getElementById(id);
}

function askQuestion() {
    var choices = quiz[currentQuestion].choices,
      choicesHtml = "";

    // loop through choices, and create radio buttons
    for (var i = 0; i < choices.length; i++) {
        choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
          "' id='choice" + (i + 1) +
          "' value='" + choices[i] + "'>" +
          " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
    }

    // load the question
    questionContainer.textContent =(currentQuestion + 1) + ". " +
      quiz[currentQuestion].question;

    // load the choices
    choicesContainer.innerHTML = choicesHtml;

    // setup for the first time
    if (currentQuestion === 0) {
        scoreContainer.textContent = "Score: 0 right answers out of " +
          quiz.length + " questions.";
        submitBtn.textContent = "Submit Answer";
    }
}


function checkAnswer() {
     // are we asking a question, or proceeding to next question?
    if (askingQuestion) {
        submitBtn.textContent = "Next Question";
        askingQuestion = false;

     // determine which radio button they clicked
        var userpick,
          correctIndex,
          radio = document.getElementsByName("quiz" + currentQuestion);
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked) { // if this radio button is checked
                userpick = radio[i].value;
            }

      // get index of correct answer
            if (radio[i].value == quiz[currentQuestion].correct) {
                correctIndex = i;
            }
        }

      // setup if they got it right, or wrong
        var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
        labelStyle.fontWeight = "bold";
        if (userpick == quiz[currentQuestion].correct) {
            score++;
            labelStyle.color = "green";
            alert('Correct');
        } else {
            labelStyle.color = "red";
            alert('Wrong');
        }

        scoreContainer.textContent = "Score: " + score + " right answers out of " +
          quiz.length + " questions.";
    } else { // moves to next question
      // setting up so user can ask a question
        askingQuestion = true;
      // change button text back to "Submit Answer"
        submitBtn.textContent = "Submit Answer";
      // if we're not on last question, increase question number
        if (currentQuestion < quiz.length - 1) {
            currentQuestion++;
            askQuestion();
        } else {
            showFinalResults();
        }
    }
}

function showFinalResults() {
    content.innerHTML = "<h2>You've completed the quiz!</h2>" +
      "<h2>Below are your results:</h2>" +
      "<h2>" + score + " out of " + quiz.length + " questions, " +
      Math.round(score / quiz.length * 100) + "%<h2>";
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);