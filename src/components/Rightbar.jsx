
import React from "react";
import { FaSearch } from "react-icons/fa";

const RightBar = () => {
  return (
    <div className="flex flex-col w-full h-full items-start p-4 bg-white shadow-md h-screen">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* Subscription Section */}
      <div className="bg-gray-200 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Stay Updated</h2>
        <p className="text-sm text-gray-600 mb-3">
          Subscribe to get the latest updates and news.
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-32 font-semibold hover:bg-blue-500">
          Subscribe
        </button>
      </div>

      {/* Follow Suggestions */}
      <div className="bg-gray-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Who to follow</h2>

        {/* Suggested User 1 */}
        <div className="flex items-center justify-center gap-x-24 mb-3">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-3 font-medium text-[13px]">John G</span>
          </div>
          <button className="bg-blue-600 text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-500">
            Follow
          </button>
        </div>

        {/* Suggested User 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-3 font-medium text-[13px]">Jane Smith</span>
          </div>
          <button className="bg-blue-600 text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-500">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;