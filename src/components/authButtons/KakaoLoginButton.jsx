import { SiKakaotalk } from "react-icons/si";
import { BASE_URL } from "../../config/urls/urls";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${BASE_URL}/auth/kakao/callback`);
    const responseType = "code";

    // Generate a random state for CSRF protection
    const state = encodeURIComponent(
      Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
    localStorage.setItem("kakao_auth_state", state); // Store state for verification

    // Request necessary permissions (scopes)
    const scope = encodeURIComponent(
      "profile_nickname profile_image account_email gender age_range birthday"
    );

    // Construct Kakao OAuth URL
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=${responseType}` +
      `&state=${state}` +
      `&scope=${scope}`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="flex items-center justify-center px-4 py-2 bg-[#FEE500] text-black rounded-lg w-full hover:bg-[#F2D400] transition-colors"
    >
      <SiKakaotalk className="w-5 h-5 mr-2" />
      Continue with Kakao
    </button>
  );
}
