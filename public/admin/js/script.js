


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

// ------Trang chi tiết công việc------------
const detailJobContainer = document.querySelector("[detail-job]");
if(detailJobContainer)
{   
    const formEdit = detailJobContainer.querySelector("[form-edit]");

    const buttonEdit = detailJobContainer.querySelector("[button-edit]");
    const slug = buttonEdit.getAttribute("slug");
    const value = parseInt(buttonEdit.getAttribute("button-edit"));

    if(value == 0)
    {
        buttonEdit.disabled = true;
    }
    else
    {
        buttonEdit.disabled = false;
        
        buttonEdit.addEventListener("click", () => {
            const path = formEdit.getAttribute("path");
            const action = `${path}/edit/${slug}`;
            formEdit.action = action;
            formEdit.submit();
        })
    }
}
// ------end Trang chi tiết công việc------------


// -----trang công việc --- filter status -----
const buttonStatus = document.querySelectorAll("[status]");
if(buttonStatus)
{
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            let url = new URL(window.location.href);

            const status = button.getAttribute("status");
            if(status)
            {
                url.searchParams.set("status", status);
            }
            else
            {
                url.searchParams.delete("status");
            }
            
            window.location.href = url.href;
        });
    });
}
// -----end trang công việc --- filter status -----

// -----trang công việc --- search -----
const formSearch = document.querySelector("[formSearch]");
if(formSearch)
{
    formSearch.addEventListener("submit", e => {
        e.preventDefault();
        let url = new URL(window.location.href);
        const input = formSearch.querySelector("input[name='keyword']");
        const value = input.value;
        if(value)
        {
            url.searchParams.set("keyword", value);
        }
        else
        {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// -----end trang công việc --- search -----

// -----trang công việc --- sort
const sort = document.querySelector("[sort]");
if(sort)
{
    const sortSelect = sort.querySelector("select[name='sort']");
    let url = new URL(window.location.href);
    sortSelect.addEventListener("change", () => {
        let [sortKey, sortValue] = sortSelect.value.split("-");
        console.log(sortKey);
        console.log(sortValue);
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    });

    // trả lại giao diện
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue)
    {
        const option = sortSelect.querySelector(`option[value="${sortKey}-${sortValue}"]`);
        option.selected = true;
    }

    const clearButton = sort.querySelector("[sort-clear]");
    clearButton.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });
}
// -----trang công việc --- sort


// preview image upload COMPANY
const imagePreview = document.querySelector("[image-preview]");

const imagePreviewFunction = () => {
    const imagePreviewInput = imagePreview.querySelector("[image-preview-input]");
    const imagePreViewSee = imagePreview.querySelector("[image-preview-see]");

    imagePreviewInput.click();

    imagePreviewInput.addEventListener("change", () => {
        const [file] = imagePreviewInput.files;
        if (file) {
            imagePreViewSee.src = URL.createObjectURL(file);
        }
    });
}

const iconChangeImgCompany = document.querySelector(".icon-img-company");
if (iconChangeImgCompany) {
    iconChangeImgCompany.addEventListener("click", () => {
        imagePreviewFunction();
    });
}