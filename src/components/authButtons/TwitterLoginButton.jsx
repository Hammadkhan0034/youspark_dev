import { RiTwitterXFill } from "react-icons/ri";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterLoginButton() {
  // Generate UUID
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Base64 encode string
  const base64URLEncode = (str) => {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  // Generate code verifier
  const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64URLEncode(String.fromCharCode.apply(null, array));
  };

  // Generate code challenge
  const generateCodeChallenge = (codeVerifier) => {
    return base64URLEncode(codeVerifier);
  };

  const handleTwitterLogin = () => {
    try {
      const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
      const redirectUri = encodeURIComponent(AUTH_CALLBACKS.twitter);
      const scope = encodeURIComponent("tweet.read users.read offline.access");
      
      // Generate state and code verifier
      const state = generateUUID();
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = generateCodeChallenge(codeVerifier);
      
      // Store PKCE and state values
      localStorage.setItem("twitter_code_verifier", codeVerifier);
      localStorage.setItem("twitter_state", state);

      const authUrl = `https://twitter.com/i/oauth2/authorize?` +
        `response_type=code` +
        `&client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&scope=${scope}` +
        `&state=${state}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=plain`;

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
