import { useState } from "react";
import ImageCard from "../components/ImageCard";

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
    <div className=" w-[145%] flex justify-center  min-h-screen bg-gray-900 text-white p-8">
      {/* 3D Rotating Card with ImageCard component */}
      <div
        className="w-96  mt-10 bg-gradient-to-br  shadow-2xl rounded-2xl flex justify-center items-center transition-transform duration-300 ease-out transform"
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




