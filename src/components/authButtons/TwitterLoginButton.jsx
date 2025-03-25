import { RiTwitterXFill } from "react-icons/ri";

export default function TwitterLoginButton() {
  const handleTwitterLogin = () => {
    const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
    const redirectUri = encodeURIComponent("http://34.236.113.112/auth/twitter/callback");
    const scope = encodeURIComponent("tweet.read users.read offline.access");
    
    // Generate UUID compatible with all browsers
    const generateUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
    
    const state = generateUUID(); // Use the compatible UUID generator
    const codeChallengeMethod = "S256";
    
    // Generate code verifier (43-128 chars)
    const generateCodeVerifier = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      const length = 96;
      let result = '';
      const randomValues = new Uint8Array(length);
      crypto.getRandomValues(randomValues);
      randomValues.forEach(v => result += chars[v % chars.length]);
      return result;
    };

    const codeVerifier = generateCodeVerifier();
    
    // Store code verifier and state in localStorage
    localStorage.setItem("twitter_code_verifier", codeVerifier);
    localStorage.setItem("twitter_state", state);

    // Generate code challenge using SHA-256
    const generateCodeChallenge = async (verifier) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(verifier);
      const digest = await crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    };

    // Initiate OAuth flow
    generateCodeChallenge(codeVerifier).then(challenge => {
      const authUrl = `https://twitter.com/i/oauth2/authorize?` +
        `response_type=code` +
        `&client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&scope=${scope}` +
        `&state=${state}` +
        `&code_challenge=${challenge}` +
        `&code_challenge_method=${codeChallengeMethod}`;

      window.location.href = authUrl;
    });
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
