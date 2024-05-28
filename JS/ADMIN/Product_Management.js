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

// Nhập file ảnh chuyển đổi flie về ảnh dùng onchange="convertToBase64()
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

// RENDER CATEGORY OPTION
let selectCategory = document.querySelector(".selectCategory");
let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
let opts = "";
for (let i = 0; i < categoriesLocal.length; i++) {
  opts += `
  <option value="${categoriesLocal[i].categoryId}">${categoriesLocal[i].categoryName}</option>
    `;

  selectCategory.innerHTML = opts;
}
// SUBMIT FORM
const productName = document.querySelector("#productName");
const imageInput = document.querySelector("#imageInput");
const stockInput = document.querySelector("#stockInput");
const priceInput = document.querySelector("#priceInput");
const disPriceInput = document.querySelector("#disPriceInput");
const detailsInput = document.querySelector("#detailsInput");
const tbody = document.querySelector("tbody");
let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];

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
    input.value = input.value;
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
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  const contentSearch = document
    .querySelector(".search-input")
    .value.toLowerCase();
  productsFilter = productsLocal.filter((item) =>
    item.productName.toLowerCase().includes(contentSearch)
  );
  renderProduct(productsFilter);
});

formAddmodal.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmpty = checkEmpty([
    productName,
    stockInput,
    // priceInput,
    disPriceInput,
    imageInput,
  ]);
  if (isEmpty) {
    let products = {
      productId: Math.floor(Math.random() * 9999999),
      productName: productName.value,
      // image: imageBase64,
      image: imageInput.value,
      categoryName: selectCategory.value,
      price: +priceInput.value,
      stock: +stockInput.value,
      discountPrice: +disPriceInput.value,
      details: detailsInput.value.split(","),
      status: true,
      createDate: new Date().toISOString().split("T")[0],
    };

    // CHECK EDIT OR ADD
    if (isEdit) {
      productsLocal[editIndex].productName = productName.value;
      productsLocal[editIndex].image = imageInput.value;
      productsLocal[editIndex].price = priceInput.value;
      productsLocal[editIndex].stock = stockInput.value;
      productsLocal[editIndex].disPriceInput = imageInput.value;
      productsLocal[editIndex].categoryName = selectCategory.value;
    } else {
      productsLocal.push(products);
    }
    localStorage.setItem("FFproducts", JSON.stringify(productsLocal));
    renderProduct();
    resetForm();
  }
});

// DELETE PRODUCT
function Del(index) {
  if (confirm("Do you want to delete?")) {
    skillsLocal.splice(index, 1);
    renderProduct();
  }
}

// EDIT PRODUCT
function Edit(id) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  const index = productsLocal.findIndex((item) => item.productId === id);
  formAddOverlay.classList.toggle("hidden");
  productName.value = productsLocal[index].productName;
  imageInput.value = productsLocal[index].image;
  detailsInput.value = productsLocal[index].details;
  priceInput.value = productsLocal[index].price;
  disPriceInput.value = productsLocal[index].discountPrice;
  stockInput.value = productsLocal[index].stock;
  selectCategory.value = productsLocal[index].categoryName;
  submitForm.innerHTML = "Edit";
  isEdit = true;
  editIndex = index;
}

// CHANGE ACTIVE/BLOCK

function changeStatus(id) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  const index = productsLocal.findIndex((item) => item.productId === id);
  productsLocal[index].status = !productsLocal[index].status;
  localStorage.setItem("FFproducts", JSON.stringify(productsLocal));
  renderProduct();
}

// RESET FORM
function resetForm() {
  isEdit = false;
  submitForm.innerHTML = "Add";
  productName.value = "";
  priceInput.value = "";
  stockInput.value = "";
  disPriceInput.value = "";
  detailsInput.value = "";
  imageInput.value = "";
  // imageProductHTML.src = "";
  // imageBase64 = null;
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
  renderProduct();
}

// RENDER

function renderProduct(data) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  if (Array.isArray(data)) {
    productsLocal = data;
  }

  totalPage = Math.ceil(productsLocal.length / pageSize);
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

  if (productsLocal.length - 1 <= end) {
    end = productsLocal.length - 1;
  }

  for (let i = start; i <= end; i++) {
    let categoriesLocal =
      JSON.parse(localStorage.getItem("FFcategories")) || [];

    let idCat = productsLocal[i].categoryName;

    let catFind = categoriesLocal.find((cat) => cat.categoryId == idCat);

    trHtml += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productsLocal[i].productName}</td>
                    <td class="img-container">                   
                    <img src="../../ASSET/IMAGE/PRODUCT/${
                      productsLocal[i].image
                    }" alt="img" />           
                    </td>
                    <td>${productsLocal[i].price}</td>
                    <td>${productsLocal[i].stock}</td>
                    <td>${catFind.categoryName}</td>
                    <td>${productsLocal[i].details}</td>
                    <td>${productsLocal[i].discountPrice}</td>
                    <td>${productsLocal[i].status ? "Active" : "Block"}</td>
                    <td>${productsLocal[i].createDate}</td>
                    <td><button onclick="Edit(${
                      productsLocal[i].productId
                    })">Edit</button>
                    <button onclick="changeStatus(${
                      productsLocal[i].productId
                    })">${productsLocal[i].status ? "Block" : "Active"}</button>
                    <button onclick="Del(${
                      productsLocal[i].productId
                    })">Delete</button></td>
                </tr>
      `;
  }
  tbody.innerHTML = trHtml;
}

renderProduct();

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
