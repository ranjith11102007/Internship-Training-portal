// Load current user
function loadCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "student") {
    alert("Please login as student");
    window.location.href = "login.html";
    return null;
  }
  return currentUser;
}

// Sample internship data
const internships = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "ABC Tech",
    stipend: "₹15,000/month",
    duration: "3 months",
    skills: ["HTML", "CSS", "JavaScript"],
    location: "Remote"
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "XYZ Analytics",
    stipend: "₹12,000/month",
    duration: "6 months",
    skills: ["Python", "SQL", "Excel"],
    location: "Hyderabad"
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Design Studio",
    stipend: "₹10,000/month",
    duration: "3 months",
    skills: ["Figma", "Adobe XD", "HTML"],
    location: "Bangalore"
  }
];

// Display internships on dashboard
function displayInternships() {
  const list = document.getElementById("internshipList");
  if (!list) return;

  list.innerHTML = "";

  internships.forEach(job => {
    const card = document.createElement("div");
    card.className = "internship-card";
    card.innerHTML = `
      <div class="internship-header">
        <h3 class="internship-title">${job.title}</h3>
        <p class="internship-company">${job.company}</p>
      </div>
      <div class="internship-body">
        <p class="internship-detail"><strong>Stipend:</strong> ${job.stipend}</p>
        <p class="internship-detail"><strong>Duration:</strong> ${job.duration}</p>
        <p class="internship-detail"><strong>Skills:</strong> ${job.skills.join(", ")}</p>
        <p class="internship-detail"><strong>Location:</strong> ${job.location}</p>
      </div>
      <div class="internship-footer">
        <a href="apply.html?id=${job.id}" class="btn-apply">Apply</a>
      </div>
    `;
    list.appendChild(card);
  });
}

// Fill apply form
function fillApplyForm() {
  const currentUser = loadCurrentUser();
  if (!currentUser) return;

  const urlParams = new URLSearchParams(window.location.search);
  const internId = urlParams.get("id");
  const intern = internships.find(i => i.id == internId);

  if (!intern) {
    alert("Invalid internship");
    window.location.href = "dashboard.html";
    return;
  }

  document.getElementById("title").value = intern.title;
  document.getElementById("company").value = intern.company;
  document.getElementById("studentName").value = currentUser.name;
  document.getElementById("studentEmail").value = currentUser.email;
}

// Handle application submit
function handleApplySubmit() {
  const form = document.getElementById("applyForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const currentUser = loadCurrentUser();
    if (!currentUser) return;

    const urlParams = new URLSearchParams(window.location.search);
    const internId = urlParams.get("id");
    const intern = internships.find(i => i.id == internId);

    if (!intern) {
      alert("Invalid internship");
      window.location.href = "dashboard2.html";
      return;
    }

    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const newApp = {
      id: Date.now(),
      title: intern.title,
      company: intern.company,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      department: document.getElementById("department").value,
      cgpa: document.getElementById("cgpa").value,
      coverLetter: document.getElementById("coverLetter").value,
      appliedAt: new Date().toLocaleString(),
      status: "Applied"
    };

    applications.push(newApp);
    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Application submitted successfully!");
    window.location.href = "my-applications.html";
  });
}

// Display my applications
function displayMyApplications() {
  const currentUser = loadCurrentUser();
  if (!currentUser) return;

  const applications = JSON.parse(localStorage.getItem("applications")) || [];

  // Update stats
  const appliedCount = applications.filter(a => a.status === "Applied").length;
  const shortlistedCount = applications.filter(a => a.status === "Shortlisted").length;
  const placedCount = applications.filter(a => a.status === "Placed").length;

  const appliedEl = document.getElementById("appliedCount");
  const shortlistedEl = document.getElementById("shortlistedCount");
  const placedEl = document.getElementById("placedCount");

  if (appliedEl) appliedEl.textContent = appliedCount;
  if (shortlistedEl) shortlistedEl.textContent = shortlistedCount;
  if (placedEl) placedEl.textContent = placedCount;

  // Display applications
  const list = document.getElementById("applicationsList");
  if (!list) return;

  if (applications.length === 0) {
    list.innerHTML = "<p>No applications yet. Go to dashboard and apply for internships.</p>";
  } else {
    list.innerHTML = "";
    applications.forEach(app => {
      const card = document.createElement("div");
      card.className = "internship-card";
      card.innerHTML = `
        <div class="internship-header">
          <h3 class="internship-title">${app.title}</h3>
          <p class="internship-company">${app.company}</p>
        </div>
        <div class="internship-body">
          <p class="internship-detail"><strong>Applied on:</strong> ${app.appliedAt}</p>
          <p class="internship-detail"><strong>Status:</strong> <span style="color: ${
            app.status === "Applied" ? "#0077b6" :
            app.status === "Shortlisted" ? "#0077b6" :
            app.status === "Placed" ? "#28a745" : "#dc3545"
          }">${app.status}</span></p>
          <p class="internship-detail"><strong>CGPA:</strong> ${app.cgpa}</p>
        </div>
      `;
      list.appendChild(card);
    });
  }
}