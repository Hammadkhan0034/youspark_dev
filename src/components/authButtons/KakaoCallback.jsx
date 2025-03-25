import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { BASE_URL } from "../../config/urls/urls";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const receivedState = params.get("state");
      const storedState = localStorage.getItem("kakao_auth_state");

      // Validate state to prevent CSRF attacks
      if (!storedState || storedState !== receivedState) {
        console.error("State mismatch. Possible CSRF attack.");
        navigate("/signin-socials");
        return;
      }

      if (code) {
        try {
          const response = await API.post("/social-sign-in", {
            access_token: code,
            channel: "kakao",
            redirect_uri: `${BASE_URL}/auth/kakao/callback`,
          });

          const { data } = response.data;

          // Store tokens
          localStorage.setItem("access_token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }

          // Update Redux store
          dispatch(setUser(data.user));

          // Navigate based on profile completion
          if (!data.user.profile_completed) {
            navigate("/user-profile");
          } else {
            navigate("/home");
          }
        } catch (error) {
          console.error("Error during Kakao authentication:", error);
          navigate("/signin-socials");
        }
      } else {
        console.error("No authorization code found in URL");
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
