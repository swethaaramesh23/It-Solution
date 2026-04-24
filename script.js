// =======================
// 1. TYPING EFFECT
// =======================
const typingEl = document.getElementById("typing");

if (typingEl) {
  const text = "Innovative IT Solutions";
  let i = 0;

  function typing() {
    if (i < text.length) {
      typingEl.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 50);
    }
  }

  typing();
}

// =======================
// 2. SCROLL ANIMATION
// =======================
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// =======================
// 3. REGISTER
// =======================
const regForm = document.getElementById("registerForm");

if (regForm) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registered successfully!");
    window.location.href = "login.html";
  });
}

// =======================
// 4. LOGIN
// =======================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user &&
      emailInput.value === user.email &&
      passwordInput.value === user.password
    ) {
      localStorage.setItem("login", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password");
    }
  });
}

// =======================
// 5. DASHBOARD
// =======================
if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("login")) {
    window.location.href = "login.html";
  } else {
    const user = JSON.parse(localStorage.getItem("user"));
    const userInfo = document.getElementById("userInfo");

    if (user && userInfo) {
      userInfo.innerText = "Hello " + user.name;
    }
  }
}

// =======================
// 6. LOGOUT
// =======================
function logout() {
  localStorage.removeItem("login");
  window.location.href = "login.html";
}

// =======================
// 7. SCROLL TO SECTION
// =======================
function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}

// =======================
// 8. CONTACT FORM
// =======================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email === "" || message === "") {
      alert("Please fill all fields");
    } else if (!email.match(emailPattern)) {
      alert("Enter valid email");
    } else {
      alert("Message sent successfully!");
      contactForm.reset();
    }
  });
}

// =======================
// 9. NEWSLETTER
// =======================
function subscribe() {
  const email = document.getElementById("newsletterEmail").value.trim();

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!email) {
    alert("Please enter email");
  } else if (!pattern.test(email)) {
    alert("Enter valid email");
  } else {
    alert("Subscribed successfully!");
  }
}

// =======================
// 10. SERVICE CLICK
// =======================
function showService(serviceName) {
  alert(serviceName + " service selected!");
}

// =======================
// 11. THEME TOGGLE
// =======================
const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerText = "☀️";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeBtn.innerText = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// =======================
// 12. BLOG CARD ANIMATION
// =======================
const cards = document.querySelectorAll('.blog-card');

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "all 0.6s ease";
});

window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("active");
  });
});