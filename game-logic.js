// game-logic.js

// Game configuration constants
const NUMBER_OF_COUNTRIES = 5; // Number of countries per game round
const BASE_SCORE = 100; // Base score for a correct answer
const TIME_PENALTY_THRESHOLD = 10; // Time in seconds before penalties apply
const ATTEMPT_PENALTY = 10; // Penalty per additional attempt

// Mock data for demonstration
const globalFlagList = [
  { name: "Country1", flagUrl: "flag1.png" },
  { name: "Country2", flagUrl: "flag2.png" },
  { name: "Country3", flagUrl: "flag3.png" },
  { name: "Country4", flagUrl: "flag4.png" },
  { name: "Country5", flagUrl: "flag5.png" },
  // Add more countries as needed
];

// Class to represent a country
class Country {
  constructor(name, flagUrl) {
    this.name = name;
    this.flagUrl = flagUrl;
  }
}

// Game class to handle game logic
class Game {
  constructor(countryData) {
    this.countryData = countryData.map(c => new Country(c.name, c.flagUrl));
  }

  // Shuffles an array and returns a new array with the items in random order
  static shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Selects a set number of countries from the country data
  selectCountries(numberOfCountries) {
    return Game.shuffleArray(this.countryData).slice(0, numberOfCountries);
  }

  // Generates flag options including the correct one and random incorrect options
  generateFlagOptions(correctFlagUrl) {
    const shuffledFlags = Game.shuffleArray(this.countryData);
    const incorrectFlags = shuffledFlags
      .filter((country) => country.flagUrl !== correctFlagUrl)
      .slice(0, 3); // Choose 3 incorrect options
    return Game.shuffleArray([correctFlagUrl, ...incorrectFlags.map((country) => country.flagUrl)]);
  }

  // Checks if the user's selected flag is correct
  checkFlagAnswer(userSelectedFlagUrl, correctFlagUrl) {
    return userSelectedFlagUrl === correctFlagUrl;
  }

  // Calculates the score based on correctness, time taken, and attempts
  calculateScore(isCorrect, timeTaken, attempts) {
    if (!isCorrect) return 0;
    const timePenalty = Math.max(0, timeTaken - TIME_PENALTY_THRESHOLD);
    const attemptPenalty = (attempts - 1) * ATTEMPT_PENALTY;
    return BASE_SCORE - timePenalty - attemptPenalty;
  }

  // Starts a timer and executes a callback function when time is up
  startTimer(duration, onTimeUp) {
    let timer = duration;
    const interval = setInterval(() => {
      console.log(`Time remaining: ${timer} seconds`);
      if (--timer < 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);
  }

  // Initializes a new game session
  startNewGame() {
    const selectedCountries = this.selectCountries(NUMBER_OF_COUNTRIES);
    selectedCountries.forEach((country) => {
      // Generate a flag question
      const questionObj = {
        type: 'flag',
        question: `Select the flag of ${country.name}`,
        correctAnswer: country.flagUrl,
        options: this.generateFlagOptions(country.flagUrl)
      };

      // Display question and options
      console.log(questionObj.question);
      console.log('Options: ', questionObj.options); // Replace with frontend interaction

      // Simulate user interaction
      const userSelectedFlagUrl = this.simulateUserSelection(questionObj.options);

      // Check answer and calculate score
      const isCorrect = this.checkFlagAnswer(userSelectedFlagUrl, questionObj.correctAnswer);
      const score = this.calculateScore(isCorrect, 5, 1); // Example: user took 5 seconds and 1 attempt
      console.log(`User selected: ${userSelectedFlagUrl}`);
      console.log(`Correct answer: ${questionObj.correctAnswer}`);
      console.log(`Score: ${score}`);
    });
  }

  // Simulates user selection from flag options (for demonstration purposes)
  simulateUserSelection(options) {
    // Randomly select an option for demonstration
    return options[Math.floor(Math.random() * options.length)];
  }
}

// Initialize game for testing
const game = new Game(globalFlagList);
game.startNewGame();

