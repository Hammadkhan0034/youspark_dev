import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function DiscordCallback() {
  const history = useHistory();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      axios
        .post("http://localhost:5000/auth/discord/callback", { code }) // Replace with your backend URL
        .then((response) => {
          // Handle the response (e.g., store the token, redirect to dashboard)
          console.log(response.data);
          history.push("/dashboard");
        })
        .catch((error) => {
          console.error("Error during Discord authentication:", error);
        });
    }
  }, [history]);

  return <div>Loading...</div>;
}