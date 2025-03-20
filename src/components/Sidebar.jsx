import React from "react";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon, Search, Bell, MessageCircle, User, Settings } from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className={`${isSidebarOpen ? 'w-64' : 'w-16'} p-4 border-r border-gray-800 fixed h-screen transition-all duration-300 ease-in-out`}>
      <div className="space-y-6">
        <div className="text-2xl font-bold mb-8">𝕏</div>
        <SidebarItem icon={<HomeIcon />} text="Home" onClick={() => navigate("/home")} />
        <SidebarItem
          icon={<HomeIcon />}
          text="Virtual Card"
          onClick={() => navigate("/virtual-card")}
        />
        <SidebarItem icon={<Search />} text="Explore" onClick={() => navigate("/explore")} />
        <SidebarItem icon={<Bell />} text="Notifications" onClick={() => navigate("/notifications")} />
        <SidebarItem icon={<MessageCircle />} text="Messages" onClick={() => navigate("/messages")} />
        <SidebarItem icon={<User />} text="Profile" onClick={() => navigate("/profile")} />
        <SidebarItem icon={<Settings />} text="Settings" onClick={() => navigate("/settings")} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 w-full mt-4 font-bold">
          Post
        </button>
      </div>
    </nav>
  );
};

const SidebarItem = ({ icon, text, onClick }) => {
  return (
    <button
      className="flex items-center space-x-4 p-3 rounded-full hover:bg-gray-900 w-full"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Sidebar;






























// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
// import { FaHome, FaSearch, FaRegUserCircle } from "react-icons/fa";
// import { IoIosNotifications } from "react-icons/io";
// import { FaRegEnvelope } from "react-icons/fa6";
// import { CiCircleMore } from "react-icons/ci";

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigate function

//   return (
//     <div className="flex flex-col h-full p-4 h-screen text-black space-y-4 border-r-2 border-gray-200">
//       <span className="text-2xl font-bold">YouSpark</span>

//       {/* Home Navigation */}
//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/")}
//       >
//         <FaHome size={18} />
//         <span className="text-[15px]">Home</span>
//       </div>

//       {/* Navigate to VirtualCard Page */}
//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/virtual-card")}
//       >
//         <FaSearch size={18} />
//         <span className="text-[15px]">Virtual Card</span>
//       </div>

//       {/* Other Sidebar Items */}
//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/own-virtual-card")}
//       >
//         <IoIosNotifications size={18} />
//         <span className="text-[15px]">Discover</span>
//       </div>

//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/spark-zone")}
//       >
//         <IoIosNotifications size={18} />
//         <span className="text-[15px]">SparkZone</span>
//       </div>

//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/exp-sp")}
//       >
//         <FaRegEnvelope size={18} />
//         <span className="text-[15px]">EXP and SP</span>
//       </div>

//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/messages")}
//       >
//         <FaRegUserCircle size={18} />
//         <span className="text-[15px]">Messages</span>
//       </div>


//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/daily-task")}
//       >
//         <FaRegUserCircle size={18} />
//         <span className="text-[15px]">Notificatins</span>
//       </div>

//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/profile")}>
//         <FaRegUserCircle size={18} />
//         <span className="text-[15px]">Profile</span>
//       </div>

//       <div
//         className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
//         onClick={() => navigate("/settings")}
//       >
//         <FaRegUserCircle size={18} />
//         <span className="text-[15px]">Settings</span>
//       </div>
//       {/* Post Button */}
//       <button className="mt-4 bg-black text-white py-2 px-6 rounded-full w-full font-semibold">
//         Post
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
