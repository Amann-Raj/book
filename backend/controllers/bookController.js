const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Book creation failed' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { author, category, rating, title, sortBy } = req.query;
    let query = {};

    if (author) query.author = author;
    if (category) query.category = category;
    if (rating) query.rating = rating;
    if (title) query.title = new RegExp(title, 'i');

    let books = Book.find(query);
    if (sortBy) books = books.sort(sortBy);

    const results = await books;
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Fetching books failed' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Fetching book failed' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
