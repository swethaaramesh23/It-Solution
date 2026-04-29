// =======================
// REGISTER FUNCTION
// =======================
function register() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;

  if (!name || !email || !password || !role) {
    alert("Please fill all fields");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    alert("User already exists! Please login.");
    return;
  }

  users.push({ name, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered Successfully ✅");
  window.location.href = "login.html";
}

// =======================
// LOGIN FUNCTION - FIXED
// =======================
function login() {
  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials ❌");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("login", "true");

  alert("Login successful ✅ Welcome " + user.name);

  if (user.role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "dashboard.html";
  }
}

// =======================
// FORGOT PASSWORD - FIXED
// =======================
function forgotPassword() {
  let email = document.getElementById("email").value.trim();
  
  if (!email) {
    alert("Please enter your email address first");
    return;
  }
  
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userExists = users.find(u => u.email === email.toLowerCase());
  
  if (!userExists) {
    alert("Email not found! Please register first.");
    return;
  }
  
  localStorage.setItem('resetEmail', email.toLowerCase());
  window.location.href = "reset-password.html";
}

// =======================
// RESET PASSWORD - FIXED
// =======================
function resetPassword() {
  let email = document.getElementById("resetEmail").value.trim().toLowerCase();
  let newPassword = document.getElementById("newPassword").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  
  if (!email || !newPassword || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }
  
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  
  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    alert("Email not found. Please register first.");
    return;
  }
  
  users[userIndex].password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));
  
  alert("Password reset successfully! ✅");
  localStorage.removeItem("resetEmail");
  window.location.href = "login.html";
}

// =======================
// LOGOUT
// =======================
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("login");
  window.location.href = "login.html";
}

// =======================
// TOGGLE MENU
// =======================
function toggleMenu() {
  let navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// =======================
// AUTO-FILL EMAIL ON RESET PAGE
// =======================
document.addEventListener('DOMContentLoaded', function() {
  let resetEmailInput = document.getElementById('resetEmail');
  let storedEmail = localStorage.getItem('resetEmail');
  
  if (resetEmailInput && storedEmail) {
    resetEmailInput.value = storedEmail;
  }
});