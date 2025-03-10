import { FaLine } from "react-icons/fa6";

export default function LineLoginButton() {
  const handleLineLogin = () => {
    console.log("Line Login Clicked");
    // Implement Line login logic here
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
}
