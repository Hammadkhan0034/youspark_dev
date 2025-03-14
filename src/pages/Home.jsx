import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import Topbar from "../components/Topbar";
import VirtualCard from "../components/VirtualCard";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  const userData = {
    photo: "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?t=st=1741294786~exp=1741298386~hmac=11406dd743975348a585ede1b622862b1527789e47ea15526144f3e9a&w=740",
    nickname: "CryptoKing",
    description: "This card holds the legacy of blockchain mastery.",
    value: "500",
  };

  // Function to render the selected content dynamically
  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <p>Welcome to the Home Page!</p>;
      case "virtualCard":
        return <p>Own Virtual Card Component</p>;
      case "ownVirtualCard":
        return <p>Own Virtual Card Component</p>;
      case "expAndSp":
        return <p>EXP and SP Component</p>;
      case "dailyTask":
        return <p>Daily Task Component</p>;
      case "weeklyTask":
        return <p>Weekly Task Component</p>;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <>
      <Topbar />
      <div className="flex h-screen w-[145%]">
        <div className="flex-[3]">
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>
        <div className="flex-[6]">
          <Feed>{renderComponent()}</Feed>
        </div>
        <div className="flex-[3]">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default Home;
