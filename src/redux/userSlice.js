import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api.js"

// Async Thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await API.put("/users/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });


      console.log("UserProfile Data in UserSlice file",formData);
      return response.data; // Successfully updated profile
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating profile");
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log("Updated User Profile in UserSlice action:", action.payload);
        // state.user = action.payload.data;
        state.user = action.payload;

        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;




