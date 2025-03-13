import { RiTwitterXFill } from "react-icons/ri";

export default function TwitterLoginButton() {
  const handleTwitterLogin = () => {
    console.log("Twitter Login Clicked");
    // Implement Twitter login logic here
  };

  return (
    <button
      onClick={handleTwitterLogin}
      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
    >
      <RiTwitterXFill className="w-5 h-5 mr-2" />
      Continue with Twitter
    </button>
  );
}
