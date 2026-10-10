

const savedBooksContainer = document.getElementById("savedbooks");

const user = JSON.parse(localStorage.getItem("currentUser"));


if (!user) {

    savedBooksContainer.textContent =
        "Please log in to see your saved books.";

}
else {

    const savedBooks =
        JSON.parse(
            localStorage.getItem(
                "savedBooks_" + user.email
            )
        ) || [];


    if (savedBooks.length == 0) {

        savedBooksContainer.textContent = "You haven't saved any books yet.";

    }
    else {

        for (let i = 0; i < savedBooks.length; i++) {

            const book = savedBooks[i];


            const card = document.createElement("a");

            card.className = "card";

            card.href = "./book.html?id=" + encodeURIComponent(book.key);

            card.style.textDecoration = "none";


            card.innerHTML = "<img src='" + book.cover + "' class='card-img-top' alt='" + book.title + "'>" + "<div class='card-body' style='height: auto;'>" + "<h5 class='card-title'>" + book.title + "</h5>" + "<p class='card-text'>" + book.author + "</p>" + "<button class='unsave''>unbookmark</button>" + "</div>";


            savedBooksContainer.appendChild(card);

            const unsave = card.querySelector(".unsave");

            unsave.addEventListener("click", function (event) {

                event.preventDefault();

                savedBooks.splice(i, 1);

                localStorage.setItem(
                    "savedBooks_" + user.email,
                    JSON.stringify(savedBooks)
                );

                card.remove();

            });

        }

    }

}