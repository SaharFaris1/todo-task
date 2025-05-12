let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
let clearDataBtn = document.getElementById("clearDataBtn");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerText = inputBox.value;

        let span = document.createElement("span");
        span.innerText = "\u00d7"; // رمز الحذف
        li.appendChild(span);

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit"; 
        editBtn.className = "edit-btn"; 



        editBtn.onclick = function() {
            let newTask = prompt("Edit your task:", li.innerText);
            if (newTask !== null && newTask !== '') {
                li.firstChild.nodeValue = newTask; 
                saveData(); 
            }
        };
        li.appendChild(editBtn); 

        listContainer.appendChild(li);
        inputBox.value = ""; 
        saveData();
        showClearButton(); 
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentElement.remove(); 
            saveData(); 
            showClearButton(); 
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML); 
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || ''; 
    showClearButton(); 
}

function showClearButton() {
    clearDataBtn.style.display = listContainer.innerHTML ? "block" : "none";
}

clearDataBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        localStorage.removeItem("data"); 
        listContainer.innerHTML = ""; 
        showClearButton(); 
    }
});

showTask();