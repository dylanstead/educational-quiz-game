let countries = [];
let currentCountry = null;
let score = 0;
let round = 0;
const totalRounds = 5;
let firstAttempt = true; // New variable to track if the first attempt is being made

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
    firstAttempt = true; // Reset for each new round
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

  // Update the flag image
  const flagImage = document.querySelector(".card-img-top");
  flagImage.src = currentCountry.flags.svg;
  flagImage.alt = `Flag of ${currentCountry.name.common}`;

  // Get all answer buttons
  const answerButtons = document.querySelectorAll(".card-body .btn-primary");

  // Create an array with the correct answer and three random incorrect answers
  const incorrectAnswers = filteredCountries
    .filter((country) => country.name.common !== currentCountry.name.common)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const allAnswers = [currentCountry, ...incorrectAnswers].sort(
    () => 0.5 - Math.random()
  );

  // Assign answers to buttons
  answerButtons.forEach((button, index) => {
    button.textContent = allAnswers[index].name.common;
    button.onclick = () => checkAnswer(button);
    button.classList.remove("correct", "incorrect"); // Clear previous round classes
  });
}

function checkAnswer(selectedButton) {
  const selectedAnswer = selectedButton.textContent;
  const correctAnswer = currentCountry.name.common;

  if (selectedAnswer === correctAnswer) {
    selectedButton.classList.add("correct");
    if (firstAttempt) {
      score++;
    }
    setTimeout(nextRound, 1000); // Wait a second before going to the next round
  } else {
    selectedButton.classList.add("incorrect");
    firstAttempt = false; // Mark first attempt as false on incorrect answer
  }
}

function displayScore() {
  const card = document.querySelector(".card");
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Quiz Completed</h5>
      <p class="card-text">Your score: ${score} / ${totalRounds}</p>
    </div>
  `;
}
