import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
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
        const codeVerifier = localStorage.getItem("twitter_code_verifier");

        // Verify state
        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Exchange code for access token
        const tokenResponse = await axios.post(
          "https://api.twitter.com/2/oauth2/token",
          new URLSearchParams({
            code: code,
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_TWITTER_CLIENT_ID,
            redirect_uri: AUTH_CALLBACKS.twitter,
            code_verifier: codeVerifier,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { access_token } = tokenResponse.data;

        // Send access token to your backend
        const response = await API.post("/social-sign-in", {
          access_token: access_token,
          channel: "twitter"
        });

        const { data } = response.data;

        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Clean up OAuth state
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");

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

        // Update Redux store
        dispatch(setUser(userData));

        // Navigate based on first login
        navigate(data.first_login ? "/user-profile" : "/home");

      } catch (error) {
        console.error("Twitter authentication error:", error);
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
