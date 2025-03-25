import { FaTwitter } from "react-icons/fa";
import { BASE_URL } from "../../config/urls/urls";

export default function TwitterLoginButton() {
  const handleTwitterLogin = () => {
    const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${BASE_URL}/auth/twitter/callback`);
    const scope = encodeURIComponent("tweet.read users.read offline.access");
    const responseType = "token";

    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = twitterAuthUrl;
  };

  return (
    <button
      onClick={handleTwitterLogin}
      className="flex items-center justify-center px-4 py-2 bg-[#1DA1F2] text-white rounded-lg w-full hover:bg-[#1A91DA] transition-colors"
    >
      <FaTwitter className="w-5 h-5 mr-2" />
      Continue with Twitter
    </button>
  );
}
