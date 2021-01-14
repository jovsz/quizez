"use strict";

var questions = [];
var score = 0;

function getCategory() {
  var url = 'https://opentdb.com/api_category.php';
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (categoryData) {
    return printCategory(categoryData.trivia_categories);
  });
}

function getQuestions() {
  var bool = false;
  var totalQuestions = document.getElementById('totalQuestions').value;
  var category = document.getElementById('category').value;
  var difficult = document.getElementById('difficult').value;

  if (category == '') {
    alert('Please select a Categorie');
    return bool = true;
  }

  if (difficult == '') {
    alert('Please select a Difficult');
    return bool = true;
  }

  if (totalQuestions == '') {
    alert('Please select an amount of questions');
    return bool = true;
  }

  if (bool === false) {
    //alert('traemos las preguntas de la api');
    var url = "https://opentdb.com/api.php?amount=".concat(totalQuestions, "&category=").concat(category, "&difficulty=").concat(difficult);
    fetch(url) //devolver la respues en formato json
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      return printData(data.results);
    });
  }
}

function printCategory(categoryData) {
  var container = document.getElementById('category');
  categoryData.forEach(function (element) {
    container.innerHTML += "<option value=\"".concat(element.id, "\">").concat(element.name, "</option>");
  });
}

function printData(data) {
  document.getElementById('quiz-main').classList.toggle('hide');
  var container = document.getElementById('questions-container');
  var html = '';

  for (var i = 0; i < data.length; i++) {
    var indice = Math.floor(Math.random() * data[i].incorrect_answers.length);
    questions.push({
      question: data[i].question,
      answer: data[i].correct_answer
    });
    data[i].incorrect_answers.splice(indice, 0, data[i].correct_answer);

    if (data[i].incorrect_answers.length > 2) {
      html += "<h5 id=\"question\"}\">".concat(i + 1, ".-").concat(data[i].question, "</h5>\n                <select id=\"answer-").concat(i, "\"  class=\"form-select\" aria-label=\"Default select example\">\n                    <option selected value=\"\"></option>\n                    <option value= \"").concat(data[i].incorrect_answers[0], "\">").concat(data[i].incorrect_answers[0], "</option>\n                    <option value= \"").concat(data[i].incorrect_answers[1], "\">").concat(data[i].incorrect_answers[1], "</option>\n                    <option value= \"").concat(data[i].incorrect_answers[2], "\">").concat(data[i].incorrect_answers[2], "</option>\n                    <option value= \"").concat(data[i].incorrect_answers[3], "\">").concat(data[i].incorrect_answers[3], "</option>\n                </select>\n                ");
    } else {
      html += "<h5 id=\"question\"}\">".concat(i + 1, ".-").concat(data[i].question, "</h5>\n                <select id=\"answer-").concat(i, "\" class=\"form-select\" aria-label=\"Default select example\">\n                    <option selected value=\"\"></option>\n                    <option value= \"").concat(data[i].incorrect_answers[0], "\">").concat(data[i].incorrect_answers[0], "</option>\n                    <option value= \"").concat(data[i].incorrect_answers[1], "\">").concat(data[i].incorrect_answers[1], "</option>\n                </select>");
    }
  }

  html += "<button onclick=\"checkResult()\" type=\"submit\" class=\"btn btn-primary\">Send Answers</button>";
  container.innerHTML = html;
}

function checkResult() {
  var score = 0;
  var container = document.getElementById('finalScore');

  for (var i = 0; i < questions.length; i++) {
    var result = document.getElementById("answer-".concat(i)).value;

    if (result == '') {
      alert('Please choose your answer to question: ' + (i + 1)); //document.getElementById(`answer-${i}`).focus;
    } else {
      if (result === questions[i].answer) {
        score += 1;
      }
    }
  }

  var finalScore = score * 100 / questions.length;
  console.log(finalScore);

  if (finalScore >= 80 && finalScore <= 100) {
    finalScore = 80;
  }

  if (finalScore >= 60 && finalScore < 80) {
    finalScore = 60;
  }

  if (finalScore < 50) {
    finalScore = 50;
  }

  container.innerHTML = "\n                            <p class=\"final-".concat(finalScore, "\">Your final score is ").concat(score, " of ").concat(questions.length, "</p>\n                            <div class=\"buttons\">\n                                <button type=\"submit\" onclick=\"document.location.reload(true)\" class=\"btn btn-primary\">Select other categorie</button>\n                            </div> \n                        ");
}

function resetQuestions() {
  document.querySelectorAll('option').reset;
}

function resetResult() {
  var container = document.getElementById('finalScore');
  container.innerHTML = '';
}

getCategory();