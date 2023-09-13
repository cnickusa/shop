let btn_nav = document.querySelector("#btn_nav");
let form = document.querySelector("form");
let inp1 = document.querySelector("#inp1");
let inp2 = document.querySelector("#inp2");
let inp3  = document.querySelector("#inp3");
let form_input = document.querySelectorAll("form input");
let ul = document.querySelector("#ul")

//! CREATE
btn_nav.addEventListener("click",()=>{
    form.style.display = "block"
    form.addEventListener("submit",(event)=>{
event.preventDefault()
       form_input.forEach((elem)=>{
        if(!elem.value.trim()){
            alert("Заполните все данные")
        }
       })
       let obj = {
        name:inp1.value,
        phone:inp2.value,
        image:inp3.value
       }
       let data = JSON.parse(localStorage.getItem("users"))  || []
       data.push(obj);
       localStorage.setItem("users",JSON.stringify(data));
    readFunc()
    })
})

//READ 
function readFunc(){
    if(!localStorage.getItem("users")){
        localStorage.setItem("users","[]")
    }
    ul.innerHTML =""
    
    let data = JSON.parse(localStorage.getItem("users"))
    data.forEach((elem,index)=>{
        ul.innerHTML += `
    <li>
    ${elem.name}
    ${elem.phone}
    <img src="${elem.image}" alt="image">
    <button onclick="deleteFunc(${index})" >Delete</button>
    <button onclick="editFunc(${index})" >Edit</button>
    </li>
    `
    })
}

//! DELETE
function deleteFunc(index){
    let data = JSON.parse(localStorage.getItem('users'))
    data.splice(index,1);
    localStorage.setItem("users",JSON.stringify(data))
    readFunc()
}

//! EDIT // UPDATE
let modal = document.querySelector(".modal");
let inpEdit1 = document.querySelector("#inpEdit1");
let inpEdit2 = document.querySelector("#inpEdit2");
let inpEdit3 = document.querySelector("#inpEdit3");
let btnSave = document.querySelector(".modal_body button");
let closeModal = document.querySelector(".modal_footer button");

function editFunc(index){
    modal.style.display ="block";
    let data = JSON.parse(localStorage.getItem("users"));
    inpEdit1.value = data[index].name;
    inpEdit1.setAttribute("id",index);
    inpEdit2.value = data[index].phone;
    inpEdit2.setAttribute("id",index);
    inpEdit3.value = data[index].image;
    inpEdit3.setAttribute("id",index);
}

closeModal.addEventListener("click",()=>{
    modal.style.display ="none";
});

btnSave.addEventListener("click",()=>{
    modal.style.display ="none";
    let id1 = inpEdit1.getAttribute("id")
    let id2 = inpEdit2.getAttribute("id");
    let id3 = inpEdit3.getAttribute("id");
    let data = JSON.parse(localStorage.getItem("users"));
    let newObj = {
        name:inpEdit1.value,
        phone:inpEdit2.value,
        image:inpEdit3.value,
    };
    data.splice(id1, 1, newObj);
    data.splice(id2, 1, newObj);
    data.splice(id3, 1, newObj);
    // data.push(newObj)
    localStorage.setItem("users",JSON.stringify(data));
    readFunc();
});