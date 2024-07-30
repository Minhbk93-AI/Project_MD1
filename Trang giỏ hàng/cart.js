const cartItem = document.getElementById("cart-item");
const totalPrice = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

function renderPayment() {
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const userLogin = JSON.parse(localStorage.getItem("user-login")) || [];
  const carts = userLogin.cart;
  let totalPrice = 0;
  let stringPayment = "";

  for (let i in carts) {
    const product = dbProduct.find((el) => el.id == carts[i].productId);
    if (product) {
      const itemPrice = product.price * carts[i].quantity;
      totalPrice += itemPrice;

      stringPayment += `
          <img src="${product.image}" alt="${product.name}" />
          <div class="item-details">
            <h2>${product.name}</h2>
            <p>Giá: ${product.price.toLocaleString()}đ</p>
            <p>Số lượng: <input disabled type="number" value="${
              carts[i].quantity
            }" min="1" class="quantity" data-id="${carts[i].productId}" /></p>
            <button class="remove-btn" data-id="${
              carts[i].productId
            }">Xóa</button>
          </div>
        `;
    }
  }

  stringPayment += `<div class="total-price" style="color: brown;">
                      <h2>Tổng giá: ${totalPrice.toLocaleString()}đ</h2>
                    </div>`;

  cartItem.innerHTML = stringPayment;
}
renderPayment();

//
checkoutBtn.onclick = function () {
  window.location.href = "../Trang thanh toán/payment.html";
};

//   // Attach event listeners
//   document.querySelectorAll(".remove-btn").forEach((button) => {
//     button.addEventListener("click", removeItem);
//   });

//   document.querySelectorAll(".quantity").forEach((input) => {
//     input.addEventListener("change", updateQuantity);
//   });
// }

// function removeItem(event) {
//   const productId = event.target.getAttribute("data-id");
//   const userLogin = JSON.parse(localStorage.getItem("user-login"));
//   userLogin.cart = userLogin.cart.filter((item) => item.productId != productId);
//   localStorage.setItem("user-login", JSON.stringify(userLogin));
//   renderPayment();
// }

// function updateQuantity(event) {
//   const productId = event.target.getAttribute("data-id");
//   const newQuantity = parseInt(event.target.value);
//   const userLogin = JSON.parse(localStorage.getItem("user-login"));
//   const cartItem = userLogin.cart.find((item) => item.productId == productId);
//   if (cartItem) {
//     cartItem.quantity = newQuantity;
//     localStorage.setItem("user-login", JSON.stringify(userLogin));
//     renderPayment();
//   }
// }

// renderPayment();
