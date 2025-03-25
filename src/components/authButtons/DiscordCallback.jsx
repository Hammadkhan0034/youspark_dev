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
              redirect_uri: BASE_URL.discord // Include redirect_uri
            });

            const { data } = response.data;

            // Store tokens
            localStorage.setItem("access_token", data.access_token);
            if (data.refresh_token) {
              localStorage.setItem("refresh_token", data.refresh_token);
            }

            // Update Redux store
            dispatch(setUser(data.user));

            // Clear the hash from URL
            window.history.replaceState(null, null, window.location.pathname);

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
        } else {
          console.error("No access token found in URL hash");
          navigate("/signin-socials");
        }
      } else {
        console.error("No hash found in URL");
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
