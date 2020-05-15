// ссылка openserver
"https://ospanel.io"
// ссылка на firebase
"https://firebase.google.com/?hl=ru"


document.addEventListener("DOMContentLoaded", () => {
    'use strict';
    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const firstAnswerImg = "./image/burger.png";
    const secondAnswerImg = "./image/burgerBlack.png";
    const firstAnswerTitle = "Стандарт";
    const secondAnswerTitle = "Черный";



    btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener("click", () => {
        modalBlock.remove('d-block');
    });

    const playTest = () => {
        const renderQuestions = () => {
            questionTitle.textContent = "Какой бургер вы хотите?";
            
            formAnswers.innerHTML = 
                `<div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${firstAnswerImg}" alt="burger">
                  <span>${firstAnswerTitle}</span>
                </label>
              </div>   
              <div class="answers-item d-flex justify-content-center">
                <input type="radio" id="answerItem2" name="answer" class="d-none">
                <label for="answerItem2" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${secondAnswerImg}" alt="burger">
                  <span>${secondAnswerTitle}</span>
                </label>
              </div>
              `;
        };
        renderQuestions();
    }
})