


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