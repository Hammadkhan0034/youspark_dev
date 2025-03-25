import { FaTwitter } from "react-icons/fa";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterLoginButton() {
  const handleTwitterLogin = () => {
    const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
    const redirectUri = encodeURIComponent(AUTH_CALLBACKS.twitter);
    
    // Generate state using the compatible UUID generator
    const state = generateUUID();
    localStorage.setItem("twitter_auth_state", state);

    // Twitter OAuth 2.0 parameters
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'tweet.read users.read',
      state: state,
      code_challenge: 'challenge',
      code_challenge_method: 'plain'
    });

    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
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

// Fallback UUID Generator (Compatible with all browsers)
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


