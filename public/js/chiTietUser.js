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
    // selects.forEach(function(select) {
    //     select.setAttribute('disabled', true);
    // });
});


// chuyen trang
let trangchu = document.getElementsByClassName("item-trangchu")[0]
let tintuyen = document.getElementsByClassName("item-tintuyen")[0]
let page_trangchu = document.getElementsByClassName("body-trangchu")[0]
let page_tintuyen = document.getElementsByClassName("body-tintuyen")[0]



const trangChuClick = () => {
    page_tintuyen.style.display = "none";
    page_trangchu.style.display = "block";
    trangchu.classList.add("active")
    tintuyen.classList.remove("active")
};

const tinTuyenClick = () => {
    page_tintuyen.style.display = "block";
    page_trangchu.style.display = "none";
    trangchu.classList.remove("active")
    tintuyen.classList.add("active")
}

var url = new URL(window.location.href);

trangchu.addEventListener("click", ()=>{
    trangChuClick();
    url.searchParams.set("view-info", "user")
    window.location.href = url.href;
})


tintuyen.addEventListener("click", () => {
    tinTuyenClick();
    url.searchParams.set("view-info", "company")
    window.location.href = url.href;
})

if(url.href.includes("view-info"))
{
    const content = url.searchParams.get("view-info");
    if(content == "user")
    {
        trangChuClick();
    }
    else if(content == "company")
    {
        tinTuyenClick();
    }
}


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



// ----------------------------form user----------------
const formUser = document.querySelector("[form-user]");
const errorDisplay = document.querySelector("#errorDisplay");
const inputName = formUser.querySelector("input[name='name']");
const inputEmail = formUser.querySelector("input[name='email']");

inputName.addEventListener("change", (e) => {
    console.log(e.target.value);
});

// formUser.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if(inputName.value.trim() === "") {
//         errorDisplay.style.display = "inline-block";
//         errorDisplay.textContent = "Tên không được để trống!";
//     }
//     else if(inputEmail.value.trim() === "")
//     {
//         errorDisplay.style.display = "inline-block";
//         errorDisplay.textContent = "Email không được để trống!";
//     } 
//     else if(!inputEmail.value.trim().match(emailRegex))
//     {
//         errorDisplay.style.display = "inline-block";
//         errorDisplay.textContent = "Email không đúng định dạng!";
//     } 
//     else {
//         // Nếu input không trống, submit form
//         formUser.submit();
//     }
    
// })

//alert
const alert = document.querySelector("[show-alert]");
if(alert)
{
    let time = alert.getAttribute("data-time");
    time = parseInt(time);
    setTimeout(() => {
        alert.classList.add("alert-hidden");
    }, time);

    const closeAlert = alert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        alert.classList.add("alert-hidden");
    });
}
//end alert


