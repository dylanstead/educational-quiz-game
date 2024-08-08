document.addEventListener("DOMContentLoaded", async () => {
  const BASE_URL = config.API_URL;

  // Function to display the username in the navigation bar
  function displayUsername() {
    const username = localStorage.getItem("username");
    if (username) {
      const usernameField = document.getElementById("navbar-username");
      if(usernameField)
        usernameField.innerText = username;
    }
  }

  // Call displayUsername to ensure username is displayed on page load
  displayUsername();

  // Registration Form Handling
  const registerForm = document.querySelector("#register-modal form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());

      console.log("Registration data:", data); // Log the data being sent

      try {
        const response = await fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Ensure data is serialized as JSON
        });

        console.log("Response status:", response.status); // Log response status
        const result = await response.json();
        console.log("Response result:", result); // Log the response result

        if (response.ok) {
          alert("Registration Successful!");
        } else {
          console.error(
            `Registration failed: ${result.error || result.message}`
          );
          alert(`Registration failed: ${result.error || result.message}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Error during registration: Check console for details.");
      }
    });
  } else {
    console.error("Register form not found");
  }

  // Login Form Handling
  const loginForm = document.querySelector("#login-modal form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData.entries());

      console.log("Login data:", data); // Debugging log

      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });

        console.log("Response status:", response.status); // Log response status

        const result = await response.json();
        console.log("Response result:", result); // Log response result

        if (response.ok) {
          // Store the username in localStorage
          localStorage.setItem("username", result.username);

          // Redirect to the game page
          window.location.href = "gamepage.html";
        } else {
          console.error(`Login failed: ${result.error || result.message}`);
          alert(`Login failed: ${result.error || result.message}`);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login: Check console for details.");
      }
    });
  } else {
    console.error("Login form not found");
  }

  // Flag Quiz Button Handling
  const flagQuizButton = document.querySelector(".bi-flag-fill")?.parentNode;
  if (flagQuizButton) {
    flagQuizButton.addEventListener("click", () => {
      window.location.href = "quizpage.html"; // Redirect to quiz page
    });
  } else {
    console.error("Flag Quiz Button Not Found");
  }
});
