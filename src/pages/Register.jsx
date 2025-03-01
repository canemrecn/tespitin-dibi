import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male'); // Varsayılan değeri 'male' olarak ayarlayın
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profilePic = gender === 'male' ? '/male.png' : '/female.png';
    const result = await dispatch(registerUser({ email, password, username, firstName, lastName, profilePicture: profilePic, gender }));
    if (result.meta.requestStatus === 'fulfilled') {
      setIsRegistered(true);
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <img src="/logo8.jpg" alt="Logo" className="adsiz-image" />
          <img src={gender === 'male' ? '/male.png' : '/female.png'} alt="Profile" className="register-photo" />
        </div>
        <div className="register-right">
          <h2>Üye Ol</h2>
          <form onSubmit={handleSubmit} className="register-form">
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
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı Adı"
              required
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ad"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyad"
              required
            />
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                Erkek
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
                Kadın
              </label>
            </div>
            <button type="submit">Üye Ol</button>
          </form>
          {status === 'loading' && <p>Loading...</p>}
          
        </div>
      </div>
    </div>
  );
};

export default Register;
