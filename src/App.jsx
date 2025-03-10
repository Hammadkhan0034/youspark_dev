import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInPage from './pages/SignInPage';
import ChatPage from './pages/ChatPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import VirtualCard from './components/VirtualCard';
import Home from './pages/Home';

function App() {
  const imgName = "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?t=st=1741294786~exp=1741298386~hmac=11406dd743975348a585ede1b622862b1527789e47ea15526144f3e9aeb0de3a&w=740";

  const userData = {
    photo: imgName,
    nickname: "CryptoKing",
    description: "This card holds the legacy of blockchain.",
    value: "500",
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        {/* <Route path="/virtual-card" element={<VirtualCard user={userData} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

