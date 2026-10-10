const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log(id);

var loadingOverlay = document.getElementById("loading-overlay");

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.style.display = "none";
    }
}



fetch(`https://openlibrary.org${id}.json`)
    .then(response => response.json())
    .then(data => {

        document.getElementById("title").textContent = data.title;


        const description = data.description;

        if (description) {
            if (typeof description === "string") {
                document.getElementById("description").textContent = description;
            } else {
                document.getElementById("description").textContent = description.value;
            }
        } else {
            document.getElementById("description").textContent =
                "No description is available for this book.";
        }


        let cover;

        if (data.covers) {
            cover = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`;
            document.getElementById("cover").src = cover;
        } else {
            cover = "images/no-cover.jpg";
            document.getElementById("cover").src = cover;
        }



        let authorName = "Unknown Author";

        if (data.authors) {
            const authorKey = data.authors[0].author.key;

            fetch(`https://openlibrary.org${authorKey}.json`)
                .then(response => response.json())
                .then(authorData => {
                    authorName = authorData.name;

                    document.getElementById("author").textContent = authorName;
                });
        } else {
            document.getElementById("author").textContent = "Unknown Author";
        }



        if (data.subjects) {
            const genre = data.subjects.slice[0];

            document.getElementById("genre").textContent = "Genres: " + data.subjects.slice(0, 5).join(", ") + ", etc...";


        } else {
            document.getElementById("genre").textContent = "No genres available.";
            showSuggestedBooks(null);
        }


        // BOOKMARK
        const saveButton = document.getElementById("saved");
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (saveButton && user) {

            let savedBooks = JSON.parse(localStorage.getItem("savedBooks_" + user.email)) || [];

            let alreadySaved = false;

            for (let i = 0; i < savedBooks.length; i++) {
                if (savedBooks[i].key === id) {
                    alreadySaved = true;
                }
            }

            if (alreadySaved) {
                saveButton.textContent = "unbookmark";
            } else {
                saveButton.textContent = "bookmark";
            }

            saveButton.addEventListener("click", function () {

                if (alreadySaved) {

                    for (let i = 0; i < savedBooks.length; i++) {

                        if (savedBooks[i].key === id) {
                            savedBooks.splice(i, 1);
                            break;
                        }

                    }

                    alreadySaved = false;
                    saveButton.textContent = "bookmark";

                } else {

                    savedBooks.push({
                        title: data.title,
                        author: authorName,
                        cover: cover,
                        key: id
                    });

                    alreadySaved = true;
                    saveButton.textContent = "unbookmark";
                }

                localStorage.setItem(
                    "savedBooks_" + user.email,
                    JSON.stringify(savedBooks)
                );
            });
        }





        hideLoading();


    })
    .catch(error => {
        console.log("Error:", error);
        hideLoading();
    });