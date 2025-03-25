import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { BASE_URL } from "../../config/urls/urls";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code and state from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const receivedState = params.get("state");

        // Retrieve stored state from localStorage
        const storedState = localStorage.getItem("kakao_auth_state");

        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Send the authorization code to the backend to exchange for an access token
        const response = await API.post("/auth/kakao", {
          code,
          redirect_uri: `${BASE_URL}/auth/kakao/callback` // Include redirect_uri
          
        });

        if (!response.data || !response.data.access_token) {
          throw new Error("Failed to get access token from backend");
        }

        const { access_token, refresh_token, user } = response.data;

        // Store tokens in localStorage
        localStorage.setItem("access_token", access_token);
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        // Store user data in Redux
        dispatch(setUser(user));

        // Clean up localStorage
        localStorage.removeItem("kakao_auth_state");

        // Navigate based on profile completion
        if (!user.profile_completed) {
          navigate("/user-profile");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Kakao authentication error:", error);
        navigate("/signin-socials");
      }
    };

    handleCallback();
  }, [navigate, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
