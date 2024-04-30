window.addEventListener('load', function() {
    inputs.forEach(function(input) {
        input.setAttribute('readonly', true);
    });
    selects.forEach(function(select) {
        select.setAttribute('disabled', true);
    });

    inputsTD.forEach(function(input) {
        input.setAttribute('readonly', true);
    });
    textareasTD.forEach(function(select) {
        select.setAttribute('disabled', true);
    });
});
var inputs = document.querySelectorAll('.item input');
var selects = document.querySelectorAll('.item select');
var inputsTD = document.querySelectorAll('.item-account input');
var textareasTD = document.querySelectorAll('.item-account textarea');
var buttonSua = document.querySelector(".section-CT-body .body-trangchu .container-item .item_button button.sua");
var buttonXacNhan = document.querySelector(".section-CT-body .body-trangchu .container-item .item_button button.xac_nhan");
// sua hay khong sua
buttonSua.addEventListener("click", function() {
    buttonSua.style.display = "none";
    buttonXacNhan.style.display = "block";
    inputs.forEach(function(input) {
        input.removeAttribute('readonly');
    });
    selects.forEach(function(select) {
        select.removeAttribute('disabled');
    });
});

buttonXacNhan.addEventListener("click", function() {
    buttonSua.style.display = "block";
    buttonXacNhan.style.display = "none";
    inputs.forEach(function(input) {
        input.setAttribute('readonly', true);
    });
    selects.forEach(function(select) {
        select.setAttribute('disabled', true);
    });
});


// chuyen trang
let trangchu = document.getElementsByClassName("item-trangchu")[0]
let tintuyen = document.getElementsByClassName("item-tintuyen")[0]
let page_trangchu = document.getElementsByClassName("body-trangchu")[0]
let page_tintuyen = document.getElementsByClassName("body-tintuyen")[0]
trangchu.addEventListener("click", ()=>{
    page_tintuyen.style.display = "none";
    page_trangchu.style.display = "block";
    trangchu.classList.add("active")
    tintuyen.classList.remove("active")
})
tintuyen.addEventListener("click", ()=>{
    page_tintuyen.style.display = "block";
    page_trangchu.style.display = "none";
    trangchu.classList.remove("active")
    tintuyen.classList.add("active")
})

const divImage = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account .anhcongty");
const inputImage = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account.box_anh_dai_dien input")

console.log(divImage)
console.log(inputImage)

inputImage.addEventListener('change', function() {
    const file = this.files[0]; // Lấy tệp được chọn
    if (file) {
        const reader = new FileReader(); // Tạo một FileReader để đọc tệp
        reader.onload = function() {
            // Khi tệp được đọc thành công, hiển thị hình ảnh trong div
            divImage.innerHTML = '<img style="width:100%;height:100%;" src="' + reader.result + '" alt="Preview">';
            divImage.style.display = 'block'; // Hiển thị div
        }
        reader.readAsDataURL(file); // Đọc tệp dưới dạng URL dữ liệu
    }
});

divImage.addEventListener("click", ()=>{
    inputImage.click();
})


var buttonSuaTD = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account-button button.account-sua");
var buttonXacNhanTD = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account-button button.account-xac_nhan");
// sua hay khong sua
buttonSuaTD.addEventListener("click", function() {
    buttonSuaTD.style.display = "none";
    buttonXacNhanTD.style.display = "block";
    inputsTD.forEach(function(input) {
        input.removeAttribute('readonly');
    });
    textareasTD.forEach(function(select) {
        select.removeAttribute('disabled');
    });
});

buttonXacNhanTD.addEventListener("click", function() {
    buttonSuaTD.style.display = "block";
    buttonXacNhanTD.style.display = "none";
    inputsTD.forEach(function(input) {
        input.setAttribute('readonly', true);
    });
    textareasTD.forEach(function(select) {
        select.setAttribute('disabled', true);
    });
});
