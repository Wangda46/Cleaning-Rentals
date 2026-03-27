// Search Function
function searchSite() {
  let inputValue = document.getElementById("searchInput").value.toLowerCase();

  if (inputValue === "home") {
    alert("Opening Home Section");
  } else if (inputValue === "about") {
    alert("Opening About Section");
  } else if (inputValue === "service") {
    alert("Opening Service Section");
  } else if (inputValue === "design") {
    alert("Opening Design Section");
  } else if (inputValue === "contact") {
    alert("Opening Contact Section");
  } else {
    alert("Result not found");
  }

  document.getElementById("searchInput").value = "";
}

// Login Form Handling
document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault(); // stop form from submitting

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === "leki" && password === "1234"){
        // alert("Login Successful");
        window.location.href = "home.html"; // go to home page
    }
    else if(username === "" || password === ""){
        alert("Please fill in all fields");
    }
    else{
        alert("Wrong username or password");
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("rememberMe").checked = "";
});

// Get Elements
let form = document.getElementById("signupForm");
let firstName = document.getElementById("fname");
let lastName = document.getElementById("lname");
let passwordField = document.getElementById("password");
let confirmPasswordField = document.getElementById("confirmPassword");
let error = document.getElementById("error");

let togglePassword = document.getElementById("togglePassword");
let toggleConfirm = document.getElementById("toggleConfirm");


// FORM VALIDATION
form.addEventListener("submit", function(e){

    e.preventDefault(); // stop default submit

    // check empty fields
    if(firstName.value === "" || 
       lastName.value === "" || 
       passwordField.value === "" || 
       confirmPasswordField.value === ""){

        error.innerText = "Please fill all the fields";
        return;
    }

    // check password match
    if(passwordField.value !== confirmPasswordField.value){
        error.innerText = "Passwords do not match";
        return;
    }

    // if everything correct
    error.innerText = "";
    window.location.href = "home.html";
});


// PASSWORD SHOW / HIDE
togglePassword.addEventListener("click", function(){

    if(passwordField.type === "password"){
        passwordField.type = "text";
    }
    else{
        passwordField.type = "password";
    }

});

// CONFIRM PASSWORD SHOW / HIDE
toggleConfirm.addEventListener("click", function(){

    if(confirmPasswordField.type === "password"){
        confirmPasswordField.type = "text";
    }
    else{
        confirmPasswordField.type = "password";
    }

});
