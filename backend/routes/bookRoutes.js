const express = require('express');
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
