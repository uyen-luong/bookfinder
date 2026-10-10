lucide.createIcons();

const params = new URLSearchParams(window.location.search);

const query = params.get("q");
const authorQuery = params.get("author");

const resultsContainer = document.getElementById("search-results");
const searchTitle = document.getElementById("search-title");



if (query) {
    searchBooks();
}
else if (authorQuery) {
    searchAuthor();
}

var loadingOverlay = document.getElementById("loading-overlay");

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.style.display = "none";
    }
}

function searchBooks() {

    searchTitle.textContent = "Results for \"" + query + "\"";

    const url =
        "https://openlibrary.org/search.json?q="
        + encodeURIComponent(query)
        + "&limit=250";

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const books = data.docs;

            resultsContainer.innerHTML = "";

            if (books.length == 0) {
                resultsContainer.textContent = "No books found.";
                return;
            }

            for (let i = 0; i < books.length; i++) {

                const book = books[i];
                let cover;

                if (book.cover_i) {
                    cover = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
                }
                else {
                    cover = "https://placehold.co/200x300?text=No+Cover";
                }

                let author;

                if (book.author_name && book.author_name.length > 0) {
                    author = book.author_name[0];
                }
                else {
                    author = "Unknown author";
                }

                createBookCard(
                    book.title,
                    author,
                    cover,
                    book.key
                );
            }

        hideLoading();
        });
        
}



function searchAuthor() {

    searchTitle.textContent =
        "Books by \"" + authorQuery + "\"";

    const url =
        "https://openlibrary.org/search.json?author="
        + encodeURIComponent(authorQuery)
        + "&limit=250";

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const books = data.docs;

            resultsContainer.innerHTML = "";

            if (books.length == 0) {
                resultsContainer.textContent = "No books found.";
                return;
            }

            for (let i = 0; i < books.length; i++) {

                const book = books[i];

                let cover;

                if (book.cover_i) {
                    cover = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
                }
                else {
                    cover = "https://placehold.co/200x300?text=No+Cover";
                }

                let author;

                if (book.author_name && book.author_name.length > 0) {
                    author = book.author_name[0];
                }
                else {
                    author = "Unknown author";
                }

                createBookCard(
                    book.title,
                    author,
                    cover,
                    book.key
                );
            }
        hideLoading();
        });
        
}



function createBookCard(title, author, cover, bookKey) {

    const card = document.createElement("a");
    card.className = "card";

    card.href =
        "./book.html?id=" + encodeURIComponent(bookKey);

    card.style.textDecoration = "none";

    card.innerHTML =
        "<img src='" + cover + "' class='card-img-top' alt='" + title + "'>" +
        "<div class='card-body'>" +
        "<h5 class='card-title'>" + title + "</h5>" +
        "<p class='card-text'>" + author + "</p>" +
        "</div>";

    resultsContainer.appendChild(card);
}



const bookForm = document.getElementById("searchbook");

if (bookForm) {

    bookForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const input = document.getElementById("searchinput");
        const query = input.value;
        window.location.href = "search.html?q=" + encodeURIComponent(query);
    });
}



const authorForm =
    document.getElementById("searchauthor");

if (authorForm) {

    authorForm.addEventListener("submit", function(event) {
        event.preventDefault()
        const input = document.getElementById("authorinput");
        const authorQuery = input.value;
        window.location.href = "search.html?author=" + encodeURIComponent(authorQuery);
    });
}

const genreForm = document.getElementById("searchgenre");

if (genreForm) {

    genreForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const input = document.getElementById("genresearch");
        const genreQuery = input.value;
        window.location.href = "genre.html?genre=" + encodeURIComponent(genreQuery);
    });
}

var genreButtons = document.querySelectorAll("#fantasy, #romance, #mystery, #horror");

for (var i = 0; i < genreButtons.length; i++) {
    genreButtons[i].addEventListener("click", function () {
        var genreName = this.id; 
        window.location.href = "genre.html?genre=" + genreName;
    });
}