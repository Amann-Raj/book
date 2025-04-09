import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const AddEditBook = () => {
  const [book, setBook] = useState({ title: '', author: '', category: '', price: '', rating: '', publishedDate: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      alert('Failed to fetch book data.');
    }
  };

  useEffect(() => {
    if (id) fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/books/${id}`, book);
        alert('Book updated successfully!');
      } else {
        await API.post('/books', book);
        alert('Book added successfully!');
      }
      navigate('/books'); // ✅ go to booklist page
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Failed to save book.');
      }
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" required /><br />
        <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" required /><br />
        <input type="text" name="category" value={book.category} onChange={handleChange} placeholder="Category" /><br />
        <input type="number" name="price" value={book.price} onChange={handleChange} placeholder="Price" /><br />
        <input type="number" name="rating" value={book.rating} onChange={handleChange} placeholder="Rating" /><br />
        <input type="date" name="publishedDate" value={book.publishedDate?.slice(0, 10)} onChange={handleChange} /><br />
        <button type="submit">{id ? 'Update' : 'Add'} Book</button>
      </form>
    </div>
  );
};

export default AddEditBook;
