//------JOB---------

//selec-option-area
const formSearch = document.querySelector("[form-search]");
var area = "";
var salary = "";
if(formSearch)
{
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
}

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    action = `/job/${area}/${salary}`;
    console.log(action);
    formSearch.action = action;
    formSearch.submit();
});

//end selec-option-area

//select-option-salary

//end select-option-salary





//------END JOB-----