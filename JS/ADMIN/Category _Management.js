// OPEN + CLOSE FORM ADD
const openForm = document.querySelector("#openForm");
const closeForms = document.querySelectorAll("#closeForm");
const formAddmodal = document.querySelector(".formAddmodal");
const formAddOverlay = document.querySelector(".formAddOverlay");
const submitForm = document.querySelector("#submitForm");

openForm.addEventListener("click", () => {
  formAddOverlay.classList.toggle("hidden");
});

closeForms.forEach((closeForm) => {
  closeForm.addEventListener("click", () => {
    resetForm();
  });
});

// =====================
// OPEN + CLOSE SUBACCOUNT
const settingDown = document.querySelector(".fa-chevron-down");
const subAccount = document.querySelector(".sub__menu__account");

settingDown.addEventListener("click", (e) => {
  e.stopPropagation();
  subAccount.classList.toggle("hidden");
});

subAccount.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  subAccount.classList.add("hidden");
});

// SUBMIT FORM
const categoryName = document.querySelector("#categoryName");
const imageInput = document.querySelector("#imageInput");
const tbody = document.querySelector("tbody");
let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];

let isEdit = false;
// VALIDATE INPUT
// SHOW ERROR
function showError(input, message) {
  let parent = input.parentElement;
  let span = parent.querySelector("span");
  span.innerHTML = message;
}
// SHOWSUCCESS
function showSucces(input) {
  let parent = input.parentElement;
  let span = parent.querySelector("span");
  span.innerHTML = "";
}
// CHECKEMPTY
function checkEmpty(listInput) {
  let checkEmpty = true;
  for (let i = 0; i < listInput.length; i++) {
    let input = listInput[i];
    input.value = input.value.trim();
    if (!input.value) {
      checkEmpty = false;
      showError(input, "khong duoc trong");
    } else {
      showSucces(input);
    }
  }
  return checkEmpty;
}

// SEARCH
const btnSearch = document.querySelector("#btn-search");

btnSearch.addEventListener("click", () => {
  let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
  const contentSearch = document
    .querySelector(".search-input")
    .value.toLowerCase();
  categoriesFilter = categoriesLocal.filter((item) =>
    item.categoryName.toLowerCase().includes(contentSearch)
  );
  renderCategory(categoriesFilter);
});

formAddmodal.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmpty = checkEmpty([categoryName, imageInput]);
  if (isEmpty) {
    let categories = {
      categoryId: Math.floor(Math.random() * 9999999999),
      categoryName: categoryName.value,
      // image: imageBase64,
      image: imageInput.value,
      status: true,
    };

    // CHECK EDIT OR ADD
    if (isEdit) {
      categoriesLocal[editIndex].categoryName = categoryName.value;
      categoriesLocal[editIndex].image = imageInput.value;
    } else {
      categoriesLocal.push(categories);
    }
    localStorage.setItem("FFcategories", JSON.stringify(categoriesLocal));
    renderCategory();
    resetForm();
  }
});

// // Nhập file ảnh chuyển đổi flie về ảnh dùng onchange="convertToBase64()
// const imageProductHTML = document.getElementById("image-product");
// let imageBase64 = null;

// function convertToBase64() {
//   const fileInput = document.getElementById("input-image");
//   const file = fileInput.files[0];
//   const reader = new FileReader(); //đọc data của 1 hình ảnh

//   reader.onload = function (e) {
//     const base64 = e.target.result;
//     imageBase64 = base64;
//     imageProductHTML.src = imageBase64;
//   };
//   reader.readAsDataURL(file);
// }

// DELETE CATEGORY
function Del(id) {
  let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
  let index = categoriesLocal.findIndex((cat) => cat.categoryId == id);
  if (confirm("Do you want to delete?")) {
    categoriesLocal.splice(index, 1);
    localStorage.setItem("FFcategories", JSON.stringify(categoriesLocal));
    renderCategory();
  }
}

// EDIT CATEGORY
function Edit(id) {
  let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
  const index = categoriesLocal.findIndex((item) => item.categoryId === id);
  formAddOverlay.classList.toggle("hidden");
  categoryName.value = categoriesLocal[index].categoryName;
  imageInput.value = categoriesLocal[index].image;
  submitForm.innerHTML = "Edit";
  isEdit = true;
  editIndex = index;
}

// CHANGE ACTIVE/BLOCK

function changeStatus(id) {
  let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
  const index = categoriesLocal.findIndex((item) => item.categoryId === id);
  categoriesLocal[index].status = !categoriesLocal[index].status;
  localStorage.setItem("FFcategories", JSON.stringify(categoriesLocal));
  renderCategory();
}

// RESET FORM
function resetForm() {
  isEdit = false;
  submitForm.innerHTML = "Add";
  categoryName.value = "";
  // imageProductHTML.src = "";
  // imageBase64 = null;
  imageInput.value = "";
  formAddOverlay.classList.toggle("hidden");
}

// DEVICE PAGE
const pageList = document.getElementById("page-list");
let pageSize = 3;
let totalPage = 1;
let currentPage = 1;

// MOVEPAGE
function movePage(index) {
  currentPage = index;
  renderCategory();
}

// RENDER

function renderCategory(data) {
  let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
  if (Array.isArray(data)) {
    categoriesLocal = data;
  }

  totalPage = Math.ceil(categoriesLocal.length / pageSize);
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

  if (categoriesLocal.length - 1 <= end) {
    end = categoriesLocal.length - 1;
  }

  for (let i = start; i <= end; i++) {
    trHtml += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${categoriesLocal[i].categoryId}</td>
                    <td>${categoriesLocal[i].categoryName}</td>
                    <td class="img-container">                   
                    <img src="../../ASSET/IMAGE/CATEGORY/${
                      categoriesLocal[i].image
                    }" alt="" />           
                    </td>
                    <td>${categoriesLocal[i].status ? "Active" : "Block"}</td>
                    <td>20/05/2024</td>
                    <td><button onclick="Edit(${
                      categoriesLocal[i].categoryId
                    })">Edit</button>
                    <button onclick="changeStatus(${
                      categoriesLocal[i].categoryId
                    })">${
      categoriesLocal[i].status ? "Block" : "Active"
    }</button>
                    <button onclick="Del(${
                      categoriesLocal[i].categoryId
                    })">Delete</button></td>
                </tr>
      `;
  }
  tbody.innerHTML = trHtml;
}

renderCategory();

// SIGN OUT
const btnCancel = document.querySelector("#btnCancel");
const btnOK = document.querySelector("#btnOK");
const signOutOverlay = document.querySelector(".signOutOverlay");
const signOut = document.querySelector("#signOut");

signOutOverlay.addEventListener("click", (e) => {
  e.stopPropagation();
});

signOut.addEventListener("click", (e) => {
  signOutOverlay.classList.toggle("hidden");
});

btnOK.addEventListener("click", () => {
  window.location.href = "../SignIn.html";
});

btnCancel.addEventListener("click", (e) => {
  signOutOverlay.classList.toggle("hidden");
});

// CHANGE PAGE
function changePage() {}
