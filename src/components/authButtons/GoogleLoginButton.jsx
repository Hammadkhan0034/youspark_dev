import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/urls/urls";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/social-sign-in`,
          {
            access_token: response.access_token,
            channel: "google",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = res.data;
        
        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Create and store user profile with all required fields
        const userProfile = {
          id: data.id || '',
          email: data.email || '',
          username: data.user_name || '',
          nickname: data.nickname || '',
          birth_date: data.birth_date || '',
          gender: data.gender || '',
          country: data.country || '',
          region: data.region || '',
          city: data.city || '',
          userStatus: data.user_status || '',
          userImage: data.user_image || '',
          firstLogin: data.first_login || false,
          appName: data.app_name || '',
          // Don't trust the backend's profile_completed flag
          profile_completed: false
        };

        // Check if required fields are filled
        const requiredFields = ['username', 'nickname', 'birth_date', 'gender', 'country', 'region', 'city'];
        const isProfileComplete = requiredFields.every(field => 
          userProfile[field] && userProfile[field].trim() !== ''
        );

        // Update profile_completed based on actual field values
        userProfile.profile_completed = isProfileComplete;

        // Store in localStorage and Redux
        localStorage.setItem("user_profile", JSON.stringify(userProfile));
        dispatch(setUser(userProfile));

        // Always redirect to profile page if required fields are missing
        if (!isProfileComplete) {
          navigate("/user-profile", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
        
      } catch (error) {
        console.error("Error during Google authentication:", error);
        // Handle error (show error message to user)
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
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




