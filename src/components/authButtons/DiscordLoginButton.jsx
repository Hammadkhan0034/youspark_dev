import { FaDiscord } from "react-icons/fa";
import { BASE_URL } from "../../config/urls/urls";
export default function DiscordLoginButton() {
  const handleDiscordLogin = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent(BASE_URL.discord);
    const scope = encodeURIComponent("identify email");
    const responseType = "token";

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = discordAuthUrl;
  };

  return (
    <button
      onClick={handleDiscordLogin}
      className="flex items-center justify-center px-4 py-2 bg-[#5865F2] text-white rounded-lg w-full hover:bg-[#4752C4] transition-colors"
    >
      <FaDiscord className="w-5 h-5 mr-2" />
      Continue with Discord
    </button>
  );
}
