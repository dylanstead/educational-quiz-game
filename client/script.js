document.addEventListener("DOMContentLoaded", async () => {
  let BASE_URL;
  
  try {
    const response = await fetch('/config');
    const config = await response.json();
    BASE_URL = config.apiUrl;
  } catch (error) {
    console.error("Failed to load configuration:", error);
    BASE_URL = "http://localhost:3000";  
  }

  // Now use BASE_URL in your fetch requests
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

  // Handle login form submission
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

  // Redirect from gamepage to quizpage when the Flag Quiz button is clicked
  const flagQuizButton = document.querySelector('.start-btn i.bi-flag-fill').parentElement;

  if (flagQuizButton) {
    console.log('Flag Quiz Button Found:', flagQuizButton);
    flagQuizButton.addEventListener('click', () => {
      console.log('Flag Quiz Button Clicked');
      window.location.href = "quizpage.html";
    });
  } else {
    console.error('Flag Quiz Button Not Found');
  }
});
