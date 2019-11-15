var testEl = document.getElementById("begintest")
var timerEl = document.getElementById("timer")
var feedbackEl = document.getElementById("feedback")
var beginButton = document.getElementById("begin")
var highScoresLink = document.getElementById("highscores")
var time = 75
var questionNumber = 0
var finalScore = 0
var highScoresArray = []
if (localStorage.getItem("highscores") !== undefined) {
    highScoresArray = JSON.parse(localStorage.getItem("highscores"))
}

var questionArray = [
    {
        title: "Name the functional group common to all alcohols.",
        choices: ["carboxylic acid", "hydroxide", "amine", "alkane"],
        answer: "hydroxide"
    },
    {
        title: "In what year did the Norman conquest of England take place?",
        choices: ["1066", "1204", "793", "1453"],
        answer: "1066"
    },
    {
        title: "Which of the following is not a way to create an iterating function?",
        choices: ["for statement", "while statement", "recursive function calls", "arrays"],
        answer: "arrays"
    },
    {
        title: "In which country could one find Jeju Island?",
        choices: ["Japan", "Singapore", "Korea", "India"],
        answer: "Korea"
    },
    {
        title: "Please translate the following Latin phrase into English: 'sit tibi terra levis'",
        choices: ["May the gods smile upon you", "There is a day for every man", "The earth abounds with riches", "May the ground lie lightly upon you"],
        answer: "May the ground lie lightly upon you"
    },
    {
        title: "Which French king was responsible for the conquest of the Angevin Empire's continental holdings?",
        choices: ["Louis VI", "Philip II", "Charles III", "Louis XVI"],
        answer: "Philip II"
    },
    {
        title: "What is the meaning of the following Japanese verb: hairu",
        choices: ["to enter", "to eat", "to run", "to sleep"],
        answer: "to enter"
    },
    {
        title: "What is the airspeed velocity of an unladen swallow?",
        choices: ["10 m/s", "5 m/s", "3 m/s", "Not enough information"],
        answer: "Not enough information"
    },
    {
        title: "In what battle did Roland, paladin of Charlemagne, die?",
        choices: ["Hastings", "Allia", "Bouvines", "Roncevaux"],
        answer: "Roncevaux"
    },
    {
        title: "Which of the following is not an ingredient in a bowl of Spaghetti alla Carbonara?",
        choices: ["eggs", "tomatoes", "spaghetti", "pancetta"],
        answer: "tomatoes"
    },
    {
        title: "In the popular MOBA League of Legends, which of the following items increases the armor stat of your champion?",
        choices: ["Blade of the Ruined King", "Stat-Stick of Stoicism", "Zhonya's Hourglass", "Banshee's Veil"],
        answer: "Zhonya's Hourglass"
    },
    {
        title: "Which of the following paintings was created during the Baroque period?",
        choices: ["The Calling of St Matthew by Caravaggio", "The Last Supper by Leonardo da Vinci", "The Scream by Edward Munch", "The Starry Night by Vincent van Gogh"],
        answer: "The Calling of St Matthew by Caravaggio"
    },
    {
        title: "Which of the following philosophies was created by Zeno?",
        choices: ["Epicureanism", "Solipsism", "Stoicism", "Socratism"],
        answer: "Stoicism"
    },
    {
        title: "Who was the last king of Rome?",
        choices: ["Tarquin the Great", "Tarquinius Superbus", "Numa Pompelius", "Marcus Antius"],
        answer: "Tarquinius Superbus"
    },
    {
        title: "You've got some updog on your shirt",
        choices: ["What's updog?", "Excuse me?", "Could you tell me what this updog is?", "Say again?"],
        answer: "What's updog?"
    },
    {
        title: "Which of the following is a characteristic common to the Indian accent and the Texas accent?",
        choices: ["Pin-pen merger", "Retroflexion", "Vocal Narrowing", "Cot-Caught merger"],
        answer: "Retroflexion"
    },
    {
        title: "Where could one find an aglet?",
        choices: ["In a house", "Underground", "In a church", "On your shoes"],
        answer: "On your shoes"
    },
    {
        title: "Which of the following is not a noble house of Westeros?",
        choices: ["Angers", "Seaworth", "Bolton", "Dayne"],
        answer: "Angers"
    },
    {
        title: "Which of the following is the correct way to pronounce 'GIF'?",
        choices: ["GIF", "GIF", "GIF", "GIF"],
        answer: "GIF"
    },
    {
        title: "Final Question: What is my last name? Don't cheat >:(",
        choices: ["Suh", "Song", "Sun", "Su"],
        answer: "Suh"
    },
  ];

