const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirm = document.getElementById("confirm");
const register = document.getElementById("register");
const error = document.getElementById("error");

register.onclick = function () {
  const dbRegister = JSON.parse(localStorage.getItem("register")) || [];
  const nameUser = inputName.value.trim();
  const emailUser = inputEmail.value.trim();
  const passwordUser = inputPassword.value.trim();
  const confirmPassword = inputConfirm.value.trim();
  //_____________________________Điều kiện Input _________________________

  if (!nameUser || !emailUser || !passwordUser || !confirmPassword) {
    error.textContent = "Mời bạn điền đầy đủ thông tin";
    return;
  }

  if (passwordUser.length < 6) {
    error.textContent = "Mật khẩu phải ít hơn hoặc bằng 6 kí tự";
    return;
  }

  if (passwordUser !== confirmPassword) {
    error.textContent = "Password phải trùng nhau";
    return;
  }
  //Kiểm tra điều kiện trùng tên
  let idx = dbRegister.findIndex(
    (el) => el.name.toLowerCase() === nameUser.toLowerCase()
  );

  if (idx !== -1) {
    error.textContent = "Tên sản phẩm đã tồn tại";
    return;
  } else {
    error.textContent = "";
  }

  let id = 1;
  if (dbRegister.length > 0) {
    id = dbRegister[dbRegister.length - 1].id + 1;
  }
  const newUser = {
    id: id,
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
    role: 0,
    status: true,
    cart: [],
  };

  //
  dbRegister.push(newUser);

  localStorage.setItem("register", JSON.stringify(dbRegister));
};
