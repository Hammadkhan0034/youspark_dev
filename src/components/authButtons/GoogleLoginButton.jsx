import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google Login Success:", response);
      // Send token to backend for verification
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <div className="w-full">
      <button
        onClick={() => login()}
        className="flex items-center justify-center px-4 py-2 bg-red-500  text-white rounded-lg w-full transition"
      >
        <FcGoogle className="w-5 h-5 mr-2" />
        Continue with Google
      </button>
    </div>
  );
}
