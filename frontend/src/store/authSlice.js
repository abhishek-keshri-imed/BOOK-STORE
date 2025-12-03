import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  name: null,
  role: null,
  token: null,
  isAuthenticated: false,
  userData: null,
  adminData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.token = action.payload.token || null;
      state.isAuthenticated = true;

      if (state.role === 'admin') {
        state.adminData = action.payload.adminData || null;
        state.userData = null;
      } else {
        state.userData = action.payload.userData || null;
        state.adminData = null;
      }
    },

    logout: (state) => {
      state.userId = null;
      state.name = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userData = null;
      state.adminData = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
