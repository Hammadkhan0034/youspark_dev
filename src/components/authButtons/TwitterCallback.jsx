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
        // Extract code and state from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const receivedState = urlParams.get("state");

        // Retrieve stored state and code_verifier from localStorage
        const codeVerifier = localStorage.getItem("twitter_code_verifier");
        const storedState = localStorage.getItem("twitter_state");

        // Check if the received state matches the stored state to prevent CSRF attacks
        if (receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Send the authorization code and code_verifier to the backend for token exchange
        const response = await API.post("/auth/twitter/callback", {
          code,
          code_verifier: codeVerifier,
          state: receivedState,
          redirect_uri: `${BASE_URL}/auth/twitter/callback`,
        });

        const { data } = response.data;

        // Store the access token and refresh token (if available)
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Clean up localStorage by removing the code_verifier and state
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");

        // Dispatch the user data to Redux store
        dispatch(setUser(data.user));

        // Redirect the user based on whether their profile is complete or not
        if (!data.user.profile_completed) {
          navigate("/user-profile");
        } else {
          navigate("/home");
        }
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
