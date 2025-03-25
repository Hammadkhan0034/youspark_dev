import { SiKakaotalk } from "react-icons/si";
import { BASE_URL } from "../../config/urls/urls";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${BASE_URL}/auth/kakao/callback`);
    const responseType = "code";

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

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
