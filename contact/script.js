const form = document.querySelector("form");
const email = document.getElementById("inputEmail");
const firstName = document.getElementById("inputFirstName");
const lastName = document.getElementById("inputLastName");
const subject = document.getElementById("inputSubject");
const message = document.getElementById("message");
const error1 = firstName.previousElementSibling;
const error2 = lastName.previousElementSibling;
const error3 = email.previousElementSibling;
const error4 = subject.previousElementSibling;
const error5 = message.previousElementSibling;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,10}$/;
const textRegExp =/^[ a-zA-Z0-9,#.-]+$/;

let submissionCount = localStorage.getItem("submissionCount") ? parseInt(localStorage.getItem("submissionCount")) : 0;
let array = localStorage.getItem("submissions") ? JSON.parse(localStorage.getItem("submissions")) : [];


function updateCounter() {
  document.getElementById("submissionCounter").innerText = "Submissions: " + submissionCount;
}

function updateLocalStorage() {
  localStorage.setItem("submissionCount", submissionCount.toString());
}


//a is for a value from form
function valid(a,regEx){
    const isValid =  regEx.test(a.value);
    a.className = isValid ? "valid" : "invalid";
}


function validation(a,regEx,error){
    const isValid = a.value.length === 0 || regEx.test(a.value);
    if (isValid) {
      a.className = "valid";
      error.textContent = "";
      error.className = "error";
    } else {
      a.className = "invalid";
    }
  }

   window.addEventListener("load", valid(firstName,textRegExp,error1));
   firstName.addEventListener("input", validation(firstName,textRegExp,error1));
   window.addEventListener("load", valid(lastName,textRegExp,error2));
   lastName.addEventListener("input", validation(lastName,textRegExp,error2));
   window.addEventListener("load", valid(email,emailRegExp,error3));
   email.addEventListener("input", validation(email,emailRegExp,error3));
   window.addEventListener("load", valid(subject,textRegExp,error4));
   subject.addEventListener("input", validation(subject,textRegExp,error4));
   window.addEventListener("load", valid(message,textRegExp,error5));
   message.addEventListener("input", validation(message,textRegExp,error5));

    form.addEventListener("submit", (event) => {
    event.preventDefault();

    const first = firstName.value.trim();
    const second = lastName.value.trim();
    const thirdEmail = email.value.trim();
    const fourthSubject = subject.value.trim();
    const fifthMessage = message.value.trim();
    
    const isValid1 = textRegExp.test(firstName.value);
    const isValid2 = textRegExp.test(lastName.value);
    const isValid3 = emailRegExp.test(email.value);
    const isValid4 = textRegExp.test(subject.value);
    const isValid5 = textRegExp.test(message.value);

    let name = ["first name" ,"last name", "email", "subject", "message"];
    function validMessage(isValid, a, error,i){
      if (!isValid) {
        a.className = "invalid";
        error.textContent = "Enter a valid " + name[i];
        error.className = "error active";
      } else {
        a.className = "valid";
        error.textContent = "";
        error.className = "error";
      }
    }

    validMessage(isValid1, firstName, error1,0);
    validMessage(isValid2, lastName, error2,1);
    validMessage(isValid3, email, error3,2);
    validMessage(isValid4, subject, error4,3);
    validMessage(isValid5, message, error5,4);
  
    if(isValid1 && isValid2 && isValid3 && isValid4){
      updateLocalStorage();
      updateCounter();
      const element = document.querySelector("form");
      element.reset();
      const submission = { firstName: first, lastName: second, email: thirdEmail, subject: fourthSubject, message: fifthMessage};
      array.push(submission);
      localStorage.setItem("submissions", JSON.stringify(array));
      submissionCount++; 
    }
   
  });

  updateCounter();


 