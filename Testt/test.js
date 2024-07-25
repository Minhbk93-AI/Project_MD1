function encodeImageFileAsURL(element) {
  const file = element.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    document.getElementById("image-product").src = reader.result;
  };

  reader.readAsDataURL(file);
}
