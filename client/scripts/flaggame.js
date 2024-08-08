export let countries = [];
export let currentCountry = null;
export let score = 0;
export let round = 0;
export const totalRounds = 5;
export let firstAttempt = true;

document.addEventListener("DOMContentLoaded", () => {
  fetchCountries();
});

export async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  countries = data;
  startGame();
}

export function startGame() {
  nextRound();
}

export function nextRound() {
  if (round < totalRounds) {
    round++;
    firstAttempt = true;
    displayRoundCount();
    displayFlagAndAnswers();
  } else {
    displayScore();
  }
}

export function displayRoundCount() {
  const roundCountElement = document.getElementById("round-count");
  roundCountElement.textContent = `Round: ${round} / ${totalRounds}`;
}

export function displayFlagAndAnswers() {
  const region = "Europe";
  const filteredCountries = countries.filter(
    (country) => country.region === region
  );
  currentCountry =
    filteredCountries[Math.floor(Math.random() * filteredCountries.length)];

  const flagImage = document.querySelector(".card-img-top");
  flagImage.src = currentCountry.flags.svg;
  flagImage.alt = `Flag of ${currentCountry.name.common}`;

  const answerButtons = document.querySelectorAll(".card-body .btn-primary");

  const incorrectAnswers = filteredCountries
    .filter((country) => country.name.common !== currentCountry.name.common)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const allAnswers = [currentCountry, ...incorrectAnswers].sort(
    () => 0.5 - Math.random()
  );

  answerButtons.forEach((button, index) => {
    button.textContent = allAnswers[index].name.common;
    button.onclick = () => checkAnswer(button);
    button.classList.remove("correct", "incorrect");
  });
}

export function checkAnswer(selectedButton) {
  const selectedAnswer = selectedButton.textContent;
  const correctAnswer = currentCountry.name.common;

  const answerButtons = document.querySelectorAll(".card-body .btn-primary");

  if (selectedAnswer === correctAnswer) {
    selectedButton.classList.add("correct");
    if (firstAttempt) {
      score++;
    }
  } else {
    selectedButton.classList.add("incorrect");
    firstAttempt = false;

    answerButtons.forEach((button) => {
      if (button.textContent === correctAnswer) {
        button.classList.add("correct");
      }
    });
  }

  setTimeout(nextRound, 1000); // Proceed to the next round after a delay
}

export function displayScore() {
  // Store the score and total rounds in localStorage
  localStorage.setItem("quizScore", score);
  localStorage.setItem("totalRounds", totalRounds);

  const userId = localStorage.getItem("userId");
  fetch("http://localhost:3000/scores/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId,
      score: score,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      window.location.href = "resultspage.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      window.location.href = "resultspage.html"; // Ensure redirection even if there is an error
    });
}
