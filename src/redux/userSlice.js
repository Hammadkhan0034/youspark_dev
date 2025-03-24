import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api.js";

// Load initial state from localStorage
const loadInitialState = () => {
  const savedUser = localStorage.getItem("user");
  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: !!savedUser,
    loading: false,
    error: null,
    profileUpdateSuccess: false
  };
};

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

      // Store updated user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: loadInitialState(),
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.profileUpdateSuccess = false;
      // Clear all data only during logout
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("formData"); // Clear form data only during logout
      localStorage.removeItem("twitter_code_verifier");
    },
    resetProfileUpdateStatus: (state) => {
      state.profileUpdateSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdateSuccess = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.loading = false;
        state.profileUpdateSuccess = true;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        // Don't remove formData here
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.profileUpdateSuccess = false;
      });
  },
});

export const { setUser, logoutUser, resetProfileUpdateStatus } = userSlice.actions;
export default userSlice.reducer;
