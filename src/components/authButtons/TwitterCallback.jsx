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
      const hash = window.location.hash;

      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");

        if (accessToken) {
          try {
            const response = await API.post("/social-sign-in", {
              access_token: accessToken,
              channel: "twitter"
            });

            const { data } = response.data;

            // Store tokens
            localStorage.setItem("access_token", data.access_token);
            if (data.refresh_token) {
              localStorage.setItem("refresh_token", data.refresh_token);
            }

            // Create user object from response
            const userData = {
              id: data.id,
              email: data.email,
              username: data.user_name,
              userStatus: data.user_status,
              userImage: data.user_image,
              firstLogin: data.first_login,
              appName: data.app_name
            };

            // Update Redux store
            dispatch(setUser(userData));

            // Clear the hash from URL
            window.history.replaceState(null, null, window.location.pathname);

            // Navigate based on first_login flag
            if (data.first_login) {
              navigate("/user-profile");
            } else {
              navigate("/home");
            }
          } catch (error) {
            console.error("Error during Twitter authentication:", error);
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
