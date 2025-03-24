import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon, Search, Bell, MessageCircle, User, Settings, IdCard } from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <nav 
      className={`
        fixed h-screen bg-white z-40 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'w-64' : 'w-16'}
        hidden lg:block flex flex-col
      `}
    >
      {/* Logo Section - Fixed at top */}
      <div className="p-4">
        <div className={`text-2xl font-bold ${!isSidebarOpen && 'hidden'}`}>YouSpark</div>
      </div>

      {/* Scrollable Menu Items */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-4 space-y-2">
          <SidebarItem 
            icon={<HomeIcon />} 
            text={t('home')} 
            onClick={() => navigate("/home")} 
            showText={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<IdCard />} 
            text={t('virtualCard')} 
            onClick={() => navigate("/virtual-card")} 
            showText={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<Search />} 
            text={t('discover')} 
            onClick={() => navigate("/discover")} 
            showText={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<User />} 
            text={t('sparkZone')} 
            onClick={() => navigate("/sparkzone")} 
            showText={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<Bell />} 
            text={t('notifications')} 
            onClick={() => navigate("/notifications")} 
            showText={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<MessageCircle />} 
            text={t('messages')} 
            onClick={() => navigate("/messages")} 
            showText={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<User />} 
            text={t('profile')} 
            onClick={() => navigate("/profile")} 
            showText={isSidebarOpen} 
          />
          
          <SidebarItem 
            icon={<Settings />} 
            text={t('language')} 
            onClick={() => navigate("/languages")} 
            showText={isSidebarOpen} 
          />
        </div>
      </div>

      {/* Post Button - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200">
        {isSidebarOpen && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 w-full mt-4 font-bold">
            {t('post')}
          </button>
        )}
      </div>
    </nav>
  );
};

const SidebarItem = ({ icon,  text, onClick, showText }) => {
  return (
    <button
      className={`
        flex items-center p-3 rounded-full hover:bg-gray-100 w-full
        ${showText ? 'space-x-4' : 'justify-center'}
      `}
      onClick={onClick}
    >
      {icon}
      {showText && <span>{text}</span>}
    </button>
  );
};

export default Sidebar;
