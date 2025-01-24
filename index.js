const express = require("express");
const bodyParser = require("body-parser");
const bookdata = require("./data.json");

const app = express();
app.use(bodyParser.json());

let Books = [];
Books.push(...bookdata);

app.get("/books", (req, res) => {
  res.json(Books);
});

app.post("/books", (req, res) => {
  const newbooks = req.body;

  Books.push(newbooks);
  res.status(201).json({ message: "created successfully" });
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year, copies } = req.body;

  const bookIndex = bookdata.findIndex(book => book.book_id === id);
  if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found!' });
  }

  if (title) bookdata[bookIndex].title = title;
  if (author) bookdata[bookIndex].author = author;
  if (genre) bookdata[bookIndex].genre = genre;
  if (year) bookdata[bookIndex].year = year;
  if (copies) bookdata[bookIndex].copies = copies;

  res.status(200).json(bookdata[bookIndex]);
});

app.delete("/books/:id", (req, res) => {
  const filteredbooks = Books.filter((item) => item.book_id === req.params.id);

  if (filteredbooks) {
    Books.splice(filteredbooks, 1);
  } else {
    res.json({ message: "not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
