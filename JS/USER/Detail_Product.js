// ============================
// HEADER

// OPEN+CLOSE LANGUAGE AND DOWNLOAD
const headerLanguage = document.querySelector(".header__language");
const headerDownloadApp = document.querySelector(".header__downloadApp");
const languageInner = document.querySelector(".header__language__inner");
const downloadInner = document.querySelector(".header__downloadApp__inner");

headerLanguage.addEventListener("click", (e) => {
  e.stopPropagation();
  languageInner.classList.toggle("hidden");
});

headerDownloadApp.addEventListener("click", (e) => {
  e.stopPropagation();
  downloadInner.classList.toggle("hidden");
});

window.addEventListener("click", () => {
  languageInner.classList.add("hidden");
  downloadInner.classList.add("hidden");
});

// OPEN + CLOSE SUBACCOUNT
const accountIcon = document.querySelector("#accountIcon");
const subAccount = document.querySelector(".sub__menu__account");

accountIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  subAccount.classList.toggle("hidden");
});

subAccount.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  subAccount.classList.add("hidden");
});

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

let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
let productsCartLocal =
  JSON.parse(localStorage.getItem("FFproductsCart")) || [];

// ========================
// CART
const cartIcon = document.querySelector("#cartIcon");
const cartOverlay = document.querySelector(".cartOverlay");
const cartModal = document.querySelector(".cartModal");
const ulCart = document.querySelector("#ulCart");
const quantity = document.querySelector("#quantity");
const priceCart = document.querySelector("#totalPrice");
const quantityCart = document.querySelector(".quantity-cart");

cartIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  cartOverlay.classList.toggle("hidden");
});

cartModal.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  cartOverlay.classList.add("hidden");
});

// RENDER CART
function renderCart() {
  let liCart = "";
  let totalPrice = 0;
  let totalCart = 0;
  for (let i = 0; i < productsCartLocal.length; i++) {
    if (productsCartLocal[i] != null) {
      liCart += `
        <li class="cart__content__listItem flex">
                  <div class="img-cart">
                    <a href="">
                      <img
                        class=""
                        src="../../ASSET/IMAGE/PRODUCT/${
                          productsCartLocal[i].image
                        }"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="details-cart">
                    <a href="">${productsCartLocal[i].productName}</a>
                    <p>${productsCartLocal[
                      i
                    ].discountPrice.toLocaleString()} ₫</p>
                    <div class="quantity-group flex">
                      <button onclick="changeQuantity(${i},${
        productsCartLocal[i].quantity - 1
      })" class="quantity-btn">-</button>
                      <p id="quantity">${productsCartLocal[i].quantity}</p>
                      <button onclick="changeQuantity(${i},${
        productsCartLocal[i].quantity + 1
      })" class="quantity-btn">+</button>
                    </div>
                    <div><i onclick="delCart(${i})" class="fa-solid fa-trash"></i></div>
                  </div>
        `;
      totalCart = totalCart + productsCartLocal[i].quantity;
      totalPrice =
        totalPrice +
        productsCartLocal[i].discountPrice * productsCartLocal[i].quantity;
    }
  }
  quantityCart.innerHTML = totalCart;
  priceCart.innerHTML = totalPrice.toLocaleString() + " ₫";
  ulCart.innerHTML = liCart;
  localStorage.setItem("FFproductsCart", JSON.stringify(productsCartLocal));
}
renderCart();

// ADD ITEMS TO CART
function addCart(id) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];

  let index = productsLocal.findIndex((pro) => pro.productId == id);
  if (productsCartLocal[index] == null) {
    productsCartLocal[index] = { ...productsLocal[index], quantity: 1 };
  } else {
    productsCartLocal[index].quantity += 1;
  }
  renderCart();
}

// CHANGE QUANTITY
function changeQuantity(index, newQuantity) {
  if (newQuantity <= 0) {
  } else {
    productsCartLocal[index].quantity = newQuantity;
  }
  renderCart();
}

// DELETE CART
function delCart(index) {
  productsCartLocal.splice(index, 1);
  renderCart();
}

// ===========================
// RENDER CATEGORY
const menuDot = document.querySelector(".category__dot");
const ulCategory = document.querySelector(".category__list");
let categoryChoose = null;

let pageSize = 9;
let totalPage = 1;
let currentPage = 1;
let currentItem = 0;

// MOVE DOT
function moveDot(index) {
  currentPage = index;
  renderCategory();
}

// RENDER DETAIL

document.addEventListener("DOMContentLoaded", function () {
  // Lấy ID sản phẩm từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log(id);

  if (id) {
    // Lấy dữ liệu sản phẩm từ local storage
    let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];

    // const products = JSON.parse(localStorage.getItem("products"));
    const product = productsLocal.find((p) => p.productId == id);

    if (product) {
      // Hiển thị thông tin chi tiết sản phẩm
      const productDetail = document.querySelector(".main__content");
      productDetail.innerHTML = `
      <div class="img-field">
      <img src="../../ASSET/IMAGE/PRODUCT/${product.image}" alt="" />
    </div>
    <div class="information">
      <h1 class="productName">${product.productName}</h1>
      <p class="discountPrice">${product.discountPrice.toLocaleString()} ₫</p>
      ${
        product.price.toLocaleString() != 0
          ? `
      <p class="price">${product.price.toLocaleString()} ₫</p>`
          : ""
      }
      <div class="border-dash"></div>
      <div class="list-details">
        <p>${product.details[0] || ""}</p>
        <p>${product.details[1] || ""}</p>        
      </div>
    </div>
          `;
    } else {
      // Xử lý khi không tìm thấy sản phẩm
      document.getElementById("product-detail").innerText =
        "Sản phẩm không tồn tại.";
    }
  } else {
    // Xử lý khi không có ID sản phẩm trong URL
    document.getElementById("product-detail").innerText =
      "Không tìm thấy sản phẩm.";
  }
});

// BACK BUTTON
function backPage() {
  window.location.href = "Index.html";
}
