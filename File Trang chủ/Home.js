const products = document.getElementById("product-total");
const userName = document.getElementById("user-name");
const logOut = document.getElementById("logout");
const btnAdds = document.getElementsByClassName("add-btn");
const cart = document.getElementById("cart");
const dbProduct = JSON.parse(localStorage.getItem("products"));
const cartQty = document.getElementById("total-qty");
const totalHeart = document.getElementById("total-heart");

// Render Sản phẩm ra màn hình
function renderProduct() {
  let stringHTML = "";
  const dbProduct = JSON.parse(localStorage.getItem("products"));

  for (let i in dbProduct) {
    stringHTML += `
     <div class="product">
            <a href="#" 
              ><img class="image-product"
                src="${dbProduct[i].image}"
                alt="product"
                width="100%"
            /></a>
            <br/>
            <br/>
            <p>${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
              dbProduct[i].price
            )}VNĐ</p>
            <br/>
            <button class="add-btn" style="background-color: bisque" id="${
              dbProduct[i].id
            }">Sản phẩm yêu thích</button><br/><br/>
            <a href="http://127.0.0.1:5501/Trang%20s%E1%BA%A3n%20ph%E1%BA%A9m%20total/products.html" class="add-btn"  id="${
              dbProduct[i].id
            }"><i id="cart" class="fa-solid fa-cart-shopping"></i></a>
          </div>
    `;
    products.innerHTML = stringHTML;
  }
}

renderProduct();

//Login Logout USER
const userLogin = JSON.parse(localStorage.getItem("user-login"));
function renderUser() {
  if (userLogin) {
    userName.innerHTML = userLogin.name;
    logOut.style.display = "block";
  } else {
    userName.innerHTML = `<a href="http://127.0.0.1:5501/File%20%C4%90%C4%83ng%20nh%E1%BA%ADp/Login.html"><button type="button" style="color: brown">Login</button></a>`;
    logOut.style.display = "none";
  }
}
renderUser();

logOut.onclick = function () {
  localStorage.removeItem("user-login");
  window.location.href = "./Home.html";
  //   document.getElementById("user-name")="<button>Login</button>";
  renderUser();
};
//

//Làm hiển thị số sản phảm trên giỏ hàng
const heart = JSON.parse(localStorage.getItem("heart")) || [];
function renderHeart() {
  let totalProduct = heart.reduce(function (acc, cur) {
    return (acc += cur.number);
  }, 0);
  totalHeart.innerHTML = totalProduct;
}
renderHeart();
//

for (let btnAdd of btnAdds) {
  btnAdd.onclick = function () {
    const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
    let addProductIndex = dbProduct.findIndex(function (e, i) {
      return e.id === +btnAdd.id;
    });
    let product = { ...dbProduct[addProductIndex] };
    console.log(product);
    let inCartIndex = heart.findIndex(function (e, i) {
      return e.id === product.id;
    });

    if (inCartIndex === -1) {
      //Chưa có trong giỏ hàng
      product.number = 1;
      heart.push(product);
      window.localStorage.setItem("heart", JSON.stringify(heart));
      renderHeart();
    } else {
      //Trong giỏ hàng rồi
      heart[inCartIndex].number = heart[inCartIndex].number + 1;
      window.localStorage.setItem("heart", JSON.stringify(heart));
      renderHeart();
    }
  };
}

// if (vitri !== -1) {
//   cart[vitri].quantity += +inputQuantity.value;
//   userLogin.cart = cart;
//   window.localStorage.setItem("user-login", JSON.stringify(userLogin));
// } else {
//   cart.push({
//     productId: product.id,
//     quantity: +inputQuantity.value,
//   });

//   userLogin.cart = cart;
//   window.localStorage.setItem("user-login", JSON.stringify(userLogin));
// }

// //Hien thi len gio hang
// let count = 0;

// for (let i in cart) {
//   count += cart[i].quantity;
// }
// totalCart.innerHTML = count;
// });

function render() {
  const userLogin = JSON.parse(localStorage.getItem("user-login"));
  const cart = userLogin.cart;
  let count = 0;

  for (let i in cart) {
    count += cart[i].quantity;
  }
  cartQty.innerHTML = count;
}
render();
