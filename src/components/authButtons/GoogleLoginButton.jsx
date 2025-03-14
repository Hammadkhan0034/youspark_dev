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
      console.log("Google Login Success:", response);

      try {
        const res = await axios.post("http://localhost:4000/api/social-sign-in", 
        {
          access_token: response.access_token,
          channel: "google",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", res.data); 

        const accessToken = res.data.data.access_token;

// Store in localStorage
localStorage.setItem("access_token", accessToken);

console.log("Token Saved:", accessToken);
      
        // Store user data in Redux
        dispatch(setUser(res.data.user));


 // Navigate based on profile_completed
 if (res.data.data.profile_completed === false) {
  navigate("/user-profile");
} else {
  navigate("/");
}

        
      } catch (error) {
        console.error("Error sending token to backend:", error);
      }}})
      
  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg w-full"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
