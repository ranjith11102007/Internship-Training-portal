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

// On page load
window.onload = function() {
  const currentUser = loadCurrentUser();
  if (!currentUser) return;

  // Fill form with current data
  document.getElementById("name").value = currentUser.name;
  document.getElementById("email").value = currentUser.email;
  document.getElementById("phone").value = currentUser.phone || "";
  document.getElementById("branch").value = currentUser.branch || "Computer Science";
  document.getElementById("cgpa").value = currentUser.cgpa || "8.5";
  document.getElementById("profilePic").value = currentUser.profilePic || "../assets/student.jpg";
};

// Handle form submit
document.getElementById("editProfileForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const currentUser = loadCurrentUser();
  if (!currentUser) return;

  // Get updated values
  const updatedUser = {
    ...currentUser,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    branch: document.getElementById("branch").value,
    cgpa: document.getElementById("cgpa").value,
    profilePic: document.getElementById("profilePic").value
  };

  // Save to localStorage
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  alert("Profile updated successfully!");
  window.location.href = "profile.html";
});