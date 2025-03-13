import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./authButtons/GoogleLoginButton"; 
import FacebookLoginButton from "./authButtons/FacebookLoginButton";
import LineLoginButton from "./authButtons/LineLoginButton";
import AppleLoginButton from "./authButtons/AppleLoginButton";
import InstagramLoginButton from "./authButtons/InstagramLoginButton";
import TwitterLoginButton from "./authButtons/TwitterLoginButton";
import DiscordLoginButton from "./authButtons/DiscordLoginButton";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; 

export default function SignInButtons() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-3 bg-gray-100 p-4 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-black mb-0">Welcome to YouSparks</h1>
          <p className="text-gray-600 text-sm mb-6">Sign in using any platform below</p>
          <GoogleLoginButton />
          <FacebookLoginButton />
          <LineLoginButton />
          <AppleLoginButton />
          <InstagramLoginButton />
          <TwitterLoginButton />
          <DiscordLoginButton />
          <p className="text-gray-600 text-xs mb-6">
            By continuing, you confirm that you are at least 18 years old and agree to our{" "}
            <b>
              <Link to="/terms-and-conditions" className="text-gray-600 hover:underline">
                Terms and Conditions{" "}
              </Link>
            </b>{" "}
            and{" "}
            <b>
              <Link to="/privacy-policy" className="text-gray-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </b>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
