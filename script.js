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
// 2. SCROLL REVEAL
// =======================
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// =======================
// 3. REGISTER
// =======================
const regForm = document.getElementById("registerForm");

if (regForm) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && email === user.email && password === user.password) {
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
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// =======================
// 8. CONTACT FORM
// =======================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value.trim();
    const message = document.querySelector("textarea").value.trim();

    if (!email || !message) {
      alert("Please fill all fields");
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

  if (!email) {
    alert("Please enter email");
  } else {
    alert("Subscribed successfully!");
  }
}

// =======================
// 10. SERVICE CLICK
// =======================
function showService(serviceName) {
  alert("You clicked on " + serviceName);
}

// =======================
// 11. MOBILE MENU
// =======================
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

// =======================
// 12. CAREERS PAGE FILTER FUNCTIONALITY (UPDATED)
// =======================
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  // Get all job cards
  const jobCards = document.querySelectorAll('.job-card');
  // Get no results message
  const noResultsDiv = document.getElementById('noResults');
  
  // Debug: Log how many jobs found
  console.log('Total job cards found:', jobCards.length);
  
  // Function to update job visibility
  function filterJobs(filterValue) {
    let visibleCount = 0;
    let wfoCount = 0;
    let wfhCount = 0;
    let hybridCount = 0;
    
    jobCards.forEach(card => {
      const jobType = card.getAttribute('data-job-type');
      
      // Debug: Log each job type
      console.log('Job type:', jobType);
      
      if (filterValue === 'all') {
        card.classList.remove('hide');
        visibleCount++;
      } else if (jobType === filterValue) {
        card.classList.remove('hide');
        visibleCount++;
        
        // Count by type for debugging
        if (jobType === 'wfo') wfoCount++;
        if (jobType === 'wfh') wfhCount++;
        if (jobType === 'hybrid') hybridCount++;
      } else {
        card.classList.add('hide');
      }
    });
    
    // Debug: Log counts
    console.log(`Filter: ${filterValue}, Visible: ${visibleCount}`);
    console.log(`WFO count: ${wfoCount}, WFH count: ${wfhCount}, Hybrid count: ${hybridCount}`);
    
    // Show or hide no results message
    if (noResultsDiv) {
      if (visibleCount === 0) {
        noResultsDiv.classList.add('show');
      } else {
        noResultsDiv.classList.remove('show');
      }
    }
    
    return visibleCount;
  }
  
  // If filter buttons exist, add click event listeners
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter jobs
        filterJobs(filterValue);
      });
    });
  }
  
  // Initial filter to show all jobs
  filterJobs('all');
});

// =======================
// 13. APPLY BUTTON POPUP FUNCTIONALITY
// =======================
function openPopup(jobTitle) {
  const popup = document.getElementById('applyPopup');
  const jobTitleSpan = document.getElementById('jobTitle');
  
  if (popup && jobTitleSpan) {
    jobTitleSpan.textContent = jobTitle;
    popup.style.display = 'flex';
  }
}

function closePopup() {
  const popup = document.getElementById('applyPopup');
  if (popup) {
    popup.style.display = 'none';
  }
}

// Add click event to all apply buttons
document.addEventListener('DOMContentLoaded', function() {
  const applyButtons = document.querySelectorAll('.apply-btn');
  
  console.log('Apply buttons found:', applyButtons.length);
  
  applyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const jobCard = this.closest('.job-card');
      const jobTitle = jobCard.querySelector('h3')?.innerText || 'this position';
      
      console.log('Apply clicked for:', jobTitle);
      
      // Find popup and open it
      const popup = document.getElementById('applyPopup');
      const jobTitleSpan = document.getElementById('jobTitle');
      
      if (popup && jobTitleSpan) {
        jobTitleSpan.textContent = jobTitle;
        popup.style.display = 'flex';
      } else {
        alert(`Application form for ${jobTitle} will open soon!`);
      }
    });
  });
  
  // Close popup when clicking outside
  const popup = document.getElementById('applyPopup');
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        closePopup();
      }
    });
  }
});

