import React from "react";

const Topbar = () => {
  return (
    <nav className="w-full flex justify-between items-center z-50 px-6 py-4 bg-teal-600 text-white shadow-md">
      {/* Left Section - Logo */}
      <div className="text-2xl font-bold">
        YouSparks
      </div>

      {/* Right Section - Navigation Links with Vertical Lines */}
      <div className="flex space-x-4 text-lg">
        <a href="/" className="hover:underline">Home</a>
        <span className="text-white">|</span>
        <a href="/about" className="hover:underline">About Us</a>
        <span className="text-white">|</span>
        <a href="/contact" className="hover:underline">Contact</a>
      </div>
    </nav>
  );
};

export default Topbar;
