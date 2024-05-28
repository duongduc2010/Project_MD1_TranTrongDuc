const sectionCart = document.querySelector(".main__left__cart");
const ulCart = document.querySelector(".main__left__cart__content");
const sectionBill = document.querySelector(".bill");

let productsCartLocal =
  JSON.parse(localStorage.getItem("FFproductsCart")) || [];
// let productsLocal = JSON.parse(localStorage.getItem("FFproducts")) || [];
// RENDER BILL
function renderCart() {
  let productsCartLocal =
    JSON.parse(localStorage.getItem("FFproductsCart")) || [];
  liHtmls = "";
  let totalPrice = 0;
  let totalCart = 0;
  for (let i = 0; i < productsCartLocal.length; i++) {
    liHtmls += `
        <li class="list-cart flex">
                  <div class="item-cart-left flex">
                    <img src="../../ASSET/IMAGE/PRODUCT/${
                      productsCartLocal[i].image
                    }" alt="" />
                    <div class="item-cart-infor">
                      <h3 style="color: var(--color-theme)" class="item-cart-name">
                        ${productsCartLocal[i].productName}
                      </h3>
                      <span class="item-cart-price">${(
                        productsCartLocal[i].discountPrice *
                        productsCartLocal[i].quantity
                      ).toLocaleString()}</span>
                    </div>
                  </div>
                  <div class="item-cart-right flex">
                    <div class="quantity-group flex">
                      <button
                        onclick="changeQuantity(${i},${
      productsCartLocal[i].quantity - 1
    }
            )"
                        class="quantity-btn"
                      >
                        -
                      </button>
                      <p id="quantity">${productsCartLocal[i].quantity}</p>
                      <button
                        onclick="changeQuantity(${i},${
      productsCartLocal[i].quantity + 1
    }
            )"
                        class="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <i style="font-size: 22px" class="fa-regular fa-trash-can"></i>
                  </div>
        `;
    totalCart = totalCart + productsCartLocal[i].quantity;
    totalPrice =
      totalPrice +
      productsCartLocal[i].discountPrice * productsCartLocal[i].quantity;
  }
  ulCart.innerHTML = liHtmls;
  //   quantityCart.innerHTML = totalCart;
  //   priceCart.innerHTML = totalPrice.toLocaleString() + " ₫";
  localStorage.setItem("FFproductsCart", JSON.stringify(productsCartLocal));
}

renderCart();

// CHANGE QUANTITY
function changeQuantity(index, newQuantity) {
  console.log("ASdsad");
  if (newQuantity <= 0) {
  } else {
    productsCartLocal[index].quantity = newQuantity;
  }
  renderCart();
}

// RENDER TOTAL PRICE

// function renderBill() {
//   let productsCartLocal =
//     JSON.parse(localStorage.getItem("FFproductsCart")) || [];
//   let billHtmls = `
//     <div class="total-price flex">
//             <span>SubTotal</span>
//             <span>100.000 </span>
//           </div>
//           <div class="border-dot"></div>
//           <div class="total-price flex">
//             <h3>Total</h3>
//             <h3>${productsCartLocal[i].price}</h3>
//           </div>
//           <div class="btn-continue">
//             <a href="./Finish.html">Continue</a>
//           </div>
//     `;
//   sectionBill.innerHTML = billHtmls;
// }

// renderBill();
