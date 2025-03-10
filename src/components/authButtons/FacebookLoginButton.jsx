import { FaFacebook } from "react-icons/fa";

export default function FacebookLoginButton() {
  const handleFacebookLogin = () => {
    console.log("Facebook Login Clicked");
    // Implement Facebook login logic here
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
    >
      <FaFacebook className="w-5 h-5 mr-2" />
      Continue with Facebook
    </button>
  );
}
