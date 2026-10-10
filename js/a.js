lucide.createIcons();


fetch("https://openlibrary.org/subjects/fiction.json?limit=15&sort=rating")
  .then(response => response.json())
  .then(data => {
    showBooks(data.works, "carousel-popular-inner");
  });



fetch("https://openlibrary.org/subjects/fiction.json?limit=15")
  .then(response => response.json())
  .then(data => {
    showBooks(data.works, "carousel-fiction-inner");
  });



fetch("https://openlibrary.org/subjects/nonfiction.json?limit=15")
  .then(response => response.json())
  .then(data => {
    showBooks(data.works, "carousel-nonfiction-inner");
  });



fetch("https://openlibrary.org/subjects/textbooks.json?limit=15")
  .then(response => response.json())
  .then(data => {
    showBooks(data.works, "carousel-textbooks-inner");
  });



function showBooks(books, containerId) {

  const container = document.getElementById(containerId);


  for (let i = 0; i < books.length; i += 5) {

    let slide = document.createElement("div");
    slide.className = "carousel-item";


    if (i == 0) {
      slide.className = "carousel-item active";
    }

    let cardGroup = document.createElement("div");
    cardGroup.className = "card-group";

    for (let j = i; j < i + 5 && j < books.length; j++) {

      let book = books[j];

      let cover;

      if (book.cover_id) {
        cover = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
      } else {
        cover = "https://placehold.co/200x300?text=No+Cover";
      }

      let author;

      if (book.authors && book.authors.length > 0) {
        author = book.authors[0].name;
      } else {
        author = "Unknown author";
      }

      let link = document.createElement("a");
      link.href = "./book.html?id=" + encodeURIComponent(book.key);
      link.className = "card";
      link.style.textDecoration = "none";
      let image = document.createElement("img");
      image.src = cover;
      image.className = "card-img-top";
      image.alt = book.title;
      let body = document.createElement("div");
      body.className = "card-body";

      let title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = book.title;

      let authorText = document.createElement("p");
      authorText.className = "card-text";
      authorText.textContent = author;

      body.appendChild(title);
      body.appendChild(authorText);

      link.appendChild(image);
      link.appendChild(body);

      cardGroup.appendChild(link);
    }

    slide.appendChild(cardGroup);
    container.appendChild(slide);
  }
}
