// Load current user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.role !== "student") {
  window.location.href = "login.html";
}

document.getElementById("studentName").textContent = currentUser.name;

// Sample internship data
const internships = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "ABC Tech",
    stipend: "₹15,000/month",
    duration: "3 months",
    skills: ["HTML", "CSS", "JavaScript"],
    location: "Remote",
    applyLink: "apply.html?id=1"
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "XYZ Analytics",
    stipend: "₹12,000/month",
    duration: "6 months",
    skills: ["Python", "SQL", "Excel"],
    location: "Hyderabad",
    applyLink: "apply.html?id=2"
  }
];

// Display jobs
function displayJobs(jobs) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  jobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h4>${job.title}</h4>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Stipend:</strong> ${job.stipend}</p>
      <p><strong>Duration:</strong> ${job.duration}</p>
      <p><strong>Skills:</strong> ${job.skills.join(", ")}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <a href="${job.applyLink}" class="btn btn-sm">Apply</a>
    `;
    jobList.appendChild(jobCard);
  });
}

// Filter jobs by skills (simple matching)
function filterJobsBySkills() {
  const studentSkills = ["HTML", "CSS", "JavaScript"]; // In real app, get from profile
  const matchedJobs = internships.filter(job => {
    return job.skills.some(skill => studentSkills.includes(skill));
  });
  displayJobs(matchedJobs);
}

// On page load
window.onload = function() {
  filterJobsBySkills();
};
// Simulate application submission
document.getElementById("applyForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const company = document.getElementById("company").value;
  const studentName = document.getElementById("studentName").value;
  const studentEmail = document.getElementById("studentEmail").value;
  const department = document.getElementById("department").value;
  const cgpa = document.getElementById("cgpa").value;
  const coverLetter = document.getElementById("coverLetter").value;

  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  applications.push({
    id: Date.now(),
    title,
    company,
    studentName,
    studentEmail,
    department,
    cgpa,
    coverLetter,
    status: "Applied",
    appliedAt: new Date().toLocaleString()
  });

  localStorage.setItem("applications", JSON.stringify(applications));
  alert("Application submitted successfully!");
  window.location.href = "my-applications.html";
});