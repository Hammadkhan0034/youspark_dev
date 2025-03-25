import { RiKakaoTalkFill } from "react-icons/ri";
import { BASE_URL } from "../../config/urls/urls";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    try {
      const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
      const redirectUri = encodeURIComponent(`${BASE_URL}/auth/kakao/callback`);
      
      const state = generateUUID(); // Generate a compatible UUID

      // Store state for CSRF protection
      localStorage.setItem("kakao_auth_state", state);

      // Construct Kakao authorization URL
      const authUrl = `https://kauth.kakao.com/oauth/authorize?` +
        `client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=code` +
        `&state=${state}`;

      // Redirect user to Kakao login
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error initiating Kakao Sign-In:", error);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="flex items-center justify-center px-4 py-2 bg-[#FEE500] text-[#000000] rounded-lg w-full hover:bg-[#FDD900] transition-colors"
    >
      <RiKakaoTalkFill className="w-5 h-5 mr-2" />
      Continue with Kakao
    </button>
  );
}

// Fallback UUID Generator (Compatible with all browsers)
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
