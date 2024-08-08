document.addEventListener("DOMContentLoaded", function () {
  const flagQuizBtn = document.querySelector(".start-btn:nth-child(1)");
  const languageQuizBtn = document.querySelector(".start-btn:nth-child(2)");
  const mapQuizBtn = document.querySelector(".start-btn:nth-child(3)");

  flagQuizBtn.addEventListener("click", function () {
    window.location.href = "flaggame.html";
  });

  languageQuizBtn.addEventListener("click", function () {
    window.location.href = "languagegame.html";
  });

  mapQuizBtn.addEventListener("click", function () {
    window.location.href = "mapgame.html";
  });
});

