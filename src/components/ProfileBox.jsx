import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './ProfileBox.css';

const ProfileBox = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return <p>Giriş yapılmamış</p>;
  }

  return (
    <div className="profile-box">
      <h3>Profil</h3>
      <img src={user.profile_picture} alt="Profile" className="profile-photo" />
      <h4>{user.first_name} {user.last_name}</h4>
      <h5>{user.username}</h5>
      <button className="logout-button" onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
};

export default ProfileBox;
