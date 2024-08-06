let countries = [];
let currentCountry = null;
let score = 0;
let round = 0;
const totalRounds = 5;
document.addEventListener("DOMContentLoaded", () => {
  fetchCountries();
});
async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  countries = data;
  startGame();
}
function startGame() {
  nextRound();
}
function nextRound() {
  if (round < totalRounds) {
    round++;
    displayFlagAndAnswers();
  } else {
    displayScore();
  }
}
function displayFlagAndAnswers() {
  const region = "Europe"; // You can change this to any region you want to use
  const filteredCountries = countries.filter(
    (country) => country.region === region
  );
  currentCountry =
    filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
  document.getElementById("flag").src = currentCountry.flags.svg;
  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = "";
  const correctAnswerButton = createAnswerButton(currentCountry.name.common);
  answersContainer.appendChild(correctAnswerButton);
  const incorrectAnswers = filteredCountries
    .filter((country) => country.name.common !== currentCountry.name.common)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  incorrectAnswers.forEach((incorrectCountry) => {
    const button = createAnswerButton(incorrectCountry.name.common);
    answersContainer.appendChild(button);
  });
  // Shuffle the buttons
  for (let i = answersContainer.children.length; i >= 0; i--) {
    answersContainer.appendChild(
      answersContainer.children[(Math.random() * i) | 0]
    );
  }
}
function createAnswerButton(answer) {
  const button = document.createElement("button");
  button.textContent = answer;
  button.onclick = checkAnswer;
  return button;
}
function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = currentCountry.name.common;
  if (selectedAnswer === correctAnswer) {
    event.target.classList.add("correct");
    score++;
  } else {
    event.target.classList.add("incorrect");
    document
      .querySelector(`button:contains(${correctAnswer})`)
      .classList.add("correct");
  }
  setTimeout(nextRound, 1000); // Wait a second before going to the next round
}
function displayScore() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById(
    "score"
  ).textContent = `Your score: ${score} / ${totalRounds}`;
}
