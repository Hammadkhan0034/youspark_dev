import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";

export default function AppleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash fragment from URL
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        // Extract tokens and state
        const idToken = params.get("id_token");
        const code = params.get("code");
        const receivedState = params.get("state");

        if (!idToken || !code) {
          throw new Error("Missing Apple authentication tokens");
        }

        // Verify state to prevent CSRF attacks
        const storedState = localStorage.getItem("apple_auth_state");
        if (receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Send tokens to backend for authentication
        const response = await API.post("/social-sign-in", {
          id_token: idToken,
          code: code,
          channel: "apple",
        });

        if (!response.data.success) {
          throw new Error("Backend authentication failed");
        }

        const { data } = response.data;

        // Store tokens in localStorage
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Clean up sensitive data from localStorage
        localStorage.removeItem("apple_auth_state");
        localStorage.removeItem("apple_auth_nonce");

        // Update Redux store with user data
        dispatch(setUser(data.user));

        // Navigate based on profile completion
        if (!data.user.profile_completed) {
          navigate("/user-profile");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Apple authentication error:", error);
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
