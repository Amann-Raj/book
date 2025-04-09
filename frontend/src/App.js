import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import AddEditBook from './pages/AddEditBook';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<AddEditBook />} />
        <Route path="/books/edit/:id" element={<AddEditBook />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
