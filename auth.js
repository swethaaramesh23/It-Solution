// =======================
// REGISTER
// =======================
function register() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;

  if (!name || !email || !password || !role) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 🚨 Prevent duplicate users
  let existingUser = users.find(u => u.email === email);
  if (existingUser) {
    alert("User already exists!");
    return;
  }

  users.push({ name, email, password, role });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered Successfully ✅");
  window.location.href = "login.html";
}


// =======================
// LOGIN
// =======================
function login() {
  let email = document.getElementById("loginEmail").value.trim().toLowerCase();
  let password = document.getElementById("loginPassword").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials ❌");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Login successful ✅");

  // REDIRECT
  if (user.role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "user-dashboard.html";
  }
}


// =======================
// LOGOUT
// =======================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}


// =======================
function resetPassword() {
  let email = document.getElementById("resetEmail").value.trim().toLowerCase();
  let newPassword = document.getElementById("newPassword").value.trim();

  if (!email || !newPassword) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    alert("Email not found ❌");
    return;
  }

  // Update password
  users[userIndex].password = newPassword;

  localStorage.setItem("users", JSON.stringify(users));

  alert("Password updated successfully ✅");

  window.location.href = "login.html";
}