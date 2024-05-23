const openModal = document.querySelector("#openModal");
const closeModals = document.querySelectorAll("#closeModal");
const formModal = document.querySelector(".modal__form");
const overlay = document.querySelector(".overlay");
const btnSearch = document.querySelector("#btn-search");

// function renderPaginations(products) {
//   totalPage = Math.ceil(products.length / pageSize); //làm trên lên
//   let stringHTML = "";
//   for (let i = 1; i <= totalPage; i++) {
//     if (currentPage === i) {
//       stringHTML += `
//             <span class="page-item page-active" onclick="clickPage(${i})">${i}</span>
//             `;
//     } else {
//       stringHTML += `
//             <span class="page-item " onclick="clickPage(${i})">${i}</span>
//             `;
//     }
//   }
//   pageList.innerHTML = stringHTML;
// }

// realusers = renderPaginations(realProducts);

// OPEN/CLOSE MODAL
openModal.addEventListener("click", () => {
  overlay.classList.add("open-modal");
});

closeModals.forEach((closeModal) => {
  closeModal.addEventListener("click", () => {
    overlay.classList.remove("open-modal");
    resetForm();
  });
});
// SUBMIT FORM
const skillInput = document.querySelector("#skillInput");
const experienceInput = document.querySelector("#experienceInput");
const imageInput = document.querySelector("#imageInput");
const tbody = document.querySelector("tbody");
let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
// let isEdit = false;
// VALIDATE INPUT
// function showError(input, message) {
//   let parent = input.parentElement;
//   let span = parent.querySelector("span");
//   span.innerHTML = message;
// }

// function showSucces(input) {
//   let parent = input.parentElement;
//   let span = parent.querySelector("span");
//   span.innerHTML = "";
// }

// function checkEmpty(listInput) {
//   let checkEmpty = false;
//   for (let i = 0; i < listInput.length; i++) {
//     let input = listInput[i];
//     input.value = input.value.trim();
//     if (!input.value) {
//       checkEmpty = true;
//       showError(input, "khong duoc trong");
//     } else {
//       showSucces(input);
//     }
//   }
//   return checkEmpty;
// }

// SEARCH

btnSearch.addEventListener("click", () => {
  renderAccount();
});

formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  let checkEmptyInput = checkEmpty([skillInput, experienceInput, imageInput]);
  if (!checkEmptyInput) {
    let skill = {
      skill: skillInput.value,
      experience: experienceInput.value,
      image: imageInput.value,
    };

    // EDIT OR ADD
    if (isEdit) {
      skillsLocal[editIndex].skill = skillInput.value;
      skillsLocal[editIndex].experience = experienceInput.value;
      skillsLocal[editIndex].image = imageInput.value;
    } else {
      skillsLocal.push(skill);
    }

    renderAccount();
    resetForm();
  }
  //   else {
  //     alert("sai");
  //   }
});

function resetForm() {
  isEdit = false;
  submitForm.innerHTML = "Add";
  skillInput.value = "";
  experienceInput.value = "";
  imageInput.value = "";
  overlay.classList.remove("open-modal");
}

// DEVICE PAGE
const pageList = document.getElementById("page-list");
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

// MOVEPAGE
let tests = document.querySelectorAll(".page-number");
function movePage(index) {
  currentPage = index;
  renderAccount();
}

// RENDER
const contentSearch = document.querySelector(".search-input");

function renderAccount(data) {
  let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
  if (Array.isArray(data)) {
    usersLocal = data;
  }

  usersLocal = usersLocal.filter((item) =>
    item.email.toLowerCase().includes(contentSearch.value)
  );

  totalPage = Math.ceil(usersLocal.length / 5);
  let page = "";
  for (let i = 1; i <= totalPage; i++) {
    if (currentPage == i) {
      page += `<span onclick="movePage(${i})" class="page-number active-page">${i}</span>`;
    } else {
      page += `<span onclick="movePage(${i})" class="page-number ">${i}</span>`;
    }
  }
  pageList.innerHTML = page;
  let start = 0;
  let end = 0;
  start = (currentPage - 1) * pageSize;
  end = pageSize * currentPage - 1;

  let trHtml = "";

  if (usersLocal.length < end) {
    end = usersLocal.length - 1;
  }

  for (let i = start; i <= end; i++) {
    trHtml += `
                <tr>
                    <td>${i + 1}</td>
                    <td></td>
                    <td>${usersLocal[i].email}</td>
                    <td>${usersLocal[i].status ? "Active" : "Block"}</td>
                    <td>20/05/2024</td>
                    <td><button onclick="Edit(${
                      usersLocal[i].id
                    })">Edit</button></td>
                    <td><button onclick="changeStatus(${usersLocal[i].id})">${
      usersLocal[i].status ? "Block" : "Active"
    }</button></td>
                    <td><button onclick="Del(${
                      usersLocal[i].id
                    })">Delete</button></td>
                </tr>
      `;
  }
  tbody.innerHTML = trHtml;
}

renderAccount();

// DELETE SKILL
function Del(index) {
  if (confirm("Do you want to delete?")) {
    skillsLocal.splice(index, 1);
    renderAccount();
  }
}

// EDIT SKILL
const submitForm = document.querySelector("#submitForm");
function Edit(index) {
  overlay.classList.add("open-modal");
  skillInput.value = skillsLocal[index].skill;
  experienceInput.value = skillsLocal[index].experience;
  imageInput.value = skillsLocal[index].image;
  submitForm.innerHTML = "Edit";
  isEdit = true;
  editIndex = index;
}

// CHANGE ACTIVE/BLOCK

function changeStatus(id) {
  let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
  const index = usersLocal.findIndex((item) => item.id === id);
  usersLocal[index].status = !usersLocal[index].status;
  localStorage.setItem("FFusers", JSON.stringify(usersLocal));
  renderAccount();
}

// CHANGE PAGE
function changePage() {}
