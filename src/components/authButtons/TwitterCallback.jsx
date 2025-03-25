import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const receivedState = urlParams.get("state");
        
        // Verify state
        const storedState = localStorage.getItem("twitter_state");
        if (!storedState || receivedState !== storedState) {
          throw new Error("Invalid state parameter");
        }

        // Get code verifier
        const codeVerifier = localStorage.getItem("twitter_code_verifier");
        if (!codeVerifier) {
          throw new Error("Code verifier not found");
        }

        // Send to backend for token exchange and user info
        const response = await API.post("/social-sign-in", {
          code,
          code_verifier: codeVerifier,
          redirect_uri: AUTH_CALLBACKS.twitter,
          channel: "twitter"
        });

        const { data } = response.data;

        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Create user object from response
        const userData = {
          id: data.id,
          email: data.email,
          username: data.user_name,
          userStatus: data.user_status,
          userImage: data.user_image,
          firstLogin: data.first_login,
          appName: data.app_name
        };

        // Update Redux store with user data
        dispatch(setUser(userData));

        // Clean up OAuth data
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");

        // Navigate based on first login
        navigate(data.first_login ? "/user-profile" : "/home");

      } catch (error) {
        console.error("Twitter authentication error:", error);
        // Clean up on error
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");
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
