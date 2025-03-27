import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import axios from "axios";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (!code) {
        navigate("/signin-socials");
        return;
      }

      try {
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

        // Create and store user profile with all required fields
        const userProfile = {
          nickname: data.nickname || '',
          birth_date: data.birth_date || '',
          gender: data.gender || '',
          country: data.country || '',
          region: data.region || '',
          city: data.city || '',
        };

        // Check if required fields are filled
        const requiredFields = ['nickname', 'birth_date', 'gender', 'country', 'region', 'city'];
        const isProfileComplete = requiredFields.every(field => 
          userProfile[field] && userProfile[field].trim() !== ''
        );

        // Update profile_completed based on actual field values
        userProfile.profile_completed = isProfileComplete;

        // Store in localStorage and Redux
        localStorage.setItem("user_profile", JSON.stringify(userProfile));
        dispatch(setUser(userProfile));

        // Always redirect to profile page if required fields are missing
        if (!isProfileComplete) {
          navigate("/user-profile", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }

      } catch (error) {
        console.error("Kakao authentication error:", error);
        // Clear any potentially corrupted data
        localStorage.removeItem("user_profile");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/signin-socials", { replace: true });
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
