import React from "react";

const VirtualCard = ({ user }) => {
  return (
    <div className="relative w-80 bg-gradient-to-br from-teal-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* User Image */}
      <div className="w-24 h-24 mx-auto overflow-hidden rounded-full border-4 border-white shadow-md">
        <img src={user.photo} alt={user.nickname} className="w-full h-full object-cover" />
      </div>

      {/* Nickname */}
      <h2 className="mt-4 text-2xl font-bold text-center">{user.nickname}</h2>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-200 text-center italic">{user.description}</p>

      {/* Card Value & Trade Button */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-semibold bg-black/30 px-3 py-1 rounded-lg">
          Value: ${user.value}
        </span>
        <button className="px-4 py-2 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-200 transition">
          Trade
        </button>
      </div>
    </div>
  );
};


export default VirtualCard;





