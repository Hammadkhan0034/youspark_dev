import { IoLogoApple } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function AppleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAppleLogin = async () => {
    try {
      // Apple Sign-In configuration
      const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
      const redirectUri = encodeURIComponent(AUTH_CALLBACKS.apple);
      const scope = encodeURIComponent('name email');
      const state = crypto.randomUUID(); // Generate random state
      const nonce = crypto.randomUUID(); // Generate random nonce

      // Store state and nonce in localStorage for verification
      localStorage.setItem('apple_auth_state', state);
      localStorage.setItem('apple_auth_nonce', nonce);

      // Construct Apple authorization URL
      const authUrl = `https://appleid.apple.com/auth/authorize?` +
        `client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=code id_token` +
        `&scope=${scope}` +
        `&response_mode=fragment` +
        `&state=${state}` +
        `&nonce=${nonce}`;

      // Redirect to Apple Sign-In
      window.location.href = authUrl;

    } catch (error) {
      console.error("Error initiating Apple Sign-In:", error);
    }
  };

  return (
    <button
      onClick={handleAppleLogin}
      className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg w-full hover:bg-gray-900 transition-colors"
    >
      <IoLogoApple className="w-5 h-5 mr-2" />
      Continue with Apple
    </button>
  );
}