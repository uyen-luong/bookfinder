const params = new URLSearchParams(window.location.search);

const genreQuery = params.get("genre");

const resultsContainer = document.getElementById("genre-results");

const genreTitle = document.getElementById("genre-title");



genreTitle.textContent = "\"" + genreQuery + "\" books";



const genre = genreQuery.toLowerCase().replaceAll(" ", "_");



const url = "https://openlibrary.org/subjects/" + genre + ".json?limit=250";

var loadingOverlay = document.getElementById("loading-overlay");

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.style.display = "none";
    }
}

console.log(genreQuery);

fetch(url)
    .then(response => response.json())
    .then(data => {
        const books = data.works;

        resultsContainer.innerHTML = "";

        if (books.length == 0) {
            resultsContainer.textContent = "No books found.";
            return;
        }


        for (let i = 0; i < books.length; i++) {

            const book = books[i];

            let cover;

            if (book.cover_id) {
                cover = "https://covers.openlibrary.org/b/id/" + book.cover_id + "-M.jpg";
            }
            else {
                cover =
                    "https://placehold.co/200x300?text=No+Cover";
            }


            let author;

            if (book.authors && book.authors.length > 0) {
                author = book.authors[0].name;
            }
            else {
                author = "Unknown author";
            }



            const card = document.createElement("a");

            card.className = "card";

            card.href = "./book.html?id=" + encodeURIComponent(book.key);

            card.style.textDecoration = "none";


            card.innerHTML =
                "<img src='" + cover + "' class='card-img-top' alt='" + book.title + "'>" +
                "<div class='card-body'>" +
                "<h5 class='card-title'>" + book.title + "</h5>" +
                "<p class='card-text'>" + author + "</p>" +
                "</div>";


            resultsContainer.appendChild(card);
        }
    hideLoading();
    });