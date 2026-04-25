let users = JSON.parse(localStorage.getItem("users")) || [];
let logs = JSON.parse(localStorage.getItem("logs")) || [];

/* Render Users */
function renderUsers() {
    let list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach((user, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${user.name} (${user.role})
            <div>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

/* Add User */
function addUser() {
    let name = document.getElementById("userName").value;
    let role = document.getElementById("role").value;

    if(name === "") return alert("Enter name");

    users.push({name, role});
    log("User added");

    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("userName").value = "";
    renderUsers();
}

/* Edit */
function editUser(index) {
    let newName = prompt("New name:", users[index].name);
    if(newName){
        users[index].name = newName;
        log("User updated");
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    }
}

/* Delete */
function deleteUser(index) {
    users.splice(index, 1);
    log("User deleted");
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
}

/* Logs */
function log(text) {
    logs.push(text);
    localStorage.setItem("logs", JSON.stringify(logs));
    renderLogs();
}

function renderLogs() {
    let logList = document.getElementById("logs");
    logList.innerHTML = "";
    logs.forEach(l => {
        let li = document.createElement("li");
        li.innerText = l;
        logList.appendChild(li);
    });
}

/* Clinic */
function saveClinic() {
    alert("Clinic Saved");
    log("Clinic updated");
}

/* Password */
function resetPassword() {
    alert("Password Updated");
    log("Password changed");
}

/* Backup */
function backupData() {
    alert("Backup Done");
    log("Backup created");
}

/* Restore */
function restoreData() {
    alert("Restore Done");
    log("Data restored");
}

/* Init */
window.onload = function(){
    renderUsers();
    renderLogs();
};