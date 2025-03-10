
import React from "react";
import { FaHome, FaSearch, FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="flex flex-col w-full h-full p-4 h-screen text-black space-y-4 border-r-2 border-gray-200">
      <span className="text-2xl font-bold">YouSpark</span>

      <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300" 
        onClick={() => setActiveComponent("home")}>
        <FaHome size={18} />
        <span className="text-[15px]">Home</span>
      </div>

      <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300" 
        onClick={() => setActiveComponent("virtualCard")}>
        <FaSearch size={18} />
        <span className="text-[15px]">Virtual Card</span>
      </div>

      <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300" 
        onClick={() => setActiveComponent("ownVirtualCard")}>
        <IoIosNotifications size={18} />
        <span className="text-[15px]">Own Virtual Card</span>
      </div>

      <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300" 
        onClick={() => setActiveComponent("expAndSp")}>
        <FaRegEnvelope size={18} />
        <span className="text-[15px]">EXP and SP</span>
      </div>

      <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300" 
        onClick={() => setActiveComponent("dailyTask")}>
        <FaRegUserCircle size={18} />
        <span className="text-[15px]">Daily Task</span>
      </div>

      <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300" 
        onClick={() => setActiveComponent("weeklyTask")}>
        <CiCircleMore size={18} />
        <span className="text-[15px]">Weekly Task</span>
      </div>

      <button className="mt-4 bg-black text-white py-2 px-6 rounded-full w-full font-semibold">
        Post
      </button>
    </div>
  );
};

export default Sidebar;
