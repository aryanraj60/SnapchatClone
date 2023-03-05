import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    selectedImage: {
      imageUrl: null,
      photoId: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage.imageUrl = action.payload.imageUrl;
      state.selectedImage.photoId = action.payload.photoId;
    },
    resetImage: (state) => {
      state.selectedImage.imageUrl = null;
      state.selectedImage.photoId = null;
    },
  },
});

export const { login, logout, selectImage, resetImage } = appSlice.actions;

export const getSelectedImage = (state) => state.app.selectedImage;
export const selectUser = (state) => state.app.user;

export default appSlice.reducer;
