import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon, Search, Bell, MessageCircle, User, Settings, MoreHorizontal, Heart, Repeat2, MessageSquare, Share } from 'lucide-react';
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/Rightbar";
import Topbar from "../components/Topbar";

const tweets = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    username: "johndoe",
    handle: "@johndoe",
    timestamp: "2h",
    content: "Just deployed my latest project! 🚀 #coding #webdev",
    likes: 42,
    retweets: 12,
    comments: 5
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    username: "sarahsmith",
    handle: "@sarahsmith",
    timestamp: "4h",
    content: "The future of AI is incredibly exciting! What are your thoughts on the latest developments? 🤖 #AI #tech",
    likes: 128,
    retweets: 34,
    comments: 15
  }
];

const trendingTopics = [
  { topic: "#JavaScript", tweets: "125K" },
  { topic: "#AI", tweets: "89K" },
  { topic: "#WebDev", tweets: "45K" },
  { topic: "#React", tweets: "32K" }
];

function Home() {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar */}
      <Topbar toggleMobileNav={toggleMobileNav} />

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-bold">{t('menu')}</h2>
            <button onClick={toggleMobileNav} className="text-gray-700">
              <Settings size={24} />
            </button>
          </div>
          <nav className="p-4 space-y-4">
            <MobileNavItem icon={<HomeIcon size={24} />} text={t('home')} onClick={() => navigate("/home")} />
            <MobileNavItem icon={<Search size={24} />} text={t('discover')} onClick={() => navigate("/discover")} />
            <MobileNavItem icon={<User size={24} />} text={t('sparkZone')} onClick={() => navigate("/sparkzone")} />
            <MobileNavItem icon={<Bell size={24} />} text={t('notifications')} onClick={() => navigate("/notifications")} />
            <MobileNavItem icon={<MessageCircle size={24} />} text={t('messages')} onClick={() => navigate("/messages")} />
            <MobileNavItem icon={<Settings size={24} />} text={t('settings')} onClick={() => navigate("/settings")} />
          </nav>
        </div>
      )}

      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className={`
          flex-1 min-h-screen
          lg:ml-64
          ${isSidebarOpen ? 'lg:mr-80' : 'lg:mr-80'}
          pt-16 lg:pt-0
          pb-16 lg:pb-0
          transition-all duration-300 ease-in-out
        `}>
          <div className="max-w-2xl mx-auto px-4">
            {/* Tweet Input */}
            <div className="flex space-x-4 py-4 border-b border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder={t('whatsHappening')}
                  className="w-full bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 resize-none pb-4"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold transition-colors">
                    {t('post')}
                  </button>
                </div>
              </div>
            </div>

            {/* Tweets */}
            {tweets.map(tweet => (
              <div key={tweet.id} className="py-4 border-b border-gray-200">
                <div className="flex space-x-4">
                  <img src={tweet.avatar} alt={tweet.username} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{tweet.username}</span>
                      <span className="text-gray-500">{tweet.handle}</span>
                      <span className="text-gray-500">· {tweet.timestamp}</span>
                      <button className="ml-auto text-gray-500 hover:text-gray-700">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    <p className="mt-2 mb-4">{tweet.content}</p>
                    <div className="flex justify-between text-gray-500 max-w-md">
                      <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                        <MessageSquare size={18} />
                        <span>{tweet.comments} {t('comment')}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                        <Repeat2 size={18} />
                        <span>{tweet.retweets} {t('retweet')}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                        <span>{tweet.likes} {t('like')}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                        <Share size={18} />
                        <span>{t('share')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar trendingTopics={trendingTopics} />

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex justify-between items-center">
            <MobileNavButton icon={<HomeIcon size={24} />} onClick={() => navigate("/home")} />
            <MobileNavButton icon={<User size={24} />} text="SparkZone" onClick={() => navigate("/sparkzone")}/>
            <MobileNavButton icon={<Search size={24} />} onClick={() => navigate("/discover")} />
            <MobileNavButton icon={<Bell size={24} />} onClick={() => navigate("/notifications")} />
            <MobileNavButton icon={<MessageCircle size={24} />} onClick={() => navigate("/messages")} />
          </div>
        </nav>
      </div>
    </div>
  );
}

function MobileNavItem({ icon, text, onClick }) {
  return (
    <button
      className="flex items-center space-x-4 w-full p-4 hover:bg-gray-100 rounded-lg transition-colors"
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
}

function MobileNavButton({ icon, onClick }) {
  return (
    <button
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default Home;
