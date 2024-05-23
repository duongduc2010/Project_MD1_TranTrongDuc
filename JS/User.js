// DOM ACCOUNT ICON
const accountIcon = document.querySelector("#accountIcon");
const subAccount = document.querySelector(".sub__menu__account");
// DOM MAIN
const ulMain = document.querySelector(".main__wrapped");
// DOM CART
const cartIcon = document.querySelector("#cartIcon");
const cartOverlay = document.querySelector(".cart-overlay");
const cart = document.querySelector(".cart");
const ulCart = document.querySelector("#ulCart");
let quantity = document.querySelector("#quantity");

// =====================
// SUBACCOUNT
// OPEN SUBACCOUNT
accountIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!subAccount.classList.contains("open-subaccount")) {
    subAccount.classList.add("open-subaccount");
  } else {
    subAccount.classList.remove("open-subaccount");
  }
});
// CLOSE SUBACCOUNT
subAccount.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  subAccount.classList.remove("open-subaccount");
});

// =====================
//BACK UP LIST MEAL

let listMealLocal = JSON.parse(localStorage.getItem("list_meal")) || [];
let listCartLocal = JSON.parse(localStorage.getItem("list_cart")) || [];

// =====================
// RENDER LIST MEAL

// ===============
// CART
const priceCart = document.querySelector("#totalPrice");
const quantityCart = document.querySelector(".quantity-cart");
// OPEN CART
cartIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  cartOverlay.classList.add("openCart");
});
// CLOSE CART
cart.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  cartOverlay.classList.remove("openCart");
});
// RENDER CART
function renderCart() {
  let liCart = "";
  let totalPrice = 0;
  let totalCart = 0;
  for (let i = 0; i < listCartLocal.length; i++) {
    if (listCartLocal[i] != null) {
      liCart += `
      <li class="cart__content__listItem">
                <div class="img-cart">
                  <a href="">
                    <img
                      class=""
                      src="../../IMAGE/MEALLIST/${listCartLocal[i].image}"
                      alt=""
                    />
                  </a>
                </div>
                <div class="details-cart">
                  <a href="">${listCartLocal[i].nameMeal}</a>
                  <p>${listCartLocal[i].currentPrice.toLocaleString()} ₫</p>
                  <div class="quantity-group">
                    <button onclick="changeQuantity(${i},${
        listCartLocal[i].quantity - 1
      })" class="quantity-btn">-</button>
                    <p id="quantity">${listCartLocal[i].quantity}</p>
                    <button onclick="changeQuantity(${i},${
        listCartLocal[i].quantity + 1
      })" class="quantity-btn">+</button>
                  </div>
                  <div><i onclick="delCart(${i})" class="fa-solid fa-trash"></i></div>
                </div>
      `;
      totalCart = totalCart + listCartLocal[i].quantity;
      totalPrice =
        totalPrice + listCartLocal[i].currentPrice * listCartLocal[i].quantity;
    }
  }
  quantityCart.innerHTML = totalCart;
  priceCart.innerHTML = totalPrice.toLocaleString() + " ₫";
  ulCart.innerHTML = liCart;
  localStorage.setItem("list_cart", JSON.stringify(listCartLocal));
}
renderCart();

// ADD ITEMS TO CART
function addCart(index) {
  if (listCartLocal[index] == null) {
    listCartLocal[index] = { ...listMealLocal[index], quantity: 1 };
  } else {
    listCartLocal[index].quantity += 1;
  }
  renderCart();
}

// CHANGE QUANTITY
function changeQuantity(index, newQuantity) {
  if (newQuantity <= 0) {
  } else {
    listCartLocal[index].quantity = newQuantity;
  }
  renderCart();
}

// DELETE CART
function delCart(index) {
  listCartLocal.splice(index, 1);
  renderCart();
}

// =======================
// ADD/REMOVE FAVORITE
let favorites = document.querySelectorAll(".fa-heart");
function addFavorite(index) {
  if (!favorites[index].classList.contains("red-heart")) {
    favorites[index].classList.add("red-heart");
  } else {
    favorites[index].classList.remove("red-heart");
  }
}

// ==============
// LANGUAGE AND DOWNLOAD
const headerLanguage = document.querySelector(".header__language");
const headerDownloadApp = document.querySelector(".header__downloadApp");
const languageInner = document.querySelector(".header__language__inner");
const downloadInner = document.querySelector(".header__downloadApp__inner");
// OPEN+CLOSE
headerLanguage.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!languageInner.classList.contains("open__inner")) {
    languageInner.classList.add("open__inner");
  } else {
    languageInner.classList.remove("open__inner");
  }
});

