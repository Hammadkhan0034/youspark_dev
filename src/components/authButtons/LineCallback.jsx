import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LineCallback() {
  const navigate = useNavigate();

  // Function to exchange the authorization code for an access token
  const exchangeCodeForToken = async (code) => {
    try {
      // Exchange the code for an access token
      const response = await axios.post(
        "https://api.line.me/oauth2/v2.1/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://34.236.113.112/auth/line/callback", // No trailing slash
          client_id: import.meta.env.VITE_LINE_CHANNEL_ID, // Access environment variable
          client_secret: import.meta.env.VITE_LINE_CHANNEL_SECRET, // Access environment variable
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = response.data.access_token;
      const idToken = response.data.id_token; // LINE also returns an ID token
      console.log("Access Token:", accessToken);
      console.log("ID Token:", idToken);

      // Use the access token to fetch user data
      const userResponse = await axios.get("https://api.line.me/v2/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("User Data:", userResponse.data);

      // Navigate to /home after successful login
      navigate("/home");
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      // Handle the error gracefully (e.g., show a message to the user)
    }
  };

  // Check for the authorization code in the URL (callback handling)
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      exchangeCodeForToken(code);
    } else {
      console.error("Authorization code not found");
      // Handle the missing code gracefully (e.g., show a message to the user)
    }
  }, [navigate]);

  return <div>Loading...</div>;
}