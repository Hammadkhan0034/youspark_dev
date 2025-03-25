import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/userSlice';
import API from './api/api';
import './App.css';
import SignInSocials from './pages/authPages/SignInSocials';
import ChatPage from './pages/ChatPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Home from './pages/Home';
import UserProfileTwo from './pages/UserProfileTwo';
import VirtualCard from './components/VirtualCard';
import DiscordCallback from './components/authButtons/DiscordCallback';
import TwitterCallback from './components/authButtons/TwitterCallback';
import AppleCallback from './components/authButtons/AppleCallback';
import Languages from './pages/Languages';
import KakaoCallback from './components/authButtons/KakaoCallback';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('access_token');

      if (token && !isAuthenticated) {
        try {
          const response = await API.get('/users/me');
          dispatch(setUser(response.data.data));
        } catch (error) {
          // Only remove tokens if it's an authentication error
          if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
          // For other errors, keep the tokens
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkAuthStatus();
  }, [dispatch, isAuthenticated]);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');

    if (!token || !isAuthenticated) {
      return <Navigate to="/signin-socials" replace />;
    }

    if (isAuthenticated && !user?.profile_completed) {
      return <Navigate to="/user-profile" replace />;
    }

    return children;
  };

  // Profile Route Component
  const ProfileRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');

    if (!token || !isAuthenticated) {
      return <Navigate to="/signin-socials" replace />;
    }

    if (isAuthenticated && user?.profile_completed) {
      return <Navigate to="/home" replace />;
    }

    return children;
  };

  // Auth Route Component
  const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');

    if (token && isAuthenticated) {
      return user?.profile_completed ?
        <Navigate to="/home" replace /> :
        <Navigate to="/user-profile" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <AuthRoute>
            <Navigate to="/signin-socials" replace />
          </AuthRoute>
        } />

        <Route path="/signin-socials" element={
          <AuthRoute>
            <SignInSocials />
          </AuthRoute>
        } />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* Auth Callback Routes */}
        <Route path="/auth/discord/callback" element={<DiscordCallback />} />
        <Route path="/auth/twitter/callback" element={<TwitterCallback />} />

        {/* Profile Setup Route */}
        <Route
          path="/user-profile"
          element={
            <ProfileRoute>
              <UserProfileTwo />
            </ProfileRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/virtual-card"
          element={
            <ProtectedRoute>
              <VirtualCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/languages"
          element={
            <ProtectedRoute>
              <Languages />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/apple/callback" element={<AppleCallback />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        {/* Fallback route for unknown paths */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

