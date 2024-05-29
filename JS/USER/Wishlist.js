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
const dbtnOK = document.querySelector("#btnOK");
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
                  <p>${productsCartLocal[i].discountPrice} ₫</p>
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
function addCart(index) {
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

// ================================================
// RENDER ACCOUNT INFORMATION
let mainContentAccount = document.querySelector(".container");
// let currentAccountLocal = JSON.parse(localStorage.getItem("current_account"));
let accountActive = JSON.parse(localStorage.getItem("FFaccountActive"));

function renderAccount() {
  let content = "";
  // currentAccountLocal.forEach((element) => {
  content += `
    <article class="main__account">
      <div class="main__account__left">
        <div class="main__account__left__infor">
          <div class="main__account__left__ava">TD</div>
          <h2>${accountActive.username.toUpperCase()}</h2>
          <p class="point-account">
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-point.svg"
              alt=""
            />
            0 point
          </p>
        </div>
        <ul class="main__account__left__menu">
          <li class="main__account__left__menu-list">
            <a href="./AccInfor.html">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-myaccount-white.svg"
                alt=""
              />
              Account Information</a
            >
          </li>
          <li class="main__account__left__menu-list">
            <a href="">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-socials.svg"
                alt=""
              />
              Social Media</a
            >
          </li>
          <li class="main__account__left__menu-list">
            <a href="./ShippingAdress.html">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-pos-white.svg"
                alt=""
              />
              Shipping Address</a
            >
          </li>
          <li class="main__account__left__menu-list">
            <a href="">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-history-white.svg"
                alt=""
              />
              Order history</a
            >
          </li>
          <li class="main__account__left__menu-list">
            <a href="">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-coupon-2.svg"
                alt=""
              />
              My Coupons</a
            >
          </li>
          <li class="main__account__left__menu-list active-account">
            <a href="">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-save-white.svg"
                alt=""
              />
              My menu / wishlist</a
            >
          </li>
          <li class="main__account__left__menu-list">
            <a href="">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-support.svg"
                alt=""
              />
              Feedback</a
            >
          </li>
          <li class="main__account__left__menu-list">
            <a href="">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-support.svg"
                alt=""
              />
              Support</a
            >
          </li>
          <li class="main__account__left__menu-list" id="signOut">
            <a href="">
              <img
                src="https://www.lotteria.vn/grs-static/images/icon-logout-white.svg"
                alt=""
              />
              Sign out</a
            >
          </li>
        </ul>
      </div>
      <div class="main__account__right">
        <header class="main__account__right__header">
          <h1>MY MENU/ WISHLIST</h1>
        </header>
        <div class="main__account__right__content">
            <ul class="product">
            </ul>
          </div>
        </div>
      </div>
    </article>
    `;
  // });

  mainContentAccount.innerHTML = content;
}
renderAccount();

// DOM RIGHT CONTENT
let ulFavorite = document.querySelector(".product");

// RENDER FAVORITE
function renderFavorite() {
  let liFavoriteHtmls = "";
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  for (let i = 0; i < productsLocal.length; i++) {
    if (productsLocal[i].wishlist) {
      liFavoriteHtmls += `
        <li class="product__item">
                <div class="product__item__photo">
                  <a href="./Detail_Product.html">
                    <img
                      src="../../ASSET/IMAGE/PRODUCT/${productsLocal[i].image}"
                      alt=""
                    />
                  </a>
                  <i
                    onclick="addFavorite(${productsLocal[i].productId})"
                    class="fa-regular fa-heart red-heart"
                  ></i>
                </div>
                <div class="product__item__content">
                  <h3 class="name__item">
                    <a href="./Detail_Product.html">${
                      productsLocal[i].productName
                    }</a>
                  </h3>
                  <div class="product__item__detals">
                    <p>${productsLocal[i].details[0] || ""}</p>
                    <p>${productsLocal[i].details[0] || ""}</p>
                  </div>
                  <div class="product__item__price">
                    <p>${productsLocal[i].discountPrice.toLocaleString()} ₫</p>
                    ${
                      productsLocal[i].price
                        ? `
                    <p>
                      <span>${productsLocal[i].price} ₫</span>
                    </p>`
                        : ""
                    }
                  </div>
                </div>
              </li>
        `;
    }
  }
  ulFavorite.innerHTML = liFavoriteHtmls;
}

renderFavorite();
let favorites = document.querySelectorAll(".fa-heart");

// =======================
// ADD/REMOVE FAVORITE
function addFavorite(id) {
  let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
  let index = productsLocal.findIndex((pro) => pro.productId == id);
  productsLocal[index].wishlist = !productsLocal[index].wishlist;
  console.log("Asds");
  localStorage.setItem("FFproducts", JSON.stringify(productsLocal));
  renderFavorite();
}
