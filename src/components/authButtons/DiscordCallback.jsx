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
    const checkLocalStorage = () => {
      const storedProfile = localStorage.getItem("user_profile");
      if (storedProfile) {
        const userProfile = JSON.parse(storedProfile);

        // List of required fields
        const requiredFields = ["nickname", "birth_date", "gender", "country", "region", "city"];
        const isProfileComplete = requiredFields.every(field => userProfile[field] && userProfile[field].trim() !== "");

        if (isProfileComplete) {
          dispatch(setUser(userProfile));
          navigate("/home", { replace: true });
          return true;
        }
      }
      return false;
    };

    const handleCallback = async () => {
      if (checkLocalStorage()) return;

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

            // Create a structured user profile object
            const userProfile = {
              nickname: data.nickname || '',
              birth_date: data.birth_date || '',
              gender: data.gender || '',
              country: data.country || '',
              region: data.region || '',
              city: data.city || '',
            };

            // Store user profile in local storage
            localStorage.setItem("user_profile", JSON.stringify(userProfile));

            // Update Redux store
            dispatch(setUser(userProfile));

            // Clear the hash from URL
            window.history.replaceState(null, null, window.location.pathname);

            // Check if required fields are filled
            const requiredFields = ["nickname", "birth_date", "gender", "country", "region", "city"];
            const isProfileComplete = requiredFields.every(field => userProfile[field] && userProfile[field].trim() !== "");

            // Redirect based on profile completeness
            navigate(isProfileComplete ? "/home" : "/user-profile", { replace: true });

          } catch (error) {
            console.error("Error during Discord authentication:", error);
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
