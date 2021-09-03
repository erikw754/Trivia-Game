let questionsArray = [];
let currentQuestion = {};
let randomIndex = 0;
let question;
let categoryId;
let categoryTitle = "";
let correctAnswer;
let score = 0;
let home = document.querySelector(".home");
let label = document.querySelector("label");
let category = document.querySelector("#category");
let scoreboard = document.getElementById("scoreboard");
let answerForm = document.getElementById("text");
let submitButton = document.getElementById("submit");
let questionParagraph = document.getElementById("questionParagraph");
let message = document.getElementById("message");
let playAgainButton = document.getElementById("replay");
let bigImage = document.querySelector(".big");
let smallImage = document.querySelector(".small");

function fetchGameData() {
  fetch(`https://jservice.io/api/random`)
    .then((response) => response.json())
    .then((data) => {
      question = data[0];
      categoryId = question.category_id;
      fetch(`https://jservice.io/api/category?id=${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
          categoryTitle = data.title;
          questionsArray = data.clues;
          showQuestion();
        });
    });
}

function start() {
  home.style.display = "none";
  document.querySelector(".hidden").style.display = "block";
  fetchGameData();
}

function backToStart() {
  home.style.display = "block";
  document.querySelector(".hidden").style.display = "none";
  smallImage.style.display = "none";
  playAgainButton.style.display = "none";
  questionParagraph.style.display = "block";
  label.style.display = "block";
  category.style.display = "block";
  answerForm.style.display = "block";
  submitButton.style.display = "block";
  answerForm.value = "";
  message.innerHTML = "";
  showQuestion();
}

function showQuestion() {
  let randomQuestion = Math.floor(Math.random() * (questionsArray.length - 1));
  randomIndex = randomQuestion;
  currentQuestion = questionsArray[randomIndex];
  correctAnswer = currentQuestion.answer;
  questionsArray.splice(randomIndex, 1);
  category.innerHTML = `<strong>Category: </strong> ${categoryTitle}`;
  questionParagraph.innerHTML =
    "<b>Question: </b> " + currentQuestion.question + "...";
}

function matchAnswer() {
  return correctAnswer.toLowerCase() === answerForm.value.toLowerCase();
}

function submitAnswer() {
  if (matchAnswer()) {
    message.innerHTML = "<strong>That's right!</strong>";
    score += 1;
    scoreboard.innerHTML = "<b>Score: </b> " + score;
    answerForm.value = "";
    bigImage.style.display = "block";
    showQuestion();
  } else {
    message.innerHTML = `<strong>You are wrong.</strong><br> Correct Answer: ${correctAnswer}`;
    score = 0;
    scoreboard.innerHTML = "<b>Score: </b> " + score;
    smallImage.style.display = "block";
    bigImage.style.display = "none";
    label.innerHTML = "";
    playAgain();
    start();
  }
}

function playAgain() {
  if (score === 0) {
    questionParagraph.style.display = "none";
    document.querySelector("#category").style.display = "none";
    answerForm.style.display = "none";
    submitButton.style.display = "none";
    playAgainButton.style.display = "block";
    playAgainButton.addEventListener("click", backToStart);
  }
}

document.querySelector(".start").addEventListener("click", start);
submitButton.addEventListener("click", submitAnswer);
answerForm.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.code === "Enter") {
    submitButton.click();
  }
});