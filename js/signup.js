


let form = document.getElementById("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value.trim();


    if (password.length < 8) {
        alert("Password must be at least 8 characters");
    } else {

        if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users"));

            users.push({
                email,
                password,
                username,
            });

        localStorage.setItem("users", JSON.stringify(users));
        } else {
        localStorage.setItem(
            "users",
            JSON.stringify([
            {
                email,
                password,
                username,
            },
            ])
        );
        }

        alert("User created successfully, please login");
        location.href = "./login.html";
    }
});