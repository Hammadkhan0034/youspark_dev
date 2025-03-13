import { useState } from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-8">
      <div className="grid grid-cols-2 gap-8 max-w-4xl items-center">
        {/* Left Section */}
        <div className="text-left flex flex-col items-start">
          <h1 className="text-3xl font-bold mb-10">Pokemon Cards</h1>
          <p className="flex items-center gap-x-1 mt-5 text-white">
            By <FaTwitter className="text-blue-300" />
            <span className="text-blue-600 underline">@simeydotme</span> |{" "}
            <FaGithub className="text-blue-300" />
            <span className="text-blue-600 underline">Simon Goellner</span>
          </p>
          <p className="text-lg text-gray-300 mt-7 w-full text-[16px]">
            A collection of
            <span className="font-bold italic bg-teal-400 text-white px-1">
              advanced CSS
            </span>
            styles to create
            <span className="font-bold italic bg-teal-400 text-white px-1">
              realistic-looking effects
            </span>
            for the face of Pokemon cards. The cards used
            <span className="font-bold italic bg-teal-400 text-white px-1">
              3D transforms, filters, blend modes, CSS gradients
            </span>
            and interactions to provide a unique experience when taking a closer
            look!
          </p>

          <p className="mt-7 text-[19px]">Click on a Card to take a Closer look!</p>
          <hr className="mt-6 w-full" />

          <p className="text-[14px] mt-3">
            I'm using Svelte.JS to handle interactivity and state;
            <span className="font-bold text-white">
              assigning values to CSS custom properties
            </span>{" "}
            (variables) which in turn drive the effects and 3D transforms.
          </p>
        </div>

        {/* Right Section - 3D Rotating Card */}
        <div
          className="w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl rounded-2xl flex justify-center items-center transition-transform duration-300 ease-out transform"
          style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <p className="text-xl font-semibold">Hover Me!</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualCard;

