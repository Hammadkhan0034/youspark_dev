import { IoLogoApple } from "react-icons/io5";

export default function AppleLoginButton() {
  const handleAppleLogin = () => {
    console.log("Apple Login Clicked");
    // Implement Apple login logic here
  };

  return (
    <button
      onClick={handleAppleLogin}
      className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg w-full"
    >
      <IoLogoApple className="w-5 h-5 mr-2" />
      Continue with Apple
    </button>
  );
}