// =======================
// 14. POPUP FORM SUBMIT
// =======================
document.addEventListener('DOMContentLoaded', function() {
  const popupForm = document.querySelector('#applyPopup form');
  
  if (popupForm) {
    popupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = this.querySelector('input[placeholder="Your Name"]')?.value;
      const email = this.querySelector('input[placeholder="Your Email"]')?.value;
      const phone = this.querySelector('input[placeholder="Phone Number"]')?.value;
      const file = this.querySelector('input[type="file"]')?.files[0];
      
      if (!name || !email || !phone || !file) {
        alert('Please fill all fields and upload your resume');
        return;
      }
      
      alert('Application submitted successfully! We will contact you soon.');
      this.reset();
      closePopup();
    });
  }
});

// =======================
// 15. BLOG POPUP FUNCTIONALITY
// =======================
function openBlogPopup(title, content) {
  const popup = document.getElementById('blogPopup');
  const titleSpan = document.getElementById('blogTitle');
  const contentPara = document.getElementById('blogContent');
  
  if (popup && titleSpan && contentPara) {
    titleSpan.textContent = title;
    contentPara.textContent = content;
    popup.style.display = 'flex';
  }
}

function closeBlogPopup() {
  const popup = document.getElementById('blogPopup');
  if (popup) {
    popup.style.display = 'none';
  }
}

// Add click event to read more links
document.addEventListener('DOMContentLoaded', function() {
  const readMoreLinks = document.querySelectorAll('.read-more');
  
  // Blog data
  const blogData = {
    1: {
      title: "Top 5 Cybersecurity Threats in 2024",
      content: "In 2024, organizations face unprecedented cybersecurity challenges including AI-powered attacks, ransomware evolution, supply chain vulnerabilities, cloud misconfigurations, and IoT security gaps. Stay protected with proactive measures and continuous monitoring."
    },
    2: {
      title: "Cloud Migration for Modern Businesses",
      content: "Cloud migration offers scalability, cost efficiency, and enhanced security. Learn best practices for seamless transition including assessment, planning, execution, and optimization strategies for your business."
    },
    3: {
      title: "AI & Automation in Business",
      content: "Artificial intelligence is revolutionizing business operations. From customer service chatbots to predictive analytics, discover how AI and automation drive efficiency, reduce costs, and create competitive advantages."
    }
  };
  
  readMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get blog card
      const blogCard = this.closest('.blog-card');
      const title = blogCard.querySelector('h3')?.innerText;
      const description = blogCard.querySelector('p')?.innerText;
      
      // Open popup
      const popup = document.getElementById('blogPopup');
      const titleSpan = document.getElementById('blogTitle');
      const contentPara = document.getElementById('blogContent');
      
      if (popup && titleSpan && contentPara) {
        titleSpan.textContent = title;
        contentPara.textContent = description + " For more details, visit our full blog post.";
        popup.style.display = 'flex';
      }
    });
  });
  
  // Close popup when clicking outside
  const popup = document.getElementById('blogPopup');
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        closeBlogPopup();
      }
    });
  }
});
// =======================
// SHOW SERVICE FUNCTION
// =======================
function showService(serviceName) {
  alert("You clicked on " + serviceName + " service!");
}

// =======================
// SUBSCRIBE FUNCTION
// =======================
function subscribe() {
  const email = document.getElementById("newsletterEmail").value.trim();
  if (!email) {
    alert("Please enter your email address");
  } else if (!email.includes('@') || !email.includes('.')) {
    alert("Please enter a valid email address");
  } else {
    alert("Subscribed successfully! ✅");
    document.getElementById("newsletterEmail").value = "";
  }
}

// =======================
// TOGGLE MENU FUNCTION
// =======================
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}