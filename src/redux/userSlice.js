import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// Async Thunk for updating user profile with better error handling
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await API.put("/users/update-profile", formData);

      if (!response.data) {
        throw new Error("No data returned from server");
      }

      const completeProfile = {
        ...response.data,
        profile_completed: true
      };

      // Store complete profile in localStorage
      localStorage.setItem("user_profile", JSON.stringify(completeProfile));

      return completeProfile;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to update profile";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state with clear structure
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  profileUpdateStatus: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.profileUpdateStatus = 'idle';
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdateStatus = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user, // Preserve existing user data
          ...action.payload, // Merge with updated data
          profile_completed: true // Ensure this is set
        };
        state.isAuthenticated = true;
        state.profileUpdateStatus = 'succeeded';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.profileUpdateStatus = 'failed';
      });
  },
});

export const { setUser, logoutUser, clearErrors } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectProfileUpdateStatus = (state) => state.user.profileUpdateStatus;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
