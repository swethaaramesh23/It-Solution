// REGISTER
function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ name, email, password, role });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered Successfully!");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  // REDIRECT
  if (user.role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "user-dashboard.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function resetPassword() {
  let email = document.getElementById("resetEmail").value;
  let newPassword = document.getElementById("newPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email);

  if (!user) {
    alert("Email not found!");
    return;
  }

  user.password = newPassword;

  localStorage.setItem("users", JSON.stringify(users));

  alert("Password updated successfully!");
  window.location.href = "login.html";
}