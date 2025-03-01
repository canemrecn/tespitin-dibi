import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Card, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPosts, addComment, likePost, dislikePost, fetchComments } from '../features/posts/postsSlice';
import './Category.css';

const CategoryPosts = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newComment, setNewComment] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        dispatch(fetchComments(post.id));
      });
    }
  }, [dispatch, posts.length]);

  const handleNewPostSubmit = () => {
    if (user) {
      dispatch(createPost({ category_id: categoryId, title: newPostTitle, content: newPostContent, user_id: user.id }));
      setNewPostContent('');
      setNewPostTitle('');
    } else {
      alert('Lütfen giriş yapın.');
    }
  };

  const handleCommentChange = (postId, comment) => {
    setNewComment((prev) => ({ ...prev, [postId]: comment }));
  };

  const handleCommentSubmit = (postId) => {
    if (user) {
      dispatch(addComment({ postId, comment: newComment[postId], user_id: user.id }));
      setNewComment((prev) => ({ ...prev, [postId]: '' }));
    } else {
      alert('Lütfen giriş yapın.');
    }
  };

  const handleLike = (postId) => {
    dispatch(likePost(postId));
  };

  const handleDislike = (postId) => {
    dispatch(dislikePost(postId));
  };

  const filteredPosts = posts ? posts.filter(post => post.category_id === parseInt(categoryId)) : [];

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (!posts) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="posts-container">
      <Card className="mb-3 new-post-card">
        <Card.Body>
          <Form.Control
            type="text"
            placeholder="Başlık"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Yeni gönderi oluştur..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <Button
            variant="primary"
            className="mt-2"
            onClick={handleNewPostSubmit}
            disabled={!newPostContent || !newPostTitle}
          >
            Paylaş
          </Button>
        </Card.Body>
      </Card>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => {
          const profilePicture = post.profile_picture || '/default-profile.png';
          const username = post.username || 'Unknown User';
          return (
            <Card key={post.id} className="mb-3 post-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="profile-picture mr-2"
                  />
                  <small className="text-muted" onClick={() => handleUserClick(post)}>{username}</small>
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
{/*                 <div className="d-flex justify-content-between align-items-center">
                  <Button onClick={() => handleLike(post.id)}>
                    <img src='/like.png' className="icon" alt="like icon" /> ({post.likes})
                  </Button>
                  <Button variant="danger" onClick={() => handleDislike(post.id)}>
                    <img src='/dislike.png' className="icon" alt="dislike icon" /> ({post.dislikes})
                  </Button>
                </div> */}
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Yorum yap..."
                  value={newComment[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => handleCommentSubmit(post.id)}
                  disabled={!newComment[post.id]}
                >
                  Yorum Yap
                </Button>
                <div className="comments-section">
                  {post.comments && post.comments.map((comment, index) => {
                    const commentProfilePicture = comment.profile_picture || (comment.gender === 'male' ? '/male.png' : '/female.png');
                    return (
                      <div key={index} className="comment d-flex align-items-start">
                        <img src={commentProfilePicture} alt="Profile" className="comment-profile-picture mr-2" />
                        <div>
                          <small className="text-muted">{comment.username}</small>
                          <p>{comment.text}</p> {/* Updated line */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>Henüz gönderi yok.</p>
      )}

      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Kullanıcı Bilgileri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Ad:</strong> {selectedUser.first_name}</p>
              <p><strong>Soyad:</strong> {selectedUser.last_name}</p>
              <p><strong>Kullanıcı Adı:</strong> {selectedUser.username}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryPosts;

