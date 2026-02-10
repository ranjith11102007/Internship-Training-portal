// Sample users (for demo)
const users = [
  { email: "student@college.edu", password: "123", role: "student", name: "Rahul Kumar" },
  { email: "mentor@college.edu", password: "123", role: "faculty", name: "Dr. Sharma" },
  { email: "placement@college.edu", password: "123", role: "placement", name: "Placement Cell" },
  { email: "company@company.com", password: "123", role: "company", name: "ABC Tech" }
];

// Save users to localStorage (only once, for demo)
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Login logic
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password && u.role === role);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    // Redirect based on role
    if (role === "student") window.location.href = "student/dashboard.html";
    else if (role === "faculty") window.location.href = "faculty/dashboard.html";
    else if (role === "placement") window.location.href = "placement/dashboard.html";
    else if (role === "company") window.location.href = "company/dashboard.html";
  } else {
    alert("Invalid credentials or role");
  }
});

// Signup logic
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.email === email)) {
    alert("Email already exists");
    return;
  }

  users.push({ email, password, role, name });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created! Please login.");
  window.location.href = "login.html";
});