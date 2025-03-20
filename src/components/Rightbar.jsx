import React from "react";
import { Search, TrendingUp } from "lucide-react";

const RightSidebar = ({ trendingTopics }) => {
  return (
    <aside className="w-80 p-4 fixed right-0 h-screen hidden lg:block border-l border-gray-200">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      {/* Trending Topics */}
      <div className="mt-4 bg-gray-100 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Trending</h2>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="py-3 hover:bg-gray-200 cursor-pointer rounded-lg px-2 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{topic.topic}</p>
                <p className="text-sm text-gray-500">{topic.tweets} Tweets</p>
              </div>
              <TrendingUp size={18} className="text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;