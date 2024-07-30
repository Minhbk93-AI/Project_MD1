const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productSize = document.getElementById("size");
const productQuantity = document.getElementById("quantity");
const productImage = document.getElementById("mainImage");
const btnMinus = document.getElementById("btn-minus");
const btnPlus = document.getElementById("btn-plus");
const btnAddToCart = document.getElementById("btn-add-to-cart");
const inputQuantity = document.getElementById("input-quantity");
const errorMessage = document.getElementById("error-message");
const shoppingCart = document.getElementById("shopping-cart");

const dbProduct = JSON.parse(localStorage.getItem("products"));
const productId = JSON.parse(localStorage.getItem("productId"));
const totalCart = document.getElementById("total-cart");

const product = dbProduct.find((el) => el.id === productId);

productName.innerHTML = product.name;
productImage.src = product.image;
productPrice.innerHTML = product.price.toLocaleString("it-IT", {
  style: "currency",
  currency: "VND",
});

btnMinus.addEventListener("click", function () {
  if (+inputQuantity.value > 1) {
    inputQuantity.value = +inputQuantity.value - 1;
  }
});

btnPlus.addEventListener("click", function () {
  if (+inputQuantity.value > 0) {
    inputQuantity.value = +inputQuantity.value + 1;
  }
});

btnAddToCart.addEventListener("click", function () {
  const userLogin = JSON.parse(localStorage.getItem("user-login"));
  if (!userLogin) {
    alert("Ban chua dang nhap de mua hang");
    return;
  }

  if (inputQuantity.value <= 0) {
    errorMessage.innerHTML = "Không hợp lệ xin vui lòng nhập lại";
  } else {
    errorMessage.innerHTML = "";
  }

  // lay userLogin tren local ve
  // const cart = userLogin.cart
  // cart.push({prductId, quantity})
  // userLogin.cart = cart
  // luu

  const cart = userLogin.cart;

  const vitri = cart.findIndex((element) => element.productId == productId);

  if (vitri !== -1) {
    cart[vitri].quantity += +inputQuantity.value;
    userLogin.cart = cart;
    window.localStorage.setItem("user-login", JSON.stringify(userLogin));
  } else {
    cart.push({
      productId: product.id,
      quantity: +inputQuantity.value,
    });

    userLogin.cart = cart;
    window.localStorage.setItem("user-login", JSON.stringify(userLogin));
  }

  //Hien thi len gio hang

  let count = 0;

  for (let i in cart) {
    count += cart[i].quantity;
  }
  totalCart.innerHTML = count;
});

shoppingCart.onclick = function () {
  window.location.href = "../Trang giỏ hàng/cart.html";
};

function renderCart() {
  const userLogin = JSON.parse(localStorage.getItem("user-login"));
  const cart = userLogin.cart;
  let count = 0;

  for (let i in cart) {
    count += cart[i].quantity;
  }
  totalCart.innerHTML = count;
}
renderCart();
