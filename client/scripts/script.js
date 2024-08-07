document.addEventListener("DOMContentLoaded", async () => {
  // Set the base URL directly since there's no config file
  const BASE_URL = "http://localhost:3000";

  const registerForm = document.querySelector("#register-modal form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
          // Redirect to login page after successful registration
          window.location.href = "login.html";
        } else {
          // Optionally handle errors in the UI
          console.error(`Registration failed: ${result.error}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    });
  }

  const loginForm = document.querySelector("#login-modal form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
          // Redirect to game page after successful login
          window.location.href = "gamepage.html";
        } else {
          // Optionally handle errors in the UI
          console.error(`Login failed: ${result.error}`);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    });
  }

  // Select the Flag Quiz button by using the icon class 'bi-flag-fill'
  const flagQuizButton = document.querySelector('.bi-flag-fill').parentNode;
  if (flagQuizButton) {
    flagQuizButton.addEventListener('click', () => {
      window.location.href = "quizpage.html"; // Redirect to quizpage.html
    });
  } else {
    console.error('Flag Quiz Button Not Found');
  }
});

