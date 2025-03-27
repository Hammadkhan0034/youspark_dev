import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

const isProfileComplete = (profile) => {
  const requiredFields = [ 'nickname', 'birth_date', 'gender', 'country', 'region', 'city'];
  return requiredFields.every(field => profile[field] && profile[field].trim() !== '');
};

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

      const profileData = {
        ...response.data,
        profile_completed: isProfileComplete(response.data)
      };

      // Store complete profile in localStorage
      localStorage.setItem("user_profile", JSON.stringify(profileData));

      return profileData;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to update profile";
      return rejectWithValue(errorMessage);
    }
  }
);

const getUserFromLocalStorage = () => {
  try {
    const storedProfile = localStorage.getItem("user_profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  } catch (error) {
    console.error("Error parsing user profile from localStorage:", error);
    localStorage.removeItem("user_profile"); // Clear invalid data
    return null;
  }
};

// Initial state with clear structure
const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: !!localStorage.getItem("access_token"),
  loading: false,
  error: null,
  profileUpdateStatus: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      // Override profile_completed based on actual field values
      const actuallyComplete = isProfileComplete(userData);
      
      state.user = {
        ...userData,
        profile_completed: actuallyComplete
      };
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
