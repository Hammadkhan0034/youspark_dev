import { FaDiscord } from "react-icons/fa";

export default function DiscordLoginButton() {
  const handleDiscordLogin = () => {
    console.log("Discord Login Clicked");
    // Implement Discord login logic here
  };

  return (
    <button
      onClick={handleDiscordLogin}
      className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg w-full"
    >
      <FaDiscord className="w-5 h-5 mr-2" />
      Continue with Discord
    </button>
  );
}
