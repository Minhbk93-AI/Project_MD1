const dbProduct = JSON.parse(localStorage.getItem("products"));
const products = document.getElementById("product");
//

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Render Sản phẩm ra màn hình
function renderProduct() {
  let stringHTML = "";
  const dbProduct = JSON.parse(localStorage.getItem("products"));

  for (let i in dbProduct) {
    stringHTML += `
        
          <div class="product" >
              <a onclick="clickProduct(${
                dbProduct[i].id
              })"><img class="image-product"
                  src="${dbProduct[i].image}"
                  alt="product"
                  width="100%"
              /></a>
              <br/>
              <br/>
              <p> ${dbProduct[i].name} </p>
              <p>${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
                dbProduct[i].price
              )}VNĐ</p>
              <br/>
              <button class="add-btn" style="background-color: bisque" id="${
                dbProduct[i].id
              }">Thêm vào giỏ hàng</button>
            </div>
        
      `;
  }
  products.innerHTML = stringHTML;
}
renderProduct();

function clickProduct(productId) {
  console.log("thong tin : ", productId);

  window.localStorage.setItem("productId", JSON.stringify(productId));
  window.location.href = "../Trang sản phẩm chi tiết/index.html";
}
