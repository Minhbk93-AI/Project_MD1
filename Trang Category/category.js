//Thêm Category
let inpCategory = document.getElementById("category-input-name");
let btnSubmit = document.getElementById("btn-submit-Form");
let btnCancel = document.getElementById("btn-cancel-Form");
let errorCategory = document.getElementById("error-category-name");
let listCategory = document.getElementById("listCategories");
let formTitle = document.getElementById("form-title");
let upDateCategory = document.getElementsByClassName("update-button");
let btnSearch = document.getElementById("btn-search");
let inpSearch = document.getElementById("input-search");
let sortSelect = document.getElementById("sort-select");
//
let idUpdateGlobal = null;

//
btnSubmit.onclick = function () {
  const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  // console.log(dbCategory);
  const categoryName = inpCategory.value.trim();
  if (!categoryName) {
    errorCategory.textContent = "Bạn hãy nhập lại đi";
    return;
  }
  const viTri = dbCategory.findIndex(function (category, id) {
    return category.name.toLowerCase() == categoryName.toLowerCase();
  });
  if (viTri !== -1 && dbCategory[viTri].id != idUpdateGlobal) {
    errorCategory.textContent = "Tên sản phẩm đã tồn tại";
    return;
  } else {
  }

  if (idUpdateGlobal) {
    //logic update
    let vitrisua = dbCategory.findIndex(
      (element) => element.id === idUpdateGlobal
    );
    dbCategory[vitrisua].name = categoryName;
    localStorage.setItem("categories", JSON.stringify(dbCategory));
    idUpdateGlobal = null;
    renderCategory();
    inpCategory.value = "";
    formTitle.textContent = "Thêm danh mục";
    //
    return;
  }

  console.log("dan hem");

  let id = 1;
  if (dbCategory.length > 0) {
    id = dbCategory[dbCategory.length - 1].id + 1;
  }
  const newCategory = {
    id: id,
    name: categoryName,
  };
  dbCategory.push(newCategory);
  localStorage.setItem("categories", JSON.stringify(dbCategory));
  errorCategory.textContent = "";
  inpCategory.value = "";
  renderCategory();
};
btnCancel.onclick = function () {
  inpCategory.value = "";
  errorCategory.textContent = "";
  renderCategory();
};

function renderCategory() {
  //lấy db
  let dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  dbCategory = dbCategory.filter((el) =>
    el.name.toLowerCase().includes(inpSearch.value.trim().toLowerCase())
  );

  switch (sortSelect.value) {
    case "No":
      break;
    case "aes":
      dbCategory.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "des":
      dbCategory.sort((a, b) => b.name.localeCompare(a.name));
    default:
      break;
  }

  let stringHTML = "";
  for (let i = 0; i <= dbCategory.length - 1; i++) {
    stringHTML += `
        
           
            <tbody>
              <td>${i + 1}</td>
              <td>${dbCategory[i].id}</td>
              <td>${dbCategory[i].name}</td>
              <td>
                <button  onclick="updateCategory(${
                  dbCategory[i].id
                })" >Update</button>

                <button  onclick="deleteCategory(${
                  dbCategory[i].id
                })">Delete</button>
              </td>
            </tbody>

    
    
    `;
  }
  //for lap
  listCategory.innerHTML = stringHTML;
  //+chuoi

  //innerHTM
}

renderCategory();

function deleteCategory(idDelete) {
  let dbCategory = JSON.parse(window.localStorage.getItem("categories")) || [];
  let findIndex = dbCategory.findIndex(function (element, id) {
    return element.id == idDelete;
  });
  dbCategory.splice(findIndex, 1);
  window.localStorage.setItem("categories", JSON.stringify(dbCategory));
  renderCategory();
}

//

// // Xet dieu kien  khi
//
function updateCategory(idEdit) {
  const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  let vitriupdate = dbCategory.findIndex((element) => element.id === idEdit);
  inpCategory.value = dbCategory[vitriupdate].name;
  formTitle.textContent = "Update";
  idUpdateGlobal = idEdit;
}

btnSearch.onclick = function () {
  renderCategory();
};

sortSelect.onchange = function () {
  renderCategory();
};
