const questions = [
  {
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    answer: "Abuja"
  },
  {
    question: "Which language is used for web styling?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: "CSS"
  },
  {
    question: "What does JS stand for?",
    options: ["Java Source", "JavaScript", "JSON Script", "Java Server"],
    answer: "JavaScript"
  },
  {
    question: "Which HTML tag creates a button?",
    options: ["<input>", "<button>", "<btn>", "<click>"],
    answer: "<button>"
  },
  {
    question: "Which method is used to attach an event?",
    options: [
      "addEventListener",
      "attachButton",
      "eventHandler",
      "listenEvent"
    ],
    answer: "addEventListener"
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const questionCounterEl = document.getElementById("questionCounter");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

let currentQuestion = 0;
let score = 0;
const userAnswers = [];

/* Display Question */
function displayQuestion() {

  const question = questions[currentQuestion];

  questionCounterEl.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionEl.textContent = question.question;

  optionsEl.innerHTML = "";

  question.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.textContent = option;
    button.classList.add("optionBtn");

    if (userAnswers[currentQuestion] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      saveAnswer(index);
    });

    optionsEl.appendChild(button);
  });
}

/* Save Answer */
function saveAnswer(optionIndex) {

  userAnswers[currentQuestion] = optionIndex;

  displayQuestion();

  const question = questions[currentQuestion];
  const selectedOption = question.options[optionIndex];

  feedbackEl.classList.remove("correct", "wrong");

  if (selectedOption === question.answer) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.classList.add("correct");
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.classList.add("wrong");
  }
}

/* Next Question */
function nextQuestion() {

  if (userAnswers[currentQuestion] === undefined) {
    feedbackEl.textContent = "Please select an answer first.";
    feedbackEl.classList.add("wrong");
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    feedbackEl.textContent = "";
    displayQuestion();
  }
}

/* Previous Question */
function previousQuestion() {

  if (currentQuestion > 0) {
    currentQuestion--;
    feedbackEl.textContent = "";
    displayQuestion();
  }
}

/* Calculate Score */
function calculateScore() {

  score = 0;

  questions.forEach((question, index) => {

    const selectedIndex = userAnswers[index];

    if (selectedIndex !== undefined) {

      const selectedAnswer =
        question.options[selectedIndex];

      if (selectedAnswer === question.answer) {
        score++;
      }
    }
  });

  scoreEl.textContent =
    `Score: ${score}/${questions.length}`;
}

/* Submit Quiz */
function submitQuiz() {

  calculateScore();

  if (score === questions.length) {
    resultEl.textContent =
      `Excellent! You scored ${score}/${questions.length}`;
  } else if (score >= 3) {
    resultEl.textContent =
      `Good job! You scored ${score}/${questions.length}`;
  } else {
    resultEl.textContent =
      `Keep practicing! You scored ${score}/${questions.length}`;
  }
}

/* Event Listeners */
nextBtn.addEventListener("click", nextQuestion);

prevBtn.addEventListener("click", previousQuestion);

submitBtn.addEventListener("click", submitQuiz);

/* Start Quiz */
displayQuestion();