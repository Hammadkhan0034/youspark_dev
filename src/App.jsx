import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInSocials from './pages/authPages/SignInSocials';
import ChatPage from './pages/ChatPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Home from './pages/Home';
import Login from './pages/authPages/Login';
import UserProfile from './pages/UserProfile';
import Signup from './pages/authPages/Signup';
import VirtualCard from './components/VirtualCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/signin-socials" element={<SignInSocials />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path='/virtual-card' element={<VirtualCard />}/>
      </Routes>
    </Router>
  );
}

export default App;

