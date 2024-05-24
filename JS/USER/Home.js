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
// DOM SIGN OUT
const btnCancel = document.querySelector("#js-btnCancel");
const btnOK = document.querySelector("#js-btnOK");
const overlay = document.querySelector(".overlay");
const signOut = document.querySelector("#signOut");

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
let listMeal = [
  {
    image: "Chicken Set.png",
    nameMeal: "Chiken Set",
    details: ["02 Fried Chicken", "01 French Fries"],
    currentPrice: 87000,
    originalPrice: 114000,
  },

  {
    image: "HS Chicken Set.png",
    nameMeal: "HS Chicken Set",
    details: ["02 HS Chicken", "01 French Fries"],
    currentPrice: 95000,
    originalPrice: 124000,
  },
  {
    image: "Shrimp Combo.png",
    nameMeal: "Shrimp Combo",
    details: ["01 Shrimp Burger", "01 French Fries"],
    currentPrice: 87000,
    originalPrice: 114000,
  },
  {
    image: "Bulgogi Combo.png",
    nameMeal: "Bulgogi Combo",
    details: ["01 Bulgogi Burger", "01 French Fries"],
    currentPrice: 82000,
    originalPrice: 91000,
  },
  {
    image: "Loy Set.png",
    nameMeal: "Loy Set",
    details: ["02 Fried Chicken", "01 Bulgogi Burger"],
    currentPrice: 145000,
    originalPrice: 177000,
  },
  {
    image: "Lody Set.png",
    nameMeal: "Lody Set",
    details: ["02 Fried Chicken", "01 Spaghetti"],
    currentPrice: 145000,
    originalPrice: 169000,
  },
  {
    image: "Lony Set.png",
    nameMeal: "Lony Set",
    details: ["02 Fried Chicken", "01 Bulgogi Burger"],
    currentPrice: 195000,
    originalPrice: 237000,
  },
  {
    image: "Looking Set.png",
    nameMeal: "Looking Set",
    details: ["02 Fried Chicken", "01 Spaghetti"],
    currentPrice: 220000,
    originalPrice: 273000,
  },
  {
    image: "L4 Set.png",
    nameMeal: "L4 Set",
    details: ["04 Fried Chicken", "01 Bulgogi Burger"],
    currentPrice: 82000,
    originalPrice: 91000,
  },
  {
    image: "Pie Chicken.png",
    nameMeal: "Pie Chicken",
    details: ["", ""],
    currentPrice: 44000,
    originalPrice: "",
  },
  {
    image: "Pie Chicken + Pepsi (M).png",
    nameMeal: "Pie Chicken + Pepsi (M)",
    details: ["01 Pie Chicken", "01 Pepsi (M)"],
    currentPrice: 49000,
    originalPrice: 58000,
  },
  {
    image: "Cheese Stick.png",
    nameMeal: "Cheese Stick",
    details: ["", ""],
    currentPrice: 36000,
    originalPrice: "",
  },
];

localStorage.setItem("list_meal", JSON.stringify(listMeal));
let listMealLocal = JSON.parse(localStorage.getItem("list_meal")) || [];
let listCartLocal = JSON.parse(localStorage.getItem("list_cart")) || [];

// =====================
// RENDER LIST MEAL
function render() {
  let liHtml = "";
  for (let i = 0; i < listMealLocal.length; i++) {
    liHtml += `
      <li class="main__wrapped__item">
      <div class="main__wrapped__item__photo">
        <a href="./Detail_Product.html">
          <img
            src="../../ASSET/IMAGE/MEALLIST/${listMealLocal[i].image}"
            alt=""
          />
        </a>
        <i onclick="addFavorite(${i})" class="fa-regular fa-heart"></i>
      </div>
      <div class="main__wrapped__item__content">
        <h3 class="name__item">
          <a href="">${listMealLocal[i].nameMeal}</a>
        </h3>
        <div class="main__wrapped__item__detals">
          <p>${listMealLocal[i].details[0]}</p>
          <p>${listMealLocal[i].details[1]}</p>
        </div>
        <div class="main__wrapped__item__price">
          <p>${listMealLocal[i].currentPrice.toLocaleString()} ₫</p>
          ${
            listMealLocal[i].originalPrice.toLocaleString()
              ? `<p>
            <span>${listMealLocal[i].originalPrice.toLocaleString()} ₫</span>
          </p>`
              : ""
          }
        </div>
        <div class="main__wrapped__item__btn">
          <button style="width: 100%" onclick="addCart(${i})" class="btn-cart">Add to cart</button>
        </div>
      </div>
    </li>;
      `;
  }
  ulMain.innerHTML = liHtml;
}

render();

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
                      src="../../ASSET/IMAGE/MEALLIST/${listCartLocal[i].image}"
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

// ======================
// SIGN OUT

// OPEN SIGN OUT
overlay.addEventListener("click", (e) => {
  e.stopPropagation();
});
signOut.addEventListener("click", (e) => {
  e.preventDefault();
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

// ===========================
// SLIDE CATEGORY
const menuDot = document.querySelector(".menu__switch");
const ulCategory = document.querySelector(".menu__list");

const arr = [
  { name: "Bestseller", image: "Bestseller.jpg" },
  { name: "Promotion", image: "Promotion.jpg" },
  { name: "Drinks", image: "Drinks.jpg" },
  { name: "Side", image: "Side.jpg" },
  { name: "Rice & Spaghetti", image: "Rice & Spaghetti.jpg" },
  { name: "Pack", image: "Pack.jpg" },
  { name: "Value", image: "Value.jpg" },
  { name: "Combo", image: "Combo.jpg" },
  { name: "Chicken Set", image: "Chicken Set.jpg" },
  { name: "New Item 1", image: "Bestseller.jpg" },
  { name: "New Item 2", image: "Side.jpg" },
];

let pageSize = 9;
let totalPage = 1;
let currentPage = 1;
let currentItem = 0;

// MOVEPAGE
function moveDot(index) {
  currentPage = index;
  renderMenu();
}

function renderMenu(data) {
  // let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];

  // if (Array.isArray(data)) {
  //   usersLocal = data;
  // }
  totalPage = Math.ceil(arr.length / pageSize);
  let dot = "";
  for (let i = 1; i <= totalPage; i++) {
    if (currentPage == i) {
      dot += `<span onclick="moveDot(${i})" class="active__switch"></span>`;
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
  if (arr.length - 1 <= end) {
    end = arr.length - 1;
    start = end - pageSize;
    if (start < 0) {
      start = 0;
    }
  }

  for (let i = start; i <= end; i++) {
    liHtml += `
    <li class="menu__list_item ${currentItem === i ? "active-item" : ""}" >
      <a>
        <img
          class="active-menu"
          src="../../ASSET/IMAGE/CATEGORY/${arr[i].image}"
          alt=""
        />
        <h4 class="active-h4">${arr[i].name}</h4>
      </a>
    </li>
    `;
  }
  ulCategory.innerHTML = liHtml;
}

renderMenu();
