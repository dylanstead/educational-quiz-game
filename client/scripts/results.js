document.addEventListener("DOMContentLoaded", () => {
  // Retrieve score and total rounds from localStorage
  const score = localStorage.getItem("quizScore");
  const totalRounds = localStorage.getItem("totalRounds");

  // Display the score
  if (score !== null && totalRounds !== null) {
    document.querySelector(".score-value").textContent = `${score} out of ${totalRounds}`;
  } else {
    document.querySelector(".score-value").textContent = "Score data not available.";
  }
});
