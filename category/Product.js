const creatProduct = document.getElementById("creat-product");
const btnCancel = document.getElementById("btn-cancel");
const ovelay = document.getElementById("ovelay");
const form = document.getElementById("form");

creatProduct.onclick = function () {
  form.style.display = "block";
  ovelay.style.display = "block";
};
btnCancel.onclick = function () {
  ovelay.style.display = "none";
  form.style.display = "none";
};

let categorySelect = document.getElementById("category-select");
let stringHTML = "";
function renderProduct() {
  let dBCategory = JSON.parse(localStorage.getItem("categories")) || [];
  for (let i in dBCategory) {
    stringHTML += `
     <select name="" >
          <option value="">${dBCategory[i].name}</option></select
        >`;
  }
  categorySelect.innerHTML = stringHTML;
}
renderProduct();


function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const reader = new FileReader();
  
    reader.onloadend = function () {
      document.getElementById("image-product").src = reader.result;
    };
  
    reader.readAsDataURL(file);
  }