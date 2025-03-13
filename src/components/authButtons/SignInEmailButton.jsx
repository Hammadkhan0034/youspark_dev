import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function SignInEmailButton() {
  const navigate = useNavigate();

  const handleEmailSignIn = () => {
    navigate("/login");
  };

  return (
    <button
      onClick={handleEmailSignIn}
      className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg w-full"
    >
      <HiOutlineMail className="w-5 h-5 mr-2" />
      Continue with Email
    </button>
  );
}
