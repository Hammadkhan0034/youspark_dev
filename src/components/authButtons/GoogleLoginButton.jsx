import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post(
          "http://54.167.153.121:4000/api/social-sign-in",
          {
            access_token: response.access_token,
            channel: "google",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = res.data;
        
        // Store access token
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Store user data in Redux
        dispatch(setUser(data.user));

        // Always navigate to profile page first
        navigate("/user-profile");
        
      } catch (error) {
        console.error("Error during Google authentication:", error);
        // Handle error (show error message to user)
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;




