document.addEventListener("DOMContentLoaded", () => {
  // Handle registration form submission
  const registerForm = document.querySelector("#register-modal form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Make a POST request to the registration endpoint
      const response = await fetch("http://localhost:3000/users/register", {
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

    // Collect form data
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Make a POST request to the login endpoint
      const response = await fetch("http://localhost:3000/users/login", {
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
        // Redirect to gamepage.html upon successful login
        window.location.href = "gamepage.html";
      } else {
        alert(`Login failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  });
});
