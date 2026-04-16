let inputBox = document.getElementById("inputBox");
let list = document.getElementById("list");

/* Load */
window.onload = function () {
    list.innerHTML = localStorage.getItem("tasks") || "";
    updateProgress();
};

/* Add Task */
function addTask() {
    if (inputBox.value.trim() === "") return;

    let priority = document.getElementById("priority").value;
    let date = new Date().toLocaleDateString();

    let li = document.createElement("li");

    li.innerHTML = `
        <div>
            <span class="task-text">${inputBox.value}</span><br>
            <small>${date}</small><br>
            <span class="priority ${priority}">${priority}</span>
        </div>

        <div class="actions">
            <button class="complete">✔</button>
            <button class="edit" onclick="editTask(this)">✏</button>
            <button class="delete" onclick="deleteTask(this)">🗑</button>
        </div>
    `;

    list.appendChild(li);
    inputBox.value = "";

    saveData();
}

/* Complete */
list.addEventListener("click", function (e) {
    if (e.target.classList.contains("complete") || e.target.classList.contains("task-text")) {
        let li = e.target.closest("li");
        li.classList.toggle("checked");
        saveData();
    }
});

/* Delete */
function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
    saveData();
}

/* Edit */
function editTask(btn) {
    let li = btn.parentElement.parentElement;
    let text = li.querySelector(".task-text");

    let newText = prompt("Edit task:", text.innerText);

    if (newText && newText.trim() !== "") {
        text.innerText = newText;
        saveData();
    }
}

/* Save */
function saveData() {
    localStorage.setItem("tasks", list.innerHTML);
    updateProgress();
}

/* Progress + Confetti */
function updateProgress() {
    let total = list.children.length;
    let done = document.querySelectorAll(".checked").length;

    document.getElementById("count").innerText = done + "/" + total;

    let percent = total === 0 ? 0 : (done / total) * 100;
    document.getElementById("progress").style.width = percent + "%";

    if (done === total && total > 0) {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
}

/* Logout */
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}