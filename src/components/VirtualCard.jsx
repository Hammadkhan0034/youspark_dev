import { useState } from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";
import ImageCard from "../components/ImageCard"

const VirtualCard = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const xRotation = ((clientY - top) / height - 0.5) * 30;
    const yRotation = ((clientX - left) / width - 0.5) * -30;

    setRotate({ x: xRotation, y: yRotation });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };


  return (
    <div className="flex justify-center w-[145%] min-h-[1000px] items-center min-h-screen bg-gray-900 text-white p-8">
        {/* Right Section - 3D Rotating Card with ImageCard component */}
        <div
          className="w-96 h-96  min-h-[550px] bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl rounded-2xl flex justify-center items-center transition-transform duration-300 ease-out transform"
          style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <ImageCard />

        </div>
      </div>
    
  );
};

export default VirtualCard;



