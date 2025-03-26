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
          className="w-full bg-teal-light/10 rounded-full py-2 px-4 pl-10 
            focus:outline-none focus:ring-2 focus:ring-teal-dark/50"
        />
        <Search className="absolute left-3 top-2.5 text-teal-dark" size={18} />
      </div>

      {/* Trending Topics */}
      <div className="mt-4 bg-teal-light/10 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-teal-dark">Trending</h2>
        {trendingTopics.map((topic, index) => (
          <div 
            key={index} 
            className="py-3 hover:bg-teal-light/20 cursor-pointer rounded-lg px-2 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-teal-dark">{topic.topic}</p>
                <p className="text-sm text-teal-dark/70">{topic.tweets} Tweets</p>
              </div>
              <TrendingUp size={18} className="text-teal-dark/70" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
