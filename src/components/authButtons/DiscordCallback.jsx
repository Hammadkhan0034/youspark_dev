import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { BASE_URL } from "../../config/urls/urls";

export default function DiscordCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash;
      
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");

        if (accessToken) {
          try {
            const response = await API.post("/social-sign-in", {
              access_token: accessToken,
              channel: "discord",
              redirect_uri: `${BASE_URL}/auth/discord/callback`
            });

            const { data } = response.data;

            // Store tokens
            localStorage.setItem("access_token", data.access_token);
            if (data.refresh_token) {
              localStorage.setItem("refresh_token", data.refresh_token);
            }

            // Create a properly structured user profile object
            const userProfile = {
              id: data.id || '',
              email: data.email || '',
              username: data.user_name || '',
              userStatus: data.user_status || '',
              userImage: data.user_image || '',
              firstLogin: data.first_login || false,
              appName: data.app_name || '',
              profile_completed: !data.first_login // Set to true if not first login
            };

            // Store user profile as JSON string
            localStorage.setItem("user_profile", JSON.stringify(userProfile));

            // Update Redux store
            dispatch(setUser(userProfile));

            // Clear the hash from URL
            window.history.replaceState(null, null, window.location.pathname);

            // Navigate based on profile completion
            navigate(userProfile.profile_completed ? "/home" : "/user-profile", { replace: true });
          } catch (error) {
            console.error("Error during Discord authentication:", error);
            // Clear any potentially corrupted data
            localStorage.removeItem("user_profile");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/signin-socials", { replace: true });
          }
        } else {
          navigate("/signin-socials", { replace: true });
        }
      } else {
        navigate("/signin-socials", { replace: true });
      }
    };

    handleCallback();
  }, [navigate, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );
}
