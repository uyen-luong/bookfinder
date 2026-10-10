

let form = document.getElementById("form");
form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!localStorage.getItem("users")) {
        alert("No user found");
    } else {

        let users = JSON.parse(localStorage.getItem("users"));

        let username = document.getElementById("username");
        let password = document.getElementById("password");

        let existingUser = users.find(
        (index) =>
            index.username === username.value.trim() &&
            index.password === password.value.trim()
        );

        if (existingUser) {
        localStorage.setItem("currentUser", JSON.stringify(existingUser));
        

        location.href = "./index.html";
        } else {
        alert("Email or password is incorrect");
        }
    }
});
