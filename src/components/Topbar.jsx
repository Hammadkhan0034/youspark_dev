import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout'; // Import Logout component

const Topbar = ({ toggleMobileNav }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <button onClick={toggleMobileNav} className="text-gray-700">
          <Menu size={24} />
        </button>

        {/* App Name */}
        <h1 className="text-xl font-bold">YouSpark</h1>

        {/* Logout Button */}
        <Logout /> {/* The Logout button is integrated here */}
      </div>
    </header>
  );
};

export default Topbar;
