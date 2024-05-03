const formCreateJob = document.querySelector("[form-create-job]");



if(formCreateJob)
{
    const wrapper = formCreateJob.querySelector(".wrapper");
    const selectBtn = formCreateJob.querySelector(".select-btn");
    const options = formCreateJob.querySelector(".options");
    const searchInp = formCreateJob.querySelector(".wrapper .content input")  

    const divContent = formCreateJob.querySelector(".wrapper .content");

    const areasAtt = divContent.getAttribute("areas");

    let areas = JSON.parse(areasAtt);

    // console.log(areas)    

    selectBtn.addEventListener("click", () => {
        wrapper.classList.toggle("active");
    });

    var selectedItems = [];
    var selectedIds = [];

    const addArea = () => {
        let html = ``;
        areas.forEach(area => {
            // Kiểm tra xem mục đã được chọn trước đó không
            const isChecked = selectedItems.includes(area.tenKV);
            html += `
                <li class="item ${isChecked ? 'checked' : ''}">
                    <span class="checkbox">
                        <i class="fa-solid fa-check check-icon"></i>
                    </span>
                    <span class="item-text" maKV="${area.maKV}">
                        ${area.tenKV}
                    </span>
                </li>
            `;
    });
    options.innerHTML = html;

    // Lấy danh sách các mục mới
    const items = document.querySelectorAll(".options .item");

    // Gán sự kiện click cho mỗi mục
    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");

            // Cập nhật mảng các mục đã chọn
            const tenKV = item.querySelector(".item-text").innerText;
            const maKV = parseInt(item.querySelector(".item-text").getAttribute("makv"));
            console.log(maKV)
            if (selectedItems.includes(tenKV)) {
                selectedItems = selectedItems.filter(item => item !== tenKV);
                selectedIds = selectedIds.filter(item => item !== maKV);
            } else {
                selectedItems.push(tenKV);
                selectedIds.push(maKV);
            }

            // Cập nhật nút chọn
            updateSelectedText();
        });
    });
};

    // Hàm cập nhật nút chọn
    const updateSelectedText = () => {
        let btnText = document.querySelector(".btn-text");

        if (selectedItems.length > 0) {
            btnText.innerHTML = selectedItems.join(", ");
        } else {
            btnText.innerHTML = "---Khu vực---";
        }

        console.log(selectedItems)
    };

    // Gọi hàm addCountry để gán sự kiện click cho danh sách ban đầu
    addArea();


    // Hàm gán sự kiện click cho các mục
    const assignClickEvent = () => {
        const items = document.querySelectorAll(".options .item");

        items.forEach(item => {
            item.addEventListener("click", () => {
                item.classList.toggle("checked");
                const tenKV = item.querySelector(".item-text").innerText;
                if (selectedItems.includes(tenKV)) {
                    selectedItems = selectedItems.filter(item => item !== tenKV);
                } else {
                    selectedItems.push(tenKV);
                }
                updateSelectedText();
            });
        });
    };

    // Sau khi search xong thì --> cập nhật checkbox + sự kiện click 
    searchInp.addEventListener("keyup", () => {
        let arr = [];
        let searchValue = searchInp.value.toLowerCase();
        arr = areas.filter(area => {
                return area.tenKV.toLowerCase().startsWith(searchValue);
            }).map(area => `
                    <li class="item">
                        <span class="checkbox">
                            <i class="fa-solid fa-check check-icon"></i>
                        </span>
                        <span class="item-text" maKV="${area.maKV}">
                            ${area.tenKV}
                        </span>
                    </li>
                `).join("");

        options.innerHTML = arr;

        const items = document.querySelectorAll(".options .item");

        // Cập nhật trạng thái (checked hoặc không checked) cho mỗi mục
        items.forEach(item => {
            const tenKV = item.querySelector(".item-text").innerText;
            if (selectedItems.includes(tenKV)) {
                item.classList.add("checked");
            } else {
                item.classList.remove("checked");
            }
        });

        // Gọi lại hàm updateOptions để cập nhật trạng thái của các mục
        assignClickEvent();
    });
}

if(formCreateJob)
{
    formCreateJob.addEventListener("submit", (e) => {
        e.preventDefault();
        const ids = formCreateJob.querySelector("input[name='ids']");
        ids.value = JSON.stringify(selectedIds);
        console.log(ids.value);
        formCreateJob.submit();
    })
}


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