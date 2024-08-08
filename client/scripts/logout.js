document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector(".logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Clear user data from localStorage
      localStorage.removeItem("username");

      // Redirect to homepage
      window.location.href = "homepage.html";
    });
  }
});
