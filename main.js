let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerText = "\u00d7"; 
        li.appendChild(span);

        inputBox.value = ""; 
        saveData(); 
    }
}
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); 
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML); 
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || ''; 
}

let clearDataBtn = document.getElementById("clearDataBtn");
clearDataBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        localStorage.removeItem("data"); 
        listContainer.innerHTML = ""; 
    }
});

showTask();