document.addEventListener("DOMContentLoaded", () => {
  const score = localStorage.getItem("quizScore");
  const totalRounds = localStorage.getItem("totalRounds");

  if (score !== null && totalRounds !== null) {
    document.querySelector(".score-value").textContent = `${score} out of ${totalRounds}`;
  } else {
    document.querySelector(".score-value").textContent = "Score data not available.";
  }
});
