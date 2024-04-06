const closeUngTuyen = () =>{
    let overplay = document.getElementsByClassName("overplay")[0]
    let form = document.getElementsByClassName("box-ungtuyen")[0]
    overplay.style.display = 'none'
    form.style.display = 'none'
}
const openUngTuyen = () =>{
    let overplay = document.getElementsByClassName("overplay")[0]
    let form = document.getElementsByClassName("box-ungtuyen")[0]
    overplay.style.display = 'block'
    form.style.display = 'block'
}

const upload = (e) =>{
    let file = document.getElementsByClassName("input_file")[0]
    if( file.files.length > 0){
        console.log(file.file)
    }
}

const buttonUngTuyen = document.querySelector("[button-ungtuyen]");
if(buttonUngTuyen)
{
    const job = JSON.parse(buttonUngTuyen.getAttribute("button-ungtuyen"));
    const chkHetHan = job.hetHan;
    if(chkHetHan)
    {
        buttonUngTuyen.disabled = true;
    }
    else
    {
        buttonUngTuyen.disabled = false;
    }
}
