import { RiTwitterXFill } from "react-icons/ri";

export default function TwitterLoginButton() {
  const handleTwitterLogin = () => {
    const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
    const redirectUri = encodeURIComponent("http://localhost:3000/auth/twitter/callback");
    const scope = encodeURIComponent("tweet.read users.read offline.access");
    const state = encodeURIComponent(crypto.randomUUID()); // Generate random state
    const codeChallengeMethod = "S256";
    
    // Generate code verifier and challenge
    const generateCodeVerifier = () => {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    };

    const codeVerifier = generateCodeVerifier();
    
    // Store code verifier in localStorage (needed for callback)
    localStorage.setItem("twitter_code_verifier", codeVerifier);

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
