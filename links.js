// ссылка openserver
"https://ospanel.io"
// ссылка на firebase
"https://firebase.google.com/?hl=ru"

//обработчик событий который отслеживает загрузку контента
document.addEventListener("DOMContentLoaded", () => {
  'use strict';
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');
  const sendBtn = document.querySelector('#send');

  //объект с вопросами и ответами
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          id: 1,
          title: 'Стандарт',
          imgUrl: './image/burger.png'
        },
        {
          id: 2,
          title: 'Черный',
          imgUrl: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          id: 3,
          title: 'Курица',
          imgUrl: './image/chickenMeat.png'
        },
        {
          id: 4,
          title: 'Говядина',
          imgUrl: './image/beefMeat.png'
        },
        {
          id: 5,
          title: 'Свинина',
          imgUrl: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          id: 6,
          title: 'Помидор',
          imgUrl: './image/tomato.png'
        },
        {
          id: 7,
          title: 'Огурец',
          imgUrl: './image/cucumber.png'
        },
        {
          id: 8,
          title: 'Салат',
          imgUrl: './image/salad.png'
        },
        {
          id: 9,
          title: 'Лук',
          imgUrl: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          id: 10,
          title: 'Чесночный',
          imgUrl: './image/sauce1.png'
        },
        {
          id: 11,
          title: 'Томатный',
          imgUrl: './image/sauce2.png'
        },
        {
          id: 12,
          title: 'Горчичный',
          imgUrl: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];

  //обраотчики событий открытия и закрытия модального окна
  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.remove('d-block');
  });

  //функция запуска квиза
  const playTest = () => {
    
    //объект с ответами пользователя
    const userAnswers = [];

    //переменная с номером вопроса
    let numberOfQuestion = 0;

    //функция рендеринга ответов
    const renderAnswers = () => {

      questions[numberOfQuestion].answers.forEach((answer) => { // передать в () параметры для метода и функцию 

        const answerItem = document.createElement('div'); //создать div
        answerItem.classList.add("answers-item", "d-flex", "flex-column"); //добавить классы созданному div 
        answerItem.innerHTML = `
           <input type="${questions[numberOfQuestion].type}" id="${answer.id}" name="answer" class="d-none" value="${answer.title}">
           <label for="${answer.id}" class="d-flex flex-column justify-content-between">
             <img class="answerImg" src="${answer.imgUrl}" alt="answer">
             <span>${answer.title}</span>
           </label>
           `;
        formAnswers.appendChild(answerItem); //добавить в тег с классом formAnswers div answerItem
        
      });

    };

    const renderQuestions = (indexQuestion) => {

      formAnswers.innerHTML = '';

      if (numberOfQuestion >= 0 && numberOfQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        nextBtn.classList.remove("d-none");
        prevBtn.classList.remove("d-none");
        sendBtn.classList.add("d-none");
      }

      if (numberOfQuestion === 0) {
        prevBtn.classList.add("d-none");
      }

      if (numberOfQuestion === questions.length) {
        nextBtn.classList.add("d-none");
        prevBtn.classList.add("d-none");
        sendBtn.classList.remove("d-none");

        formAnswers.innerHTML = `
        <div><p>Спасибо за ответы! Введите номер телефона для связи:</p>
        <input type="phone" id="phoneNumber" required>
        </div>
        `;
      }

      if (numberOfQuestion === questions.length + 1) {
        formAnswers.textContent = "Спасибо, что прошли тест! Менеджер свяжется с Вами в ближайшее время.";
        sendBtn.classList.add("d-none");
        setTimeout(() => {
          modalBlock.classList.remove('d-block');
        }, 3000);
      }

    };

    //запуск фунуции рендеринга
    renderQuestions(numberOfQuestion);

    const saveAnswers = () => {
    const obj = {};
    const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === "phoneNumber");

    inputs.forEach((input, index) => {
      if (numberOfQuestion >= 0 && numberOfQuestion <= questions.length - 1) {
        obj[`${index}_${questions[numberOfQuestion].question}`] = input.value;
      }
      
      if (numberOfQuestion === questions.length) {
        obj[`Номер телефона`] = input.value;
      }

       });

    userAnswers.push(obj);
    };

    //обработчики событий нажания на кнопки
    prevBtn.onclick = () => {
      numberOfQuestion--;
      renderQuestions(numberOfQuestion);
    };

    nextBtn.onclick = () => {
      saveAnswers();
      numberOfQuestion++;
      renderQuestions(numberOfQuestion);
    };

    sendBtn.onclick = () => {
      saveAnswers();
      numberOfQuestion++;
      renderQuestions(numberOfQuestion);
      console.log(userAnswers);
      
    };

  };
});

