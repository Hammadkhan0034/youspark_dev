import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { BASE_URL } from "../../config/urls/urls";

export default function TwitterCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const receivedState = urlParams.get("state");

        // Retrieve stored state and code_verifier from localStorage
        const codeVerifier = localStorage.getItem("twitter_code_verifier");
        const storedState = localStorage.getItem("twitter_state");

        if (receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Exchange authorization code for access token
        const tokenResponse = await API.post("/auth/twitter/token", {
          code,
          code_verifier: codeVerifier,
          redirect_uri: `${BASE_URL}/auth/twitter/callback`,
        });

        const { access_token, refresh_token, user } = tokenResponse.data;

        // Store tokens
        localStorage.setItem("access_token", access_token);
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        // Send tokens & channel info to backend
        await API.post("/auth/twitter/save-token", {
          access_token,
          refresh_token,
          channel: "twitter", // Send channel info
        });

        // Clean up localStorage
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");

        // Dispatch user data to Redux store
        dispatch(setUser(user));

        // Redirect user
        navigate(user.profile_completed ? "/home" : "/user-profile");
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
