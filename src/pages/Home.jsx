import React, { useState } from 'react';
import Sidebar from "../components/Sidebar"
import { Home as HomeIcon, Search, MessageCircle, User, Settings, Bell, TrendingUp, MoreHorizontal, Heart, Repeat2, MessageSquare, Share, Menu, X } from 'lucide-react';

const tweets = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    username: "johndoe",
    handle: "@johndoe",
    timestamp: "2h",
    content: "Just deployed my latest project! 🚀 #coding #webdev",
    likes: 42,
    retweets: 12,
    comments: 5
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    username: "sarahsmith",
    handle: "@sarahsmith",
    timestamp: "4h",
    content: "The future of AI is incredibly exciting! What are your thoughts on the latest developments? 🤖 #AI #tech",
    likes: 128,
    retweets: 34,
    comments: 15
  }
];

const trendingTopics = [
  { topic: "#JavaScript", tweets: "125K" },
  { topic: "#AI", tweets: "89K" },
  { topic: "#WebDev", tweets: "45K" },
  { topic: "#React", tweets: "32K" }
];

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex">
   
<Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <main className={`${isSidebarOpen ? 'ml-64' : 'ml-16'} flex-1 mr-80 border-r border-gray-800 transition-all duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        <div className="p-4">
          {/* Tweet Input */}
          <div className="flex space-x-4 pb-8 border-b border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <textarea
                placeholder="What's happening?"
                className="w-full bg-transparent border-b border-gray-800 focus:outline-none focus:border-blue-500 resize-none pb-4"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-bold">
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Tweets */}
          {tweets.map(tweet => (
            <div key={tweet.id} className="py-4 border-b border-gray-800">
              <div className="flex space-x-4">
                <img src={tweet.avatar} alt={tweet.username} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{tweet.username}</span>
                    <span className="text-gray-500">{tweet.handle}</span>
                    <span className="text-gray-500">· {tweet.timestamp}</span>
                    <button className="ml-auto text-gray-500 hover:text-gray-400">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <p className="mt-2 mb-4">{tweet.content}</p>
                  <div className="flex justify-between text-gray-500 max-w-md">
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                      <MessageSquare size={18} />
                      <span>{tweet.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-500">
                      <Repeat2 size={18} />
                      <span>{tweet.retweets}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-red-500">
                      <Heart size={18} />
                      <span>{tweet.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                      <Share size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 p-4 fixed right-0 h-screen">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>

        {/* Trending Topics */}
        <div className="mt-4 bg-gray-900 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">Trending</h2>
          {trendingTopics.map((topic, index) => (
            <div key={index} className="py-3 hover:bg-gray-800 cursor-pointer rounded-lg px-2">
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
    </div>
  );
}

function SidebarItem({ icon, text, active = false, onClick }) {
  return (
    <button
      className={`flex items-center space-x-4 p-3 rounded-full hover:bg-gray-900 w-full ${active ? 'font-bold' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

export default Home;