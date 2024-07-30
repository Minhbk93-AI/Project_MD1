// Modal

const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-login");
const errorLogin = document.getElementById("error-login");
const errorPassword = document.getElementById("error-password");

//
btnLogin.onclick = function () {
  const dbUser = JSON.parse(localStorage.getItem("register")) || [];
  const account = {
    email: inputEmail.value,
    password: inputPassword.value,
  };
  //
  const elUser = dbUser.find((el) => el.email == account.email);

  if (!elUser) {
    alert("Thông tin không hợp lệ");
    return;
  }

  if (elUser.password !== account.password) {
    // console.log(elUser.password, account.password);
    alert("Thông tin không hợp lệ");
    return;
  }

  if (elUser.role == 0) {
    localStorage.setItem("user-login", JSON.stringify(elUser));
    window.location.href = "../File Trang chủ/Home.html";
  } else {
    localStorage.setItem("admin-login", JSON.stringify(elUser));
    window.location.href = "../Trang Admin/admin.html";
  }
  //   window.location.href = "admin.html";
};

// Kiểm tra role = 0 thì là user , không thì sẽ là admin

// if (user.role == 0) {
//   localStorage.setItem("userlogin", JSON.stringify(user));
//   window.location.href = "../../Trang chủ/trangchu.html";
// } else {
//   localStorage.setItem("adminlogin", JSON.stringify(user));
//   window.location.href = "../../DataBase/category/category.html";
// }
