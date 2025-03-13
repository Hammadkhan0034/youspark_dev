import React from "react";

const Feed = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full border border-gray-300 border-r-2 rounded-lg p-4 bg-white h-screen">
      <div className="flex justify-around border-b border-gray-300 pb-2 mb-4 w-full max-w-lg">
        <span className="cursor-pointer font-semibold text-lg hover:text-black">
          For You
        </span>
        <span className="cursor-pointer font-semibold text-lg hover:text-black">
          Following
        </span>
      </div>

      {/* Render dynamic content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Feed;

