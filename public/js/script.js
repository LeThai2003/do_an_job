//------JOB---------

//form search
const formSearch = document.querySelector("[form-search]");
let area = "all";
let experience = "all";
let salary = "all";
let vitri = "";


// Bắt sự kiện change trong form search
if (formSearch) {
    const inputViTri = formSearch.querySelector("input[name='vitri']");
    inputViTri.addEventListener("change", (e) => {
        vitri = e.target.value;
    });

    const selectArea = formSearch.querySelector("[select-area]");
    selectArea.addEventListener("change", () => {
        area = selectArea.value;
    });

    const selectSalary = formSearch.querySelector("[select-salary]");
    selectSalary.addEventListener("change", () => {
        salary = selectSalary.value;
    });

    const selectExperience = formSearch.querySelector("[select-experiece");
    selectExperience.addEventListener("change", () => {
        experience = selectExperience.value;
    });
}
//form search

if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();

        let url = new URL(window.location.href);

        url = new URL(`${url.origin}/jobs`);

        const inputViTri = formSearch.querySelector("input[name='vitri']");
        const selectArea = formSearch.querySelector("[select-area]");
        const selectSalary = formSearch.querySelector("[select-salary]");
        const selectExperience = formSearch.querySelector("[select-experiece");

        vitri = inputViTri.value;
        area = selectArea.value;
        experience = selectExperience.value;
        salary = selectSalary.value;

        url.searchParams.set("vitri", vitri);
        url.searchParams.set("khuvuc", area);
        url.searchParams.set("kinhnghiem", experience);
        url.searchParams.set("luong", salary);

        window.location.href = url.href;
    });
}

const objectSearch = {
    khuvuc: "all",
    kinhnghiem: "all",
    luong: "all",
    vitri: ""
};
const url = new URL(window.location.href);

if (url.search.includes("vitri")) {
    objectSearch.vitri = url.searchParams.get("vitri");
    objectSearch.khuvuc = url.searchParams.get("khuvuc");
    objectSearch.kinhnghiem = url.searchParams.get("kinhnghiem");
    objectSearch.luong = url.searchParams.get("luong");

    const inputViTri = formSearch.querySelector("input[name='vitri']");
    const selectArea = formSearch.querySelector("[select-area]");
    const selectSalary = formSearch.querySelector("[select-salary]");
    const selectExperience = formSearch.querySelector("[select-experiece");

    inputViTri.value = objectSearch.vitri;

    const itemArea = selectArea.querySelector(`option[value="${objectSearch.khuvuc}"]`);
    itemArea.selected = true;

    const itemSalary = selectSalary.querySelector(`option[value="${objectSearch.luong}"]`);
    itemSalary.selected = true;

    const itemExperience = selectExperience.querySelector(`option[value="${objectSearch.kinhnghiem}"]`);
    itemExperience.selected = true;
}

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

const array2 = array.map(item => item.split("\t")[1]);

const array3 = array2.map(item => `(N'${item}')`);

// console.log(array3.join(", "));

// link----

if(url.href == `${url.origin}/jobs`)
{
    const linkJob = document.querySelector(".section-link .link-job.link");
    linkJob.classList.add("active");

}
else if(url.href == `${url.origin}/companys`)
{
    const linkCompany = document.querySelector(".section-link .link-cmp.link");
    linkCompany.classList.add("active");
}

// ------------form search company-----
const formSearchCompany = document.querySelector("[form-search-company]");
if(formSearchCompany)
{
    if(url.href.includes("tenCT") && url.href.includes("khuvuc"))
    {
        const inputName = formSearchCompany.querySelector("input[name='tenCT']");
        const selectKV = formSearchCompany.querySelector("select[name='khuvuc']");

        const tenCT = url.searchParams.get("tenCT");
        const khuVuc = url.searchParams.get("khuvuc");

        inputName.value = tenCT;

        const itemKV = selectKV.querySelector(`option[value="${khuVuc}"]`);
        itemKV.selected = true;
    }
}

