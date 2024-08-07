document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    fetch(`http://localhost:3000/scores/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.score !== undefined) {
          const score = data.score;
          const totalRounds = localStorage.getItem("totalRounds");

          if (score !== null && totalRounds !== null) {
            document.querySelector(".score-value").textContent = `${score} out of ${totalRounds}`;
          } else {
            document.querySelector(".score-value").textContent = "Score data not available.";
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.querySelector(".score-value").textContent = "Error fetching score.";
      });
  } else {
    document.querySelector(".score-value").textContent = "User not identified.";
  }
});
