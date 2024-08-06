document.addEventListener("DOMContentLoaded", () => {
  const port = 3000;  

  // Handle registration form submission
  const registerForm = document.querySelector("#register-modal form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`http://localhost:${port}/users/register`, {
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

  // Handle login form submission
  const loginForm = document.querySelector("#login-modal form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`http://localhost:${port}/users/login`, {
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
        window.location.href = "gamepage.html"; // Redirect after successful login
      } else {
        alert(`Login failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  });

  // Redirect from gamepage to quizpage when the Flag Quiz button is clicked
  const flagQuizButton = document.getElementById('flag-quiz-btn');

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

