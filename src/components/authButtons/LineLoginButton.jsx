import { FaLine } from "react-icons/fa6";

export default function LineLoginButton() {
  const handleLineLogin = () => {
    const clientId = import.meta.env.VITE_LINE_CHANNEL_ID;
    const redirectUri = encodeURIComponent("http://localhost:3000/auth/line/callback");
    const state = encodeURIComponent(crypto.randomUUID());
    const scope = encodeURIComponent("profile openid email");
    
    const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?` +
      `response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&state=${state}` +
      `&scope=${scope}`;

    window.location.href = lineAuthUrl;
  };

  return (
    <button
      onClick={handleLineLogin}
      className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg w-full hover:bg-green-600 transition-colors"
    >
      <FaLine className="w-5 h-5 mr-2" />
      Continue with LINE
    </button>
  );
}
