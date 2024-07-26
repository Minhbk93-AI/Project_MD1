// const productDetails = [
//   {
//     id: 1,
//     name: "Airpods Pro",
//     price: 24900,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJiKtlpQGkIeOyAPV3qQMNkl8uuRzfGWZtIDb_WgDnam8WjhpL&usqp=CAU",
//     qty: 10,
//     heading: "Wireless Noise Cancelling Earphones",
//     des: "Bliss Dress - Đầm Xòe Dạo Phố",
//   },
//   {
//     id: 2,
//     name: "Apple Watch",
//     price: 40900,
//     imageUrl: "https://purepng.com/public/uploads/large/apple-watch-pcq.png",
//     qty: 15,
//     heading: "You’ve never seen a watch like this",
//     des: "Áo Kiểu Youthful Set",
//   },
//   {
//     id: 3,
//     name: "Macbook Pro",
//     priceAcc: 199900,
//     priceDelete:
//     imageUrl: "https://pngimg.com/uploads/macbook/macbook_PNG8.png",
//     qty: 20,
//     heading: "The best for the brightest",
//     des: "Blue SEA Dress - Đầm Maxi Họa Tiết",
//   },
//   {
//     id: 4,
//     name: "iPhone 11 pro",
//     price: 106600,
//     imageUrl:
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-midnight-green-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566954990073",
//     qty: 35,
//     heading: "Pro cameras. Pro display. Pro performance",
//     des: "Chân Váy Tuysi Xếp Ly",
//   },

const products = document.getElementById("product-total");
const userName = document.getElementById("user-name");
const logOut = document.getElementById("logout");
const btnAdds = document.getElementsByClassName("add-btn");
const cart = document.getElementById("cart");
const dbProduct = JSON.parse(localStorage.getItem("products"));

// Render Sản phẩm ra màn hình
function renderProduct() {
  let stringHTML = "";
  const dbProduct = JSON.parse(localStorage.getItem("products"));

  for (let i in dbProduct) {
    stringHTML += `
     <div class="product">
            <a href="#"
              ><img
                src="${dbProduct[i].image}"
                alt="product"
                width="100%"
            /></a>
            <p>${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
              dbProduct[i].price
            )}VNĐ</p>
            <button class="add-btn" style="background-color: bisque">Thêm vào giỏ hàng</button>
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
  window.location.href =
    "http://127.0.0.1:5501/File%20Trang%20ch%E1%BB%A7/Home.html";
  //   document.getElementById("user-name")="<button>Login</button>";
  renderUser();
};

//
let carts = JSON.parse(window.localStorage.getItem("cart"));

for (let btnAdd of btnAdds) {
  btnAdd.onclick = function () {
    let addProductIndex = dbProduct.findIndex(function (e, i) {
      return e.id === +btnAdd.id;
    });
  };
}
