import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserProfile({ email, username, firstName, lastName, profilePicture }));
    if (result.meta.requestStatus === 'fulfilled') {
      setIsUpdated(true);
    }
  };

  if (isUpdated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-box">
        <h2>Profil Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="Profil Resmi URL"
          />
          <button type="submit">Güncelle</button>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ProfileEdit;
