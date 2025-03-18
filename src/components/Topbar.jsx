import React from "react";
import YSLOGO from "../assets/YSLOGO.png";
import Logout from "../components/Logout";

const Topbar = () => {
  return (
    <nav className="w-[145%] mx-auto flex justify-between items-center z-50 px-6 py-4 bg-teal-600 text-white shadow-md">
      {/* Left Section - Logo */}
      <div className="text-2xl font-bold ml-8">
        <img src={YSLOGO} alt="YS Logo" style={{ width: "45px", height: "40px" }} />
      </div>

      {/* Right Section - Navigation Links with Vertical Lines */}
      <div className="flex space-x-4 text-lg mr-8 items-center">
        <a href="/" className="hover:underline">
          Home
        </a>
        <span className="text-white">|</span>
        <a href="/about" className="hover:underline">
          About Us
        </a>
        <span className="text-white">|</span>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <span className="text-white">|</span>

        {/* Replace the Logout link with the Logout component */}
        <Logout />
      </div>
    </nav>
  );
};

export default Topbar;