import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { email, password });
      alert('Signup successful. Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="signup">Signup</button>

      </form>
      <p onClick={() => navigate('/login')}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Signup;
