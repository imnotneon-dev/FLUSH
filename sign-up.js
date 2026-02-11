// pop up

// get elements
var modal = document.getElementById("termsModal");
var openBtn = document.getElementById("openTerms");
var closeBtn = document.querySelector(".close");

// open modal on click
openBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// close modal on X
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// close modal when clicking outsidee
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

//end of pop ip

// Get form and inputs
const form = document.getElementById("signupForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const dob = document.getElementById("dob");

// Listen for form submission
form.addEventListener("submit", function(event) {
    
    // Password match check
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        confirmPassword.focus();
        event.preventDefault(); // Stop form from submitting
        return false;
    }

    // Date of Birth check (cannot be in the future)
    const dobValue = new Date(dob.value);
    const today = new Date();
    today.setHours(0,0,0,0); // Ignore time
    
    if (dobValue > today) {
        alert("Date of Birth cannot be in the future!");
        dob.focus();
        event.preventDefault();
        return false;
    }

    // All checks passed, form will submit
});
