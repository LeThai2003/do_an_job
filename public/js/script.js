//------JOB---------

//form search
const formSearch = document.querySelector("[form-search]");
let area = "all";
let experience = "all";
let salary = "all";
let vitri = "";

if(formSearch)
{
    const inputViTri = formSearch.querySelector("input[name='vitri']");
    inputViTri.addEventListener("change", (e) => {
        vitri = e.target.value;
    });

    const selectArea = formSearch.querySelector("[select-area]");
    selectArea.addEventListener("change", () => {
        const area1 = selectArea.value;
        area = area1;
    });

    const selectSalary = formSearch.querySelector("[select-salary]");
    selectSalary.addEventListener("change", () => {
        const salary1 = selectSalary.value;
        salary = salary1;
    });

    const selectExperience = formSearch.querySelector("[select-experiece");
    selectExperience.addEventListener("change", () => {
        const exp = selectExperience.value;
        experience = exp;
    });
}

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("vitri", vitri);
    url.searchParams.set("khuvuc", area);
    url.searchParams.set("kinhnghiem", experience);
    url.searchParams.set("luong", salary);
    window.location.href = url.href;
});
//form search





//------END JOB-----

string = `1	An Giang
    2	Bà rịa - Vũng tàu
    3	Bắc Giang
    4	Bắc Kạn
    5	Bạc Liêu
    6	Bắc Ninh
    7	Bến Tre
    8	Bình Định
    9	Bình Dương
    10	Bình Phước
    11	Bình Thuận
    12	Cà Mau
    13	Cần Thơ
    14	Cao Bằng 
    15	Đà Nẵng
    16	Đắk Lắk
    17	Đắk Nông
    18	Điện Biên
    19	Đồng Nai
    20	Đồng Tháp
    21	Gia Lai
    22	Hà Giang
    23	Hà Nam
    24	Hà Nội 
    25	Hà Tĩnh
    26	Hải Dương
    27	Hải Phòng
    28	Hậu Giang
    29	Hòa Bình
    30	Hưng Yên
    31	Khánh Hòa
    32	Kiên Giang
    33	Kon Tum
    34	Lai Châu
    35	Lâm Đồng
    36	Lạng Sơn
    37	Lào Cai
    38	Long An
    39	Nam Định
    40	Nghệ An
    41	Ninh Bình
    42	Ninh Thuận
    43	Phú Thọ
    44	Phú Yên
    45	Quảng Bình
    46	Quảng Nam
    47	Quảng Ngãi
    48	Quảng Ninh
    49	Quảng Trị
    50	Sóc Trăng
    51	Sơn La
    52	Tây Ninh
    53	Thái Bình
    54	Thái Nguyên
    55	Thanh Hóa
    56	Thừa Thiên Huế
    57	Tiền Giang
    58	Thành phố Hồ Chí Minh
    59	Trà Vinh
    60	Tuyên Quang
    61	Vĩnh Long
    62	Vĩnh Phúc
    63	Yên Bái`
const array = string.split("\n")

const array2 =  array.map(item => item.split("\t")[1]);

const array3 = array2.map(item => `(N'${item}')`);

console.log(array3.join(", "));

