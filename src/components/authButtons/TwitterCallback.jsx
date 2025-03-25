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
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const receivedState = params.get("state");
        const storedState = localStorage.getItem("twitter_state");
        const codeVerifier = localStorage.getItem("twitter_code_verifier");

        // Verify state
        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Exchange the code for an access token
        const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${process.env.REACT_APP_TWITTER_CLIENT_ID}:${process.env.REACT_APP_TWITTER_CLIENT_SECRET}`)}`,
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: AUTH_CALLBACKS.twitter,
            code_verifier: codeVerifier,
            client_id: process.env.REACT_APP_TWITTER_CLIENT_ID,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
          throw new Error("Missing access token");
        }

        // Send access_token and channel to backend
        const response = await API.post("/social-sign-in", {
          access_token: tokenData.access_token,
          channel: "twitter",
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
          appName: data.app_name,
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
