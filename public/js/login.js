document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = form.elements["username"].value;
    const password = form.elements["password"].value;

    if (!username || !password) {
      alert("Please fill in username and password");
      return;
    }
    if (username === "admin" && password === "adminpassword") {
      console.log("Logged in as admin");
      window.location.href = "newheader.html";
    } else {
      console.log("Logged in as regular user");
      window.location.href = "newheader.html";
    }

    console.log("Username:", username);
    console.log("Password:", password);

  
    form.reset();
    signupButton.style.display = "none";
    loginButton.style.display = "none";
  });
});