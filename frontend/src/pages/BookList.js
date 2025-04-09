import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      alert('Error deleting book');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    fetchBooks();
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>📚 Book Store</h2>
        <button className="logout" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <button className="add" onClick={() => navigate('/books/add')}>➕ Add Book</button>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Category</th><th>Price</th>
            <th>Rating</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>${book.price}</td>
              <td>{book.rating}</td>
              <td>{book.publishedDate?.slice(0, 10)}</td>
              <td>
                <button onClick={() => navigate(`/books/edit/${book._id}`)}>✏️</button>
                <button className="delete" onClick={() => deleteBook(book._id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
