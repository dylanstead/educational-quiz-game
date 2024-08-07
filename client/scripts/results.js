document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  fetch(`http://localhost:3000/scores/${userId}`)
    .then(response => response.json())
    .then(data => {
      const score = data.score;
      const totalRounds = localStorage.getItem("totalRounds");

      if (score !== null && totalRounds !== null) {
        document.querySelector(".score-value").textContent = `${score} out of ${totalRounds}`;
      }
    })
    .catch(error => console.error('Error:', error));
});
