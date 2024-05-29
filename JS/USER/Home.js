const menuDot = document.querySelector(".category__dot");
const ulCategory = document.querySelector(".category__list");
const ulProduct = document.querySelector(".product");

let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
let productsCartLocal =
  JSON.parse(localStorage.getItem("FFproductsCart")) || [];
let accountActive = JSON.parse(localStorage.getItem("FFaccountActive")) || [];

// ===========================
// RENDER CATEGORY

let categoryChoose = null;

let pageSize = 9;
let totalPage;
let currentPage = 1;
let currentItem = 0;

let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
categoriesLocal = categoriesLocal.filter((el) => el.status == true);
categoryChoose = categoriesLocal[0].categoryId;

function renderCategory(data) {
  let categoriesLocal = JSON.parse(localStorage.getItem("FFcategories")) || [];
  if (Array.isArray(data)) {
    categoriesLocal = data;
  }

  totalPage = Math.ceil(categoriesLocal.length / pageSize);
  let dot = "";
  for (let i = 1; i <= totalPage; i++) {
    if (currentPage == i) {
      dot += `<span onclick="moveDot(${i})" class="active__dot"></span>`;
    } else {
      dot += `<span onclick="moveDot(${i})"></span>`;
    }
  }

  menuDot.innerHTML = dot;
  let start = 0;
  let end = 0;
  start = (currentPage - 1) * pageSize;
  end = pageSize * currentPage - 1;

  let liHtml = "";
  if (categoriesLocal.length - 1 <= end) {
    end = categoriesLocal.length - 1;
    start = end - (pageSize - 1);
    if (start < 0) {
      start = 0;
    }
  }

  for (let i = start; i <= end; i++) {
    if (categoriesLocal[i].status == true) {
      liHtml += `
      <li 
        onclick="moveCat(${
          categoriesLocal[i].categoryId
        })" class="category__list__items" 
      >
        <a>
          <img
            class=" ${
              categoryChoose == categoriesLocal[i].categoryId
                ? "active-border"
                : ""
            }"
            src="../../ASSET/IMAGE/CATEGORY/${categoriesLocal[i].image}"
            alt=""
          />
          <h4 class="category__list__items-name ${
            categoryChoose == categoriesLocal[i].categoryId ? "active-name" : ""
          }">${categoriesLocal[i].categoryName}</h4>
        </a>
      </li>
      `;
    }
  }
  ulCategory.innerHTML = liHtml;
}

// MOVE DOT
function moveDot(index) {
  currentPage = index;
  renderCategory();
}

// =======================
// ADD/REMOVE FAVORITE
let favorites = document.querySelectorAll(".fa-heart");
function addFavorite(id) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  let index = productsLocal.findIndex((pro) => pro.productId == id);
  productsLocal[index].wishlist = !productsLocal[index].wishlist;
  localStorage.setItem("FFproducts", JSON.stringify(productsLocal));
  // renderProduct();
  moveCat(categoryChoose);
}

// =====================
// RENDER PRODUCT
function renderProduct(data) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];

  if (Array.isArray(data)) {
    productsLocal = data;
  }

  let liHtml = "";
  for (let i = 0; i < productsLocal.length; i++) {
    if (productsLocal[i].status) {
      liHtml += `
          <li  class="product__item">
          <div class="product__item__photo">
            <a onclick="moveDetail(${productsLocal[i].productId})">
              <img
                src="../../ASSET/IMAGE/PRODUCT/${productsLocal[i].image}"
                alt=""
              />
            </a>
            <i onclick="addFavorite(${
              productsLocal[i].productId
            })" class="fa-regular fa-heart ${
        productsLocal[i].wishlist ? "red-heart" : ""
      }"></i>
          </div>
          <div class="product__item__content">
            <h3 class="name__item">
              <a onclick="moveDetail(${productsLocal[i].productId})">${
        productsLocal[i].productName
      }</a>
            </h3>
            <div class="product__item__detals">
              <p>${productsLocal[i].details[0] || ""}</p>
              <p>${productsLocal[i].details[1] || ""}</p>
            </div>
            <div class="product__item__price">
              <p>${productsLocal[i].discountPrice.toLocaleString()} ₫</p>
              ${
                productsLocal[i].price.toLocaleString() != 0
                  ? `<p>
                <span>${productsLocal[i].price.toLocaleString()} ₫</span>
              </p>`
                  : ""
              }
            </div>
            <div class="product__item__btn">
              <button style="width: 100%" onclick="addCart(${
                productsLocal[i].productId
              })" class="btn-cart">Add to cart</button>
            </div>
          </div>
        </li>;
          `;
    }
  }

  ulProduct.innerHTML = liHtml;
}

// =======================
// RENDER PRODUCT WITH CATEGORY

// renderProduct();

// renderCategory();

function moveCat(id) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  let productFilter = productsLocal.filter((pro) => pro.categoryName == id);
  categoryChoose = id;
  renderCategory();
  renderProduct(productFilter);
}
moveCat(categoryChoose);

function moveDetail(id) {
  // let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  // let index = productsLocal.findIndex((pro) => pro.productId == id);
  window.location.href = `Detail_Product.html?id=${id}`;
}

// ============================
// ============================
// COMMON

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

// ========================
// CART
const cartIcon = document.querySelector("#cartIcon");
const cartOverlay = document.querySelector(".cartOverlay");
const cartModal = document.querySelector(".cartModal");
const ulCart = document.querySelector("#ulCart");
// const quantity = document.querySelector("#quantity");
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
