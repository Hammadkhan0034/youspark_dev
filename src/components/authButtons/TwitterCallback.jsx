import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import axios from "axios";

export default function TwitterCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const codeVerifier = localStorage.getItem("twitter_code_verifier");

      if (!code || !codeVerifier) {
        console.error("Missing code or code verifier");
        navigate("/signin-socials");
        return;
      }

      try {
        // Exchange code for tokens using your backend
        const response = await API.post("/social-sign-in", {
          code,
          code_verifier: codeVerifier,
          channel: "twitter",
        });

        const { data } = response.data;

        // Clear code verifier from localStorage
        localStorage.removeItem("twitter_code_verifier");

        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Clear Twitter code verifier
        localStorage.removeItem("twitter_code_verifier");

        // 8. Clean up Twitter OAuth data
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");

        // 9. Update Redux store
        dispatch(setUser(data.user));

        // Navigate based on profile completion
        if (!data.profile_completed) {
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

  // Loading spinner while processing
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