//Running the timer and updating the timer text
function beginTimer() {
    var interval = setInterval(function() {
        //Time's up!
        if (questionNumber === questionArray.length) {
            clearInterval(interval)
        }
        if (time === 0) {
            timerEl.textContent = "Time: " + time
            clearInterval(interval)
            alert("Time's up!")
            endTest()
        }
        //Decrement time and update timer
        else {
            time--
            timerEl.textContent = "Time: " + time
        }
    }, 1000)
}

function render(x) {
    //Clear the test space
    testEl.innerHTML = ""
    //Create question
    var question = document.createElement("div")
    question.textContent = (questionArray[x].title)
    testEl.appendChild(question)
    //Create answer buttons
    var answersArray = questionArray[x].choices
    for (i of answersArray) {
        var answerButton = document.createElement("button")
        answerButton.textContent = i
        testEl.appendChild(answerButton)
        var space = document.createElement("br")
        testEl.appendChild(space)
    }

}

function endTest() {
    //When time is up or the last question is answered
    finalScore = time
    timerEl.textContent = time
    testEl.textContent = "Your final score is: " + finalScore

    var space = document.createElement("br")
    testEl.appendChild(space)

    var form = document.createElement("form")
    form.textContent = "Please enter your initials"
    testEl.appendChild(form)

    var initials = document.createElement("input")
    form.appendChild(initials)
    
    var submit = document.createElement("input")
    submit.setAttribute("type", "submit")
    form.appendChild(submit)

    feedbackEl.textContent = ""
}

//Button event listeners
testEl.addEventListener("click", function() {

    if (event.target.tagName === "BUTTON") {
        //Starts the quiz
        if (event.target.textContent === "Begin!" || event.target.textContent === "Take the quiz again!") {
            questionNumber = 0
            time = 75
            beginTimer()
            render(questionNumber)
        }
        else if (event.target.textContent === "Clear highscores") {
            highScoresArray = []
            localStorage.setItem("highscores", JSON.stringify(highScoresArray))
            renderScores()
        }
        else {
            var clickedAnswer = event.target.textContent
            var correctAnswer = questionArray[questionNumber].answer        
            if (clickedAnswer === correctAnswer) {
                feedbackEl.textContent = "Correct!"
            }
            else {
                feedbackEl.textContent = "Wrong!"
                //Deducting time for a wrong answer
                if (time > 15) {
                    time = time - 15
                    timerEl.textContent = "Time: " + time
                }
                else {
                    time = 0
                    timerEl.textContent = "Time: " + time
                }
            }
            //Increment questionNumber to render next question
            questionNumber++
            if (questionNumber === questionArray.length) {
                endTest()
            }
            else {
            render(questionNumber)
            }
        }
    }
})


function renderScores() {
    testEl.textContent = ""
    highScoresArray = JSON.parse(localStorage.getItem("highscores"))
    for (i of highScoresArray) {
        var newScore = document.createElement("div")
        newScore.textContent = i.initials + ":   " + i.score
        testEl.appendChild(newScore)
    }
    var returnButton = document.createElement("button")
    returnButton.textContent = "Take the quiz again!"
    testEl.appendChild(returnButton)

    var clearButton = document.createElement("button")
    clearButton.textContent = "Clear highscores"
    testEl.appendChild(clearButton)
}

testEl.addEventListener("submit", function() {
    highScoresArray.push({initials: document.querySelector("input").value, score: finalScore})
    localStorage.setItem("highscores", JSON.stringify(highScoresArray))
    renderScores()
})
