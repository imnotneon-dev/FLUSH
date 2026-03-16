const inputs = document.querySelectorAll(".edit-form input, .edit-form textarea");
const saveBtn = document.querySelector(".save-btn");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
let saveAttempted = false;


function setFilled(input) {
  input.classList.remove("error");
  input.classList.add("filled");
  setHint(input, "", "");
}

function setError(input, message = "This field is required.") {
  input.classList.remove("filled");
  input.classList.add("error");
  setHint(input, message, "error");
}

function clearState(input) {
  input.classList.remove("filled", "error");
  setHint(input, "", "");
}

function setHint(input, message, type) {
  const hint = input.parentElement.querySelector(".field-hint");
  if (!hint) return;
  hint.textContent = message;
  hint.className = "field-hint" + (type ? " hint-" + type : "");
}

/* ===========================
     INPUT VALIDATION
=========================== */
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      setFilled(input);
    } else if (saveAttempted) {
      setError(input);
    } else {
      clearState(input);
    }

    if (input === passwordInput) {
      checkPasswordStrength(input.value);
      if (confirmInput.value !== "") validatePasswordMatch();
    }
    if (input === confirmInput) {
      validatePasswordMatch();
    }
  });
});

/* ===========================
   PASSWORD CHECKLIST
=========================== */
const strengthRules = [
  { id: "rule-length",  label: "At least 8 characters",          test: (v) => v.length >= 8 },
  { id: "rule-upper",   label: "At least one uppercase letter",   test: (v) => /[A-Z]/.test(v) },
  { id: "rule-lower",   label: "At least one lowercase letter",   test: (v) => /[a-z]/.test(v) },
  { id: "rule-number",  label: "At least one number",             test: (v) => /[0-9]/.test(v) },
  { id: "rule-special", label: "At least one special character",  test: (v) => /[^A-Za-z0-9]/.test(v) },
];

function buildStrengthChecklist() {
  const pwGrp = passwordInput.parentElement;
  const existing = document.getElementById("password-strength");
  if (existing) existing.remove();

  const checklist = document.createElement("ul");
  checklist.id = "password-strength";
  checklist.className = "strength-checklist";

  strengthRules.forEach((rule) => {
    const li = document.createElement("li");
    li.id = rule.id;
    li.className = "strength-rule";
    li.innerHTML = `<span class="rule-icon"></span><span>${rule.label}</span>`;
    checklist.appendChild(li);
  });

  pwGrp.appendChild(checklist);
}

function checkPasswordStrength(value) {
  const checklist = document.getElementById("password-strength");
  if (!checklist) return;
  checklist.style.display = value.length > 0 ? "flex" : "none";

  strengthRules.forEach((rule) => {
    const li = document.getElementById(rule.id);
    if (!li) return;
    li.classList.toggle("passed", rule.test(value));
    li.classList.toggle("failed", !rule.test(value));
  });
}

/* ===========================
   PASSWORD MATCH VALIDATION
=========================== */
function validatePasswordMatch() {
  const pwVal = passwordInput.value.trim();
  const cfVal = confirmInput.value.trim();

  // REQUIRED FIELD CHECK
  if (cfVal === "") {
    if (saveAttempted) {
      setError(confirmInput, "Please confirm your password.");
    } else {
      clearState(confirmInput);
    }
    return false;
  }

  // PASSWORD MISMATCH
  if (pwVal !== cfVal) {
    setError(confirmInput, "Passwords do not match.");
    passwordInput.classList.add("error");
    passwordInput.classList.remove("filled");
    return false;
  }

  // PASSWORD MATCH
  setFilled(confirmInput);
  if (pwVal !== "") setFilled(passwordInput);

  return true;
}

/* ===========================
   SAVE BUTTON
=========================== */
saveBtn.addEventListener("click", (event) => {
  saveAttempted = true;
  let allValid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      setError(input, "This field is required.");
      allValid = false;
    } else if (!input.classList.contains("error")) {
      setFilled(input);
    }
  });

  const passwordsValid = validatePasswordMatch();
    if (!passwordsValid) allValid = false;

  if (!allValid) event.preventDefault();
});

/* ===========================
   INIT
=========================== */
buildStrengthChecklist();
checkPasswordStrength("");

