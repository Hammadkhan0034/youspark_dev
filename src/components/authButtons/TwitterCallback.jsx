import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";
import axios from "axios";

export default function TwitterCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const receivedState = params.get("state");
        const storedState = localStorage.getItem("twitter_state");

        // Validate state to prevent CSRF attacks
        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Get code verifier
        const codeVerifier = localStorage.getItem("twitter_code_verifier");
        if (!codeVerifier) {
          throw new Error("Code verifier not found");
        }

        // Exchange the code for a Twitter access token
        const tokenResponse = await axios.post(
          "https://api.twitter.com/2/oauth2/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_TWITTER_CLIENT_ID,
            redirect_uri: AUTH_CALLBACKS.twitter,
            code: code,
            code_verifier: codeVerifier,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        const twitterAccessToken = tokenResponse.data.access_token;

        // Send the Twitter access token to your backend
        const response = await API.post("/social-sign-in", {
          access_token: twitterAccessToken,
          channel: "twitter",
        });

        const { data } = response.data;

        // Store access & refresh tokens
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
          appName: data.app_name,
        };

        // Update Redux store with user data
        dispatch(setUser(userData));

        // Clean up stored data
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");

        // Navigate based on first login
        navigate(data.first_login ? "/user-profile" : "/home");

      } catch (error) {
        console.error("Twitter authentication error:", error);
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
