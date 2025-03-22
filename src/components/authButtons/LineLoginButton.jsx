import { FaLine } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

const LineLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle LINE login
  const handleLineLogin = () => {
    // LINE OAuth configuration
    const channelId = import.meta.env.VITE_LINE_CHANNEL_ID; // Access environment variable
    const redirectUri = "http://localhost:3000/auth/line/callback"; // No trailing slash
    const state = "Tokyo%20prefecture"; // Optional: Add a state parameter for security
    const scope = "profile%20openid%20email"; // Requested permissions

    // Debugging: Log the redirect URI and auth URL
    console.log("Redirect URI:", redirectUri);
    console.log("Auth URL:", `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`);

    // Redirect to LINE OAuth page (authorization code flow)
    const authUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLineLogin}
      className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg w-full"
    >
      <FaLine className="w-5 h-5 mr-2" />
      Continue with LINE
    </button>
  );
};

export default LineLoginButton;