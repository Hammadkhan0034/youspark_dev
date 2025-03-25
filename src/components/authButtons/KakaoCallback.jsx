import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const receivedState = params.get("state");

        const storedState = localStorage.getItem("kakao_auth_state");

        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        const response = await API.post("/social-sign-in", {
          code,
          redirect_uri: AUTH_CALLBACKS.kakao,
          channel: "kakao"
        });

        const { data } = response.data;

        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

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

        // Update Redux store with user data
        dispatch(setUser(userData));

        // Clean up
        localStorage.removeItem("kakao_auth_state");

        // Navigate based on first login
        if (data.first_login) {
          navigate("/user-profile");
        } else {
          navigate("/home");
        }

      } catch (error) {
        console.error("Kakao authentication error:", error);
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
