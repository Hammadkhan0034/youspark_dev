import { RiTwitterXFill } from "react-icons/ri";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterLoginButton() {
  const handleTwitterLogin = async () => {
    try {
      const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
      const redirectUri = encodeURIComponent(AUTH_CALLBACKS.twitter);
      const scope = encodeURIComponent("tweet.read users.read offline.access");
      
      // Generate state for CSRF protection
      const state = crypto.randomUUID();
      
      // Generate code verifier (43-128 chars)
      const generateCodeVerifier = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        const array = new Uint8Array(96);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => chars[byte % chars.length]).join('');
      };

      const codeVerifier = generateCodeVerifier();
      
      // Generate code challenge
      const generateCodeChallenge = async (verifier) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode(...new Uint8Array(digest)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      };

      // Store PKCE and state values
      localStorage.setItem("twitter_code_verifier", codeVerifier);
      localStorage.setItem("twitter_state", state);

      // Generate code challenge and construct URL
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
