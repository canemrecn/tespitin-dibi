// src/pages/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
      <img src="logo8.jpg" alt="Logo" width="200" height="100" />

        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            required
          />
          <button type="submit">Giriş Yap</button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Login;
