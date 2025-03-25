import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import axios from "axios";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const receivedState = params.get("state");
        const storedState = localStorage.getItem("twitter_auth_state");

        // Verify state
        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Exchange code for token
        const tokenResponse = await axios.post(
          "https://api.twitter.com/2/oauth2/token",
          new URLSearchParams({
            code: code,
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_TWITTER_CLIENT_ID,
            redirect_uri: AUTH_CALLBACKS.twitter,
            code_verifier: "challenge" // Should match the challenge from login
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(
                `${import.meta.env.VITE_TWITTER_CLIENT_ID}:${import.meta.env.VITE_TWITTER_CLIENT_SECRET}`
              )}`
            }
          }
        );

        const { access_token } = tokenResponse.data;

        // Send to your backend
        const response = await API.post("/social-sign-in", {
          access_token,
          channel: "twitter"
        });

        const { data } = response.data;

        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Clean up
        localStorage.removeItem("twitter_auth_state");

        // Update Redux store
        dispatch(setUser(data));

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
