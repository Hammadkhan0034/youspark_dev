import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import axios from "axios";
import { FaDiscord } from "react-icons/fa";

const DiscordLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDiscordLogin = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID; // Add your Discord Client ID to .env
    const redirectUri = encodeURIComponent("http://localhost:3000/auth/discord/callback");
    const scope = encodeURIComponent("identify email"); // Add required scopes
    const responseType = "token"; // Use "token" for implicit grant flow

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = discordAuthUrl;
  };

  // Handle the callback (if needed)
  const handleCallback = async (accessToken) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/social-sign-in", // Replace with your Elixir backend URL
        {
          access_token: accessToken,
          channel: "discord",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", res.data);

      const token = res.data.data.access_token;

      // Store in localStorage
      localStorage.setItem("access_token", token);
      console.log("Token Saved:", token);

      // Store user data in Redux
      dispatch(setUser(res.data.user));

      console.log("Response data of user in DiscordLogin Page", res.data.user);

      // Navigate to the home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  // Check for access token in URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const accessToken = hash
        .substring(1) // Remove the `#`
        .split("&") // Split into key-value pairs
        .find((param) => param.startsWith("access_token")) // Find the `access_token` parameter
        ?.split("=")[1]; // Extract the token value

      if (accessToken) {
        handleCallback(accessToken);
      }
    }
  }, []);

  return (
    <button
      onClick={handleDiscordLogin}
      className="flex items-center justify-center px-4 py-2 bg-[#5865F2] text-white rounded-lg w-full"
    >
      <FaDiscord className="w-5 h-5 mr-2" />
      Continue with Discord
    </button>
  );
};

export default DiscordLoginButton;