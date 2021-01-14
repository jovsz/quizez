let questions = [];
let score = 0;

function getCategory() {
    const url = 'https://opentdb.com/api_category.php';

    fetch(url)
        .then(response => response.json())
        .then((categoryData) => printCategory(categoryData.trivia_categories));
}

function getQuestions() {
    let bool = false;
    const totalQuestions = document.getElementById('totalQuestions').value;
    const category = document.getElementById('category').value;
    const difficult = document.getElementById('difficult').value;

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
        const url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficult}`;

        fetch(url)
            //devolver la respues en formato json
            .then(response => response.json())
            .then((data) => printData(data.results));
    }

}

function printCategory(categoryData) {
    const container = document.getElementById('category');

    categoryData.forEach(element => {
        container.innerHTML += `<option value="${element.id}">${element.name}</option>`;
    });
}


function printData(data) {
    document.getElementById('quiz-main').classList.toggle('hide');
    const container = document.getElementById('questions-container');
    let html = '';



    for (let i = 0; i < data.length; i++) {
        var indice = Math.floor(Math.random() * data[i].incorrect_answers.length);
        questions.push({ question: data[i].question, answer: data[i].correct_answer });
        data[i].incorrect_answers.splice(indice, 0, data[i].correct_answer);

        if (data[i].incorrect_answers.length > 2) {

            html += `<h5 id="question"}">${i+1}.-${data[i].question}</h5>
                <select id="answer-${i}"  class="form-select" aria-label="Default select example">
                    <option selected value=""></option>
                    <option value= "${data[i].incorrect_answers[0]}">${data[i].incorrect_answers[0]}</option>
                    <option value= "${data[i].incorrect_answers[1]}">${data[i].incorrect_answers[1]}</option>
                    <option value= "${data[i].incorrect_answers[2]}">${data[i].incorrect_answers[2]}</option>
                    <option value= "${data[i].incorrect_answers[3]}">${data[i].incorrect_answers[3]}</option>
                </select>
                `;
        } else {
            html += `<h5 id="question"}">${i+1}.-${data[i].question}</h5>
                <select id="answer-${i}" class="form-select" aria-label="Default select example">
                    <option selected value=""></option>
                    <option value= "${data[i].incorrect_answers[0]}">${data[i].incorrect_answers[0]}</option>
                    <option value= "${data[i].incorrect_answers[1]}">${data[i].incorrect_answers[1]}</option>
                </select>`;

        }
    }
    html += `<button onclick="checkResult()" type="submit" class="btn btn-primary">Send Answers</button>`
    container.innerHTML = html;

}


function checkResult() {
    let score = 0;
    const container = document.getElementById('finalScore');
    for (let i = 0; i < questions.length; i++) {
        const result = document.getElementById(`answer-${i}`).value;

        if (result == '') {
            alert('Please choose your answer to question: ' + (i + 1));
            //document.getElementById(`answer-${i}`).focus;

        } else {
            if (result === questions[i].answer) {
                score += 1;

            }
        }

    }
    let finalScore = ((score * 100) / questions.length);
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
    container.innerHTML = `
                            <p class="final-${finalScore}">Your final score is ${score} of ${questions.length}</p>
                            <div class="buttons">
                                <button type="submit" onclick="document.location.reload(true)" class="btn btn-primary">Select other categorie</button>
                            </div> 
                        `;

}

function resetQuestions() {
    document.querySelectorAll('option').reset;
}

function resetResult() {
    const container = document.getElementById('finalScore');
    container.innerHTML = '';
}

getCategory();