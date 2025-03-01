import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('auth/register', async ({ email, password, username, firstName, lastName, gender }) => {
  const profilePicture = gender === 'male' ? '/male.png' : '/female.png';
  const response = await axios.post('http://localhost:3000/api/register', { email, password, username, firstName, lastName, profilePicture, gender });
  return response.data;
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await axios.post('http://localhost:3000/api/login', { email, password });
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