headerDownloadApp.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!downloadInner.classList.contains("open__inner")) {
    downloadInner.classList.add("open__inner");
  } else {
    downloadInner.classList.remove("open__inner");
  }
});

window.addEventListener("click", () => {
  languageInner.classList.remove("open__inner");
  downloadInner.classList.remove("open__inner");
});

// ================================================
// RENDER ACCOUNT INFORMATION
let mainContentAccount = document.querySelector(".container");
let currentAccountLocal = JSON.parse(localStorage.getItem("current_account"));
function renderAccount() {
  let content = "";
  currentAccountLocal.forEach((element) => {
    content += `
    <article class="main__account">
      <div class="main__account__left">
        <div class="main__account__left__infor">
          <div class="main__account__left__ava">TD</div>
          <h2>${element.fullName.toUpperCase()}</h2>
          <p class="point-account">
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-point.svg"
              alt=""
            />
            0 point
          </p>
        </div>
        <ul class="main__account__left__menu">
          <li class="main__account__left__menu-list active-account">
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
          <li class="main__account__left__menu-list">
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
          <h1>ACCOUNT INFORMATION</h1>
        </header>
        <div class="main__account__right__content">
          <form class="formAccount">
            <section>
              <h2>USER INFORMATION</h2>
              <div class="input-group">
                <label for="">Fullname</label>
                <input type="text" name="" id="fullName" value="${
                  element.fullName
                }" required/>
              </div>
              <div class="input-group">
                <label for="">Date of birth</label>
                <input type="date" name="" id="dob" value="${element.dob}"/>
              </div>
              <div class="input-group">
                <label for="">Phone number</label>
                <input type="text" name="" id="phoneNumber" value="${
                  element.phoneNumber
                }"/>
              </div>
              <div class="input-group">
                <label for="">Email</label>
                <input type="email" name="" id="" value="${
                  element.emailCurrent
                }"/>
              </div>
            </section>
            <section>
              <h2>CHANGE YOUR PASSWORD</h2>
              <div class="input-group">
                <label for="">Old password</label>
                <input type="password" name="" id="" value="${
                  element.passwordCurrent
                }"/>
              </div>
              <div class="input-group">
                <label for="">New password</label>
                <input type="password" name="" id="" />
              </div>
              <div class="input-group">
                <label for="">Re-enter your password</label>
                <input type="password" name="" id="" />
              </div>
            </section>
            <div class="btns">
              <button class="sub-btn" >Withdraw account</button>
              <button class="saveInfor" >Save information</button>
            </div>
          </form>
        </div>
      </div>
    </article>
    `;
  });

  mainContentAccount.innerHTML = content;
  localStorage.setItem("current_account", JSON.stringify(currentAccountLocal));
}
renderAccount();

// ======================
// SIGN OUT
const btnCancel = document.querySelector("#js-btnCancel");
const btnOK = document.querySelector("#js-btnOK");
const overlay = document.querySelector(".overlay");
const signOuts = document.querySelectorAll("#signOut");
// OPEN SIGN OUT
overlay.addEventListener("click", (e) => {
  e.stopPropagation();
});

signOuts.forEach((signOut) => {
  signOut.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("ASdsad");
    overlay.classList.add("openOverlay");
  });

  // OK
  btnOK.addEventListener("click", () => {
    window.location.href = "../SignIn.html";
  });
  // CANCEL
  btnCancel.addEventListener("click", (e) => {
    overlay.classList.remove("openOverlay");
  });
});

// UPDATE PERSONAL INFORMATION
let formAccount = document.querySelector(".formAccount");
let fullName = document.querySelector("#fullName");
let dob = document.querySelector("#dob");
let phoneNumber = document.querySelector("#phoneNumber");
let test = 1;
formAccount.addEventListener("submit", (e) => {
  e.preventDefault();
  currentAccountLocal[0].fullName = fullName.value;
  currentAccountLocal[0].dob = dob.value;
  currentAccountLocal[0].phoneNumber = phoneNumber.value;
  "asdsad".toUpperCase();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Update information successfully!!!",
    customClass: "swal-wide",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    window.location.href = "./AccInfor.html";
  });
  renderAccount();
});
