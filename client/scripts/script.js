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
          alert("Registration successful!");
          const registerModal = new bootstrap.Modal(document.getElementById("register-modal"));
          registerModal.hide();
          registerForm.reset();
        } else {
          alert(`Registration failed: ${result.error}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
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
          alert("Login successful!");
          const loginModal = new bootstrap.Modal(document.getElementById("login-modal"));
          loginModal.hide();
          loginForm.reset();
          window.location.href = "gamepage.html";
        } else {
          alert(`Login failed: ${result.error}`);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
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
