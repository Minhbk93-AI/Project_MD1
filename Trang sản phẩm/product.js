//__________MODAL____________//

const creatProduct = document.getElementById("creat-form-product");
const productName = document.getElementById("product-name");
const price = document.getElementById("price");
const inventory = document.getElementById("inventory");
const category = document.getElementById("category");
const image = document.getElementById("image");
const form = document.getElementById("form");
const btnCancelForm = document.getElementById("btn-cancel-form");
const btnSubmitForm = document.getElementById("btn-submit-form");
const ovelay = document.getElementById("ovelay");
const newProduct = document.getElementById("new-product");
const errorProductName = document.getElementById("error-product-name");
const formTitle = document.getElementById("form-title");
const btnSearchProduct = document.getElementById("btn-search");
const inpSearch = document.getElementById("inp-search-name");
const categoryForm = document.getElementById("category-form");
const filterPrice = document.getElementById("fillter-price");

//TẠO CÁC BIẾN GLOBAL___________//
let productsLocal = "products";
let categoryLocal = "categories";
let idUpdateGlobal = null;

//
let imageBase64 = null;
//
// KHI ẤN NÚT THÊM SẢN PHẨM FORM TẠO SẢN PHẨM HIỆN LÊN
creatProduct.onclick = function () {
  form.style.display = "block";
  ovelay.style.display = "block";
};

//  KHI ẤN NÚT CANCEL FORM TẠO SẢN PHẨM ẨN ĐI
btnCancelForm.onclick = function () {
  ovelay.style.display = "none";
  form.style.display = "none";
};
// TẢI FILE ẢNH LÊN
function encodeImageFileAsURL(element) {
  const file = element.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    document.getElementById("image-product").src = reader.result;
    imageBase64 = reader.result;
  };

  reader.readAsDataURL(file);
}
//
btnSubmitForm.onclick = function () {
  const dbProducts = JSON.parse(localStorage.getItem(productsLocal)) || [];

  const prName = productName.value.trim();
  if (!prName) {
    errorProductName.textContent = "*Tên không được để trống";
    return;
  }

  let id = 1;
  if (dbProducts.length > 0) {
    id = dbProducts[dbProducts.length - 1].id + 1;
  }

  if (idUpdateGlobal) {
    const vitri = dbProducts.findIndex((el) => el.id == idUpdateGlobal);
    dbProducts[vitri] = {
      name: productName.value,
      price: +price.value,
      image: imageBase64,
      inventory: +inventory.value,
      category: +categoryForm.value,
    };

    localStorage.setItem(productsLocal, JSON.stringify(dbProducts));
    productName.value = "";
    price.value = "";
    ovelay.style.display = "none";
    form.style.display = "none";
    imageBase64 = null;
    renderproduct();
    return;
  }

  const product = {
    id: id,
    name: productName.value,
    price: +price.value,
    image: imageBase64,
    inventory: +inventory.value,
    category: +categoryForm.value,
  };

  dbProducts.push(product);
  localStorage.setItem(productsLocal, JSON.stringify(dbProducts));
  productName.value = "";
  price.value = "";
  ovelay.style.display = "none";
  form.style.display = "none";
  imageBase64 = null;
  renderproduct();
};
//
function renderproduct() {
  //
  //
  let dbProducts = JSON.parse(localStorage.getItem(productsLocal)) || [];
  let dbCategory = JSON.parse(localStorage.getItem(categoryLocal)) || [];
  //
  dbProducts = dbProducts.filter((el) =>
    el.name.toLowerCase().includes(inpSearch.value.trim().toLowerCase())
  );

  //
  if (+category.value) {
    dbProducts = dbProducts.filter((el) => el.category === +category.value);
  }

  //

  switch (filterPrice.value) {
    case "0":
      break;
    case "1":
      dbProducts = dbProducts.filter(
        (el) => el.price >= 200000 && el.price < 400000
      );
      break;
    case "2":
      dbProducts = dbProducts.filter(
        (el) => el.price >= 400000 && el.price < 800000
      );
      break;
    case "3":
      dbProducts = dbProducts.filter(
        (el) => el.price >= 800000 && el.price < 1200000
      );
      break;
    case "4":
      dbProducts = dbProducts.filter(
        (el) => el.price >= 1200000 && el.price < 1500000
      );
      break;
    case "5":
      dbProducts = dbProducts.filter((el) => el.price >= 15000000);
      break;
  }

  //
  // switch (category.value) {
  //   case "No":
  //     break;
  //   case "aes":
  //     dbProducts.sort((a, b) => a.name.localeCompare(b.name));
  //     break;
  //   case "des":
  //     dbProducts.sort((a, b) => b.name.localeCompare(a.name));
  //   default:
  //     break;
  // }

  let stringHTML = ``;
  for (let i in dbProducts) {
    stringHTML += `
        <tr>
          <td>${+i + 1}</td>
          <td>
          <img src="${dbProducts[i].image}"/>
          </td>
          <td>${dbProducts[i].name}</td>
          <td>${dbProducts[i].price}</td>
          <td>${dbProducts[i].inventory}</td>
          <td>${
            dbCategory.find((el) => el.id == dbProducts[i].category).name
          }</td>
        <td>
          <button type="button" class="button-product" onclick="updateProduct(${
            dbProducts[i].id
          })">Update</button>
          <button type="button" class="button-product" onclick="deleteProduct(${
            dbProducts[i].id
          })">Delete</button>
        </td>
        </tr>
          `;
  }
  newProduct.innerHTML = stringHTML;
}
renderproduct();

