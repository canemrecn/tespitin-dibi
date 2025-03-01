import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, likePost, dislikePost, addComment, fetchComments } from '../features/posts/postsSlice';
import './Postlist.css';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);
  const [newComment, setNewComment] = useState('');
  const [commentsPage, setCommentsPage] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const [commentsCache, setCommentsCache] = useState({}); // Yorumları önbelleğe almak için

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCommentSubmit = (postId) => {
    if (user) {
      dispatch(addComment({ postId, comment: newComment, user_id: user.id }));
      setNewComment('');
      loadComments(postId); // Yeni yorum eklendiğinde yorumları yeniden yükleyin
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

  const loadComments = (postId) => {
    if (!loadingComments[postId]) {
      setLoadingComments((prev) => ({ ...prev, [postId]: true }));
      dispatch(fetchComments(postId)).finally(() => {
        setLoadingComments((prev) => ({ ...prev, [postId]: false }));
        setCommentsPage((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1,
        }));
      });
    }
  };

  useEffect(() => {
    posts.forEach((post) => {
      if (!commentsCache[post.id]) { // Eğer yorumlar önbellekte yoksa
        loadComments(post.id);
        setCommentsCache((prev) => ({ ...prev, [post.id]: true }));
      }
    });
  }, [posts, dispatch]);

  if (!posts || posts.length === 0) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="posts-container">
      {posts.length > 0 ? (
        posts.map((post) => {
          const profilePicture = post.profile_picture || '/default-profile.png';
          const username = post.username || 'Unknown User';
          const currentCommentsPage = commentsPage[post.id] || 0;
          const commentsToShow = post.comments ? post.comments.slice(0, (currentCommentsPage + 1) * 3) : [];

          return (
            <Card key={post.id} className="mb-3 post-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="profile-picture mr-2"
                  />
                  <small className="text-muted">{username}</small>
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
{/*                 <div className="d-flex justify-content-between align-items-center">
                  <Button onClick={() => handleLike(post.id)}>
                    <img src='/like.png' className="icon" alt="like icon" /> {post.likes}
                  </Button>
                  <Button variant="danger" onClick={() => handleDislike(post.id)}>
                    <img src='/dislike.png' className="icon" alt="dislike icon" /> {post.dislikes}
                  </Button>
                </div> */}
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Yorum yap..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => handleCommentSubmit(post.id)}
                  disabled={!newComment}
                >
                  Yorum Yap
                </Button>
                <div className="comments-section">
                  {commentsToShow.map((comment, index) => (
                    <div key={index} className="comment">
                      <img src={comment.profile_picture || '/default-profile.png'} alt="Profile" className="profile-picture mr-2" />
                      <small className="text-muted">{comment.username}</small>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                  {commentsToShow.length < (post.comments ? post.comments.length : 0) && (
                    <Button
                      variant="link"
                      onClick={() => loadMoreComments(post.id)}
                      disabled={loadingComments[post.id]}
                    >
                      {loadingComments[post.id] ? 'Yükleniyor...' : 'Daha fazla göster'}
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>Henüz gönderi yok.</p>
      )}
    </div>
  );
};

export default PostsList;



