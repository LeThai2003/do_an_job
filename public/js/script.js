//------JOB---------

//form search
const formSearch = document.querySelector("[form-search]");
let area = "all";
let experience = "all";
let salary = "all";

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

    const selectExperience = formSearch.querySelector("[select-experiece");
    selectExperience.addEventListener("change", () => {
        const exp = selectExperience.value;
        experience = exp;
    });
}

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("area", area);
    url.searchParams.set("experience", experience);
    url.searchParams.set("salary", salary);
    window.location.href = url.href;
});
//form search





//------END JOB-----