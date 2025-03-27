import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import API from "../../api/api";

import { API_BASE_URL } from "../../config/urls/urls";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (googleResponse) => {
      try {
        const response = await API.post("/social-sign-in", 
          {
            access_token: googleResponse.access_token,
            channel: "google",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = response.data;
        
        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        const userProfile = {
          nickname: data.nickname || '',
          birth_date: data.birth_date || '',
          gender: data.gender || '',
          country: data.country || '',
          region: data.region || '',
          city: data.city || '',
          // Don't trust the backend's profile_completed flag
          profile_completed: false
        };

        // Store user profile as JSON string
        localStorage.setItem("user_profile", JSON.stringify(userProfile));

        // Update Redux store
        dispatch(setUser(userProfile));

        // Clear the hash from URL
        window.history.replaceState(null, null, window.location.pathname);

        // Check if required fields are filled
        const requiredFields = ['username','nickname', 'birth_date', 'gender', 'country', 'region', 'city'];
        const isProfileComplete = requiredFields.every(field => 
          userProfile[field] && userProfile[field].trim() !== ''
        );

        // Always redirect to profile page if any required field is missing
        if (!isProfileComplete) {
          navigate("/user-profile", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
        
      } catch (error) {
        console.error("Error during Google authentication:", error);
        // Clear any potentially corrupted data
        localStorage.removeItem("user_profile");
        localStorage.removeItem("userProfileFormData");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/signin-socials", { replace: true });
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      navigate("/signin-socials", { replace: true });
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;




