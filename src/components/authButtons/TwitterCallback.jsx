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
      try {
        // 1. Get the code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const receivedState = urlParams.get("state");
        
        // 2. Get stored code verifier and state from localStorage
        const codeVerifier = localStorage.getItem("twitter_code_verifier");
        const storedState = localStorage.getItem("twitter_state");

        // 3. Verify state to prevent CSRF attacks
        if (receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // 4. Exchange code for tokens
        const tokenResponse = await axios.post(
          "https://api.twitter.com/2/oauth2/token",
          new URLSearchParams({
            code: code,
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_TWITTER_CLIENT_ID,
            redirect_uri: "http://localhost:3000/auth/twitter/callback",
            code_verifier: codeVerifier,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { access_token, refresh_token } = tokenResponse.data;

        // 5. Get user data using the access token
        const userResponse = await axios.get("https://api.twitter.com/2/users/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const userData = userResponse.data.data;

        // 6. Send data to your backend
        const backendResponse = await axios.post("http://localhost:4000/api/social-sign-in", {
          access_token,
          refresh_token,
          twitter_user_data: userData,
          channel: "twitter"
        });

        const { data } = backendResponse.data;

        // 7. Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // 8. Clean up Twitter OAuth data
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");

        // 9. Update Redux store
        dispatch(setUser(data.user));

        // 10. Navigate based on profile completion
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

  // Loading spinner while processing
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
