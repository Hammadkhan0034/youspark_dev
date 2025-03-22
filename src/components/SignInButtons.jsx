import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./authButtons/GoogleLoginButton";
import FacebookLoginButton from "./authButtons/FacebookLoginButton";
import LineLoginButton from "./authButtons/LineLoginButton";
import AppleLoginButton from "./authButtons/AppleLoginButton";
import InstagramLoginButton from "./authButtons/InstagramLoginButton";
import TwitterLoginButton from "./authButtons/TwitterLoginButton";
import DiscordLoginButton from "./authButtons/DiscordLoginButton";
import SignInEmailButton from "./authButtons/SignInEmailButton";

export default function SignInButtons() {
  // Check if required environment variables are set
  const googleClientId = import.meta.env.VITE_CLIENT_ID;
  if (!googleClientId) {
    console.error("Google Client ID is missing. Please check your .env file.");
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to YouSparks</h1>
          <p className="text-gray-600 text-sm mb-6">
            Sign in using any platform below
          </p>

          {/* Social Login Buttons */}
          <GoogleLoginButton />
          <FacebookLoginButton />
          <LineLoginButton />
          <AppleLoginButton />
          <InstagramLoginButton />
          <TwitterLoginButton />
          <DiscordLoginButton />

          {/* Email Login Button (Optional) */}
          {/* <SignInEmailButton /> */}

          {/* Terms and Conditions */}
          <p className="text-gray-600 text-xs mt-4">
            By continuing, you confirm that you are at least 18 years old and agree to our{" "}
            <b>
              <Link
                to="/terms-and-conditions"
                className="text-blue-600 hover:underline"
              >
                Terms and Conditions
              </Link>
            </b>{" "}
            and{" "}
            <b>
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </b>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}