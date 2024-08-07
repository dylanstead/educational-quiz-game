// config.js

const config = {
    API_URL: "https://educational-quiz-game-backend.onrender.com",  
  };
  
  // Expose the config object to other scripts
  if (typeof module !== "undefined" && module.exports) {
    module.exports = config;
  } else {
    window.config = config;
  }
  