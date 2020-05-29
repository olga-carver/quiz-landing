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
  

    const questions = {
      question: "Какой бургер вы хотите?",
      answers: [
      {title: "Стандарт", imgUrl: "./image/burger.png"},
      {title: "Черный", imgUrl: "./image/burgerBlack.png"}
      ]
    };

    


    btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener("click", () => {
        modalBlock.remove('d-block');
    });

    const playTest = () => {
        
      const renderAnswers = () => {
        questions.answers.forEach((answer) => { // передать в () параметры для метода и функцию 
          const answerItem = document.createElement('div'); //создать div
          answerItem.classList.add("answers-item", "d-flex", "flex-column"); //добавить классы созданному div 
          answerItem.innerHTML = `
           <input type="radio" id="answerItem1" name="answer" class="d-none">
           <label for="answerItem1" class="d-flex flex-column justify-content-between">
             <img class="answerImg" src="${answer.imgUrl}" alt="burger">
             <span>${answer.title}</span>
           </label>
           `;
           formAnswers.appendChild(answerItem); //добавить в тег с классом formAnswers div answerItem
        });
        
      }      
      
      const renderQuestions = () => {
            questionTitle.textContent = `${questions.question}`;
            renderAnswers();            
        };
        renderQuestions();
        
    };
});

