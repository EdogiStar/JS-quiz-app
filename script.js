
const questions = [
  {
    id: 1,
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    answer: "Abuja"
  },
  {
    id: 2,
    question: "Which language is used for web styling?",
    options: ["HTML", "Python", "CSS", "C++"],
    answer: "CSS"
  },
  {
    id: 3,
    question: "What does JS stand for in web development?",
    options: ["Java System", "JavaScript", "Just Script", "JSON Style"],
    answer: "JavaScript"
  },
  {
    id: 4,
    question: "What is OOP?",
    options: ["Optional Object Programming", "Object Orientation Programming", "Object Oriented Programming", "Object Orientedly Program"],
    answer: "Object Oriented Programming"
  }
];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const quizContainer = document.getElementById("quiz-container");
const resultDiv = document.getElementById("resultDiv");
let currentIndex = 0;
const userAnswers = [];

nextBtn.addEventListener("click", function(){
  nextQuestion();
})

prevBtn.addEventListener("click", function(){
  prevQuestion();
})

submitBtn.addEventListener("click", function(){
  result()
})

function displayCurrentQuestion(){
  
  questions.forEach((question, index) => {
    const questionIndex = index;
    if(index === currentIndex){
      quizContainer.innerHTML = "";
      const questionDiv = document.createElement("div");
      const questionText = document.createElement("p");
      questionText.textContent = question.question;
      questionDiv.appendChild(questionText);
      question.options.forEach((option, index) => {
        const optionIndex = index;
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("optionBtn");
        if(userAnswers[questionIndex] === optionIndex){
          button.classList.add("selectedOptionBtn");
        }
        button.addEventListener("click", () => {
          selectedOption(optionIndex);
          userAnswers[questionIndex] = optionIndex;
        });
        questionDiv.appendChild(button);
      })
      quizContainer.appendChild(questionDiv);
    }
  })
  
}

function selectedOption(optionIndex){
  const buttons = document.querySelectorAll(".optionBtn")
  buttons.forEach((button, index) => {
    button.classList.remove("selectedOptionBtn");
    if(index === optionIndex){
      button.classList.add("selectedOptionBtn");
    }
  })
}



function nextQuestion(){
  if(currentIndex < questions.length-1){
    currentIndex++;
  }
  displayCurrentQuestion();
}

function prevQuestion(){
  if(currentIndex > 0){
    currentIndex--;
  }
  displayCurrentQuestion();
}

function result() {
  let score = 0;

  questions.forEach((question, questionIndex) => {
    const userSelectedIndex = userAnswers[questionIndex];

    if (userSelectedIndex !== undefined) {
      const userSelectedOption = question.options[userSelectedIndex];

      if (userSelectedOption === question.answer) {
        score++;
      }
    }
  });
  resultDiv.textContent = `${score} / ${questions.length}`;
}


displayCurrentQuestion();
