import { RiTwitterXFill } from "react-icons/ri";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterLoginButton() {
  // Generate UUID (compatible with all browsers)
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Generate random string for code verifier
  const generateCodeVerifier = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const length = 96; // Length between 43-128 chars
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate code challenge from verifier
  const generateCodeChallenge = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const handleTwitterLogin = async () => {
    try {
      const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
      const redirectUri = encodeURIComponent(AUTH_CALLBACKS.twitter);
      const scope = encodeURIComponent("tweet.read users.read offline.access");
      
      // Generate state and code verifier
      const state = generateUUID();
      const codeVerifier = generateCodeVerifier();
      
      // Store PKCE and state values
      localStorage.setItem("twitter_code_verifier", codeVerifier);
      localStorage.setItem("twitter_state", state);

      // Generate code challenge
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      
      const authUrl = `https://twitter.com/i/oauth2/authorize?` +
        `response_type=code` +
        `&client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&scope=${scope}` +
        `&state=${state}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256`;

      window.location.href = authUrl;
    } catch (error) {
      console.error("Error initiating Twitter login:", error);
    }
  };

  return (
    <button
      onClick={handleTwitterLogin}
      className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg w-full hover:bg-gray-800 transition-colors"
    >
      <RiTwitterXFill className="w-5 h-5 mr-2" />
      Continue with X (Twitter)
    </button>
  );
}
