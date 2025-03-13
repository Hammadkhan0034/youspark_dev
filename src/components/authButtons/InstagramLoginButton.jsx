import { BsInstagram } from "react-icons/bs";

export default function InstagramLoginButton() {
  const handleInstagramLogin = () => {
    console.log("Instagram Login Clicked");
    // Implement Instagram login logic here
  };

  return (
    <button
      onClick={handleInstagramLogin}
      className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg w-full"
    >
      <BsInstagram className="w-5 h-5 mr-2" />
      Continue with Instagram
    </button>
  );
}
