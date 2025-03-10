export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-center text-xl font-bold shadow-md">
        USpark Chat
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Channels/Groups */}
        <div className="w-1/5 bg-white p-4 border-r overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Channels</h2>
          <ul className="space-y-2">
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer"># General</li>
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer"># Random</li>
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer"># Support</li>
          </ul>
          
          <h2 className="text-lg font-semibold mt-6 mb-4">Direct Messages</h2>
          <ul className="space-y-2">
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">John Doe</li>
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Jane Smith</li>
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Mike Johnson</li>
          </ul>
        </div>

        {/* Middle Section - Chat Messages */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-gray-200 p-3 rounded-lg w-fit max-w-xs">
              <span className="text-sm font-medium">John Doe</span>
              <p className="mt-1">Hello! How are you?</p>
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-lg w-fit max-w-xs ml-auto">
              <span className="text-sm font-medium">You</span>
              <p className="mt-1">I'm good, thanks! You?</p>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg outline-none"
            />
            <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>

        {/* Right Sidebar - Members/Details */}
        <div className="w-64 bg-white p-4 border-l overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Channel Members</h2>
          <ul className="space-y-2">
            <li className="flex items-center p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              John Doe (Online)
            </li>
            <li className="flex items-center p-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
              Jane Smith (Offline)
            </li>
            <li className="flex items-center p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Mike Johnson (Online)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


