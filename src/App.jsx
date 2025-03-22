import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignInSocials from './pages/authPages/SignInSocials';
import ChatPage from './pages/ChatPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Home from './pages/Home';
import Login from './pages/authPages/Login';
import UserProfile from './pages/UserProfile';
import UserProfileTwo from './pages/UserProfileTwo';
import Signup from './pages/authPages/Signup';
import VirtualCard from './components/VirtualCard';
import DiscordCallback from './components/authButtons/DiscordCallback';
import TwitterCallback from './components/authButtons/TwitterCallback';



function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={<Navigate to="/signin-socials" replace />} />

        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/signin-socials" element={<SignInSocials />} />
        {/* <Route path='/user-profile' element={<UserProfile />} /> */}
        <Route path='/user-profile' element={<UserProfileTwo />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path='/virtual-card' element={<VirtualCard />}/>
        {/* Discord OAuth2 callback route */}
        <Route path="/auth/discord/callback" element={<DiscordCallback />} />
        <Route path="/auth/twitter/callback" element={<TwitterCallback />} />
        {/* Fallback route for unknown paths (404 Not Found) */}
        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;

