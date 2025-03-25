import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function TwitterCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const receivedState = params.get("state");
        const storedState = localStorage.getItem("twitter_state");
        const codeVerifier = localStorage.getItem("twitter_code_verifier");

        // Verify state
        if (!storedState || receivedState !== storedState) {
          throw new Error("State mismatch - possible CSRF attack");
        }

        // Store code and codeVerifier in localStorage before making the request
        localStorage.setItem("twitter_code", code);
        localStorage.setItem("twitter_code_verifier", codeVerifier);

        // Send the code and code_verifier to your backend
        const response = await API.post("/social-sign-in", {
          code,
          code_verifier: codeVerifier,
          redirect_uri: AUTH_CALLBACKS.twitter
        });

        const { data } = response.data;

        // Store tokens
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        // Clean up OAuth state
        localStorage.removeItem("twitter_state");

        // Create user object from response
        const userData = {
          id: data.id,
          email: data.email,
          username: data.user_name,
          userStatus: data.user_status,
          userImage: data.user_image,
          firstLogin: data.first_login,
          appName: data.app_name
        };

        // Update Redux store
        dispatch(setUser(userData));

        // Navigate based on first login
        navigate(data.first_login ? "/user-profile" : "/home");

      } catch (error) {
        console.error("Twitter authentication error:", error);
        localStorage.removeItem("twitter_code");
        localStorage.removeItem("twitter_code_verifier");
        localStorage.removeItem("twitter_state");
        navigate("/signin-socials");
      }
    };
    useEffect(() => {
      const handleCallback = async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const code = params.get("code");
          const receivedState = params.get("state");
          const storedState = localStorage.getItem("twitter_state");
          const codeVerifier = localStorage.getItem("twitter_code_verifier");
  
          // Verify state
          if (!storedState || receivedState !== storedState) {
            throw new Error("State mismatch - possible CSRF attack");
          }
  
          // Send the code and code_verifier to your backend
          const response = await API.post("/social-sign-in", {
            code,
            code_verifier: codeVerifier,
            redirect_uri: AUTH_CALLBACKS.twitter
          });
  
          const { data } = response.data;
  
          // Store tokens
          localStorage.setItem("code", data.code);
          if (data.refresh_token) {
            localStorage.setItem("code_verifier", data.codeVerifier);
          }
  
          // Clean up OAuth state
          localStorage.setItem("twitter_code_verifier");
          localStorage.removeItem("twitter_state");
  
          // Create user object from response
          const userData = {
            id: data.id,
            email: data.email,
            username: data.user_name,
            userStatus: data.user_status,
            userImage: data.user_image,
            firstLogin: data.first_login,
            appName: data.app_name
          };
  
          // Update Redux store
          dispatch(setUser(userData));
  
          // Navigate based on first login
          navigate(data.first_login ? "/user-profile" : "/home");
  
        } catch (error) {
          console.error("Twitter authentication error:", error);
          localStorage.removeItem("twitter_code_verifier");
          localStorage.removeItem("twitter_state");
          navigate("/signin-socials");
        }
      };
  
      handleCallback();
    }, [navigate, dispatch]);
  
    handleCallback();
  }, [navigate, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
