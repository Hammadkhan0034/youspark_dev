import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

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

        // Exchange authorization code for Kakao access & refresh tokens
        const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
            redirect_uri: AUTH_CALLBACKS.kakao,
            code,
          }),
        });

        if (!tokenResponse.ok) throw new Error("Failed to fetch access token");

        const tokenData = await tokenResponse.json();
        const { access_token, refresh_token } = tokenData;

        // Store the access and refresh tokens in localStorage
        localStorage.setItem("access_token", access_token);
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        // Send the access token to the backend for authentication
        const response = await API.post("/social-sign-in", {
          access_token, // Send access token to backend
          channel: "kakao",
        });

        const { data } = response.data;

        // Store user data in Redux
        dispatch(setUser(data.user));

        // Clean up localStorage
        localStorage.removeItem("kakao_auth_state");

        // Navigate based on profile completion
        if (!data.user.profile_completed) {
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
