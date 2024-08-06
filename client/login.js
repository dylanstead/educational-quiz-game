document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
  
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());
  
      try {
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
  });
  
  