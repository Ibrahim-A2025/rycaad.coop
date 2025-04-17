
document.addEventListener("DOMContentLoaded", function () {
  const role = localStorage.getItem('userRole');
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  if (role === "admin" || role === "member") {
    logoutLink.style.display = "inline-block";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  } else {
    logoutLink.style.display = "none";
    loginLink.style.display = "inline-block";
    registerLink.style.display = "inline-block";
  }
});
