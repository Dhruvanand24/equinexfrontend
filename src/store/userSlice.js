// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload)
      state.currentUser = action.payload;
      console.log(state.currentUser)
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    
    
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
