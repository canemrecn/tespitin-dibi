import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://localhost:3000/api/posts');
  return response.data;
});

// Create post
export const createPost = createAsyncThunk('posts/createPost', async (post, { getState }) => {
  const { auth: { user } } = getState();
  const response = await axios.post('http://localhost:3000/api/posts', { ...post, user_id: user.id });
  return response.data;
});

// Add comment
export const addComment = createAsyncThunk('posts/addComment', async ({ postId, comment, user_id }) => {
  const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comments`, { comment, user_id });
  return { postId, comment: response.data.comment };
});

// Fetch comments
export const fetchComments = createAsyncThunk('posts/fetchComments', async (postId) => {
  const response = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`);
  return { postId, comments: response.data };
});

// Like post
export const likePost = createAsyncThunk('posts/likePost', async (postId, { getState }) => {
  const { auth: { user } } = getState();
  const response = await axios.post(`http://localhost:3000/api/posts/${postId}/like`, { user_id: user.id });
  return response.data;
});

// Dislike post
export const dislikePost = createAsyncThunk('posts/dislikePost', async (postId, { getState }) => {
  const { auth: { user } } = getState();
  const response = await axios.post(`http://localhost:3000/api/posts/${postId}/dislike`, { user_id: user.id });
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find(post => post.id === postId);
        if (post) {
          if (!post.comments) {
            post.comments = [];
          }
          post.comments.push(comment);
        }
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const post = state.posts.find(post => post.id === postId);
        if (post) {
          post.comments = comments;
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.id);
        if (post) {
          post.likes = action.payload.likes;
          post.dislikes = action.payload.dislikes;
        }
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.id);
        if (post) {
          post.likes = action.payload.likes;
          post.dislikes = action.payload.dislikes;
        }
      });
  },
});

export default postsSlice.reducer;
