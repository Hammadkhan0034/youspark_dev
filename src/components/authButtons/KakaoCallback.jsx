import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";
import axios from "axios";

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

        // Validate state to prevent CSRF attacks
        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Exchange the code for a Kakao access token
        const kakaoTokenResponse = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
            redirect_uri: AUTH_CALLBACKS.kakao,
            code: code,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        const kakaoAccessToken = kakaoTokenResponse.data.access_token;

        // Send the Kakao access token to your backend
        const response = await API.post("/social-sign-in", {
          access_token: kakaoAccessToken,
          channel: "kakao",
        });

        const { data } = response.data;

        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Create and store user profile
        const userProfile = {
          id: data.id,
          email: data.email,
          username: data.user_name,
          userStatus: data.user_status,
          userImage: data.user_image,
          firstLogin: data.first_login,
          appName: data.app_name,
          profile_completed: !data.first_login // Set to true if not first login
        };

        // Store in localStorage and Redux
        localStorage.setItem("user_profile", JSON.stringify(userProfile));
        dispatch(setUser(userProfile));

        // Navigate based on profile completion
        navigate(userProfile.profile_completed ? "/home" : "/user-profile");
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
