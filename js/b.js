const loginLink = document.getElementById("login");
const signupLink = document.getElementById("signup");

const currentUser = localStorage.getItem("currentUser");


if (currentUser) {

    if (loginLink) {

        loginLink.textContent = "Log Out";
        loginLink.href = "#";

        loginLink.addEventListener("click", function(event) {

            event.preventDefault();

            localStorage.removeItem("currentUser");

            window.location.href = "login.html";
        });
    }

    if (signupLink) {
        signupLink.style.display = "none";
    }
}