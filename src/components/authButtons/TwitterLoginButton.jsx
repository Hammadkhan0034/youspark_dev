import TwitterLogin from "react-twitter-login";
import { RiTwitterXFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TwitterLoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    console.log("Twitter Login Success:", response);

    try {
      // Store Twitter access token in localStorage
      localStorage.setItem("twitter_access_token", response.accessToken);
      console.log("Token Saved:", response.accessToken);

      // Send access token to backend for verification
      const res = await axios.post(
        "http://localhost:4000/api/social-sign-in",
        {
          access_token: response.accessToken,
          channel: "twitter",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API Response:", res.data);

      // Store user data in localStorage
      localStorage.setItem("user_data", JSON.stringify(res.data.user));

      // Store user data in Redux
      dispatch(setUser(res.data.user));

      console.log("Response data of user in TwitterLogin Page", res.data.user);

      // Navigate based on profile_completed
      if (res.data.data.profile_completed === false) {
        navigate("/user-profile");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  const handleFailure = (error) => {
    console.error("Twitter Login Error:", error);
  };

  return (
    <TwitterLogin
      authCallback={handleSuccess}
      onFailure={handleFailure}
      consumerKey={import.meta.env.VITE_TWITTER_CLIENT_ID}
      consumerSecret={import.meta.env.VITE_CLIENT_SECRET}
      callbackUrl="http://localhost:3000" // Must match Twitter Developer App callback URL
      requestTokenUrl="https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth/request_token"
      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
    >
      <RiTwitterXFill className="w-5 h-5 mr-2" />
      Continue with Twitter
    </TwitterLogin>
  );
}