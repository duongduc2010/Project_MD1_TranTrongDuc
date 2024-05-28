const signInModal = document.querySelector(".signInModal");
const userInput = document.querySelector("#userInput");
const passwordInput = document.querySelector("#passwordInput");
const ShowPassword = document.querySelector("#ShowPassword");

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

// EVENT SUBMIT FORM
signInModal.addEventListener("submit", (e) => {
  e.preventDefault();
  let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
  console.log(usersLocal);
  let flag = false;
  //   CHECK THE ACCOUNT
  // ADMIN ACCOUNT
  if (userInput.value == "admin@123" && passwordInput.value == "123456789") {
    // flag = true;
    return (window.location.href = "Admin/Account_Management.html");
  }
  for (let i = 0; i < usersLocal.length; i++) {
    let user = usersLocal[i];
    // USER ACCOUNT
    if (
      userInput.value == user.email &&
      passwordInput.value == user.password &&
      user.status == true
    ) {
      // CURRENT ACCOUNT
      let currentAccountLocal =
        JSON.parse(localStorage.getItem("current_accout")) || [];
      let currentAccount = {
        emailCurrent: user.email,
        passwordCurrent: user.password,
        fullName: "",
        dob: "",
        phoneNumber: "",
      };

      currentAccountLocal.push(currentAccount);

      localStorage.setItem(
        "current_account",
        JSON.stringify(currentAccountLocal)
      );
      flag = true;
      break;
    }
  }

  if (flag) {
    window.location.href = "User/Index.html";
  } else {
    passwordInput.value = "";
    Swal.fire({
      icon: "error",
      title: "Failed",
      customClass: "swal-wide",
      text: "Login failed",
      confirmButtonText: "Try again",
    });
  }
});
