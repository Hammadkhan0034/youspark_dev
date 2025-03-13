export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ChatSection />
        <MembersList />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-blue-600 text-white p-4 text-center text-xl font-bold shadow-md">
      USpark Chat
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-1/5 bg-white p-4 border-r overflow-y-auto">
      <Section title="Channels">
        {['General', 'Random', 'Support'].map((channel) => (
          <SidebarItem key={channel} label={channel} />
        ))}
      </Section>
      <Section title="Direct Messages">
        {['John ', 'Jane ', 'Mohsin'].map((user) => (
          <SidebarItem key={user} label={user} />
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function SidebarItem({ label }) {
  return <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">{label}</li>;
}

function ChatSection() {
  return (
    <div className="flex-1 flex flex-col">
      <ChatMessages />
      <MessageInput />
    </div>
  );
}

function ChatMessages() {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      <Message sender="John " text="Hello! How are you?" isUser={false} />
      <Message sender="You" text="I'm good, thanks! You?" isUser={true} />
    </div>
  );
}

function Message({ sender, text, isUser }) {
  return (
    <div className={`p-3 rounded-lg w-fit max-w-xs ${isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'}`}>
      <span className="text-sm font-medium">{sender}</span>
      <p className="mt-1">{text}</p>
    </div>
  );
}

function MessageInput() {
  return (
    <div className="p-4 bg-white border-t flex items-center">
      <input type="text" placeholder="Type a message..." className="flex-1 p-2 border rounded-lg outline-none" />
      <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Send
      </button>
    </div>
  );
}

function MembersList() {
  return (
    <div className="w-64 bg-white p-4 border-l overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Channel Members</h2>
      <ul className="space-y-2">
        {[
          { name: 'John Doe', online: true },
          { name: 'Jane Smith', online: false },
          { name: 'Mike Johnson', online: true },
        ].map((member) => (
          <MemberItem key={member.name} name={member.name} online={member.online} />
        ))}
      </ul>
    </div>
  );
}

function MemberItem({ name, online }) {
  return (
    <li className="flex items-center p-2">
      <div className={`w-2 h-2 rounded-full mr-2 ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
      {name} 
      {/* ({online ? 'Online' : 'Offline'}) */}
    </li>
  );
}