//
function deleteProduct(idDelProduct) {
  let dbProducts = JSON.parse(localStorage.getItem(productsLocal)) || [];
  let findIndex = dbProducts.findIndex(function (element, id) {
    return element.id == idDelProduct;
  });
  dbProducts.splice(findIndex, 1);
  window.localStorage.setItem(productsLocal, JSON.stringify(dbProducts));
  renderproduct();
}

function updateProduct(idEditProduct) {
  const dbProducts = JSON.parse(localStorage.getItem(productsLocal)) || [];

  let vtUpdate = dbProducts.findIndex(
    (element) => element.id === idEditProduct
  );
  productName.value = dbProducts[vtUpdate].name;
  price.value = dbProducts[vtUpdate].price;
  inventory.value = dbProducts[vtUpdate].inventory;

  document.getElementById("image-product").src = dbProducts[vtUpdate].image;
  imageBase64 = dbProducts[vtUpdate].image;

  formTitle.textContent = "Update";

  idUpdateGlobal = idEditProduct;
  form.style.display = "block";
  ovelay.style.display = "block";

  renderproduct();
}
btnSearchProduct.onclick = function () {
  renderproduct();
};

function renderSelectCategory() {
  let dbCategory = JSON.parse(window.localStorage.getItem(categoryLocal)) || [];
  let stringHTML = "";
  for (let i in dbCategory) {
    stringHTML += ` 
         
     <option value=${dbCategory[i].id}>${dbCategory[i].name}</option>
    `;
  }
  category.innerHTML = `<option value="">Tất cả</option>` + stringHTML;
  categoryForm.innerHTML = stringHTML;
}
renderSelectCategory();
//
//
function renderCategory() {
  let dbCategory = JSON.parse(window.localStorage.getItem(categoryLocal)) || [];
  let stringHTML = "";
  for (let i in dbCategory) {
    stringHTML += `          
     <option value="category">${dbCategory[i].name}</option>
              
    `;
  }
  category.innerHTML = stringHTML;
}
//
category.onchange = function () {
  renderproduct();
};

filterPrice.onchange = function () {
  renderproduct();
};
// categoryForm.onchange = function () {
//   renderSelectCategory;
// };
