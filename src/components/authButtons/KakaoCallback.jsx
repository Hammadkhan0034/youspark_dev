import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import API from "../../api/api";
import { AUTH_CALLBACKS } from "../../config/urls/urls";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const receivedState = params.get('state');
        
        // Verify state to prevent CSRF
        const storedState = localStorage.getItem('kakao_auth_state');
        if (receivedState !== storedState) {
          throw new Error('State mismatch - possible CSRF attack');
        }

        // Send authorization code to backend
        const response = await API.post('/social-sign-in', {
          code,
          channel: 'kakao',
          redirect_uri: AUTH_CALLBACKS.kakao
        });

        const { data } = response.data;

        // Store tokens
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }

        // Clean up localStorage
        localStorage.removeItem('kakao_auth_state');

        // Update Redux store
        dispatch(setUser(data.user));

        // Navigate based on profile completion
        if (!data.user.profile_completed) {
          navigate('/user-profile');
        } else {
          navigate('/home');
        }

      } catch (error) {
        console.error('Kakao authentication error:', error);
        navigate('/signin-socials');
      }
    };

    handleCallback();
  }, [navigate, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
