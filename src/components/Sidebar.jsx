import React from "react";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon, Search, Bell, MessageCircle, User, Settings,IdCard } from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <nav 
      className={`
        fixed h-screen bg-white z-40 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'w-64' : 'w-16'}
        hidden lg:block
      `}
    >
      <div className="p-4 space-y-2">
        <div className={`text-2xl font-bold mb-8 ${!isSidebarOpen && 'hidden'}`}>YouSpark</div>
        <SidebarItem icon={<HomeIcon />} text="Home" onClick={() => navigate("/home")} showText={isSidebarOpen} />
        <SidebarItem icon={<IdCard />} text="Virtual Card" onClick={() => navigate("/virtual-card")} showText={isSidebarOpen} />
        <SidebarItem icon={<Search />} text="Discover" onClick={() => navigate("/discover")} showText={isSidebarOpen} />
        <SidebarItem icon={<User />} text="SparkZone" onClick={() => navigate("/sparkzone")} showText={isSidebarOpen} />
        <SidebarItem icon={<Bell />} text="Notifications" onClick={() => navigate("/notifications")} showText={isSidebarOpen} />
        <SidebarItem icon={<MessageCircle />} text="Messages" onClick={() => navigate("/messages")} showText={isSidebarOpen} />
        <SidebarItem icon={<User />} text="Profile" onClick={() => navigate("/profile")} showText={isSidebarOpen} />
        <SidebarItem icon={<Settings />} text="Settings" onClick={() => navigate("/settings")} showText={isSidebarOpen} />
        {isSidebarOpen && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 w-full mt-4 font-bold">
            Post
          </button>
        )}
      </div>
    </nav>
  );
};

const SidebarItem = ({ icon, text, onClick, showText }) => {
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