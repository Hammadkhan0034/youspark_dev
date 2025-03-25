import { FaTwitter } from "react-icons/fa";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterLoginButton() {
  const handleTwitterLogin = () => {
    const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
    const redirectUri = encodeURIComponent(AUTH_CALLBACKS.twitter);
    const scope = encodeURIComponent("tweet.read users.read offline.access");
    const state = generateUUID();
    
    // Store state for CSRF protection
    localStorage.setItem("twitter_auth_state", state);

    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?` +
      `response_type=token` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=${scope}` +
      `&state=${state}`;

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

// UUID Generator for state parameter
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
