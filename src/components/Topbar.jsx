import React from "react";
import { Menu, Bell, MessageCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Logout from './Logout';

const Topbar = ({ toggleMobileNav }) => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-teal-light/20 lg:hidden z-30">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center">
          <button 
            onClick={toggleMobileNav}
            className="p-2 hover:bg-teal-light/10 rounded-full transition-colors"
          >
            <Menu className="text-teal-dark" size={24} />
          </button>
          <h1 className="ml-4 text-xl font-bold text-teal-dark">YouSpark</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* <button className="p-2 hover:bg-teal-light/10 rounded-full transition-colors">
            <Bell className="text-teal-dark" size={24} />
          </button>
          <button className="p-2 hover:bg-teal-light/10 rounded-full transition-colors">
            <MessageCircle className="text-teal-dark" size={24} />
          </button> */}
          <Logout />
          {/* <button className="ml-2 bg-teal-dark hover:bg-teal-light text-white rounded-full px-4 py-2 font-medium transition-colors">
            {t('post')}
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
