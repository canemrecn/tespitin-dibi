// src/components/UserProfile.jsx
import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import './UserProfile.css';

// Sahte kullanıcı ve gönderi verileri
const user = {
  username: 'User123',
  photo: 'images.jpg', // Kullanıcının fotoğrafının dosya adı
};

const fakePosts = Array.from({ length: 5 }, (v, k) => ({
  id: k + 1,
  content: `This is the content of post ${k + 1}`,
  likes: Math.floor(Math.random() * 100), // Her gönderi için rastgele beğeni sayısı
}));

const UserProfile = () => {
  const [posts] = useState(fakePosts);

  // Toplam beğeni sayısını hesapla
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <Card.Body className="text-center">
          <Image src={user.photo} roundedCircle className="profile-photo" />
          <h3 className="mt-3">{user.username}</h3>
          <p>Toplam Beğeni: {totalLikes}</p>
        </Card.Body>
      </Card>

      <h2 class="white-text">Gönderiler</h2>
      {Array.isArray(posts) &&
        posts.map((post) => (
          <Card key={post.id} className="mb-3 post-card">
            <Card.Body>
              <Card.Text>{post.content}</Card.Text>
              <small>Beğeniler: {post.likes}</small>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default UserProfile;
