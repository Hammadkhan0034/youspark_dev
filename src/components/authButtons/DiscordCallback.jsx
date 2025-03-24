import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";

export default function DiscordCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash;
      
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const state = params.get("state");
        const storedState = localStorage.getItem("discord_state");

        // Verify state to prevent CSRF attacks
        if (state !== storedState) {
          console.error("State mismatch - possible CSRF attack");
          navigate("/signin-socials");
          return;
        }

        // Clean up state
        localStorage.removeItem("discord_state");

        if (accessToken) {
          try {
            // Send access token and channel to your backend
            const response = await API.post("/social-sign-in", {
              access_token: accessToken,
              channel: "discord"
            });

            const { data } = response.data;

            // Store tokens
            localStorage.setItem("access_token", data.access_token);
            if (data.refresh_token) {
              localStorage.setItem("refresh_token", data.refresh_token);
            }

            // Store user data
            localStorage.setItem("user", JSON.stringify(data.user));

            // Update Redux store
            dispatch(setUser(data.user));

            // Navigate based on profile completion
            if (!data.user.profile_completed) {
              navigate("/user-profile");
            } else {
              navigate("/home");
            }
          } catch (error) {
            console.error("Error during Discord authentication:", error);
            navigate("/signin-socials");
          }
        }
      } else {
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
