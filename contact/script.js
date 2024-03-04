const form = document.querySelector("form");
const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const error = email.nextElementSibling;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,10}$/;
const textRegExp =/^[ a-zA-Z0-9,#.-]+$/;

let submissionCount = localStorage.getItem("submissionCount") ? parseInt(localStorage.getItem("submissionCount")) : 0;

function updateCounter() {
  document.getElementById("submissionCounter").innerText = "Submissions: " + submissionCount;
}

function updateLocalStorage() {
  localStorage.setItem("submissionCount", submissionCount.toString());
}

function valid(a,regEx){
    const isValid =  regEx.test(a.value);
    a.className = isValid ? "valid" : "invalid";
}

function validation(a,regEx){
    const isValid = a.value.length === 0 || regEx.test(a.value);
    if (isValid) {
      a.className = "valid";
      error.textContent = "";
      error.className = "error";
    } else {
      a.className = "invalid";
    }
}
  window.addEventListener("load", valid(email,emailRegExp));
  email.addEventListener("input", validation(email,emailRegExp));
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid1 =  emailRegExp.test(email.value);
    const isValid2 =  textRegExp.test(firstName.value);
    const isValid3 =  textRegExp.test(lastName.value);
    const isValid4 =  textRegExp.test(subject.value);

    if (!isValid2) {
      firstName.className = "invalid";
      error.className = "error active";
    } else {
      firstName.className = "valid";
      error.textContent = "";
      error.className = "error";
    }

    if (!isValid3) {
      lastName.className = "invalid";
      error.className = "error active";
    } else {
      lastName.className = "valid";
      error.textContent = "";
      error.className = "error";
    }

    if (!isValid1) {
      email.className = "invalid";
      error.className = "error active";
    } else {
      email.className = "valid";
      error.textContent = "";
      error.className = "error";
    }

    if (!isValid4) {
      subject.className = "invalid";
      error.className = "error active";
    } else {
      subject.className = "valid";
      error.textContent = "";
      error.className = "error";
    }

    if(isValid1 && isValid2 && isValid3 && isValid4){
      submissionCount++; 
      updateLocalStorage();
      updateCounter();
      const element = document.querySelector("form");
      element.reset();
    }
  });

  updateCounter();


 