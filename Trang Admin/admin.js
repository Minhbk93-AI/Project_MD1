const newUser = document.getElementById("new-user");
const sortSelect = document.getElementById("sort-select");
const btnSearch = document.getElementById("btn-search");
const inpSearch = document.getElementById("inp-search-name");
const logOut = document.getElementById("logout");

let pageSize = 5;
let totalPage = 1;
let curentPage = 1;

function renderUser() {
  let userLogin = JSON.parse(localStorage.getItem("register"));

  //Search
  userLogin = userLogin.filter((el) =>
    el.name.toLowerCase().includes(inpSearch.value.trim().toLowerCase())
  );

  // phan trang
  renderPage(userLogin);
  let start = (curentPage - 1) * pageSize;
  userLogin = userLogin.slice(start, start + pageSize);

  // sap xep
  switch (sortSelect.value) {
    case "No":
      break;
    case "aes":
      userLogin.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "des":
      userLogin.sort((a, b) => b.name.localeCompare(a.name));
    default:
      break;
  }
  //
  let stringHTML = "";
  for (let i in userLogin) {
    stringHTML += `  
        <tr>
          <td>${+i + 1}</td>
          <td>
            ${userLogin[i].name}
          </td>
          
          <td>${userLogin[i].email}</td>
          <td>${userLogin[i].password}</td>
          <td>${userLogin[i].status ? "Active" : "Block"}</td>
        <td>${userLogin[i].role ? "Admin" : "User"}</td>
        <td>
            <button onclick="changeStatus(${
              userLogin[i].id
            })" style="display: ${userLogin[i].role ? "none" : ""}" >
                ${userLogin[i].status ? "Block" : "Active"}
            </button>
        </td>
       </tr>
    `;
  }
  newUser.innerHTML = stringHTML;
}
renderUser();

function changeStatus(id) {
  // lay local
  const userLogin = JSON.parse(localStorage.getItem("register"));

  // tim vi tri theo id
  let viTri = userLogin.findIndex((el) => el.id == id);
  // doi status = !status
  userLogin[viTri].status = !userLogin[viTri].status;

  // luu
  window.localStorage.setItem("register", JSON.stringify(userLogin));
  renderUser();
  // ve lai
}

// Phân trang
function renderPage(dbRegister) {
  totalPage = Math.ceil(dbRegister.length / pageSize);

  let stringHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    stringHTML += `
      <button onclick="choosePage(${i})" >${i}</button>
    `;
  }
  document.getElementById("pagination").innerHTML = stringHTML;
}

function choosePage(i) {
  curentPage = i;
  renderUser();
}
btnSearch.onclick = function () {
  renderUser();
};

logOut.onclick = function () {
  localStorage.removeItem("admin-login");
  window.location.href = "../File Trang chủ/Home.html";
};
