const inputName = document.getElementById("input-name");
const inputAddress = document.getElementById("input-address");
const inputPhone = document.getElementById("input-phone");
const inputEmail = document.getElementById("input-email");
const btnSubmitForm = document.getElementById("btn-submit");

const errorName = document.getElementById("error-name");
const errorAddress = document.getElementById("error-address");
const errorPhone = document.getElementById("error-phone");
const errorEmail = document.getElementById("error-email");

const basicEmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

document.addEventListener("DOMContentLoaded", function () {
  const cartItemContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutForm = document.getElementById("checkout-form");

  function renderCartItems() {
    const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
    const userLogin = JSON.parse(localStorage.getItem("user-login")) || [];
    const carts = userLogin.cart;
    let totalPrice = 0;
    let cartHTML = "";

    for (let i in carts) {
      const product = dbProduct.find((item) => item.id == carts[i].productId);
      if (product) {
        const itemPrice = product.price * carts[i].quantity;
        totalPrice += itemPrice;
        cartHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" width="100px">
              
                <h3>${product.name}</h3><br/>
                <p>Giá: ${product.price.toLocaleString()}đ</p><br/>
                <p>Số lượng: ${carts[i].quantity}</p><br/>
                <p>Thành tiền: ${itemPrice.toLocaleString()}đ</p>
              
            </div>
                `;
      }
    }

    cartItemContainer.innerHTML = cartHTML;
    totalPriceElement.innerHTML = `<div class="total-price" data-price="${totalPrice}">Tổng giá: ${totalPrice.toLocaleString()}đ</div>`;
  }

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const paymentMethod = document.getElementById("payment-method");
    //
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const userLogin = JSON.parse(localStorage.getItem("user-login"));
    const totalPriceElement = document.getElementById("total-price");
    // console.log(totalPriceElement);

    const newOrderItem = {
      id: orders.length === 0 ? 1 : orders[orders.length - 1].id + 1,
      userId: userLogin.id,
      name: inputName.value,
      address: inputAddress.value,
      phone: inputPhone.value,
      email: inputEmail.value,
      date: new Date(),
      status: 0,
      cart: userLogin.cart,
      total: +totalPriceElement.children[0].getAttribute("data-price"),
    };

    orders.push(newOrderItem);
    // userLogin.cart = [];

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("user-login", JSON.stringify(userLogin));

    // Gửi thông tin đặt hàng (gửi đến server hoặc lưu trữ vào database)

    // Xóa giỏ hàng sau khi đặt hàng
    // localStorage.removeItem("user-login");
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");

    // Chuyển hướng người dùng về trang chủ
    window.location.href = "../Trang List Order/listorder.html"; // Đường dẫn tới trang chủ
  });

  renderCartItems();
});
