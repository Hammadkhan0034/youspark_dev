import React from 'react';
import { Menu } from 'lucide-react';

const Topbar = ({ toggleMobileNav }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between p-4">
        <button onClick={toggleMobileNav} className="text-gray-700">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">YouSpark</h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>
    </header>
  );
};

export default Topbar;