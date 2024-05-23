const accountIcon = document.querySelector("#accountIcon");
const formSignUp = document.querySelector(".signUp");
const modalSignUp = document.querySelector(".modal-signUp");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const cfPassword = document.querySelector("#cfPassword");
const ShowPassword = document.querySelector("#ShowPassword");
const ShowCfPassword = document.querySelector("#ShowCfPassword");
// ==========================
// VALIDATE INPUT
// SHOW ERROR
function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  small.innerHTML = message;
}

// SHOW SUCCESS
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  small.innerHTML = "";
}

// CHECK EMPTY INPUT
function checkEmpty(listInput) {
  let checkEmpty = true;
  for (let i = 0; i < listInput.length; i++) {
    let input = listInput[i];
    if (!input.value.trim()) {
      checkEmpty = false;
      showError(input, "not be empty");
    } else {
      showSuccess(input);
    }
  }
  return checkEmpty;
}

// CHECK EMAIL REGEX
function checkEmail(input) {
  input.value = input.value.trim();
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (input.value == "") {
    showError(input, "not be empty");
    return false;
  }
  if (!emailRegex.test(input.value)) {
    showError(input, "Wrong format");
    return false;
  }
  return checkLengthInput(input, "Email", 8, 15);
}

// CHECK LENGTH INPUT
function checkLengthInput(input, name, min, max) {
  input.value = input.value.trim();
  if (input.value == "") {
    showError(input, "not be empty");
    return false;
  } else if (input.value.length < min) {
    showError(input, `length of ${name} minimum at ${min} char`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `length of ${name} maximum at ${max} char`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// CHECK PASSWORD MATCH
function checkMatchPassword(passwordInput, cfPassword) {
  if (cfPassword.value == "") {
    showError(cfPassword, "not be empty");
    return false;
  } else if (passwordInput.value != cfPassword.value) {
    showError(cfPassword, "Password is not match");
    return false;
  } else {
    showSuccess(cfPassword);
    return true;
  }
}

// SUBMIT FORM SIGN UP
formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();
  const isNotEmpty = checkEmpty([emailInput, passwordInput, cfPassword]);
  const isPasswordLengthValid = checkLengthInput(
    passwordInput,
    "Password",
    6,
    12
  );
  const isEmailValid = checkEmail(emailInput);
  const isPasswordMatch = checkMatchPassword(passwordInput, cfPassword);

  if (isNotEmpty && isPasswordLengthValid && isEmailValid && isPasswordMatch) {
    // SIGN UP SUCCESFULL
    const usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
    const user = {
      id: Math.floor(Math.random() * 9999999999),
      username: "",
      email: emailInput.value,
      password: passwordInput.value,
      status: true,
      permission: "user",
      order: "",
      wishlist: "",
    };
    usersLocal.push(user);
    localStorage.setItem("FFusers", JSON.stringify(usersLocal));
    emailInput.value = "";
    passwordInput.value = "";
    cfPassword.value = "";
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sign up successfully!!!",
      customClass: "swal-wide",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "./SignIn.html";
    });
  }
  // else {
  //   // SIGN UP ERROR
  //   Swal.fire({
  //     icon: "error",
  //     title: "Failed",
  //     customClass: "swal-wide",
  //     text: "Password is not match!",
  //     confirmButtonText: "Try again",
  //   });
  // }
});

// SHOW PASSWORD
ShowPassword.addEventListener("click", () => {
  if (ShowPassword.classList.contains("fa-eye-slash")) {
    ShowPassword.classList.remove("fa-eye-slash");
    ShowPassword.classList.add("fa-eye");
    passwordInput.type = "text";
  } else {
    ShowPassword.classList.remove("fa-eye");
    ShowPassword.classList.add("fa-eye-slash");
    passwordInput.type = "password";
  }
});

// SHOW CF PASSWORD
ShowCfPassword.addEventListener("click", () => {
  if (ShowCfPassword.classList.contains("fa-eye-slash")) {
    ShowCfPassword.classList.remove("fa-eye-slash");
    ShowCfPassword.classList.add("fa-eye");
    cfPassword.type = "text";
  } else {
    ShowCfPassword.classList.remove("fa-eye");
    ShowCfPassword.classList.add("fa-eye-slash");
    cfPassword.type = "password";
  }
});
