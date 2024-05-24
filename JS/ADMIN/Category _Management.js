const openModal = document.querySelector("#openModal");
const closeModals = document.querySelectorAll("#closeModal");
const formModal = document.querySelector(".modal__form");
const formAdd = document.querySelector(".formAdd");
const submitForm = document.querySelector("#submitForm");

// OPEN/CLOSE MODAL
openModal.addEventListener("click", () => {
  formAdd.classList.add("open-modal");
});

closeModals.forEach((closeModal) => {
  closeModal.addEventListener("click", () => {
    formAdd.classList.remove("open-modal");
    resetForm();
  });
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

formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmpty = checkEmpty([categoryName, imageInput]);
  if (isEmpty) {
    let categories = {
      categoryId: Math.floor(Math.random() * 9999999999),
      categoryName: categoryName.value,
      image: imageInput.value,
      status: true,
    };

    // EDIT OR ADD
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
  //   else {
  //     alert("sai");
  //   }
});

// RESET FORM
function resetForm() {
  isEdit = false;
  submitForm.innerHTML = "Add";
  categoryName.value = "";
  imageInput.value = "";
  formAdd.classList.remove("open-modal");
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
                    })">Edit</button></td>
                    <td><button onclick="changeStatus(${
                      categoriesLocal[i].categoryId
                    })">${
      categoriesLocal[i].status ? "Block" : "Active"
    }</button></td>
                    <td><button onclick="Del(${
                      categoriesLocal[i].categoryId
                    })">Delete</button></td>
                </tr>
      `;
  }
  tbody.innerHTML = trHtml;
}

renderCategory();

// DELETE SKILL
function Del(index) {
  if (confirm("Do you want to delete?")) {
    skillsLocal.splice(index, 1);
    renderCategory();
  }
}

// EDIT SKILL
function Edit(id) {
  let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
  const index = categoriesLocal.findIndex((item) => item.categoryId === id);

  formAdd.classList.add("open-modal");
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

// CHANGE PAGE
function changePage() {}
