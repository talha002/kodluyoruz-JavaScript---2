let uncheckedLi = []
let checkedLi = []

let userListDOM = document.querySelector("#list")

/* Önceden girilmiş liste öğelerini local storage'dan çekmek için gereken kodlamalar */
let taskChecked = localStorage.getItem("task-checked");
let taskUnChecked = localStorage.getItem("task-unchecked");

let taskCheckedArr = taskChecked.split(",")
let taskUnCheckedArr = taskUnChecked.split(",")

taskCheckedArr.forEach(element => {
    let liDOM = document.createElement("li")
    liDOM.innerHTML = `${element}`
    liDOM.setAttribute("onclick", "checked(this)")
    liDOM.classList.add("checked")
    uncheckedLi.push(liDOM.innerHTML)
    userListDOM.append(liDOM)
});

taskUnCheckedArr.forEach(element => {
    let liDOM = document.createElement("li")
    liDOM.innerHTML = `${element}`
    liDOM.setAttribute("onclick", "checked(this)")
    liDOM.classList.add("unchecked")
    uncheckedLi.push(liDOM.innerHTML)
    userListDOM.append(liDOM)
});

/* if (oldLiDOM) {
    let liDOM = document.createElement("li")
    liDOM.innerHTML = `${oldLiDOM}`
    userListDOM.append(liDOM)
} */

/* Yeni liste öğesi eklemek için gerekli olan kodlamalar*/
let formDom = document.querySelector("#userForm")

formDom.addEventListener("submit", formSubmit)

function formSubmit() {
    event.preventDefault()
    let inputDOM = document.querySelector("#task")
    let task = inputDOM.value
    if (task){
        createLiDOM(task)
        inputDOM.value = ""
    }
}

function createLiDOM(TASK){
    let liDOM = document.createElement("li")
    liDOM.innerHTML = `${TASK}`
    liDOM.setAttribute("onclick", "checked(this)")
    liDOM.classList.add("unchecked")
    uncheckedLi.push(liDOM.innerHTML)
    userListDOM.append(liDOM)
}

/* Var olan liste öğeleri ile etkilişime geçmek için gereken kodlamalar */
function checked(item) {
    if (item.classList.value== "unchecked"){
        item.classList.value= "checked"
        checkedLi.push(item.innerHTML)
        if (uncheckedLi.includes(item.innerHTML)){
            let itemIndex = uncheckedLi.indexOf(item.innerHTML)
            uncheckedLi.splice(itemIndex, 1)
        }
    }
    else if (item.classList.value== "checked"){
        item.classList.value= "unchecked"
        uncheckedLi.push(item.innerHTML)
        if (checkedLi.includes(item.innerHTML)){
            let itemIndex = checkedLi.indexOf(item.innerHTML)
            checkedLi.splice(itemIndex, 1)
        }
    }
    let checkedTasks = localStorage.setItem("task-checked", checkedLi)
    let uncheckedTasks = localStorage.setItem("task-unchecked", uncheckedLi)
}